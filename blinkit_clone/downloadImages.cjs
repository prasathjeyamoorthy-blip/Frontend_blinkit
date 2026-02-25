const fs = require("fs");
const path = require("path");
const axios = require("axios");

const imagesData = JSON.parse(fs.readFileSync("pharma_images.json", "utf8"));
const publicImgDir = path.join(__dirname, "public", "pharma_img");

if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}

async function downloadImage(url, dest) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      },
      timeout: 5000,
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(dest);
      response.data.pipe(writer);
      let error = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on("close", () => {
        if (!error) resolve(true);
      });
    });
  } catch (err) {
    console.error(`Failed to download ${url}: ${err.message}`);
    return false;
  }
}

async function run() {
  const updatedData = {};

  for (const [cat, items] of Object.entries(imagesData)) {
    updatedData[cat] = [];
    console.log(`Processing category: ${cat}`);

    for (const item of items) {
      const ext = item.image.split("?")[0].split(".").pop().toLowerCase();
      let extension = "jpg";
      if (["png", "jpeg", "webp", "gif"].includes(ext)) {
        extension = ext;
      }

      const fileName = `${item.id}.${extension}`;
      const destPath = path.join(publicImgDir, fileName);

      let finalImageUrl = item.image;

      if (item.image && !item.image.includes("placehold.co")) {
        console.log(`Downloading ${item.id}...`);
        const success = await downloadImage(item.image, destPath);
        if (success) {
          finalImageUrl = `/pharma_img/${fileName}`;
        } else {
          // fallback
          finalImageUrl = `https://placehold.co/150x150?text=${encodeURIComponent(item.title.split("\n")[0].trim())}&font=roboto`;
        }
      } else {
        finalImageUrl = `https://placehold.co/150x150?text=${encodeURIComponent(item.title.split("\n")[0].trim())}&font=roboto`;
      }

      updatedData[cat].push({
        ...item,
        image: finalImageUrl,
      });

      // tiny sleep
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  // Update JSX file directly with new paths
  let jsxContent = fs.readFileSync("src/PharmaPage.jsx", "utf8");
  const regex =
    /const PHARMA_PRODUCTS_BY_CATEGORY = \{[\s\S]*?\};\n\nconst PharmaPage/;
  const newObjectStr = `const PHARMA_PRODUCTS_BY_CATEGORY = ${JSON.stringify(updatedData, null, 2)};\n\nconst PharmaPage`;
  jsxContent = jsxContent.replace(regex, newObjectStr);
  fs.writeFileSync("src/PharmaPage.jsx", jsxContent);

  console.log("Successfully downloaded images and updated PharmaPage.jsx");
}

run();

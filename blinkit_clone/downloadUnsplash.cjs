const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");

const imagesData = JSON.parse(fs.readFileSync("pharma_images.json", "utf8"));
const publicImgDir = path.join(__dirname, "public", "pharma_img");

const apiKey = "nAD7HQWPN5aRSMbA_VbDJ9Wf-rYIrmAF2RdzT4p-qlw";

async function fetchFromUnsplash(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${apiKey}&per_page=1`;
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              const parsed = JSON.parse(data);
              if (parsed.results && parsed.results.length > 0) {
                resolve(parsed.results[0].urls.small);
              } else {
                resolve(null);
              }
            } catch (e) {
              reject(e);
            }
          } else if (res.statusCode === 403) {
            reject(new Error("Rate Limit"));
          } else {
            resolve(null);
          }
        });
      })
      .on("error", reject);
  });
}

async function downloadImage(url, dest) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
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
      const fileName = `${item.id}.jpg`;
      const destPath = path.join(publicImgDir, fileName);

      let finalImageUrl = item.image;

      // If we failed to get a real image previously, fetch one from Unsplash
      if (
        item.image.includes("placehold.co") ||
        item.image.includes("Failed") ||
        !fs.existsSync(destPath)
      ) {
        console.log(`Fetching Unsplash for ${item.id}...`);

        try {
          const query = item.searchTerm + " medical pharmacy";
          const splashUrl = await fetchFromUnsplash(query);

          if (splashUrl) {
            const success = await downloadImage(splashUrl, destPath);
            if (success) {
              finalImageUrl = `/pharma_img/${fileName}`;
            } else {
              finalImageUrl = `https://placehold.co/150x150?text=${encodeURIComponent(item.title.split("\n")[0].trim())}&font=roboto`;
            }
          } else {
            finalImageUrl = `https://placehold.co/150x150?text=${encodeURIComponent(item.title.split("\n")[0].trim())}&font=roboto`;
          }
        } catch (e) {
          console.log("Unsplash Rate Limited or failed.", e.message);
          finalImageUrl = `https://placehold.co/150x150?text=${encodeURIComponent(item.title.split("\n")[0].trim())}&font=roboto`;
        }
      } else {
        // We already have it downloaded correctly
        finalImageUrl = `/pharma_img/${fileName}`;
      }

      updatedData[cat].push({
        ...item,
        image: finalImageUrl,
      });

      // sleep to respect limits
      await new Promise((r) => setTimeout(r, 600));
    }
  }

  // Update JSX file directly with new paths
  let jsxContent = fs.readFileSync("src/PharmaPage.jsx", "utf8");
  const regex =
    /const PHARMA_PRODUCTS_BY_CATEGORY = \{[\s\S]*?\};\n\nconst PharmaPage/;
  const newObjectStr = `const PHARMA_PRODUCTS_BY_CATEGORY = ${JSON.stringify(updatedData, null, 2)};\n\nconst PharmaPage`;
  jsxContent = jsxContent.replace(regex, newObjectStr);
  fs.writeFileSync("src/PharmaPage.jsx", jsxContent);

  console.log(
    "Successfully downloaded Unsplash proxies and updated PharmaPage.jsx",
  );
}

run();

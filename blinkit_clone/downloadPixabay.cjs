const fs = require("fs");
const path = require("path");
const https = require("https");
const axios = require("axios");

const imagesData = JSON.parse(fs.readFileSync("pharma_images.json", "utf8"));
const publicImgDir = path.join(__dirname, "public", "pharma_img");

// NOTE: Pixabay Free tier allows 100 requests per minute
const PIXABAY_KEY = "48512591-10519a86a1112d7c49ebd12df";

async function fetchFromPixabay(query) {
  return new Promise((resolve, reject) => {
    const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=3&safesearch=true`;
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              const parsed = JSON.parse(data);
              if (parsed.hits && parsed.hits.length > 0) {
                // Pixabay returns 'webformatURL' which is decent size
                resolve(parsed.hits[0].webformatURL);
              } else {
                resolve(null);
              }
            } catch (e) {
              reject(e);
            }
          } else if (res.statusCode === 429) {
            reject(new Error("Rate Limit Hit on Pixabay!"));
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
      timeout: 8000,
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

      let finalImageUrl = item.image; // fallback to what we currently have

      console.log(
        `Fetching Pixabay query for ${item.id} ("${item.searchTerm}")...`,
      );

      try {
        // clean search term to yield better pixabay hits (pixabay gets confused by long specific queries)
        // We'll strip down the query slightly if requested.
        const query = item.searchTerm.replace(/['"]/g, "");
        let pixaUrl = await fetchFromPixabay(query);

        if (!pixaUrl) {
          // Fallback search term if exact match fails
          let fallbackQuery = query.split(" ")[0]; // E.g., "Dettol" or "Dabur"
          if (fallbackQuery.length > 2) {
            pixaUrl = await fetchFromPixabay(fallbackQuery + " medical");
          }
        }

        if (pixaUrl) {
          const success = await downloadImage(pixaUrl, destPath);
          if (success) {
            finalImageUrl = `/pharma_img/${fileName}`;
            console.log(`✔ Success: ${item.id} from Pixabay`);
          } else {
            console.log(`❌ Download failed: ${item.id}`);
          }
        } else {
          console.log(`⏸ No Pixabay match: ${item.id}, keeping existing.`);
        }
      } catch (e) {
        console.log(`⚠️ Pixabay Error:`, e.message);
      }

      updatedData[cat].push({
        ...item,
        image: finalImageUrl,
      });

      // Sleep to avoid Pixabay's 100 req/min limit
      await new Promise((r) => setTimeout(r, 650));
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
    "Successfully downloaded Pixabay proxies and updated PharmaPage.jsx",
  );
}

run();

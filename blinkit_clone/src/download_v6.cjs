const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const google = require("googlethis");

const categories = [
  "diapers-more",
  "bathing-needs",
  "baby-wipes",
  "baby-food",
  "skin-hair-care",
];
const templates = {
  "diapers-more": [
    {
      title: "Huggies Pant Style Baby Diaper, S, 4-8 kg",
      term: "Huggies Diaper",
    },
    {
      title: "Huggies Comfy Pant Style Baby Diaper (XL)",
      term: "Huggies Pant Diaper",
    },
    {
      title: "Little's Fluffy Soft Pant Style Baby Diaper (XL)",
      term: "Little's Diaper",
    },
    {
      title: "Pampers Premium Care Pant Style Baby Diap...",
      term: "Pampers Premium Diaper",
    },
    {
      title: "Huggies Natural Soft Pant Style Baby Diap...",
      term: "Huggies Natural Diaper",
    },
    {
      title: "Little's Fluffy Soft Pant Style Baby Diaper...",
      term: "Little's Soft Diaper",
    },
    {
      title: "Huggies Complete Comfort Pant Style Diap...",
      term: "Huggies Complete Diaper",
    },
    {
      title: "Pampers Aloe Vera Pant Style Baby Diapers...",
      term: "Pampers Aloe Diaper",
    },
    {
      title: "Huggies Natural Soft Tape Style Baby Dia...",
      term: "Huggies Tape Diaper",
    },
    {
      title: "Pampers Premium Care Pant Style Baby Diap...",
      term: "Pampers Premium Care",
    },
    {
      title: "Pampers Aloe Vera Pant Style Baby Diaper...",
      term: "Pampers Pant Diaper",
    },
    { title: "LuvLap Baby Diaper Pant Style (M)", term: "LuvLap Diaper" },
    {
      title: "MamyPoko Pants Extra Absorb Baby Diaper...",
      term: "MamyPoko Pants",
    },
    {
      title: "Himalaya Total Care Baby Pants Diaper...",
      term: "Himalaya Diaper",
    },
    { title: "SuperBottoms Freesize Cloth Diaper", term: "Cloth Diaper" },
    {
      title: "Pampers Active Baby Taped Diaper (L)",
      term: "Pampers Taped Diaper",
    },
    { title: "MamyPoko Pants Standard Diaper (L)", term: "MamyPoko Standard" },
    { title: "Bumtum Baby Diaper Pants (M)", term: "Bumtum Diaper" },
    { title: "Huggies Dry Pants (M)", term: "Huggies Dry Pants" },
    { title: "Snuggy Baby Diapers Pant Style (L)", term: "Snuggy Diaper" },
    {
      title: "Little Angel Baby Diaper Pants (XL)",
      term: "Little Angel Diaper",
    },
    { title: "Advance Baby Cloth Diaper Inserts", term: "Diaper Inserts" },
    { title: "Pampers Night Pants Diaper (L)", term: "Pampers Night Diaper" },
    { title: "Mee Mee Breathable Baby Diapers", term: "Mee Mee Diaper" },
    { title: "Bella Baby Happy Diapers (Maxi)", term: "Bella Baby Diaper" },
    { title: "Pampers Active Baby Taped (S)", term: "Pampers Taped S" },
    { title: "Himalaya Baby Diaper (S)", term: "Himalaya Diaper S" },
    { title: "Mee Mee Baby Diaper (S)", term: "Mee Mee Diaper S" },
    { title: "Pigeon Baby Diaper (M)", term: "Pigeon Diaper M" },
    { title: "Chicco Diaper (M)", term: "Chicco Diaper M" },
  ],
  "bathing-needs": [
    { title: "Himalaya Gentle Baby Bath", term: "Himalaya Baby Bath" },
    { title: "Johnson's Baby Bath", term: "Johnsons Baby Bath" },
    { title: "Sebamed Baby Wash Extra Soft", term: "Sebamed Baby Wash" },
    { title: "Moms Co. Natural Baby Wash", term: "Moms Co Baby Wash" },
    { title: "Cetaphil Baby Wash & Shampoo", term: "Cetaphil Baby Wash" },
    {
      title: "Mamaearth Deeply Nourishing Body Wash",
      term: "Mamaearth Baby Wash",
    },
    {
      title: "Baby Dove Rich Moisture Hair to Toe Wash",
      term: "Baby Dove Wash",
    },
    { title: "Little's Organix Gentle Baby Wash", term: "Little's Baby Wash" },
    { title: "Chicco Gentle Body Wash and Shampoo", term: "Chicco Body Wash" },
    { title: "Aveeno Baby Daily Moisturizing Bath", term: "Aveeno Baby Bath" },
    { title: "Spoo Gentle Baby Bath", term: "Spoo Baby Wash" },
    { title: "Mothercare All We Know Baby Bath", term: "Mothercare Bath" },
    { title: "Pigeon Liquid Soap for Baby", term: "Pigeon Baby Soap" },
    { title: "Biotique Bio Green Apple Baby Wash", term: "Biotique Baby Wash" },
    {
      title: "Mee Mee Mild Baby Liquid Bathing Soap",
      term: "Mee Mee Baby Bath",
    },
    {
      title: "Goodnessme Certified Organic Baby Wash",
      term: "Organic Baby Wash",
    },
    { title: "Himalaya Extra Moisturizing Baby Wash", term: "Himalaya Wash" },
    { title: "Atogla Baby Wash", term: "Atogla Wash" },
    { title: "SebaMed Baby Cleansing Bar", term: "Sebamed Soap" },
    { title: "Himalaya Gentle Baby Soap", term: "Himalaya Soap" },
    { title: "Johnson's Baby Soap Original", term: "Johnsons Soap" },
    { title: "Tedibar Baby Soap", term: "Tedibar Soap" },
    { title: "Dermadew Baby Soap", term: "Dermadew Soap" },
    { title: "Mamaearth Moisturizing Baby Soap Bar", term: "Mamaearth Soap" },
    { title: "Baby Dove Rich Moisture Bathing Bar", term: "Baby Dove Soap" },
    { title: "SebaMed Baby Bubble Bath", term: "Sebamed Bubble Bath" },
    { title: "Azafran Baby Nourishing Soap", term: "Azafran Baby Soap" },
    { title: "Palmer's Baby Wash", term: "Palmers Baby Wash" },
    { title: "Chicco Baby Soap", term: "Chicco Baby Soap" },
    { title: "Rustic Art Baby Soap", term: "Rustic Art Baby Soap" },
  ],
  "baby-wipes": [
    { title: "Himalaya Gentle Baby Wipes", term: "Himalaya Baby Wipes" },
    { title: "Johnson's Baby Skincare Wipes", term: "Johnsons Baby Wipes" },
    { title: "Pampers Fresh Aloe Vera Baby Wipes", term: "Pampers Wipes" },
    { title: "Mee Mee Caring Baby Wet Wipes", term: "Mee Mee Wipes" },
    { title: "Little's Soft Cleansing Baby Wipes", term: "Little's Wipes" },
    { title: "LuvLap Aloe Vera Baby Wipes", term: "LuvLap Wipes" },
    { title: "Baby Dove Rich Moisture Wipes", term: "Baby Dove Wipes" },
    {
      title: "Mother Sparsh 99% Pure Water Wipes",
      term: "Mother Sparsh Wipes",
    },
    { title: "Mamaearth Bamboo Based Baby Wipes", term: "Mamaearth Wipes" },
    { title: "WaterWipes Original Baby Wipes", term: "WaterWipes" },
    { title: "Supples Baby Wet Wipes with Aloe Vera", term: "Supples Wipes" },
    { title: "Chicco Soft Cleansing Baby Wipes", term: "Chicco Wipes" },
    { title: "MamyPoko Soft Baby Wipes", term: "MamyPoko Wipes" },
    { title: "Sebamed Baby Wipes", term: "Sebamed Wipes" },
    { title: "Pigeon Water Base Baby Wipes", term: "Pigeon Wipes" },
    { title: "Aveeno Baby Wipes", term: "Aveeno Wipes" },
    { title: "Biotique Bio Aloe Baby Wipes", term: "Biotique Wipes" },
    { title: "Goodnessme Pure Water Baby Wipes", term: "Goodnessme Wipes" },
    { title: "Bella Baby Happy Aqua Care Wipes", term: "Bella Baby Wipes" },
    { title: "Tulips Sensitive Baby Wet Wipes", term: "Tulips Wipes" },
    { title: "MyGlamm Wipeout Baby Wipes", term: "MyGlamm Wipes" },
    { title: "Bumtum Baby Wet Wipes", term: "Bumtum Wipes" },
    {
      title: "Himalaya Extra Moisturizing Baby Wipes",
      term: "Himalaya Moist Wipes",
    },
    { title: "Morisons Baby Dreams Wipes", term: "Morisons Wipes" },
    { title: "Huggies Nourishing Clean Baby Wipes", term: "Huggies Wipes" },
    { title: "Glider Baby Wipes", term: "Glider Wipes" },
    { title: "Moms Co Baby Wipes", term: "Moms Co Wipes" },
    { title: "Mothercare Baby Wipes", term: "Mothercare Wipes" },
    { title: "Teddyy Baby Wipes", term: "Teddyy Wipes" },
    { title: "Little's Bamboo Wipes", term: "Littles Bamboo Wipes" },
  ],
  "baby-food": [
    { title: "Nestle Cerelac Wheat Apple", term: "Cerelac Apple" },
    { title: "Nestle Cerelac Rice", term: "Cerelac Rice" },
    { title: "Nestle Nan Pro 1 Infant Formula", term: "Nan Pro 1" },
    { title: "Nestle Nan Pro 2 Follow-Up Formula", term: "Nan Pro 2" },
    { title: "Dexolac Stage 1 Infant Formula", term: "Dexolac 1" },
    { title: "Dexolac Stage 2 Follow-Up Formula", term: "Dexolac 2" },
    { title: "Similac Advance Infant Formula", term: "Similac Advance" },
    { title: "Slurrp Farm Ragi Cereal", term: "Slurrp Farm Ragi" },
    { title: "Slurrp Farm Oat Cereal", term: "Slurrp Farm Oats" },
    { title: "Early Foods Organic Ragi Porridge", term: "Early Foods Ragi" },
    {
      title: "Early Foods Multi Grain Porridge",
      term: "Early Foods Multigrain",
    },
    { title: "Farex Stage 1 Infant Formula", term: "Farex 1" },
    { title: "Enfamil A+ Stage 1 Infant Formula", term: "Enfamil" },
    { title: "Pristine Organics 1st Bites Ragi", term: "1st Bites Ragi" },
    { title: "Pristine Organics 1st Bites Wheat", term: "1st Bites Wheat" },
    { title: "Happa Organic Apple Puree", term: "Happa Apple Puree" },
    { title: "Happa Organic Banana Puree", term: "Happa Banana Puree" },
    { title: "Mille Organic Millet Cereal", term: "Mille Cereal" },
    { title: "Gerber Multigrain Cereal", term: "Gerber Cereal" },
    { title: "Hepano Protein Supplement for Kids", term: "Hepano" },
    { title: "Pediasure Health Drink Vanilla", term: "Pediasure Vanilla" },
    { title: "Ensure Junior Nutrition Powder", term: "Ensure Junior" },
    { title: "Horlicks Health Drink Growth+", term: "Horlicks Growth" },
    { title: "Aptamil Stage 1 Infant Formula", term: "Aptamil" },
    { title: "Lactogen 1 Infant Formula", term: "Lactogen 1" },
    {
      title: "Slurrp Farm Sweet Potato Cereal",
      term: "Slurrp Farm Sweet Potato",
    },
    { title: "Cerelac Mixed Fruit", term: "Cerelac Mixed Fruit" },
    { title: "Lactogen 2", term: "Lactogen 2" },
    { title: "Dexolac 3", term: "Dexolac 3" },
    { title: "Similac 2", term: "Similac 2" },
  ],
  "skin-hair-care": [
    { title: "Himalaya Baby Massage Oil", term: "Himalaya Baby Oil" },
    { title: "Johnson's Baby Oil", term: "Johnsons Baby Oil" },
    { title: "Sebamed Baby Lotion", term: "Sebamed Baby Lotion" },
    {
      title: "Mamaearth Daily Moisturizing Baby Lotion",
      term: "Mamaearth Lotion",
    },
    { title: "Cetaphil Baby Daily Lotion", term: "Cetaphil Baby Lotion" },
    { title: "Baby Dove Rich Moisture Lotion", term: "Baby Dove Lotion" },
    { title: "Himalaya Baby Cream", term: "Himalaya Baby Cream" },
    {
      title: "Sebamed Baby Protective Facial Cream",
      term: "Sebamed Face Cream",
    },
    {
      title: "Aveeno Baby Daily Moisturizing Lotion",
      term: "Aveeno Baby Lotion",
    },
    { title: "Moms Co. Natural Baby Lotion", term: "Moms Co Lotion" },
    { title: "Chicco Baby Moments Body Lotion", term: "Chicco Lotion" },
    { title: "Biotique Bio Aloe Vera Baby Lotion", term: "Biotique Lotion" },
    { title: "Himalaya Baby Powder", term: "Himalaya Baby Powder" },
    { title: "Johnson's Baby Powder", term: "Johnsons Baby Powder" },
    { title: "Sebamed Baby Hair & Body Wash", term: "Sebamed Baby Shampoo" },
    { title: "Himalaya Gentle Baby Shampoo", term: "Himalaya Baby Shampoo" },
    { title: "Johnson's No More Tears Baby Shampoo", term: "Johnsons Shampoo" },
    { title: "Cetaphil Baby Shampoo", term: "Cetaphil Shampoo" },
    { title: "Mamaearth Gentle Cleansing Shampoo", term: "Mamaearth Shampoo" },
    { title: "Mothercare All We Know Baby Oil", term: "Mothercare Oil" },
    { title: "Figaro Olive Oil for Baby Massage", term: "Figaro Olive Oil" },
    { title: "Maxirub Baby Massage Oil", term: "Baby Massage Oil" },
    { title: "Sebamed Baby Lip Balm", term: "Sebamed Lip Balm" },
    { title: "Himalaya Diaper Rash Cream", term: "Himalaya Rash Cream" },
    { title: "B4 Nappi Cream", term: "B4 Nappi" },
    { title: "Aveeno Baby Dermexa Cream", term: "Aveeno Dermexa" },
    { title: "Sebamed Baby Healing Cream", term: "Sebamed Healing Cream" },
    { title: "Palmer's Bottom Butter", term: "Palmers Bottom Butter" },
    { title: "SebaMed Rash Cream", term: "Sebamed Rash Cream" },
    { title: "Aquaphor Baby Ointment", term: "Aquaphor Baby Ointment" },
  ],
};

const downloadImg = (url, filepath, redirects = 0) => {
  return new Promise((resolve) => {
    if (redirects > 3) return resolve(false);

    // Quick and dirty timeout to avoid hanging scripts
    let timeout = setTimeout(() => {
      resolve(false);
    }, 5000);

    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0" } },
      (res) => {
        clearTimeout(timeout);
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          let newUrl = res.headers.location;
          if (!newUrl.startsWith("http")) {
            const urlObj = new URL(url);
            newUrl = `${urlObj.protocol}//${urlObj.host}${newUrl}`;
          }
          return downloadImg(newUrl, filepath, redirects + 1).then(resolve);
        }

        if (res.statusCode === 200) {
          const contentType = res.headers["content-type"];
          if (!contentType || !contentType.startsWith("image/")) {
            return resolve(false);
          }

          const fileStream = fs.createWriteStream(filepath);
          res
            .pipe(fileStream)
            .on("finish", () => resolve(true))
            .on("error", () => resolve(false));
        } else {
          resolve(false);
        }
      },
    );

    req.on("error", () => {
      clearTimeout(timeout);
      resolve(false);
    });

    req.on("timeout", () => {
      req.destroy();
      clearTimeout(timeout);
      resolve(false);
    });
  });
};

const ASSET_DIR = path.join(__dirname, "assets", "baby");
if (!fs.existsSync(ASSET_DIR)) {
  fs.mkdirSync(ASSET_DIR, { recursive: true });
}

// Ensure the folder is clean
fs.readdirSync(ASSET_DIR).forEach((f) =>
  fs.unlinkSync(path.join(ASSET_DIR, f)),
);

async function generateActualImages() {
  const finalCategories = {
    "diapers-more": [],
    "bathing-needs": [],
    "baby-wipes": [],
    "baby-food": [],
    "skin-hair-care": [],
  };

  let validProductsCount = 0;

  for (const cat of categories) {
    let ptId = 1;
    for (const tmpl of templates[cat]) {
      const filename = `${cat}_${ptId}.jpg`;
      const filepath = path.join(ASSET_DIR, filename);

      const query = tmpl.term + " product";
      console.log(`Searching... ${query}`);

      try {
        const images = await google.image(query, { safe: false });
        let downloaded = false;

        // try up to 3 image results
        const tries = Math.min(3, images.length);
        for (let i = 0; i < tries; i++) {
          const imgUrl = images[i].url;
          if (!imgUrl) continue;

          try {
            const success = await downloadImg(imgUrl, filepath);
            if (success) {
              downloaded = true;
              break;
            }
          } catch (e) {}
        }

        if (downloaded) {
          finalCategories[cat].push({
            id: `${cat}_${ptId}`,
            title: tmpl.title,
            weight:
              cat === "diapers-more" || cat === "baby-wipes"
                ? Math.floor(Math.random() * 50 + 20) + " pcs"
                : cat === "baby-food"
                  ? "400 g"
                  : "200 ml",
            price: Math.floor(Math.random() * 300) + 100,
            originalPrice: Math.floor(Math.random() * 300) + 400,
            discount: Math.floor(Math.random() * 15) + 1 + "%",
            searchTerm: tmpl.term,
            imageFile: filename,
            imagePath: `./assets/baby/${filename}`,
          });
          validProductsCount++;
          console.log(`✅ Kept: ${tmpl.term}`);
        } else {
          console.log(`❌ Dropped (No valid image): ${tmpl.term}`);
        }
      } catch (err) {
        console.log(`❌ Dropped (API err): ${tmpl.term}`);
      }
      ptId++;
    }
  }

  console.log(`Finished downloading ${validProductsCount} valid images!`);

  // Write the localized array
  let outputStr = "";

  for (const cat in finalCategories) {
    finalCategories[cat].forEach((p) => {
      outputStr += `import img_${p.id.replace(/-/g, "_")} from '${p.imagePath}';\n`;
    });
  }

  outputStr += "\nexport const BABY_PRODUCTS_BY_CATEGORY = {\n";

  for (const cat in finalCategories) {
    const products = finalCategories[cat];
    outputStr += `  "${cat}": [\n`;
    for (const p of products) {
      outputStr += `    {
      "id": "${p.id}",
      "title": "${p.title}",
      "weight": "${p.weight}",
      "price": ${p.price},
      "originalPrice": ${p.originalPrice},
      "discount": "${p.discount}",
      "searchTerm": "${p.searchTerm}",
      "image": img_${p.id.replace(/-/g, "_")}
    },\n`;
    }
    outputStr += `  ],\n`;
  }
  outputStr += "};\n";

  fs.writeFileSync(
    path.join(__dirname, "baby_data_loc.jsx"),
    outputStr,
    "utf8",
  );
  console.log("Rewrote baby_data_loc.jsx with strictly relevant items.");
}

generateActualImages();

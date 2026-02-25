const fs = require("fs");
const path = require("path");
const https = require("https");

const UNSPLASH_KEY = "nAD7HrmAF2RdzT4p-qlwJ9Wf-rYIL2oZJ_Z2p7IscZ8";
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
  ],
};

const getImageUrl = (query) => {
  return new Promise((resolve) => {
    https
      .get(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${UNSPLASH_KEY}`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              const parsed = JSON.parse(data);
              if (parsed && parsed.results && parsed.results.length > 0) {
                resolve({
                  url: parsed.results[0].urls.small,
                  isUnsplash: true,
                });
              } else {
                resolve({ url: null, isUnsplash: false });
              }
            } catch (e) {
              resolve({ url: null, isUnsplash: false });
            }
          });
        },
      )
      .on("error", () => resolve({ url: null, isUnsplash: false }));
  });
};

const downloadViaHttps = (url, filepath) => {
  return new Promise((resolve) => {
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return downloadViaHttps(res.headers.location, filepath).then(resolve);
        }
        if (res.statusCode === 200) {
          res
            .pipe(fs.createWriteStream(filepath))
            .on("finish", () => resolve(true))
            .on("error", () => resolve(false));
        } else {
          resolve(false);
        }
      })
      .on("error", () => resolve(false));
  });
};

const ASSET_DIR = path.join(__dirname, "assets", "baby");
if (!fs.existsSync(ASSET_DIR)) {
  fs.mkdirSync(ASSET_DIR, { recursive: true });
}

// Fallback image base64 (a simple 1x1 grey pixel to ensure parsing works)
const FALLBACK_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

async function processImages() {
  let ptId = 1;
  const total = 125;

  for (const cat of categories) {
    for (const tmpl of templates[cat]) {
      const filename = `bbp${ptId}.jpg`;
      const filepath = path.join(ASSET_DIR, filename);

      try {
        const result = await getImageUrl(tmpl.term);
        let success = false;

        if (result.url) {
          success = await downloadViaHttps(result.url, filepath);
        }

        if (!success) {
          fs.writeFileSync(filepath, Buffer.from(FALLBACK_B64, "base64"));
          console.log(`[${ptId}/${total}] Saved FALLBACK for ${tmpl.term}`);
        } else {
          console.log(`[${ptId}/${total}] Downloaded OK: ${tmpl.term}`);
        }
      } catch (err) {
        fs.writeFileSync(filepath, Buffer.from(FALLBACK_B64, "base64"));
        console.log(`[${ptId}/${total}] Saved FALLBACK (err) for ${tmpl.term}`);
      }

      ptId++;
    }
  }
  console.log("Finished downloading all images!");
}

processImages();

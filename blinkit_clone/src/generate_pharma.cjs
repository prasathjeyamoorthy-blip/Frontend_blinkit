const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const google = require("googlethis");

const categories = [
  "adult-diapers",
  "health-wellness",
  "protein-workout",
  "antiseptic",
];

const templates = {
  "adult-diapers": [
    { title: "CIR Premium Adult Diaper Pants", term: "CIR Adult Diaper" },
    { title: "Kare In Classic Underpad", term: "Kare In Underpad" },
    { title: "Kare In Classic Adult Diaper", term: "Kare In Adult Diaper" },
    { title: "B-FIT Adult Diaper Pant Style", term: "B-FIT Adult Diaper" },
    {
      title: "CIR Premium Adult Diaper Pants M",
      term: "CIR Adult Diaper Pants",
    },
    { title: "Kare In Bed Wipes", term: "Kare In Bed Wipes" },
    { title: "B-FIT Adult Diaper Pant XL", term: "B-FIT Adult Diaper XL" },
    {
      title: "Friends Classic Adult Diaper Pants",
      term: "Friends Adult Diaper",
    },
    { title: "Lifree Extra Absorb Pants L", term: "Lifree Diaper L" },
    { title: "Lifree Extra Absorb Pants M", term: "Lifree Diaper M" },
    { title: "Lifree Extra Absorb Pants XL", term: "Lifree Diaper XL" },
    { title: "Friends Premium Adult Diapers", term: "Friends Premium Diaper" },
    {
      title: "Friends Premium Adult Diapers XL",
      term: "Friends Premium Diaper XL",
    },
    { title: "Dignity Premium Adult Diapers", term: "Dignity Adult Diaper" },
    {
      title: "Dignity Premium Adult Diapers L",
      term: "Dignity Adult Diaper L",
    },
    {
      title: "Dignity Premium Adult Diapers XL",
      term: "Dignity Adult Diaper XL",
    },
    { title: "Senso Adult Diaper Pants", term: "Senso Adult Diaper" },
    { title: "Senso Adult Diaper Pants L", term: "Senso Adult Diaper L" },
    { title: "Senso Adult Diaper Pants XL", term: "Senso Adult Diaper XL" },
    { title: "Wet Wipes Adult Large", term: "Adult Wet Wipes" },
    { title: "Kare In Adult Diaper Tape Style", term: "Kare In Tape Diaper" },
    {
      title: "Kare In Adult Diaper Tape Style L",
      term: "Kare In Tape Diaper L",
    },
    { title: "Friends Easy Adult Diapers", term: "Friends Easy Diaper" },
    { title: "Friends Easy Adult Diapers L", term: "Friends Easy Diaper L" },
    { title: "Friends Easy Adult Diapers XL", term: "Friends Easy Diaper XL" },
    { title: "Romsons Adult Diaper Pants", term: "Romsons Adult Diaper" },
    { title: "Teddyy Adult Diapers", term: "Teddyy Adult Diaper" },
    { title: "Depend Adult Underwear", term: "Depend Adult Diaper" },
    { title: "Tena Adult Pants", term: "Tena Adult Diaper" },
    { title: "Prevail Adult Diapers", term: "Prevail Adult Diaper" },
    { title: "Attends Adult Briefs", term: "Attends Adult Diaper" },
    {
      title: "Tranquility Premium OverNight Diapers",
      term: "Tranquility Adult Diaper",
    },
    { title: "Abena Abri-Flex Premium Pants", term: "Abena Adult Diaper" },
    { title: "McKesson Adult Briefs", term: "McKesson Adult Diaper" },
    { title: "Medline Adult Diapers", term: "Medline Adult Diaper" },
    { title: "EGOSAN Maxi Incontinence Briefs", term: "Egosan Adult Diaper" },
    {
      title: "Solimo Adult Incontinence Underwear",
      term: "Solimo Adult Diaper",
    },
    { title: "Inspire Super Absorbent Underpad", term: "Inspire Underpad" },
    {
      title: "Assurance Premium Disposable Washcloths",
      term: "Assurance Adult Wipes",
    },
    { title: "Wellness Briefs Superio", term: "Wellness Adult Diaper" },
  ],
  "health-wellness": [
    { title: "Dabur Chyawanprash", term: "Dabur Chyawanprash" },
    { title: "Zandu Balm", term: "Zandu Balm" },
    { title: "Vicks VapoRub", term: "Vicks VapoRub" },
    { title: "Volini Pain Relief Spray", term: "Volini Spray" },
    { title: "Moov Pain Relief Cream", term: "Moov Cream" },
    { title: "Iodex Balm", term: "Iodex" },
    { title: "Amrutanjan Roll On", term: "Amrutanjan Roll On" },
    { title: "ENO Lemon", term: "ENO Lemon" },
    { title: "ENO Regular", term: "ENO Regular" },
    { title: "Pudin Hara Pearls", term: "Pudin Hara" },
    { title: "Hajmola Regular", term: "Hajmola" },
    { title: "Hajmola Imli", term: "Hajmola Imli" },
    { title: "Revital H Capsules", term: "Revital H" },
    { title: "Supradyn Daily Multivitamin", term: "Supradyn Multivitamin" },
    { title: "Becosules Capsules", term: "Becosules" },
    { title: "Shelcal 500", term: "Shelcal 500" },
    { title: "Neurobion Forte", term: "Neurobion Forte" },
    { title: "Liv52 Drops", term: "Liv52 Drops" },
    { title: "Himalaya Ashvagandha", term: "Himalaya Ashvagandha" },
    { title: "Himalaya Neem", term: "Himalaya Neem" },
    { title: "Himalaya Triphala", term: "Himalaya Triphala" },
    { title: "Vicks Cough Drops", term: "Vicks Cough Drops" },
    { title: "Strepsils Honey & Lemon", term: "Strepsils Honey Lemon" },
    { title: "Strepsils Orange", term: "Strepsils Orange" },
    { title: "Koflet Lozenges", term: "Koflet Lozenges" },
    { title: "Digene Tablet", term: "Digene Tablet" },
    { title: "Gelusil Liquid", term: "Gelusil Liquid" },
    { title: "Honitus Syrup", term: "Dabur Honitus" },
    { title: "Cofsils Lozenges", term: "Cofsils" },
    { title: "Benadryl Cough Syrup", term: "Benadryl Syrup" },
    { title: "Glycodin Syrup", term: "Glycodin" },
    { title: "Vicks Inhaler", term: "Vicks Inhaler" },
    { title: "Otrivin Nasal Spray", term: "Otrivin Spray" },
    { title: "Nasivion Adult Drops", term: "Nasivion Drops" },
    { title: "Dolo 650", term: "Dolo 650" },
    { title: "Crocin Advance", term: "Crocin Advance" },
    { title: "Saridon Tablet", term: "Saridon" },
    { title: "Disprin Tablet", term: "Disprin" },
    { title: "Voveran Emulgel", term: "Voveran Emulgel" },
    { title: "Combiflam Tablet", term: "Combiflam" },
  ],
  "protein-workout": [
    { title: "Optimum Nutrition Whey Protein", term: "ON Whey Protein" },
    { title: "MuscleBlaze Whey Protein", term: "MuscleBlaze Whey" },
    { title: "As It Is Whey Protein", term: "As It Is Whey" },
    { title: "MuscleTech NitroTech", term: "NitroTech Whey" },
    { title: "Myprotein Impact Whey", term: "Myprotein Whey" },
    { title: "Dymatize Elite Whey", term: "Dymatize Whey" },
    { title: "Isopure Zero Carb", term: "Isopure Whey" },
    { title: "BSN Syntha-6", term: "BSN Syntha-6" },
    { title: "Cellucor C4 Pre Workout", term: "C4 Pre Workout" },
    { title: "MuscleBlaze Pre Workout", term: "MB Pre Workout" },
    { title: "ON Amino Energy", term: "ON Amino Energy" },
    { title: "XTEND BCAA", term: "XTEND BCAA" },
    { title: "MB BCAA", term: "MuscleBlaze BCAA" },
    { title: "MusclePharm Assault", term: "MusclePharm Pre Workout" },
    { title: "Optimum Nutrition Creatine", term: "ON Creatine" },
    { title: "MuscleBlaze Creatine", term: "MB Creatine" },
    { title: "GNC Pro Performance Creatine", term: "GNC Creatine" },
    { title: "Fast&Up Reload Hydration", term: "Fast&Up Hydration" },
    { title: "Fast&Up BCAA", term: "Fast&Up BCAA" },
    { title: "Ritebite Protein Bar", term: "Ritebite Protein Bar" },
    { title: "Yoga Bar Protein Bar", term: "Yoga Bar Protein" },
    { title: "Phitzee Protein Bar", term: "Phitzee Protein Bar" },
    { title: "GNC Multivitamin", term: "GNC Multivitamin" },
    { title: "MuscleBlaze Fish Oil", term: "MB Fish Oil" },
    { title: "ON Fish Oil", term: "ON Fish Oil" },
    { title: "Ultimate Nutrition Prostar", term: "Ultimate Nutrition Whey" },
    { title: "Dymatize ISO100", term: "Dymatize ISO100" },
    { title: "BSN N.O.-Xplode", term: "BSN NO Xplode" },
    { title: "Serious Mass Weight Gainer", term: "Serious Mass" },
    { title: "Labrada Muscle Mass Gainer", term: "Labrada Mass Gainer" },
    { title: "MuscleTech Platinum Creatine", term: "MuscleTech Creatine" },
    { title: "Universal Animal Pak", term: "Animal Pak Multivitamin" },
    { title: "BPI Sports Best BCAA", term: "BPI Sports BCAA" },
    { title: "Rule 1 Protein", term: "Rule 1 Whey Protein" },
    {
      title: "Myprotein Alpha Men Multivitamin",
      term: "Alpha Men Multivitamin",
    },
    { title: "MuscleBlaze Biozyme Whey", term: "MB Biozyme Whey" },
    { title: "GNC Pro Performance Whey", term: "GNC Whey Protein" },
    { title: "MuscleTech Hydroxycut", term: "Hydroxycut" },
    { title: "Cellucor Cor-Performance Creatine", term: "Cellucor Creatine" },
    {
      title: "Optimum Nutrition Gold Standard Pre-Workout",
      term: "ON Pre Workout",
    },
  ],
  antiseptic: [
    { title: "Dettol Antiseptic Liquid", term: "Dettol Liquid" },
    { title: "Savlon Antiseptic Liquid", term: "Savlon Liquid" },
    { title: "Betadine Solution", term: "Betadine Solution" },
    { title: "Betadine Ointment", term: "Betadine Ointment" },
    { title: "Dettol Hand Sanitizer", term: "Dettol Sanitizer" },
    { title: "Savlon Hand Sanitizer", term: "Savlon Sanitizer" },
    { title: "Lifebuoy Hand Sanitizer", term: "Lifebuoy Sanitizer" },
    { title: "Dettol Soap Original", term: "Dettol Soap" },
    { title: "Savlon Soap Regular", term: "Savlon Soap" },
    { title: "Dettol Skincare Soap", term: "Dettol Skincare Soap" },
    { title: "Dettol Cool Soap", term: "Dettol Cool Soap" },
    { title: "Dettol Liquid Handwash", term: "Dettol Handwash" },
    { title: "Savlon Liquid Handwash", term: "Savlon Handwash" },
    { title: "Himalaya PureHands Sanitizer", term: "Himalaya Sanitizer" },
    { title: "Sterillium Rub", term: "Sterillium Rub" },
    { title: "Dettol Disinfectant Spray", term: "Dettol Spray" },
    { title: "Savlon Disinfectant Spray", term: "Savlon Spray" },
    { title: "Hydrogen Peroxide", term: "Hydrogen Peroxide Solution" },
    { title: "Surgical Spirit", term: "Surgical Spirit" },
    { title: "Cotton Roll", term: "Surgical Cotton Roll" },
    { title: "Hansaplast Bandage", term: "Hansaplast Bandage" },
    { title: "Band-Aid Washproof", term: "Band Aid" },
    { title: "Dettol Plaster", term: "Dettol Plaster" },
    { title: "Savlon Plaster", term: "Savlon Plaster" },
    { title: "Cipla Omni Gel", term: "Omni Gel" },
    { title: "Volini Gel", term: "Volini Gel" },
    { title: "Moov Ointment", term: "Moov Ointment" },
    { title: "Iodex Ointment", term: "Iodex Ointment" },
    { title: "Soframycin Cream", term: "Soframycin Cream" },
    { title: "Neosporin Powder", term: "Neosporin Powder" },
    { title: "T-Bact Ointment", term: "T-Bact Ointment" },
    { title: "Silverex Ionic Gel", term: "Silverex Gel" },
    { title: "Burnol Cream", term: "Burnol" },
    { title: "Boroline Cream", term: "Boroline" },
    { title: "BoroPlus Cream", term: "BoroPlus" },
    { title: "Himalaya Antiseptic Cream", term: "Himalaya Antiseptic" },
    { title: "Betadine Gargle", term: "Betadine Gargle" },
    { title: "Listerine Mouthwash", term: "Listerine Mouthwash" },
    { title: "Hexidine Mouthwash", term: "Hexidine" },
    { title: "Potassium Permanganate", term: "Potassium Permanganate" },
  ],
};

const downloadImg = (url, filepath, redirects = 0) => {
  return new Promise((resolve) => {
    if (redirects > 3) return resolve(false);

    let timeout = setTimeout(() => resolve(false), 5000);
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
          if (!contentType || !contentType.startsWith("image/"))
            return resolve(false);

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

const ASSET_DIR = path.join(__dirname, "assets", "pharma");
if (!fs.existsSync(ASSET_DIR)) {
  fs.mkdirSync(ASSET_DIR, { recursive: true });
}

// Ensure the folder is clean
fs.readdirSync(ASSET_DIR).forEach((f) =>
  fs.unlinkSync(path.join(ASSET_DIR, f)),
);

async function generateActualImages() {
  const finalCategories = {
    "adult-diapers": [],
    "health-wellness": [],
    "protein-workout": [],
    antiseptic: [],
  };

  for (const cat of categories) {
    let validCount = 0;
    let ptId = 1;
    let templateIdx = 0;
    const categoryTemplates = templates[cat];

    while (validCount < 25) {
      // Loop templates if we run out
      const tmpl = categoryTemplates[templateIdx % categoryTemplates.length];

      const filename = `${cat}_${ptId}.jpg`;
      const filepath = path.join(ASSET_DIR, filename);

      const query = tmpl.term + " product high quality packaging";
      console.log(`Searching for [${validCount + 1}/25] in ${cat}... ${query}`);

      try {
        const images = await google.image(query, { safe: false });
        let downloaded = false;

        const tries = Math.min(5, images.length);
        for (let i = 0; i < tries; i++) {
          const imgUrl = images[i].url;
          if (!imgUrl) continue;

          try {
            const success = await downloadImg(imgUrl, filepath);
            if (success) {
              const stats = fs.statSync(filepath);
              // Image must be > 15KB to be considered a real product image usually
              if (stats.size > 15000) {
                downloaded = true;
                break;
              } else {
                fs.unlinkSync(filepath);
              }
            }
          } catch (e) {
            if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          }
        }

        if (downloaded) {
          finalCategories[cat].push({
            id: `${cat}_${ptId}`,
            title: tmpl.title,
            weight: cat === "adult-diapers" ? "10 pcs" : "200 g",
            price: Math.floor(Math.random() * 300) + 100,
            originalPrice: Math.floor(Math.random() * 300) + 400,
            discount: Math.floor(Math.random() * 15) + 1 + "%",
            searchTerm: tmpl.term,
            imageFile: filename,
            imagePath: `./assets/pharma/${filename}`,
          });
          validCount++;
          ptId++;
          console.log(`✅ Kept: ${tmpl.term} (${validCount}/25)`);
        } else {
          console.log(`❌ Dropped (No valid image): ${tmpl.term}`);
        }
      } catch (err) {
        console.log(`❌ Dropped (API err): ${tmpl.term}`);
      }

      templateIdx++;
    }
  }

  console.log(`Finished downloading Pharma images!`);

  let outputStr = "";
  for (const cat in finalCategories) {
    finalCategories[cat].forEach((p) => {
      outputStr += `import img_${p.id.replace(/-/g, "_")} from '${p.imagePath}';\n`;
    });
  }

  outputStr += "\nexport const PHARMA_PRODUCTS_BY_CATEGORY = {\n";
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
    path.join(__dirname, "pharma_data_loc.jsx"),
    outputStr,
    "utf8",
  );
  console.log("Rewrote pharma_data_loc.jsx with 25 items per category.");
}

generateActualImages();

// fetchImages.js
const fs = require("fs");
const https = require("https");

const categories = {
  "adult-diapers": [
    {
      id: "ad1",
      title: "CIR Premium Adult\nDiaper Pants, XL",
      searchTerm: "adult diapers",
    },
    {
      id: "ad2",
      title: "Kare In Classic\nUnderpad - L",
      searchTerm: "underpad",
    },
    {
      id: "ad3",
      title: "Kare In Classic Adult\nDiaper Pants, M",
      searchTerm: "adult diapers",
    },
    {
      id: "ad4",
      title: "B-FIT Adult Diaper\nPant Style (M)",
      searchTerm: "diaper adult",
    },
    {
      id: "ad5",
      title: "CIR Premium Adult\nDiaper Pants, M",
      searchTerm: "adult diapers",
    },
    { id: "ad6", title: "Kare In Bed Wipes", searchTerm: "bed wipes" },
    {
      id: "ad7",
      title: "B-FIT Adult Diaper\nPant Style (XL)",
      searchTerm: "diaper adult",
    },
    {
      id: "ad8",
      title: "Friends Classic Adult\nDiaper Pants",
      searchTerm: "senior diapers",
    },
    {
      id: "ad9",
      title: "Lifree Extra Absorb\nPants, L",
      searchTerm: "lifree diapers",
    },
    {
      id: "ad10",
      title: "Lifree Extra Absorb\nPants, M",
      searchTerm: "lifree diapers",
    },
    {
      id: "ad11",
      title: "Lifree Extra Absorb\nPants, XL",
      searchTerm: "lifree diapers",
    },
    {
      id: "ad12",
      title: "Friends Premium Adult\nDiapers, L",
      searchTerm: "friends diapers",
    },
    {
      id: "ad13",
      title: "Friends Premium Adult\nDiapers, XL",
      searchTerm: "friends diapers",
    },
    {
      id: "ad14",
      title: "Dignity Premium Adult\nDiapers, M",
      searchTerm: "adult diapers",
    },
    {
      id: "ad15",
      title: "Dignity Premium Adult\nDiapers, L",
      searchTerm: "adult diapers",
    },
    {
      id: "ad16",
      title: "Dignity Premium Adult\nDiapers, XL",
      searchTerm: "adult diapers",
    },
    {
      id: "ad17",
      title: "Senso Adult Diaper\nPants, M",
      searchTerm: "adult diapers",
    },
    {
      id: "ad18",
      title: "Senso Adult Diaper\nPants, L",
      searchTerm: "adult diapers",
    },
    {
      id: "ad19",
      title: "Senso Adult Diaper\nPants, XL",
      searchTerm: "adult diapers",
    },
    {
      id: "ad20",
      title: "Wet Wipes Adult\nLarge",
      searchTerm: "adult wet wipes",
    },
    {
      id: "ad21",
      title: "Kare In Adult Diaper\nTape Style, M",
      searchTerm: "tape diapers",
    },
    {
      id: "ad22",
      title: "Kare In Adult Diaper\nTape Style, L",
      searchTerm: "tape diapers",
    },
    {
      id: "ad23",
      title: "Friends Easy Adult\nDiapers, M",
      searchTerm: "friends diapers",
    },
    {
      id: "ad24",
      title: "Friends Easy Adult\nDiapers, L",
      searchTerm: "friends diapers",
    },
    {
      id: "ad25",
      title: "Friends Easy Adult\nDiapers, XL",
      searchTerm: "friends diapers",
    },
  ],
  "health-wellness": [
    { id: "hw1", title: "Dabur Chyawanprash", searchTerm: "chyawanprash" },
    { id: "hw2", title: "Zandu Balm", searchTerm: "balm" },
    { id: "hw3", title: "Vicks VapoRub", searchTerm: "vicks" },
    { id: "hw4", title: "Volini Pain Relief\nSpray", searchTerm: "pain spray" },
    { id: "hw5", title: "Moov Pain Relief\nCream", searchTerm: "pain cream" },
    { id: "hw6", title: "Iodex Balm", searchTerm: "iodex" },
    { id: "hw7", title: "Amrutanjan Roll On", searchTerm: "roll on" },
    { id: "hw8", title: "ENO Lemon", searchTerm: "eno" },
    { id: "hw9", title: "ENO Regular", searchTerm: "eno" },
    { id: "hw10", title: "Pudin Hara Pearls", searchTerm: "pudin hara" },
    { id: "hw11", title: "Hajmola Regular", searchTerm: "hajmola" },
    { id: "hw12", title: "Hajmola Imli", searchTerm: "hajmola" },
    { id: "hw13", title: "Revital H Capsules", searchTerm: "revital" },
    {
      id: "hw14",
      title: "Supradyn Daily\nMultivitamin",
      searchTerm: "multivitamin",
    },
    { id: "hw15", title: "Becosules Capsules", searchTerm: "vitamins" },
    { id: "hw16", title: "Shelcal 500", searchTerm: "calcium tablets" },
    { id: "hw17", title: "Neurobion Forte", searchTerm: "vitamin tablets" },
    { id: "hw18", title: "Liv52 Drops", searchTerm: "liver drops" },
    { id: "hw19", title: "Himalaya Ashvagandha", searchTerm: "ashvagandha" },
    { id: "hw20", title: "Himalaya Neem", searchTerm: "neem tablets" },
    { id: "hw21", title: "Himalaya Triphala", searchTerm: "triphala" },
    { id: "hw22", title: "Vicks Cough Drops", searchTerm: "vicks" },
    { id: "hw23", title: "Strepsils Honey &\nLemon", searchTerm: "strepsils" },
    { id: "hw24", title: "Strepsils Orange", searchTerm: "strepsils" },
    { id: "hw25", title: "Koflet Lozenges", searchTerm: "koflet" },
  ],
  "protein-workout": [
    {
      id: "pw1",
      title: "Optimum Nutrition\nWhey Protein",
      searchTerm: "whey protein",
    },
    {
      id: "pw2",
      title: "MuscleBlaze Whey\nProtein",
      searchTerm: "whey protein",
    },
    { id: "pw3", title: "As It Is Whey\nProtein", searchTerm: "whey protein" },
    { id: "pw4", title: "MuscleTech NitroTech", searchTerm: "whey protein" },
    { id: "pw5", title: "Myprotein Impact\nWhey", searchTerm: "whey protein" },
    { id: "pw6", title: "Dymatize Elite Whey", searchTerm: "whey protein" },
    { id: "pw7", title: "Isopure Zero Carb", searchTerm: "whey protein" },
    { id: "pw8", title: "BSN Syntha-6", searchTerm: "whey protein" },
    { id: "pw9", title: "Cellucor C4 Pre\nWorkout", searchTerm: "pre workout" },
    {
      id: "pw10",
      title: "MuscleBlaze Pre\nWorkout",
      searchTerm: "pre workout",
    },
    { id: "pw11", title: "ON Amino Energy", searchTerm: "bcaa" },
    { id: "pw12", title: "XTEND BCAA", searchTerm: "bcaa" },
    { id: "pw13", title: "MB BCAA", searchTerm: "bcaa" },
    { id: "pw14", title: "MusclePharm Assault", searchTerm: "pre workout" },
    {
      id: "pw15",
      title: "Optimum Nutrition\nCreatine",
      searchTerm: "creatine",
    },
    { id: "pw16", title: "MuscleBlaze Creatine", searchTerm: "creatine" },
    {
      id: "pw17",
      title: "GNC Pro Performance\nCreatine",
      searchTerm: "creatine",
    },
    { id: "pw18", title: "Fast&Up Reload\nHydration", searchTerm: "hydration" },
    { id: "pw19", title: "Fast&Up BCAA", searchTerm: "bcaa" },
    { id: "pw20", title: "Ritebite Protein Bar", searchTerm: "protein bar" },
    { id: "pw21", title: "Yoga Bar Protein Bar", searchTerm: "protein bar" },
    { id: "pw22", title: "Phitzee Protein Bar", searchTerm: "protein bar" },
    { id: "pw23", title: "GNC Multivitamin", searchTerm: "multivitamin" },
    { id: "pw24", title: "MuscleBlaze Fish Oil", searchTerm: "fish oil" },
    { id: "pw25", title: "ON Fish Oil", searchTerm: "fish oil" },
  ],
  antiseptic: [
    {
      id: "an1",
      title: "Dettol Antiseptic\nLiquid",
      searchTerm: "dettol liquid",
    },
    {
      id: "an2",
      title: "Savlon Antiseptic\nLiquid",
      searchTerm: "savlon liquid",
    },
    { id: "an3", title: "Betadine Solution", searchTerm: "betadine" },
    { id: "an4", title: "Betadine Ointment", searchTerm: "betadine" },
    { id: "an5", title: "Dettol Hand Sanitizer", searchTerm: "hand sanitizer" },
    { id: "an6", title: "Savlon Hand Sanitizer", searchTerm: "hand sanitizer" },
    {
      id: "an7",
      title: "Lifebuoy Hand\nSanitizer",
      searchTerm: "hand sanitizer",
    },
    { id: "an8", title: "Dettol Soap Original", searchTerm: "dettol soap" },
    { id: "an9", title: "Savlon Soap Regular", searchTerm: "savlon soap" },
    { id: "an10", title: "Dettol Skincare Soap", searchTerm: "dettol soap" },
    { id: "an11", title: "Dettol Cool Soap", searchTerm: "dettol soap" },
    {
      id: "an12",
      title: "Dettol Liquid\nHandwash",
      searchTerm: "dettol handwash",
    },
    {
      id: "an13",
      title: "Savlon Liquid\nHandwash",
      searchTerm: "savlon handwash",
    },
    {
      id: "an14",
      title: "Himalaya PureHands\nSanitizer",
      searchTerm: "hand sanitizer",
    },
    { id: "an15", title: "Sterillium Rub", searchTerm: "hand rub" },
    {
      id: "an16",
      title: "Dettol Disinfectant\nSpray",
      searchTerm: "disinfectant spray",
    },
    {
      id: "an17",
      title: "Savlon Disinfectant\nSpray",
      searchTerm: "disinfectant spray",
    },
    { id: "an18", title: "Hydrogen Peroxide", searchTerm: "hydrogen peroxide" },
    { id: "an19", title: "Surgical Spirit", searchTerm: "surgical spirit" },
    { id: "an20", title: "Cotton Roll", searchTerm: "surgical cotton" },
    { id: "an21", title: "Hansaplast Bandage", searchTerm: "bandage" },
    { id: "an22", title: "Band-Aid Washproof", searchTerm: "bandage" },
    { id: "an23", title: "Dettol Plaster", searchTerm: "plaster" },
    { id: "an24", title: "Savlon Plaster", searchTerm: "plaster" },
    { id: "an25", title: "Cipla Omni Gel", searchTerm: "omni gel" },
  ],
};

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

async function run() {
  let output = {};
  for (const [cat, prods] of Object.entries(categories)) {
    console.log(`Processing ${cat}...`);
    output[cat] = [];

    for (const prod of prods) {
      let imgUrl = null;
      try {
        const query = prod.searchTerm + " medical pharmacy";
        imgUrl = await fetchFromUnsplash(query);
        if (!imgUrl) {
          imgUrl = `https://placehold.co/150x150?text=${encodeURIComponent(prod.title.split("\n")[0])}`;
        }
      } catch (e) {
        console.error("API Error or limits reached.", e.message);
        imgUrl = `https://placehold.co/150x150?text=${encodeURIComponent(prod.title.split("\n")[0])}`;
      }
      output[cat].push({ ...prod, image: imgUrl });
      await new Promise((r) => setTimeout(r, 600)); // Sleep nicely to avoid 403s
    }
  }

  fs.writeFileSync("pharma_images.json", JSON.stringify(output, null, 2));
  console.log("Done! Wrote to pharma_images.json");
}

run();

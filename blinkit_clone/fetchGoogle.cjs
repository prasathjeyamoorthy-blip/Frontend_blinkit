const google = require("googlethis");
const fs = require("fs");

const categories = {
  "adult-diapers": [
    {
      id: "ad1",
      title: "CIR Premium Adult\nDiaper Pants, XL",
      searchTerm: "CIR Premium Adult Diaper Pants",
    },
    {
      id: "ad2",
      title: "Kare In Classic\nUnderpad - L",
      searchTerm: "Kare In Classic Underpad",
    },
    {
      id: "ad3",
      title: "Kare In Classic Adult\nDiaper Pants, M",
      searchTerm: "Kare In Classic Adult Diaper Pants",
    },
    {
      id: "ad4",
      title: "B-FIT Adult Diaper\nPant Style (M)",
      searchTerm: "B-FIT Adult Diaper Pant Style",
    },
    {
      id: "ad5",
      title: "CIR Premium Adult\nDiaper Pants, M",
      searchTerm: "CIR Premium Adult Diaper Pants",
    },
    { id: "ad6", title: "Kare In Bed Wipes", searchTerm: "Kare In Bed Wipes" },
    {
      id: "ad7",
      title: "B-FIT Adult Diaper\nPant Style (XL)",
      searchTerm: "B-FIT Adult Diaper Pant Style",
    },
    {
      id: "ad8",
      title: "Friends Classic Adult\nDiaper Pants",
      searchTerm: "Friends Classic Adult Diaper Pants",
    },
    {
      id: "ad9",
      title: "Lifree Extra Absorb\nPants, L",
      searchTerm: "Lifree Extra Absorb Pants",
    },
    {
      id: "ad10",
      title: "Lifree Extra Absorb\nPants, M",
      searchTerm: "Lifree Extra Absorb Pants",
    },
    {
      id: "ad11",
      title: "Lifree Extra Absorb\nPants, XL",
      searchTerm: "Lifree Extra Absorb Pants",
    },
    {
      id: "ad12",
      title: "Friends Premium Adult\nDiapers, L",
      searchTerm: "Friends Premium Adult Diapers",
    },
    {
      id: "ad13",
      title: "Friends Premium Adult\nDiapers, XL",
      searchTerm: "Friends Premium Adult Diapers",
    },
    {
      id: "ad14",
      title: "Dignity Premium Adult\nDiapers, M",
      searchTerm: "Dignity Premium Adult Diapers",
    },
    {
      id: "ad15",
      title: "Dignity Premium Adult\nDiapers, L",
      searchTerm: "Dignity Premium Adult Diapers",
    },
    {
      id: "ad16",
      title: "Dignity Premium Adult\nDiapers, XL",
      searchTerm: "Dignity Premium Adult Diapers",
    },
    {
      id: "ad17",
      title: "Senso Adult Diaper\nPants, M",
      searchTerm: "Senso Adult Diaper Pants",
    },
    {
      id: "ad18",
      title: "Senso Adult Diaper\nPants, L",
      searchTerm: "Senso Adult Diaper Pants",
    },
    {
      id: "ad19",
      title: "Senso Adult Diaper\nPants, XL",
      searchTerm: "Senso Adult Diaper Pants",
    },
    {
      id: "ad20",
      title: "Wet Wipes Adult\nLarge",
      searchTerm: "Wet Wipes Adult Large",
    },
    {
      id: "ad21",
      title: "Kare In Adult Diaper\nTape Style, M",
      searchTerm: "Kare In Adult Diaper Tape Style",
    },
    {
      id: "ad22",
      title: "Kare In Adult Diaper\nTape Style, L",
      searchTerm: "Kare In Adult Diaper Tape Style",
    },
    {
      id: "ad23",
      title: "Friends Easy Adult\nDiapers, M",
      searchTerm: "Friends Easy Adult Diapers",
    },
    {
      id: "ad24",
      title: "Friends Easy Adult\nDiapers, L",
      searchTerm: "Friends Easy Adult Diapers",
    },
    {
      id: "ad25",
      title: "Friends Easy Adult\nDiapers, XL",
      searchTerm: "Friends Easy Adult Diapers",
    },
  ],
  "health-wellness": [
    {
      id: "hw1",
      title: "Dabur Chyawanprash",
      searchTerm: "Dabur Chyawanprash",
    },
    { id: "hw2", title: "Zandu Balm", searchTerm: "Zandu Balm" },
    { id: "hw3", title: "Vicks VapoRub", searchTerm: "Vicks VapoRub" },
    {
      id: "hw4",
      title: "Volini Pain Relief\nSpray",
      searchTerm: "Volini Pain Relief Spray",
    },
    {
      id: "hw5",
      title: "Moov Pain Relief\nCream",
      searchTerm: "Moov Pain Relief Cream",
    },
    { id: "hw6", title: "Iodex Balm", searchTerm: "Iodex Balm" },
    {
      id: "hw7",
      title: "Amrutanjan Roll On",
      searchTerm: "Amrutanjan Roll On",
    },
    { id: "hw8", title: "ENO Lemon", searchTerm: "ENO Lemon" },
    { id: "hw9", title: "ENO Regular", searchTerm: "ENO Regular" },
    { id: "hw10", title: "Pudin Hara Pearls", searchTerm: "Pudin Hara Pearls" },
    { id: "hw11", title: "Hajmola Regular", searchTerm: "Hajmola Regular" },
    { id: "hw12", title: "Hajmola Imli", searchTerm: "Hajmola Imli" },
    {
      id: "hw13",
      title: "Revital H Capsules",
      searchTerm: "Revital H Capsules",
    },
    {
      id: "hw14",
      title: "Supradyn Daily\nMultivitamin",
      searchTerm: "Supradyn Daily Multivitamin",
    },
    {
      id: "hw15",
      title: "Becosules Capsules",
      searchTerm: "Becosules Capsules",
    },
    { id: "hw16", title: "Shelcal 500", searchTerm: "Shelcal 500" },
    { id: "hw17", title: "Neurobion Forte", searchTerm: "Neurobion Forte" },
    { id: "hw18", title: "Liv52 Drops", searchTerm: "Liv52 Drops" },
    {
      id: "hw19",
      title: "Himalaya Ashvagandha",
      searchTerm: "Himalaya Ashvagandha",
    },
    { id: "hw20", title: "Himalaya Neem", searchTerm: "Himalaya Neem" },
    { id: "hw21", title: "Himalaya Triphala", searchTerm: "Himalaya Triphala" },
    { id: "hw22", title: "Vicks Cough Drops", searchTerm: "Vicks Cough Drops" },
    {
      id: "hw23",
      title: "Strepsils Honey &\nLemon",
      searchTerm: "Strepsils Honey Lemon",
    },
    { id: "hw24", title: "Strepsils Orange", searchTerm: "Strepsils Orange" },
    { id: "hw25", title: "Koflet Lozenges", searchTerm: "Koflet Lozenges" },
  ],
  "protein-workout": [
    {
      id: "pw1",
      title: "Optimum Nutrition\nWhey Protein",
      searchTerm: "Optimum Nutrition Whey Protein",
    },
    {
      id: "pw2",
      title: "MuscleBlaze Whey\nProtein",
      searchTerm: "MuscleBlaze Whey Protein",
    },
    {
      id: "pw3",
      title: "As It Is Whey\nProtein",
      searchTerm: "As It Is Whey Protein",
    },
    {
      id: "pw4",
      title: "MuscleTech NitroTech",
      searchTerm: "MuscleTech NitroTech",
    },
    {
      id: "pw5",
      title: "Myprotein Impact\nWhey",
      searchTerm: "Myprotein Impact Whey",
    },
    {
      id: "pw6",
      title: "Dymatize Elite Whey",
      searchTerm: "Dymatize Elite Whey",
    },
    { id: "pw7", title: "Isopure Zero Carb", searchTerm: "Isopure Zero Carb" },
    { id: "pw8", title: "BSN Syntha-6", searchTerm: "BSN Syntha-6" },
    {
      id: "pw9",
      title: "Cellucor C4 Pre\nWorkout",
      searchTerm: "Cellucor C4 Pre Workout",
    },
    {
      id: "pw10",
      title: "MuscleBlaze Pre\nWorkout",
      searchTerm: "MuscleBlaze Pre Workout",
    },
    { id: "pw11", title: "ON Amino Energy", searchTerm: "ON Amino Energy" },
    { id: "pw12", title: "XTEND BCAA", searchTerm: "XTEND BCAA" },
    { id: "pw13", title: "MB BCAA", searchTerm: "MB BCAA" },
    {
      id: "pw14",
      title: "MusclePharm Assault",
      searchTerm: "MusclePharm Assault",
    },
    {
      id: "pw15",
      title: "Optimum Nutrition\nCreatine",
      searchTerm: "Optimum Nutrition Creatine",
    },
    {
      id: "pw16",
      title: "MuscleBlaze Creatine",
      searchTerm: "MuscleBlaze Creatine",
    },
    {
      id: "pw17",
      title: "GNC Pro Performance\nCreatine",
      searchTerm: "GNC Pro Performance Creatine",
    },
    {
      id: "pw18",
      title: "Fast&Up Reload\nHydration",
      searchTerm: "Fast&Up Reload Hydration",
    },
    { id: "pw19", title: "Fast&Up BCAA", searchTerm: "Fast&Up BCAA" },
    {
      id: "pw20",
      title: "Ritebite Protein Bar",
      searchTerm: "Ritebite Protein Bar",
    },
    {
      id: "pw21",
      title: "Yoga Bar Protein Bar",
      searchTerm: "Yoga Bar Protein Bar",
    },
    {
      id: "pw22",
      title: "Phitzee Protein Bar",
      searchTerm: "Phitzee Protein Bar",
    },
    { id: "pw23", title: "GNC Multivitamin", searchTerm: "GNC Multivitamin" },
    {
      id: "pw24",
      title: "MuscleBlaze Fish Oil",
      searchTerm: "MuscleBlaze Fish Oil",
    },
    { id: "pw25", title: "ON Fish Oil", searchTerm: "ON Fish Oil" },
  ],
  antiseptic: [
    {
      id: "an1",
      title: "Dettol Antiseptic\nLiquid",
      searchTerm: "Dettol Antiseptic Liquid",
    },
    {
      id: "an2",
      title: "Savlon Antiseptic\nLiquid",
      searchTerm: "Savlon Antiseptic Liquid",
    },
    { id: "an3", title: "Betadine Solution", searchTerm: "Betadine Solution" },
    { id: "an4", title: "Betadine Ointment", searchTerm: "Betadine Ointment" },
    {
      id: "an5",
      title: "Dettol Hand Sanitizer",
      searchTerm: "Dettol Hand Sanitizer",
    },
    {
      id: "an6",
      title: "Savlon Hand Sanitizer",
      searchTerm: "Savlon Hand Sanitizer",
    },
    {
      id: "an7",
      title: "Lifebuoy Hand\nSanitizer",
      searchTerm: "Lifebuoy Hand Sanitizer",
    },
    {
      id: "an8",
      title: "Dettol Soap Original",
      searchTerm: "Dettol Soap Original",
    },
    {
      id: "an9",
      title: "Savlon Soap Regular",
      searchTerm: "Savlon Soap Regular",
    },
    {
      id: "an10",
      title: "Dettol Skincare Soap",
      searchTerm: "Dettol Skincare Soap",
    },
    { id: "an11", title: "Dettol Cool Soap", searchTerm: "Dettol Cool Soap" },
    {
      id: "an12",
      title: "Dettol Liquid\nHandwash",
      searchTerm: "Dettol Liquid Handwash",
    },
    {
      id: "an13",
      title: "Savlon Liquid\nHandwash",
      searchTerm: "Savlon Liquid Handwash",
    },
    {
      id: "an14",
      title: "Himalaya PureHands\nSanitizer",
      searchTerm: "Himalaya PureHands Sanitizer",
    },
    { id: "an15", title: "Sterillium Rub", searchTerm: "Sterillium Rub" },
    {
      id: "an16",
      title: "Dettol Disinfectant\nSpray",
      searchTerm: "Dettol Disinfectant Spray",
    },
    {
      id: "an17",
      title: "Savlon Disinfectant\nSpray",
      searchTerm: "Savlon Disinfectant Spray",
    },
    {
      id: "an18",
      title: "Hydrogen Peroxide",
      searchTerm: "Hydrogen Peroxide bottle",
    },
    {
      id: "an19",
      title: "Surgical Spirit",
      searchTerm: "Surgical Spirit bottle",
    },
    { id: "an20", title: "Cotton Roll", searchTerm: "medical Cotton Roll" },
    {
      id: "an21",
      title: "Hansaplast Bandage",
      searchTerm: "Hansaplast Bandage",
    },
    {
      id: "an22",
      title: "Band-Aid Washproof",
      searchTerm: "Band-Aid Washproof",
    },
    { id: "an23", title: "Dettol Plaster", searchTerm: "Dettol Plaster" },
    { id: "an24", title: "Savlon Plaster", searchTerm: "Savlon Plaster" },
    { id: "an25", title: "Cipla Omni Gel", searchTerm: "Cipla Omni Gel" },
  ],
};

async function run() {
  let output = {};
  const options = { page: 0, safe: false, additional_params: { hl: "en" } };

  for (const [cat, prods] of Object.entries(categories)) {
    console.log(`Processing ${cat}...`);
    output[cat] = [];

    for (const prod of prods) {
      let imgUrl = null;
      try {
        const response = await google.image(prod.searchTerm, options);
        if (response && response.length > 0) {
          imgUrl = response[0].url;
        } else {
          imgUrl = `https://placehold.co/150x150?text=${encodeURIComponent(prod.title.split("\n")[0])}`;
        }
      } catch (e) {
        console.error("API Error or limits reached.", e.message);
        imgUrl = `https://placehold.co/150x150?text=${encodeURIComponent(prod.title.split("\n")[0])}`;
      }

      output[cat].push({
        id: prod.id,
        title: prod.title,
        searchTerm: prod.searchTerm,
        image: imgUrl,
      });
      // Sleep slightly to avoid being banned by Google
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  fs.writeFileSync("pharma_images.json", JSON.stringify(output, null, 2));
  console.log("Done! Wrote to pharma_images.json");
}

run();

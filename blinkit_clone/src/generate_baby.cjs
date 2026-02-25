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
      weight: "70 pcs",
      term: "Huggies Diaper",
    },
    {
      title: "Huggies Comfy Pant Style Baby Diaper (XL)",
      weight: "24 pcs",
      term: "Huggies Pant Diaper",
    },
    {
      title: "Little's Fluffy Soft Pant Style Baby Diaper (XL)",
      weight: "24 pcs",
      term: "Little's Diaper",
    },
    {
      title: "Pampers Premium Care Pant Style Baby Diap...",
      weight: "36 pcs",
      term: "Pampers Premium Diaper",
    },
    {
      title: "Huggies Natural Soft Pant Style Baby Diap...",
      weight: "60 pcs",
      term: "Huggies Natural Diaper",
    },
    {
      title: "Little's Fluffy Soft Pant Style Baby Diaper...",
      weight: "22 pcs",
      term: "Little's Soft Diaper",
    },
    {
      title: "Huggies Complete Comfort Pant Style Diap...",
      weight: "24 pcs",
      term: "Huggies Complete Diaper",
    },
    {
      title: "Pampers Aloe Vera Pant Style Baby Diapers...",
      weight: "56 pcs",
      term: "Pampers Aloe Diaper",
    },
    {
      title: "Huggies Natural Soft Tape Style Baby Dia...",
      weight: "22 pcs",
      term: "Huggies Tape Diaper",
    },
    {
      title: "Pampers Premium Care Pant Style Baby Diap...",
      weight: "34 pcs",
      term: "Pampers Premium Care",
    },
    {
      title: "Pampers Aloe Vera Pant Style Baby Diaper...",
      weight: "42 pcs",
      term: "Pampers Pant Diaper",
    },
    {
      title: "LuvLap Baby Diaper Pant Style (M)",
      weight: "62 pcs",
      term: "LuvLap Diaper",
    },
    {
      title: "MamyPoko Pants Extra Absorb Baby Diaper...",
      weight: "40 pcs",
      term: "MamyPoko Pants",
    },
    {
      title: "Himalaya Total Care Baby Pants Diaper...",
      weight: "54 pcs",
      term: "Himalaya Diaper",
    },
    {
      title: "SuperBottoms Freesize Cloth Diaper",
      weight: "1 pc",
      term: "Cloth Diaper",
    },
    {
      title: "Pampers Active Baby Taped Diaper (L)",
      weight: "50 pcs",
      term: "Pampers Taped Diaper",
    },
    {
      title: "MamyPoko Pants Standard Diaper (L)",
      weight: "34 pcs",
      term: "MamyPoko Standard",
    },
    {
      title: "Bumtum Baby Diaper Pants (M)",
      weight: "72 pcs",
      term: "Bumtum Diaper",
    },
    {
      title: "Huggies Dry Pants (M)",
      weight: "44 pcs",
      term: "Huggies Dry Pants",
    },
    {
      title: "Snuggy Baby Diapers Pant Style (L)",
      weight: "46 pcs",
      term: "Snuggy Diaper",
    },
    {
      title: "Little Angel Baby Diaper Pants (XL)",
      weight: "32 pcs",
      term: "Little Angel Diaper",
    },
    {
      title: "Advance Baby Cloth Diaper Inserts",
      weight: "5 pcs",
      term: "Diaper Inserts",
    },
    {
      title: "Pampers Night Pants Diaper (L)",
      weight: "28 pcs",
      term: "Pampers Night Diaper",
    },
    {
      title: "Mee Mee Breathable Baby Diapers",
      weight: "24 pcs",
      term: "Mee Mee Diaper",
    },
    {
      title: "Bella Baby Happy Diapers (Maxi)",
      weight: "54 pcs",
      term: "Bella Baby Diaper",
    },
  ],
  "bathing-needs": [
    {
      title: "Himalaya Gentle Baby Bath",
      weight: "400 ml",
      term: "Himalaya Baby Bath",
    },
    {
      title: "Johnson's Baby Bath",
      weight: "500 ml",
      term: "Johnsons Baby Bath",
    },
    {
      title: "Sebamed Baby Wash Extra Soft",
      weight: "200 ml",
      term: "Sebamed Baby Wash",
    },
    {
      title: "Moms Co. Natural Baby Wash",
      weight: "200 ml",
      term: "Moms Co Baby Wash",
    },
    {
      title: "Cetaphil Baby Wash & Shampoo",
      weight: "400 ml",
      term: "Cetaphil Baby Wash",
    },
    {
      title: "Mamaearth Deeply Nourishing Body Wash",
      weight: "400 ml",
      term: "Mamaearth Baby Wash",
    },
    {
      title: "Baby Dove Rich Moisture Hair to Toe Wash",
      weight: "400 ml",
      term: "Baby Dove Wash",
    },
    {
      title: "Little's Organix Gentle Baby Wash",
      weight: "200 ml",
      term: "Little's Baby Wash",
    },
    {
      title: "Chicco Gentle Body Wash and Shampoo",
      weight: "200 ml",
      term: "Chicco Body Wash",
    },
    {
      title: "Aveeno Baby Daily Moisturizing Bath",
      weight: "236 ml",
      term: "Aveeno Baby Bath",
    },
    {
      title: "Spoo Gentle Baby Bath",
      weight: "125 ml",
      term: "Spoo Baby Wash",
    },
    {
      title: "Mothercare All We Know Baby Bath",
      weight: "300 ml",
      term: "Mothercare Bath",
    },
    {
      title: "Pigeon Liquid Soap for Baby",
      weight: "200 ml",
      term: "Pigeon Baby Soap",
    },
    {
      title: "Biotique Bio Green Apple Baby Wash",
      weight: "190 ml",
      term: "Biotique Baby Wash",
    },
    {
      title: "Mee Mee Mild Baby Liquid Bathing Soap",
      weight: "500 ml",
      term: "Mee Mee Baby Bath",
    },
    {
      title: "Goodnessme Certified Organic Baby Wash",
      weight: "200 ml",
      term: "Organic Baby Wash",
    },
    {
      title: "Himalaya Extra Moisturizing Baby Wash",
      weight: "200 ml",
      term: "Himalaya Wash",
    },
    { title: "Atogla Baby Wash", weight: "250 ml", term: "Atogla Wash" },
    {
      title: "SebaMed Baby Cleansing Bar",
      weight: "100 g",
      term: "Sebamed Soap",
    },
    {
      title: "Himalaya Gentle Baby Soap",
      weight: "75 g",
      term: "Himalaya Soap",
    },
    {
      title: "Johnson's Baby Soap Original",
      weight: "100 g",
      term: "Johnsons Soap",
    },
    { title: "Tedibar Baby Soap", weight: "75 g", term: "Tedibar Soap" },
    { title: "Dermadew Baby Soap", weight: "75 g", term: "Dermadew Soap" },
    {
      title: "Mamaearth Moisturizing Baby Soap Bar",
      weight: "75 g",
      term: "Mamaearth Soap",
    },
    {
      title: "Baby Dove Rich Moisture Bathing Bar",
      weight: "75 g",
      term: "Baby Dove Soap",
    },
  ],
  "baby-wipes": [
    {
      title: "Himalaya Gentle Baby Wipes",
      weight: "72 pcs",
      term: "Himalaya Baby Wipes",
    },
    {
      title: "Johnson's Baby Skincare Wipes",
      weight: "72 pcs",
      term: "Johnsons Baby Wipes",
    },
    {
      title: "Pampers Fresh Aloe Vera Baby Wipes",
      weight: "72 pcs",
      term: "Pampers Wipes",
    },
    {
      title: "Mee Mee Caring Baby Wet Wipes",
      weight: "72 pcs",
      term: "Mee Mee Wipes",
    },
    {
      title: "Little's Soft Cleansing Baby Wipes",
      weight: "80 pcs",
      term: "Little's Wipes",
    },
    {
      title: "LuvLap Aloe Vera Baby Wipes",
      weight: "72 pcs",
      term: "LuvLap Wipes",
    },
    {
      title: "Baby Dove Rich Moisture Wipes",
      weight: "50 pcs",
      term: "Baby Dove Wipes",
    },
    {
      title: "Mother Sparsh 99% Pure Water Wipes",
      weight: "72 pcs",
      term: "Mother Sparsh Wipes",
    },
    {
      title: "Mamaearth Bamboo Based Baby Wipes",
      weight: "72 pcs",
      term: "Mamaearth Wipes",
    },
    {
      title: "WaterWipes Original Baby Wipes",
      weight: "60 pcs",
      term: "WaterWipes",
    },
    {
      title: "Supples Baby Wet Wipes with Aloe Vera",
      weight: "72 pcs",
      term: "Supples Wipes",
    },
    {
      title: "Chicco Soft Cleansing Baby Wipes",
      weight: "72 pcs",
      term: "Chicco Wipes",
    },
    {
      title: "MamyPoko Soft Baby Wipes",
      weight: "46 pcs",
      term: "MamyPoko Wipes",
    },
    { title: "Sebamed Baby Wipes", weight: "72 pcs", term: "Sebamed Wipes" },
    {
      title: "Pigeon Water Base Baby Wipes",
      weight: "82 pcs",
      term: "Pigeon Wipes",
    },
    { title: "Aveeno Baby Wipes", weight: "72 pcs", term: "Aveeno Wipes" },
    {
      title: "Biotique Bio Aloe Baby Wipes",
      weight: "60 pcs",
      term: "Biotique Wipes",
    },
    {
      title: "Goodnessme Pure Water Baby Wipes",
      weight: "72 pcs",
      term: "Goodnessme Wipes",
    },
    {
      title: "Bella Baby Happy Aqua Care Wipes",
      weight: "56 pcs",
      term: "Bella Baby Wipes",
    },
    {
      title: "Tulips Sensitive Baby Wet Wipes",
      weight: "80 pcs",
      term: "Tulips Wipes",
    },
    {
      title: "MyGlamm Wipeout Baby Wipes",
      weight: "72 pcs",
      term: "MyGlamm Wipes",
    },
    { title: "Bumtum Baby Wet Wipes", weight: "72 pcs", term: "Bumtum Wipes" },
    {
      title: "Himalaya Extra Moisturizing Baby Wipes",
      weight: "72 pcs",
      term: "Himalaya Moist Wipes",
    },
    {
      title: "Morisons Baby Dreams Wipes",
      weight: "72 pcs",
      term: "Morisons Wipes",
    },
    {
      title: "Huggies Nourishing Clean Baby Wipes",
      weight: "72 pcs",
      term: "Huggies Wipes",
    },
  ],
  "baby-food": [
    {
      title: "Nestle Cerelac Wheat Apple",
      weight: "300 g",
      term: "Cerelac Apple",
    },
    { title: "Nestle Cerelac Rice", weight: "300 g", term: "Cerelac Rice" },
    {
      title: "Nestle Nan Pro 1 Infant Formula",
      weight: "400 g",
      term: "Nan Pro 1",
    },
    {
      title: "Nestle Nan Pro 2 Follow-Up Formula",
      weight: "400 g",
      term: "Nan Pro 2",
    },
    {
      title: "Dexolac Stage 1 Infant Formula",
      weight: "400 g",
      term: "Dexolac 1",
    },
    {
      title: "Dexolac Stage 2 Follow-Up Formula",
      weight: "400 g",
      term: "Dexolac 2",
    },
    {
      title: "Similac Advance Infant Formula",
      weight: "400 g",
      term: "Similac Advance",
    },
    {
      title: "Slurrp Farm Ragi Cereal",
      weight: "200 g",
      term: "Slurrp Farm Ragi",
    },
    {
      title: "Slurrp Farm Oat Cereal",
      weight: "200 g",
      term: "Slurrp Farm Oats",
    },
    {
      title: "Early Foods Organic Ragi Porridge",
      weight: "200 g",
      term: "Early Foods Ragi",
    },
    {
      title: "Early Foods Multi Grain Porridge",
      weight: "200 g",
      term: "Early Foods Multigrain",
    },
    { title: "Farex Stage 1 Infant Formula", weight: "400 g", term: "Farex 1" },
    {
      title: "Enfamil A+ Stage 1 Infant Formula",
      weight: "400 g",
      term: "Enfamil",
    },
    {
      title: "Pristine Organics 1st Bites Ragi",
      weight: "300 g",
      term: "1st Bites Ragi",
    },
    {
      title: "Pristine Organics 1st Bites Wheat",
      weight: "300 g",
      term: "1st Bites Wheat",
    },
    {
      title: "Happa Organic Apple Puree",
      weight: "100 g",
      term: "Happa Apple Puree",
    },
    {
      title: "Happa Organic Banana Puree",
      weight: "100 g",
      term: "Happa Banana Puree",
    },
    {
      title: "Mille Organic Millet Cereal",
      weight: "200 g",
      term: "Mille Cereal",
    },
    {
      title: "Gerber Multigrain Cereal",
      weight: "227 g",
      term: "Gerber Cereal",
    },
    {
      title: "Hepano Protein Supplement for Kids",
      weight: "200 g",
      term: "Hepano",
    },
    {
      title: "Pediasure Health Drink Vanilla",
      weight: "400 g",
      term: "Pediasure Vanilla",
    },
    {
      title: "Ensure Junior Nutrition Powder",
      weight: "400 g",
      term: "Ensure Junior",
    },
    {
      title: "Horlicks Health Drink Growth+",
      weight: "400 g",
      term: "Horlicks Growth",
    },
    {
      title: "Aptamil Stage 1 Infant Formula",
      weight: "400 g",
      term: "Aptamil",
    },
    { title: "Lactogen 1 Infant Formula", weight: "400 g", term: "Lactogen 1" },
  ],
  "skin-hair-care": [
    {
      title: "Himalaya Baby Massage Oil",
      weight: "200 ml",
      term: "Himalaya Baby Oil",
    },
    {
      title: "Johnson's Baby Oil",
      weight: "200 ml",
      term: "Johnsons Baby Oil",
    },
    {
      title: "Sebamed Baby Lotion",
      weight: "400 ml",
      term: "Sebamed Baby Lotion",
    },
    {
      title: "Mamaearth Daily Moisturizing Baby Lotion",
      weight: "400 ml",
      term: "Mamaearth Lotion",
    },
    {
      title: "Cetaphil Baby Daily Lotion",
      weight: "400 ml",
      term: "Cetaphil Baby Lotion",
    },
    {
      title: "Baby Dove Rich Moisture Lotion",
      weight: "200 ml",
      term: "Baby Dove Lotion",
    },
    {
      title: "Himalaya Baby Cream",
      weight: "200 ml",
      term: "Himalaya Baby Cream",
    },
    {
      title: "Sebamed Baby Protective Facial Cream",
      weight: "50 ml",
      term: "Sebamed Face Cream",
    },
    {
      title: "Aveeno Baby Daily Moisturizing Lotion",
      weight: "227 ml",
      term: "Aveeno Baby Lotion",
    },
    {
      title: "Moms Co. Natural Baby Lotion",
      weight: "200 ml",
      term: "Moms Co Lotion",
    },
    {
      title: "Chicco Baby Moments Body Lotion",
      weight: "200 ml",
      term: "Chicco Lotion",
    },
    {
      title: "Biotique Bio Aloe Vera Baby Lotion",
      weight: "190 ml",
      term: "Biotique Lotion",
    },
    {
      title: "Himalaya Baby Powder",
      weight: "400 g",
      term: "Himalaya Baby Powder",
    },
    {
      title: "Johnson's Baby Powder",
      weight: "400 g",
      term: "Johnsons Baby Powder",
    },
    {
      title: "Sebamed Baby Hair & Body Wash",
      weight: "200 ml",
      term: "Sebamed Baby Shampoo",
    },
    {
      title: "Himalaya Gentle Baby Shampoo",
      weight: "400 ml",
      term: "Himalaya Baby Shampoo",
    },
    {
      title: "Johnson's No More Tears Baby Shampoo",
      weight: "200 ml",
      term: "Johnsons Shampoo",
    },
    {
      title: "Cetaphil Baby Shampoo",
      weight: "200 ml",
      term: "Cetaphil Shampoo",
    },
    {
      title: "Mamaearth Gentle Cleansing Shampoo",
      weight: "400 ml",
      term: "Mamaearth Shampoo",
    },
    {
      title: "Mothercare All We Know Baby Oil",
      weight: "300 ml",
      term: "Mothercare Oil",
    },
    {
      title: "Figaro Olive Oil for Baby Massage",
      weight: "200 ml",
      term: "Figaro Olive Oil",
    },
    {
      title: "Maxirub Baby Massage Oil",
      weight: "100 ml",
      term: "Baby Massage Oil",
    },
    {
      title: "Sebamed Baby Lip Balm",
      weight: "4.8 g",
      term: "Sebamed Lip Balm",
    },
    {
      title: "Himalaya Diaper Rash Cream",
      weight: "50 g",
      term: "Himalaya Rash Cream",
    },
    { title: "B4 Nappi Cream", weight: "75 g", term: "B4 Nappi" },
  ],
};

let ptId = 1;

let outputStr = "";

// Generate top-level import statements
for (let i = 1; i <= 125; i++) {
  outputStr += `import img_bbp${i} from './assets/baby/bbp${i}.jpg';\n`;
}

outputStr += "\nexport const BABY_PRODUCTS_BY_CATEGORY = {\n";

categories.forEach((cat, idx) => {
  outputStr += `  "${cat}": [\n`;

  templates[cat].forEach((tmpl, tIdx) => {
    const originalPrice = Math.floor(Math.random() * 400) + 100;
    const price = Math.floor(originalPrice * (1 - Math.random() * 0.15));
    const discountPct = Math.round(
      ((originalPrice - price) / originalPrice) * 100,
    );
    const discountStr = discountPct > 0 ? discountPct + "%" : "";
    const curId = ptId++;

    outputStr += `    {\n`;
    outputStr += `      "id": "bbp${curId}",\n`;
    outputStr += `      "title": "${tmpl.title}",\n`;
    outputStr += `      "weight": "${tmpl.weight}",\n`;
    outputStr += `      "price": ${price},\n`;
    outputStr += `      "originalPrice": ${originalPrice},\n`;
    outputStr += `      "discount": "${discountStr}",\n`;
    outputStr += `      "searchTerm": "${tmpl.term}",\n`;
    outputStr += `      "image": img_bbp${curId}\n`; // Link variable dynamically imported above
    outputStr += `    }${tIdx === templates[cat].length - 1 ? "" : ","}\n`;
  });

  outputStr += `  ]${idx === categories.length - 1 ? "" : ","}\n`;
});

outputStr += "};\n";
console.log(outputStr);

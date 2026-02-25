import React, { useState, useEffect } from "react";
import "./CategoryPage.css"; // Reuse styling
import SEOFooter from "./SEOFooter";

const PHARMA_CATEGORIES = [
  { id: "adult-diapers", name: "Adult\nDiapers", icon: "🩲" },
  {
    id: "health-wellness",
    name: "Health &\nWellness Suppleme\nnts",
    icon: "🌿",
  },
  {
    id: "protein-workout",
    name: "Protein\nand\nWorkout\nSuppleme\nnts",
    icon: "💪",
  },
  { id: "antiseptic", name: "Antiseptic", icon: "🧴" },
];

export const PHARMA_PRODUCTS_BY_CATEGORY = {
  "adult-diapers": [
    {
      id: "ad1",
      title: "CIR Premium Adult\nDiaper Pants, XL",
      weight: "10 pcs",
      price: 239,
      originalPrice: 561,
      discount: "57%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad2",
      title: "Kare In Classic\nUnderpad - L",
      weight: "10 pcs",
      price: 1030,
      originalPrice: 1200,
      discount: "14%",
      searchTerm: "underpad",
    },
    {
      id: "ad3",
      title: "Kare In Classic Adult\nDiaper Pants, M",
      weight: "10 pcs",
      price: 199,
      originalPrice: 470,
      discount: "57%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad4",
      title: "B-FIT Adult Diaper\nPant Style (M)",
      weight: "10 pcs",
      price: 209,
      originalPrice: 535,
      discount: "60%",
      searchTerm: "diaper adult",
    },
    {
      id: "ad5",
      title: "CIR Premium Adult\nDiaper Pants, M",
      weight: "10 pcs",
      price: 199,
      originalPrice: 467,
      discount: "57%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad6",
      title: "Kare In Bed Wipes",
      weight: "3x10 wipes",
      price: 177,
      originalPrice: 1080,
      discount: "83%",
      searchTerm: "bed wipes",
    },
    {
      id: "ad7",
      title: "B-FIT Adult Diaper\nPant Style (XL)",
      weight: "10 pcs",
      price: 250,
      originalPrice: 450,
      discount: "44%",
      searchTerm: "diaper adult",
    },
    {
      id: "ad8",
      title: "Friends Classic Adult\nDiaper Pants",
      weight: "10 pcs",
      price: 300,
      originalPrice: 400,
      discount: "25%",
      searchTerm: "senior diapers",
    },
    {
      id: "ad9",
      title: "Lifree Extra Absorb\nPants, L",
      weight: "10 pcs",
      price: 450,
      originalPrice: 550,
      discount: "18%",
      searchTerm: "lifree diapers",
    },
    {
      id: "ad10",
      title: "Lifree Extra Absorb\nPants, M",
      weight: "10 pcs",
      price: 420,
      originalPrice: 520,
      discount: "19%",
      searchTerm: "lifree diapers",
    },
    {
      id: "ad11",
      title: "Lifree Extra Absorb\nPants, XL",
      weight: "10 pcs",
      price: 480,
      originalPrice: 580,
      discount: "17%",
      searchTerm: "lifree diapers",
    },
    {
      id: "ad12",
      title: "Friends Premium Adult\nDiapers, L",
      weight: "10 pcs",
      price: 380,
      originalPrice: 480,
      discount: "21%",
      searchTerm: "friends diapers",
    },
    {
      id: "ad13",
      title: "Friends Premium Adult\nDiapers, XL",
      weight: "10 pcs",
      price: 400,
      originalPrice: 500,
      discount: "20%",
      searchTerm: "friends diapers",
    },
    {
      id: "ad14",
      title: "Dignity Premium Adult\nDiapers, M",
      weight: "10 pcs",
      price: 350,
      originalPrice: 450,
      discount: "22%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad15",
      title: "Dignity Premium Adult\nDiapers, L",
      weight: "10 pcs",
      price: 380,
      originalPrice: 480,
      discount: "21%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad16",
      title: "Dignity Premium Adult\nDiapers, XL",
      weight: "10 pcs",
      price: 400,
      originalPrice: 500,
      discount: "20%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad17",
      title: "Senso Adult Diaper\nPants, M",
      weight: "10 pcs",
      price: 300,
      originalPrice: 400,
      discount: "25%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad18",
      title: "Senso Adult Diaper\nPants, L",
      weight: "10 pcs",
      price: 320,
      originalPrice: 420,
      discount: "24%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad19",
      title: "Senso Adult Diaper\nPants, XL",
      weight: "10 pcs",
      price: 350,
      originalPrice: 450,
      discount: "22%",
      searchTerm: "adult diapers",
    },
    {
      id: "ad20",
      title: "Wet Wipes Adult\nLarge",
      weight: "50 wipes",
      price: 150,
      originalPrice: 200,
      discount: "25%",
      searchTerm: "adult wet wipes",
    },
    {
      id: "ad21",
      title: "Kare In Adult Diaper\nTape Style, M",
      weight: "10 pcs",
      price: 280,
      originalPrice: 380,
      discount: "26%",
      searchTerm: "tape diapers",
    },
    {
      id: "ad22",
      title: "Kare In Adult Diaper\nTape Style, L",
      weight: "10 pcs",
      price: 300,
      originalPrice: 400,
      discount: "25%",
      searchTerm: "tape diapers",
    },
    {
      id: "ad23",
      title: "Friends Easy Adult\nDiapers, M",
      weight: "10 pcs",
      price: 290,
      originalPrice: 390,
      discount: "26%",
      searchTerm: "friends diapers",
    },
    {
      id: "ad24",
      title: "Friends Easy Adult\nDiapers, L",
      weight: "10 pcs",
      price: 310,
      originalPrice: 410,
      discount: "24%",
      searchTerm: "friends diapers",
    },
    {
      id: "ad25",
      title: "Friends Easy Adult\nDiapers, XL",
      weight: "10 pcs",
      price: 340,
      originalPrice: 440,
      discount: "23%",
      searchTerm: "friends diapers",
    },
  ],
  "health-wellness": [
    {
      id: "hw1",
      title: "Dabur Chyawanprash",
      weight: "500 g",
      price: 250,
      originalPrice: 300,
      discount: "17%",
      searchTerm: "chyawanprash",
    },
    {
      id: "hw2",
      title: "Zandu Balm",
      weight: "25 ml",
      price: 50,
      originalPrice: 60,
      discount: "17%",
      searchTerm: "balm",
    },
    {
      id: "hw3",
      title: "Vicks VapoRub",
      weight: "50 ml",
      price: 150,
      originalPrice: 180,
      discount: "17%",
      searchTerm: "vicks",
    },
    {
      id: "hw4",
      title: "Volini Pain Relief\nSpray",
      weight: "100 g",
      price: 250,
      originalPrice: 300,
      discount: "17%",
      searchTerm: "pain spray",
    },
    {
      id: "hw5",
      title: "Moov Pain Relief\nCream",
      weight: "50 g",
      price: 180,
      originalPrice: 220,
      discount: "18%",
      searchTerm: "pain cream",
    },
    {
      id: "hw6",
      title: "Iodex Balm",
      weight: "40 g",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "iodex",
    },
    {
      id: "hw7",
      title: "Amrutanjan Roll On",
      weight: "10 ml",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "roll on",
    },
    {
      id: "hw8",
      title: "ENO Lemon",
      weight: "6 sachets",
      price: 60,
      originalPrice: 75,
      discount: "20%",
      searchTerm: "eno",
    },
    {
      id: "hw9",
      title: "ENO Regular",
      weight: "6 sachets",
      price: 55,
      originalPrice: 70,
      discount: "21%",
      searchTerm: "eno",
    },
    {
      id: "hw10",
      title: "Pudin Hara Pearls",
      weight: "10 strips",
      price: 100,
      originalPrice: 120,
      discount: "17%",
      searchTerm: "pudin hara",
    },
    {
      id: "hw11",
      title: "Hajmola Regular",
      weight: "120 tabs",
      price: 50,
      originalPrice: 60,
      discount: "17%",
      searchTerm: "hajmola",
    },
    {
      id: "hw12",
      title: "Hajmola Imli",
      weight: "120 tabs",
      price: 50,
      originalPrice: 60,
      discount: "17%",
      searchTerm: "hajmola",
    },
    {
      id: "hw13",
      title: "Revital H Capsules",
      weight: "30 caps",
      price: 280,
      originalPrice: 350,
      discount: "20%",
      searchTerm: "revital",
    },
    {
      id: "hw14",
      title: "Supradyn Daily\nMultivitamin",
      weight: "15 tabs",
      price: 150,
      originalPrice: 180,
      discount: "17%",
      searchTerm: "multivitamin",
    },
    {
      id: "hw15",
      title: "Becosules Capsules",
      weight: "20 caps",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "vitamins",
    },
    {
      id: "hw16",
      title: "Shelcal 500",
      weight: "15 tabs",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "calcium tablets",
    },
    {
      id: "hw17",
      title: "Neurobion Forte",
      weight: "30 tabs",
      price: 180,
      originalPrice: 220,
      discount: "18%",
      searchTerm: "vitamin tablets",
    },
    {
      id: "hw18",
      title: "Liv52 Drops",
      weight: "60 ml",
      price: 100,
      originalPrice: 130,
      discount: "23%",
      searchTerm: "liver drops",
    },
    {
      id: "hw19",
      title: "Himalaya Ashvagandha",
      weight: "60 tabs",
      price: 220,
      originalPrice: 280,
      discount: "21%",
      searchTerm: "ashvagandha",
    },
    {
      id: "hw20",
      title: "Himalaya Neem",
      weight: "60 tabs",
      price: 200,
      originalPrice: 250,
      discount: "20%",
      searchTerm: "neem tablets",
    },
    {
      id: "hw21",
      title: "Himalaya Triphala",
      weight: "60 tabs",
      price: 180,
      originalPrice: 220,
      discount: "18%",
      searchTerm: "triphala",
    },
    {
      id: "hw22",
      title: "Vicks Cough Drops",
      weight: "20 drops",
      price: 20,
      originalPrice: 25,
      discount: "20%",
      searchTerm: "vicks",
    },
    {
      id: "hw23",
      title: "Strepsils Honey &\nLemon",
      weight: "8 tabs",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "strepsils",
    },
    {
      id: "hw24",
      title: "Strepsils Orange",
      weight: "8 tabs",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "strepsils",
    },
    {
      id: "hw25",
      title: "Koflet Lozenges",
      weight: "10 tabs",
      price: 40,
      originalPrice: 50,
      discount: "20%",
      searchTerm: "koflet",
    },
  ],
  "protein-workout": [
    {
      id: "pw1",
      title: "Optimum Nutrition\nWhey Protein",
      weight: "1 kg",
      price: 2500,
      originalPrice: 3200,
      discount: "22%",
      searchTerm: "whey protein",
    },
    {
      id: "pw2",
      title: "MuscleBlaze Whey\nProtein",
      weight: "1 kg",
      price: 2200,
      originalPrice: 2800,
      discount: "21%",
      searchTerm: "whey protein",
    },
    {
      id: "pw3",
      title: "As It Is Whey\nProtein",
      weight: "1 kg",
      price: 1800,
      originalPrice: 2400,
      discount: "25%",
      searchTerm: "whey protein",
    },
    {
      id: "pw4",
      title: "MuscleTech NitroTech",
      weight: "1 kg",
      price: 2800,
      originalPrice: 3500,
      discount: "20%",
      searchTerm: "whey protein",
    },
    {
      id: "pw5",
      title: "Myprotein Impact\nWhey",
      weight: "1 kg",
      price: 2100,
      originalPrice: 2700,
      discount: "22%",
      searchTerm: "whey protein",
    },
    {
      id: "pw6",
      title: "Dymatize Elite Whey",
      weight: "1 kg",
      price: 2900,
      originalPrice: 3700,
      discount: "22%",
      searchTerm: "whey protein",
    },
    {
      id: "pw7",
      title: "Isopure Zero Carb",
      weight: "1 kg",
      price: 3500,
      originalPrice: 4500,
      discount: "22%",
      searchTerm: "whey protein",
    },
    {
      id: "pw8",
      title: "BSN Syntha-6",
      weight: "1 kg",
      price: 2700,
      originalPrice: 3400,
      discount: "21%",
      searchTerm: "whey protein",
    },
    {
      id: "pw9",
      title: "Cellucor C4 Pre\nWorkout",
      weight: "200 g",
      price: 1500,
      originalPrice: 2000,
      discount: "25%",
      searchTerm: "pre workout",
    },
    {
      id: "pw10",
      title: "MuscleBlaze Pre\nWorkout",
      weight: "250 g",
      price: 1200,
      originalPrice: 1600,
      discount: "25%",
      searchTerm: "pre workout",
    },
    {
      id: "pw11",
      title: "ON Amino Energy",
      weight: "270 g",
      price: 1800,
      originalPrice: 2400,
      discount: "25%",
      searchTerm: "bcaa",
    },
    {
      id: "pw12",
      title: "XTEND BCAA",
      weight: "400 g",
      price: 2200,
      originalPrice: 2800,
      discount: "21%",
      searchTerm: "bcaa",
    },
    {
      id: "pw13",
      title: "MB BCAA",
      weight: "300 g",
      price: 1500,
      originalPrice: 2000,
      discount: "25%",
      searchTerm: "bcaa",
    },
    {
      id: "pw14",
      title: "MusclePharm Assault",
      weight: "300 g",
      price: 1900,
      originalPrice: 2500,
      discount: "24%",
      searchTerm: "pre workout",
    },
    {
      id: "pw15",
      title: "Optimum Nutrition\nCreatine",
      weight: "250 g",
      price: 800,
      originalPrice: 1100,
      discount: "27%",
      searchTerm: "creatine",
    },
    {
      id: "pw16",
      title: "MuscleBlaze Creatine",
      weight: "250 g",
      price: 700,
      originalPrice: 950,
      discount: "26%",
      searchTerm: "creatine",
    },
    {
      id: "pw17",
      title: "GNC Pro Performance\nCreatine",
      weight: "250 g",
      price: 900,
      originalPrice: 1200,
      discount: "25%",
      searchTerm: "creatine",
    },
    {
      id: "pw18",
      title: "Fast&Up Reload\nHydration",
      weight: "20 tabs",
      price: 350,
      originalPrice: 450,
      discount: "22%",
      searchTerm: "hydration",
    },
    {
      id: "pw19",
      title: "Fast&Up BCAA",
      weight: "30 tubs",
      price: 1200,
      originalPrice: 1600,
      discount: "25%",
      searchTerm: "bcaa",
    },
    {
      id: "pw20",
      title: "Ritebite Protein Bar",
      weight: "6 bars",
      price: 600,
      originalPrice: 750,
      discount: "20%",
      searchTerm: "protein bar",
    },
    {
      id: "pw21",
      title: "Yoga Bar Protein Bar",
      weight: "6 bars",
      price: 550,
      originalPrice: 700,
      discount: "21%",
      searchTerm: "protein bar",
    },
    {
      id: "pw22",
      title: "Phitzee Protein Bar",
      weight: "6 bars",
      price: 500,
      originalPrice: 650,
      discount: "23%",
      searchTerm: "protein bar",
    },
    {
      id: "pw23",
      title: "GNC Multivitamin",
      weight: "60 tabs",
      price: 1200,
      originalPrice: 1600,
      discount: "25%",
      searchTerm: "multivitamin",
    },
    {
      id: "pw24",
      title: "MuscleBlaze Fish Oil",
      weight: "60 caps",
      price: 600,
      originalPrice: 800,
      discount: "25%",
      searchTerm: "fish oil",
    },
    {
      id: "pw25",
      title: "ON Fish Oil",
      weight: "60 caps",
      price: 900,
      originalPrice: 1200,
      discount: "25%",
      searchTerm: "fish oil",
    },
  ],
  antiseptic: [
    {
      id: "an1",
      title: "Dettol Antiseptic\nLiquid",
      weight: "250 ml",
      price: 150,
      originalPrice: 180,
      discount: "17%",
      searchTerm: "dettol liquid",
    },
    {
      id: "an2",
      title: "Savlon Antiseptic\nLiquid",
      weight: "250 ml",
      price: 140,
      originalPrice: 170,
      discount: "18%",
      searchTerm: "savlon liquid",
    },
    {
      id: "an3",
      title: "Betadine Solution",
      weight: "100 ml",
      price: 200,
      originalPrice: 250,
      discount: "20%",
      searchTerm: "betadine",
    },
    {
      id: "an4",
      title: "Betadine Ointment",
      weight: "15 g",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "betadine",
    },
    {
      id: "an5",
      title: "Dettol Hand Sanitizer",
      weight: "50 ml",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "hand sanitizer",
    },
    {
      id: "an6",
      title: "Savlon Hand Sanitizer",
      weight: "50 ml",
      price: 55,
      originalPrice: 75,
      discount: "27%",
      searchTerm: "hand sanitizer",
    },
    {
      id: "an7",
      title: "Lifebuoy Hand\nSanitizer",
      weight: "50 ml",
      price: 50,
      originalPrice: 70,
      discount: "29%",
      searchTerm: "hand sanitizer",
    },
    {
      id: "an8",
      title: "Dettol Soap Original",
      weight: "125 g",
      price: 60,
      originalPrice: 75,
      discount: "20%",
      searchTerm: "dettol soap",
    },
    {
      id: "an9",
      title: "Savlon Soap Regular",
      weight: "125 g",
      price: 55,
      originalPrice: 70,
      discount: "21%",
      searchTerm: "savlon soap",
    },
    {
      id: "an10",
      title: "Dettol Skincare Soap",
      weight: "125 g",
      price: 65,
      originalPrice: 80,
      discount: "19%",
      searchTerm: "dettol soap",
    },
    {
      id: "an11",
      title: "Dettol Cool Soap",
      weight: "125 g",
      price: 65,
      originalPrice: 80,
      discount: "19%",
      searchTerm: "dettol soap",
    },
    {
      id: "an12",
      title: "Dettol Liquid\nHandwash",
      weight: "200 ml",
      price: 110,
      originalPrice: 140,
      discount: "21%",
      searchTerm: "dettol handwash",
    },
    {
      id: "an13",
      title: "Savlon Liquid\nHandwash",
      weight: "200 ml",
      price: 100,
      originalPrice: 130,
      discount: "23%",
      searchTerm: "savlon handwash",
    },
    {
      id: "an14",
      title: "Himalaya PureHands\nSanitizer",
      weight: "100 ml",
      price: 90,
      originalPrice: 120,
      discount: "25%",
      searchTerm: "hand sanitizer",
    },
    {
      id: "an15",
      title: "Sterillium Rub",
      weight: "100 ml",
      price: 150,
      originalPrice: 190,
      discount: "21%",
      searchTerm: "hand rub",
    },
    {
      id: "an16",
      title: "Dettol Disinfectant\nSpray",
      weight: "225 ml",
      price: 200,
      originalPrice: 250,
      discount: "20%",
      searchTerm: "disinfectant spray",
    },
    {
      id: "an17",
      title: "Savlon Disinfectant\nSpray",
      weight: "230 ml",
      price: 180,
      originalPrice: 230,
      discount: "22%",
      searchTerm: "disinfectant spray",
    },
    {
      id: "an18",
      title: "Hydrogen Peroxide",
      weight: "400 ml",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "hydrogen peroxide",
    },
    {
      id: "an19",
      title: "Surgical Spirit",
      weight: "400 ml",
      price: 120,
      originalPrice: 160,
      discount: "25%",
      searchTerm: "surgical spirit",
    },
    {
      id: "an20",
      title: "Cotton Roll",
      weight: "500 g",
      price: 150,
      originalPrice: 200,
      discount: "25%",
      searchTerm: "surgical cotton",
    },
    {
      id: "an21",
      title: "Hansaplast Bandage",
      weight: "10 strips",
      price: 40,
      originalPrice: 50,
      discount: "20%",
      searchTerm: "bandage",
    },
    {
      id: "an22",
      title: "Band-Aid Washproof",
      weight: "10 strips",
      price: 35,
      originalPrice: 45,
      discount: "22%",
      searchTerm: "bandage",
    },
    {
      id: "an23",
      title: "Dettol Plaster",
      weight: "10 strips",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "plaster",
    },
    {
      id: "an24",
      title: "Savlon Plaster",
      weight: "10 strips",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "plaster",
    },
    {
      id: "an25",
      title: "Cipla Omni Gel",
      weight: "30 g",
      price: 110,
      originalPrice: 140,
      discount: "21%",
      searchTerm: "omni gel",
    },
  ],
};

const PharmaPage = ({ catId, cart, setCart, setSelectedProductId }) => {
  const [activeCategory, setActiveCategory] = useState(
    catId || "adult-diapers",
  );
  const [products, setProducts] = useState(
    PHARMA_PRODUCTS_BY_CATEGORY[activeCategory] ||
      PHARMA_PRODUCTS_BY_CATEGORY["adult-diapers"] ||
      [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (catId && PHARMA_PRODUCTS_BY_CATEGORY[catId]) {
      setActiveCategory(catId);
    }
  }, [catId]);

  useEffect(() => {
    setLoading(true);
    const targetProducts = PHARMA_PRODUCTS_BY_CATEGORY[activeCategory] || [];
    setProducts(targetProducts);
    setLoading(false);
  }, [activeCategory]);

  const handleAdd = (id, e) => {
    e.stopPropagation();
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemove = (id, e) => {
    e.stopPropagation();
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  return (
    <div className="category-page-container">
      <div className="category-layout">
        <div className="category-header">
          {activeCategory === "adult-diapers"
            ? "Buy Adult Diapers Online"
            : "Pharmacy at your doorstep"}
        </div>

        <div className="category-body">
          {/* Sidebar Area with its own scroll */}
          <div className="category-sidebar">
            {PHARMA_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className={`category-sidebar-item ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <div className="category-sidebar-icon">{cat.icon}</div>
                <div className="category-sidebar-name">{cat.name}</div>
              </div>
            ))}
          </div>

          {/* Product Grid Area with its own scroll */}
          <div className="category-product-area">
            {loading ? (
              <div className="category-loading">Loading products...</div>
            ) : (
              <div className="category-product-grid">
                {products.map((product) => {
                  const qty = cart[product.id] || 0;
                  return (
                    <div
                      key={product.id}
                      className="category-product-card"
                      onClick={() => setSelectedProductId(product.id)}
                    >
                      <div className="category-product-discount">
                        <span className="discount-pct">{product.discount}</span>
                        <span className="discount-txt">OFF</span>
                      </div>

                      <div className="category-product-image">
                        <img
                          src={
                            product.image ||
                            `https://placehold.co/150x150?text=${encodeURIComponent(product.title.split("\n")[0].trim())}&font=roboto`
                          }
                          alt={product.title.replace("\n", " ")}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/150x150?text=${encodeURIComponent(product.title.split("\n")[0].trim())}&font=roboto`;
                          }}
                        />
                      </div>

                      <div className="category-product-delivery">⏱ 17 MINS</div>

                      <div className="category-product-title">
                        {product.title}
                      </div>

                      <div className="category-product-weight">
                        {product.weight}
                      </div>

                      <div className="category-product-price-row">
                        <div className="category-product-prices">
                          <span className="current-price">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="original-price">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="category-product-add">
                          {qty > 0 ? (
                            <div
                              className="add-button active"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span
                                onClick={(e) => handleRemove(product.id, e)}
                              >
                                -
                              </span>
                              <span>{qty}</span>
                              <span onClick={(e) => handleAdd(product.id, e)}>
                                +
                              </span>
                            </div>
                          ) : (
                            <button
                              className="add-button"
                              onClick={(e) => handleAdd(product.id, e)}
                            >
                              ADD
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {products.length === 0 && !loading && (
                  <div className="category-empty">No products found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <SEOFooter />
    </div>
  );
};

export default PharmaPage;

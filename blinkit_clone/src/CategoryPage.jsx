import React, { useState, useEffect } from "react";
import "./CategoryPage.css";
import SEOFooter from "./SEOFooter";

const CATEGORIES = [
  { id: "fresh-vegetables", name: "Fresh\nVegetables", icon: "🥦" },
  { id: "fresh-fruits", name: "Fresh\nFruits", icon: "🍎" },
  { id: "exotics", name: "Exotics", icon: "🫐" },
  { id: "seasonal", name: "Seasonal", icon: "🍓" },
  { id: "trusted-organic", name: "Trusted\nOrganic", icon: "🍅" },
];

export const PRODUCTS_BY_CATEGORY = {
  "fresh-vegetables": [
    {
      id: "v1",
      title: "Coriander Bunch\n(Kothamalli)",
      weight: "100 g",
      price: 1,
      originalPrice: 7,
      discount: "85%",
      searchTerm: "coriander leaves",
    },
    {
      id: "v2",
      title: "Onion (Vengayam)",
      weight: "1000 g",
      price: 30,
      originalPrice: 38,
      discount: "21%",
      searchTerm: "red onion",
    },
    {
      id: "v3",
      title: "Green Chilli (Pachal\nMilagaai)",
      weight: "100 g",
      price: 18,
      originalPrice: 22,
      discount: "18%",
      searchTerm: "green chilli",
    },
    {
      id: "v4",
      title: "Ooty Carrot",
      weight: "250 g",
      price: 17,
      originalPrice: 20,
      discount: "15%",
      searchTerm: "carrot",
    },
    {
      id: "v5",
      title: "Potato\n(Urulaikizhangu)",
      weight: "1 kg",
      price: 29,
      originalPrice: 37,
      discount: "21%",
      searchTerm: "potato",
    },
    {
      id: "v6",
      title: "Lemon (Elumichai\nPazham)",
      weight: "200 g",
      price: 31,
      originalPrice: 36,
      discount: "13%",
      searchTerm: "lemon",
    },
    {
      id: "v7",
      title: "Ginger (Inji)",
      weight: "200 g",
      price: 25,
      originalPrice: 28,
      discount: "12%",
      searchTerm: "ginger",
    },
    {
      id: "v8",
      title: "Hybrid Tomato\n(Thakkali)",
      weight: "500 g",
      price: 34,
      originalPrice: 45,
      discount: "24%",
      searchTerm: "tomato",
    },
    {
      id: "v9",
      title: "Mint Leaves (Pudina)",
      weight: "100 g",
      price: 13,
      originalPrice: 15,
      discount: "13%",
      searchTerm: "mint leaves",
    },
    {
      id: "v10",
      title: "Curry Leaves\n(Karuvepillai)",
      weight: "50 g",
      price: 8,
      originalPrice: 9,
      discount: "11%",
      searchTerm: "curry",
    },
    {
      id: "v11",
      title: "Green Capsicum (Kudal\nMilagaai)",
      weight: "250 g",
      price: 33,
      originalPrice: 38,
      discount: "13%",
      searchTerm: "green capsicum",
    },
    {
      id: "v12",
      title: "Green Cucumber\n(Vellarikai)",
      weight: "500 g",
      price: 27,
      originalPrice: 34,
      discount: "21%",
      searchTerm: "cucumber",
    },
    {
      id: "v13",
      title: "Cabbage (Muttakose)",
      weight: "1 pc",
      price: 22,
      originalPrice: 30,
      discount: "26%",
      searchTerm: "cabbage",
    },
    {
      id: "v14",
      title: "Cauliflower\n(Pookosu)",
      weight: "1 pc",
      price: 35,
      originalPrice: 45,
      discount: "22%",
      searchTerm: "cauliflower",
    },
    {
      id: "v15",
      title: "Brinjal (Katthirikai)",
      weight: "500 g",
      price: 40,
      originalPrice: 50,
      discount: "20%",
      searchTerm: "brinjal",
    },
    {
      id: "v16",
      title: "Spinach (Palak)",
      weight: "1 bunch",
      price: 15,
      originalPrice: 20,
      discount: "25%",
      searchTerm: "spinach",
    },
    {
      id: "v17",
      title: "Bitter Gourd\n(Pavakkai)",
      weight: "250 g",
      price: 28,
      originalPrice: 35,
      discount: "20%",
      searchTerm: "bitter gourd",
    },
    {
      id: "v18",
      title: "Bottle Gourd\n(Sorakkai)",
      weight: "500 g",
      price: 25,
      originalPrice: 30,
      discount: "16%",
      searchTerm: "bottle gourd",
    },
    {
      id: "v19",
      title: "Drumstick\n(Murungakkai)",
      weight: "2 pcs",
      price: 18,
      originalPrice: 25,
      discount: "28%",
      searchTerm: "drumstick vegetable",
    },
    {
      id: "v20",
      title: "Snake Gourd",
      weight: "250 g",
      price: 22,
      originalPrice: 30,
      discount: "26%",
      searchTerm: "snake gourd",
    },
    {
      id: "v21",
      title: "Ridge Gourd",
      weight: "250 g",
      price: 20,
      originalPrice: 25,
      discount: "20%",
      searchTerm: "ridge gourd",
    },
    {
      id: "v22",
      title: "Ash Gourd",
      weight: "500 g",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "ash gourd",
    },
    {
      id: "v23",
      title: "Broad Beans",
      weight: "250 g",
      price: 35,
      originalPrice: 45,
      discount: "22%",
      searchTerm: "broad beans",
    },
    {
      id: "v24",
      title: "Cluster Beans",
      weight: "250 g",
      price: 40,
      originalPrice: 50,
      discount: "20%",
      searchTerm: "cluster beans",
    },
    {
      id: "v25",
      title: "Plantain Stem\n(Vazhaithandu)",
      weight: "1 pc",
      price: 15,
      originalPrice: 20,
      discount: "25%",
      searchTerm: "plantain stem",
    },
    {
      id: "v26",
      title: "Sweet Potato",
      weight: "500 g",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "sweet potato",
    },
    {
      id: "v27",
      title: "Yam (Senaikizhangu)",
      weight: "500 g",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "yam vegetable",
    },
    {
      id: "v28",
      title: "Taro Root (Seppankizhangu)",
      weight: "500 g",
      price: 35,
      originalPrice: 45,
      discount: "22%",
      searchTerm: "taro root",
    },
    {
      id: "v29",
      title: "Radish (Mullangi)",
      weight: "500 g",
      price: 20,
      originalPrice: 30,
      discount: "33%",
      searchTerm: "radish",
    },
    {
      id: "v30",
      title: "Turnip",
      weight: "250 g",
      price: 25,
      originalPrice: 35,
      discount: "28%",
      searchTerm: "turnip",
    },
    {
      id: "v31",
      title: "Beetroot",
      weight: "500 g",
      price: 25,
      originalPrice: 35,
      discount: "28%",
      searchTerm: "beetroot",
    },
    {
      id: "v32",
      title: "Spring Onion",
      weight: "1 bunch",
      price: 20,
      originalPrice: 30,
      discount: "33%",
      searchTerm: "spring onion",
    },
    {
      id: "v33",
      title: "Leeks",
      weight: "200 g",
      price: 50,
      originalPrice: 65,
      discount: "23%",
      searchTerm: "leeks",
    },
    {
      id: "v34",
      title: "Banana Flower\n(Vazhaipoo)",
      weight: "1 pc",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "banana flower",
    },
    {
      id: "v35",
      title: "Ivy Gourd (Tindora)",
      weight: "250 g",
      price: 22,
      originalPrice: 30,
      discount: "26%",
      searchTerm: "ivy gourd",
    },
  ],
  "fresh-fruits": [
    {
      id: "f1",
      title: "Apple",
      weight: "4 pcs",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "apple fruit",
    },
    {
      id: "f2",
      title: "Banana (Robusta)",
      weight: "500 g",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "banana",
    },
    {
      id: "f3",
      title: "Papaya",
      weight: "1 pc",
      price: 50,
      originalPrice: 60,
      discount: "16%",
      searchTerm: "papaya",
    },
    {
      id: "f4",
      title: "Pomegranate",
      weight: "2 pcs",
      price: 100,
      originalPrice: 120,
      discount: "16%",
      searchTerm: "pomegranate",
    },
    {
      id: "f5",
      title: "Watermelon",
      weight: "1 pc",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "watermelon",
    },
    {
      id: "f6",
      title: "Orange",
      weight: "4 pcs",
      price: 90,
      originalPrice: 110,
      discount: "18%",
      searchTerm: "orange fruit",
    },
    {
      id: "f7",
      title: "Green Grapes",
      weight: "500 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "green grapes",
    },
    {
      id: "f8",
      title: "Pineapple",
      weight: "1 pc",
      price: 75,
      originalPrice: 90,
      discount: "16%",
      searchTerm: "pineapple",
    },
    {
      id: "f9",
      title: "Sweet Lime\n(Mosambi)",
      weight: "4 pcs",
      price: 70,
      originalPrice: 85,
      discount: "17%",
      searchTerm: "sweet lime",
    },
    {
      id: "f10",
      title: "Guava",
      weight: "500 g",
      price: 55,
      originalPrice: 70,
      discount: "21%",
      searchTerm: "guava",
    },
    {
      id: "f11",
      title: "Sapota (Chikoo)",
      weight: "500 g",
      price: 65,
      originalPrice: 85,
      discount: "23%",
      searchTerm: "sapota fruit",
    },
    {
      id: "f12",
      title: "Black Grapes",
      weight: "500 g",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "black grapes",
    },
    {
      id: "f13",
      title: "Apple (Royal Gala)",
      weight: "4 pcs",
      price: 140,
      originalPrice: 170,
      discount: "17%",
      searchTerm: "gala apple",
    },
    {
      id: "f14",
      title: "Banana (Yelakki)",
      weight: "500 g",
      price: 40,
      originalPrice: 50,
      discount: "20%",
      searchTerm: "yelakki banana",
    },
    {
      id: "f15",
      title: "Banana (Red)",
      weight: "500 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "red banana",
    },
    {
      id: "f16",
      title: "Muskmelon",
      weight: "1 pc",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "muskmelon",
    },
    {
      id: "f17",
      title: "Pear",
      weight: "2 pcs",
      price: 85,
      originalPrice: 110,
      discount: "22%",
      searchTerm: "pear fruit",
    },
    {
      id: "f18",
      title: "Dates (Kimia)",
      weight: "500 g",
      price: 250,
      originalPrice: 300,
      discount: "16%",
      searchTerm: "dates fruit",
    },
    {
      id: "f19",
      title: "Tender Coconut",
      weight: "1 pc",
      price: 50,
      originalPrice: 65,
      discount: "23%",
      searchTerm: "tender coconut",
    },
    {
      id: "f20",
      title: "Jackfruit",
      weight: "500 g",
      price: 90,
      originalPrice: 120,
      discount: "25%",
      searchTerm: "jackfruit",
    },
    {
      id: "f21",
      title: "Fig (Athi Pazham)",
      weight: "200 g",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "fig fruit",
    },
    {
      id: "f22",
      title: "Amla",
      weight: "250 g",
      price: 35,
      originalPrice: 45,
      discount: "22%",
      searchTerm: "amla fruit",
    },
    {
      id: "f23",
      title: "Apple (Fuji)",
      weight: "4 pcs",
      price: 160,
      originalPrice: 200,
      discount: "20%",
      searchTerm: "fuji apple",
    },
    {
      id: "f24",
      title: "Apple (Green)",
      weight: "4 pcs",
      price: 150,
      originalPrice: 190,
      discount: "21%",
      searchTerm: "green apple",
    },
    {
      id: "f25",
      title: "Grapefruit",
      weight: "1 pc",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "grapefruit",
    },
    {
      id: "f26",
      title: "Red Apple (Washington)",
      weight: "4 pcs",
      price: 180,
      originalPrice: 220,
      discount: "18%",
      searchTerm: "red apple",
    },
    {
      id: "f27",
      title: "Strawberry (Imported)",
      weight: "200 g",
      price: 150,
      originalPrice: 200,
      discount: "25%",
      searchTerm: "imported strawberry",
    },
    {
      id: "f28",
      title: "Plums (Imported)",
      weight: "250 g",
      price: 160,
      originalPrice: 200,
      discount: "20%",
      searchTerm: "imported plums",
    },
    {
      id: "f29",
      title: "Melon (Kharbuja)",
      weight: "1 pc",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "kharbuja melon",
    },
    {
      id: "f30",
      title: "Cranberries",
      weight: "200 g",
      price: 300,
      originalPrice: 400,
      discount: "25%",
      searchTerm: "cranberries fruit",
    },
    {
      id: "f31",
      title: "Raspberries",
      weight: "125 g",
      price: 350,
      originalPrice: 450,
      discount: "22%",
      searchTerm: "raspberries",
    },
    {
      id: "f32",
      title: "Blackberries",
      weight: "125 g",
      price: 350,
      originalPrice: 450,
      discount: "22%",
      searchTerm: "blackberries",
    },
    {
      id: "f33",
      title: "Gooseberry (Nellikai)",
      weight: "250 g",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "gooseberry",
    },
    {
      id: "f34",
      title: "Peach (Imported)",
      weight: "4 pcs",
      price: 200,
      originalPrice: 250,
      discount: "20%",
      searchTerm: "imported peach",
    },
    {
      id: "f35",
      title: "Kiwi (Gold)",
      weight: "3 pcs",
      price: 150,
      originalPrice: 190,
      discount: "21%",
      searchTerm: "gold kiwi",
    },
  ],
  exotics: [
    {
      id: "e1",
      title: "Avocado",
      weight: "1 pc",
      price: 150,
      originalPrice: 200,
      discount: "25%",
      searchTerm: "avocado",
    },
    {
      id: "e2",
      title: "Dragon Fruit",
      weight: "1 pc",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "dragon fruit",
    },
    {
      id: "e3",
      title: "Kiwi",
      weight: "3 pcs",
      price: 100,
      originalPrice: 140,
      discount: "28%",
      searchTerm: "kiwi",
    },
    {
      id: "e4",
      title: "Blueberries",
      weight: "125 g",
      price: 250,
      originalPrice: 300,
      discount: "16%",
      searchTerm: "blueberries",
    },
    {
      id: "e5",
      title: "Broccoli",
      weight: "1 pc",
      price: 110,
      originalPrice: 130,
      discount: "15%",
      searchTerm: "broccoli",
    },
    {
      id: "e6",
      title: "Zucchini",
      weight: "1 pc",
      price: 85,
      originalPrice: 110,
      discount: "22%",
      searchTerm: "zucchini",
    },
    {
      id: "e7",
      title: "Cherry Tomatoes",
      weight: "250 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "cherry tomatoes",
    },
    {
      id: "e8",
      title: "Asparagus",
      weight: "200 g",
      price: 180,
      originalPrice: 220,
      discount: "18%",
      searchTerm: "asparagus",
    },
    {
      id: "e9",
      title: "Red Bell Pepper",
      weight: "1 pc",
      price: 90,
      originalPrice: 120,
      discount: "25%",
      searchTerm: "red bell pepper",
    },
    {
      id: "e10",
      title: "Yellow Bell Pepper",
      weight: "1 pc",
      price: 90,
      originalPrice: 120,
      discount: "25%",
      searchTerm: "yellow bell pepper",
    },
    {
      id: "e11",
      title: "Celery",
      weight: "250 g",
      price: 110,
      originalPrice: 140,
      discount: "21%",
      searchTerm: "celery",
    },
    {
      id: "e12",
      title: "Parsley",
      weight: "100 g",
      price: 70,
      originalPrice: 90,
      discount: "22%",
      searchTerm: "parsley",
    },
    {
      id: "e13",
      title: "Italian Basil",
      weight: "50 g",
      price: 40,
      originalPrice: 50,
      discount: "20%",
      searchTerm: "italian basil",
    },
    {
      id: "e14",
      title: "Lemongrass",
      weight: "100 g",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "lemongrass",
    },
    {
      id: "e15",
      title: "Galangal",
      weight: "100 g",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "galangal",
    },
    {
      id: "e16",
      title: "Kaffir Lime Leaves",
      weight: "20 g",
      price: 50,
      originalPrice: 65,
      discount: "23%",
      searchTerm: "kaffir lime leaves",
    },
    {
      id: "e17",
      title: "Bok Choy",
      weight: "1 pc",
      price: 95,
      originalPrice: 125,
      discount: "24%",
      searchTerm: "bok choy",
    },
    {
      id: "e18",
      title: "Chinese Cabbage",
      weight: "1 pc",
      price: 80,
      originalPrice: 110,
      discount: "27%",
      searchTerm: "chinese cabbage",
    },
    {
      id: "e19",
      title: "Baby Corn",
      weight: "200 g",
      price: 65,
      originalPrice: 85,
      discount: "23%",
      searchTerm: "baby corn",
    },
    {
      id: "e20",
      title: "Button Mushroom",
      weight: "200 g",
      price: 55,
      originalPrice: 70,
      discount: "21%",
      searchTerm: "button mushroom",
    },
    {
      id: "e21",
      title: "Cremini Mushroom",
      weight: "200 g",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "cremini mushroom",
    },
    {
      id: "e22",
      title: "Rosemary",
      weight: "20 g",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "rosemary",
    },
    {
      id: "e23",
      title: "Thyme",
      weight: "20 g",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "thyme leaf",
    },
    {
      id: "e24",
      title: "Iceberg Lettuce",
      weight: "1 pc",
      price: 120,
      originalPrice: 160,
      discount: "25%",
      searchTerm: "iceberg lettuce",
    },
    {
      id: "e25",
      title: "Romaine Lettuce",
      weight: "1 pc",
      price: 130,
      originalPrice: 170,
      discount: "23%",
      searchTerm: "romaine lettuce",
    },
    {
      id: "e26",
      title: "Red Cabbage",
      weight: "1 pc",
      price: 100,
      originalPrice: 130,
      discount: "23%",
      searchTerm: "red cabbage",
    },
    {
      id: "e27",
      title: "Brussels Sprouts",
      weight: "250 g",
      price: 150,
      originalPrice: 200,
      discount: "25%",
      searchTerm: "brussels sprouts",
    },
    {
      id: "e28",
      title: "Artichoke",
      weight: "1 pc",
      price: 200,
      originalPrice: 250,
      discount: "20%",
      searchTerm: "artichoke vegetable",
    },
    {
      id: "e29",
      title: "Edamame",
      weight: "200 g",
      price: 120,
      originalPrice: 160,
      discount: "25%",
      searchTerm: "edamame beans",
    },
    {
      id: "e30",
      title: "Snow Peas",
      weight: "200 g",
      price: 140,
      originalPrice: 180,
      discount: "22%",
      searchTerm: "snow peas",
    },
    {
      id: "e31",
      title: "Jalapeno",
      weight: "100 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "jalapeno pepper",
    },
    {
      id: "e32",
      title: "Habanero Chilli",
      weight: "50 g",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "habanero pepper",
    },
    {
      id: "e33",
      title: "Enoki Mushrooms",
      weight: "150 g",
      price: 130,
      originalPrice: 170,
      discount: "23%",
      searchTerm: "enoki mushrooms",
    },
    {
      id: "e34",
      title: "Portobello Mushrooms",
      weight: "200 g",
      price: 160,
      originalPrice: 210,
      discount: "23%",
      searchTerm: "portobello mushrooms",
    },
    {
      id: "e35",
      title: "Shiitake Mushrooms",
      weight: "200 g",
      price: 180,
      originalPrice: 240,
      discount: "25%",
      searchTerm: "shiitake mushrooms",
    },
  ],
  seasonal: [
    {
      id: "s1",
      title: "Mango (Alphonso)",
      weight: "6 pcs",
      price: 400,
      originalPrice: 500,
      discount: "20%",
      searchTerm: "mango",
    },
    {
      id: "s2",
      title: "Strawberry",
      weight: "200 g",
      price: 80,
      originalPrice: 100,
      discount: "20%",
      searchTerm: "strawberry",
    },
    {
      id: "s3",
      title: "Custard Apple",
      weight: "2 pcs",
      price: 90,
      originalPrice: 120,
      discount: "25%",
      searchTerm: "custard apple",
    },
    {
      id: "s4",
      title: "Cherries",
      weight: "200 g",
      price: 300,
      originalPrice: 350,
      discount: "14%",
      searchTerm: "cherries",
    },
    {
      id: "s5",
      title: "Litchi",
      weight: "500 g",
      price: 150,
      originalPrice: 200,
      discount: "25%",
      searchTerm: "litchi",
    },
    {
      id: "s6",
      title: "Plum",
      weight: "250 g",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "plum fruit",
    },
    {
      id: "s7",
      title: "Peach",
      weight: "4 pcs",
      price: 140,
      originalPrice: 180,
      discount: "22%",
      searchTerm: "peach fruit",
    },
    {
      id: "s8",
      title: "Mango (Banganapalli)",
      weight: "1 kg",
      price: 150,
      originalPrice: 200,
      discount: "25%",
      searchTerm: "banganapalli",
    },
    {
      id: "s9",
      title: "Mango (Totapuri)",
      weight: "1 kg",
      price: 100,
      originalPrice: 130,
      discount: "23%",
      searchTerm: "totapuri mango",
    },
    {
      id: "s10",
      title: "Mango (Sindhura)",
      weight: "1 kg",
      price: 120,
      originalPrice: 160,
      discount: "25%",
      searchTerm: "sindhura mango",
    },
    {
      id: "s11",
      title: "Summer Jackfruit",
      weight: "1 kg",
      price: 110,
      originalPrice: 150,
      discount: "26%",
      searchTerm: "jackfruit piece",
    },
    {
      id: "s12",
      title: "Jamun (Naval Pazham)",
      weight: "250 g",
      price: 90,
      originalPrice: 120,
      discount: "25%",
      searchTerm: "jamun fruit",
    },
    {
      id: "s13",
      title: "Star Fruit",
      weight: "250 g",
      price: 80,
      originalPrice: 110,
      discount: "27%",
      searchTerm: "star fruit",
    },
    {
      id: "s14",
      title: "Passion Fruit",
      weight: "250 g",
      price: 150,
      originalPrice: 190,
      discount: "21%",
      searchTerm: "passion fruit",
    },
    {
      id: "s15",
      title: "Mulberries",
      weight: "100 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "mulberries",
    },
    {
      id: "s16",
      title: "Wood Apple",
      weight: "1 pc",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "wood apple",
    },
    {
      id: "s17",
      title: "Water Caltrop",
      weight: "500 g",
      price: 90,
      originalPrice: 125,
      discount: "28%",
      searchTerm: "water caltrop",
    },
    {
      id: "s18",
      title: "Phalsa",
      weight: "200 g",
      price: 70,
      originalPrice: 95,
      discount: "26%",
      searchTerm: "phalsa fruit",
    },
    {
      id: "s19",
      title: "Persimmon",
      weight: "2 pcs",
      price: 180,
      originalPrice: 240,
      discount: "25%",
      searchTerm: "persimmon",
    },
    {
      id: "s20",
      title: "Green Almonds",
      weight: "100 g",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "green almonds",
    },
    {
      id: "s21",
      title: "Nungu (Ice Apple)",
      weight: "6 pcs",
      price: 100,
      originalPrice: 130,
      discount: "23%",
      searchTerm: "ice apple",
    },
    {
      id: "s22",
      title: "Rambutan",
      weight: "250 g",
      price: 160,
      originalPrice: 200,
      discount: "20%",
      searchTerm: "rambutan",
    },
    {
      id: "s23",
      title: "Mangosteen",
      weight: "250 g",
      price: 220,
      originalPrice: 280,
      discount: "21%",
      searchTerm: "mangosteen",
    },
    {
      id: "s24",
      title: "Rose Apple",
      weight: "250 g",
      price: 130,
      originalPrice: 170,
      discount: "23%",
      searchTerm: "rose apple",
    },
    {
      id: "s25",
      title: "Bael Fruit",
      weight: "1 pc",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "bael fruit",
    },
    {
      id: "s26",
      title: "Mango (Neelam)",
      weight: "1 kg",
      price: 120,
      originalPrice: 150,
      discount: "20%",
      searchTerm: "neelam mango",
    },
    {
      id: "s27",
      title: "Mango (Malgova)",
      weight: "1 kg",
      price: 180,
      originalPrice: 240,
      discount: "25%",
      searchTerm: "malgova mango",
    },
    {
      id: "s28",
      title: "Mango (Imam Pasand)",
      weight: "1 kg",
      price: 250,
      originalPrice: 320,
      discount: "21%",
      searchTerm: "imam pasand mango",
    },
    {
      id: "s29",
      title: "Sugarcane",
      weight: "1 pc",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "sugarcane",
    },
    {
      id: "s30",
      title: "Indian Jujube (Elendhai)",
      weight: "250 g",
      price: 50,
      originalPrice: 70,
      discount: "28%",
      searchTerm: "indian jujube",
    },
    {
      id: "s31",
      title: "Bilimbi",
      weight: "200 g",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "bilimbi fruit",
    },
    {
      id: "s32",
      title: "Karonda",
      weight: "200 g",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "karonda fruit",
    },
    {
      id: "s33",
      title: "Water Apple",
      weight: "250 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "water apple",
    },
    {
      id: "s34",
      title: "Tadgola (Ice Apple)",
      weight: "12 pcs",
      price: 180,
      originalPrice: 240,
      discount: "25%",
      searchTerm: "tadgola",
    },
    {
      id: "s35",
      title: "Green Mango (Raw)",
      weight: "500 g",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "raw green mango",
    },
  ],
  "trusted-organic": [
    {
      id: "o1",
      title: "Organic Tomato",
      weight: "500 g",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "organic tomato",
    },
    {
      id: "o2",
      title: "Organic Potato",
      weight: "1 kg",
      price: 50,
      originalPrice: 65,
      discount: "23%",
      searchTerm: "organic potato",
    },
    {
      id: "o3",
      title: "Organic Onion",
      weight: "1 kg",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "organic onion",
    },
    {
      id: "o4",
      title: "Organic Carrot",
      weight: "500 g",
      price: 35,
      originalPrice: 50,
      discount: "30%",
      searchTerm: "organic carrot",
    },
    {
      id: "o5",
      title: "Organic Spinach\n(Palak)",
      weight: "1 bunch",
      price: 25,
      originalPrice: 35,
      discount: "28%",
      searchTerm: "organic spinach",
    },
    {
      id: "o6",
      title: "Organic Cauliflower",
      weight: "1 pc",
      price: 55,
      originalPrice: 75,
      discount: "26%",
      searchTerm: "organic cauliflower",
    },
    {
      id: "o7",
      title: "Organic Bananas",
      weight: "500 g",
      price: 40,
      originalPrice: 50,
      discount: "20%",
      searchTerm: "organic bananas",
    },
    {
      id: "o8",
      title: "Organic Lemon",
      weight: "200 g",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "organic lemon",
    },
    {
      id: "o9",
      title: "Organic Ginger",
      weight: "200 g",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "organic ginger",
    },
    {
      id: "o10",
      title: "Organic Garlic",
      weight: "200 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "organic garlic",
    },
    {
      id: "o11",
      title: "Organic Chilli",
      weight: "100 g",
      price: 25,
      originalPrice: 35,
      discount: "28%",
      searchTerm: "organic green chilli",
    },
    {
      id: "o12",
      title: "Organic Coriander",
      weight: "1 bunch",
      price: 20,
      originalPrice: 30,
      discount: "33%",
      searchTerm: "organic coriander",
    },
    {
      id: "o13",
      title: "Organic Mint",
      weight: "1 bunch",
      price: 18,
      originalPrice: 25,
      discount: "28%",
      searchTerm: "organic mint leaves",
    },
    {
      id: "o14",
      title: "Organic Curry Leafe",
      weight: "50 g",
      price: 15,
      originalPrice: 20,
      discount: "25%",
      searchTerm: "organic curry leaf",
    },
    {
      id: "o15",
      title: "Organic Bottle Gourd",
      weight: "1 pc",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "organic bottle gourd",
    },
    {
      id: "o16",
      title: "Organic Bitter Gourd",
      weight: "250 g",
      price: 35,
      originalPrice: 50,
      discount: "30%",
      searchTerm: "organic bitter gourd",
    },
    {
      id: "o17",
      title: "Organic Ash Gourd",
      weight: "500 g",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "organic ash gourd",
    },
    {
      id: "o18",
      title: "Organic Drumstick",
      weight: "2 pcs",
      price: 25,
      originalPrice: 35,
      discount: "28%",
      searchTerm: "organic drumstick",
    },
    {
      id: "o19",
      title: "Organic Apple",
      weight: "4 pcs",
      price: 160,
      originalPrice: 210,
      discount: "23%",
      searchTerm: "organic apple",
    },
    {
      id: "o20",
      title: "Organic Papaya",
      weight: "1 pc",
      price: 70,
      originalPrice: 95,
      discount: "26%",
      searchTerm: "organic papaya",
    },
    {
      id: "o21",
      title: "Organic Pomegranate",
      weight: "2 pcs",
      price: 140,
      originalPrice: 190,
      discount: "26%",
      searchTerm: "organic pomegranate",
    },
    {
      id: "o22",
      title: "Organic Sweet Lime",
      weight: "4 pcs",
      price: 90,
      originalPrice: 120,
      discount: "25%",
      searchTerm: "organic sweet lime",
    },
    {
      id: "o23",
      title: "Organic Beetroot",
      weight: "500 g",
      price: 35,
      originalPrice: 50,
      discount: "30%",
      searchTerm: "organic beetroot",
    },
    {
      id: "o24",
      title: "Organic Radish",
      weight: "500 g",
      price: 30,
      originalPrice: 40,
      discount: "25%",
      searchTerm: "organic radish",
    },
    {
      id: "o25",
      title: "Organic Bhindi",
      weight: "250 g",
      price: 25,
      originalPrice: 35,
      discount: "28%",
      searchTerm: "organic lady finger",
    },
    {
      id: "o26",
      title: "Organic Sweet Potato",
      weight: "500 g",
      price: 50,
      originalPrice: 65,
      discount: "23%",
      searchTerm: "organic sweet potato",
    },
    {
      id: "o27",
      title: "Organic Garlic (Peeled)",
      weight: "100 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "organic peeled garlic",
    },
    {
      id: "o28",
      title: "Organic Turmeric (Fresh)",
      weight: "200 g",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "organic fresh turmeric",
    },
    {
      id: "o29",
      title: "Organic Cabbage",
      weight: "1 pc",
      price: 45,
      originalPrice: 60,
      discount: "25%",
      searchTerm: "organic cabbage",
    },
    {
      id: "o30",
      title: "Organic Capsicum",
      weight: "250 g",
      price: 40,
      originalPrice: 55,
      discount: "27%",
      searchTerm: "organic capsicum",
    },
    {
      id: "o31",
      title: "Organic French Beans",
      weight: "250 g",
      price: 35,
      originalPrice: 50,
      discount: "30%",
      searchTerm: "organic french beans",
    },
    {
      id: "o32",
      title: "Organic Green Peas",
      weight: "250 g",
      price: 60,
      originalPrice: 80,
      discount: "25%",
      searchTerm: "organic green peas",
    },
    {
      id: "o33",
      title: "Organic Spring Onion",
      weight: "1 bunch",
      price: 25,
      originalPrice: 35,
      discount: "28%",
      searchTerm: "organic spring onion",
    },
    {
      id: "o34",
      title: "Organic Curry Leaves",
      weight: "50 g",
      price: 20,
      originalPrice: 30,
      discount: "33%",
      searchTerm: "organic fresh curry leaves",
    },
    {
      id: "o35",
      title: "Organic Mint Leaves",
      weight: "1 bunch",
      price: 25,
      originalPrice: 35,
      discount: "28%",
      searchTerm: "organic fresh mint leaves",
    },
  ],
};

const CategoryPage = ({ catId, cart, setCart, setSelectedProductId }) => {
  const [activeCategory, setActiveCategory] = useState(
    catId || "fresh-vegetables",
  );
  const [products, setProducts] = useState(
    PRODUCTS_BY_CATEGORY[activeCategory] ||
      PRODUCTS_BY_CATEGORY["fresh-vegetables"] ||
      [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (catId && PRODUCTS_BY_CATEGORY[catId]) {
      setActiveCategory(catId);
    }
  }, [catId]);

  useEffect(() => {
    let isMounted = true;
    const fetchImages = async () => {
      setLoading(true);
      const unsplashKey =
        import.meta.env.VITE_UNSPLASH_KEY ||
        "nAD7HQWPN5aRSMbA_VbDJ9Wf-rYIrmAF2RdzT4p-qlw";

      const targetProducts = PRODUCTS_BY_CATEGORY[activeCategory] || [];
      if (targetProducts.length === 0) {
        if (isMounted) {
          setProducts([]);
          setLoading(false);
        }
        return;
      }

      try {
        const results = await Promise.all(
          targetProducts.map(async (prod) => {
            try {
              // Appending "vegetable" or "fruit" or "fresh" to the query can help Unsplash find exact matches
              const query = encodeURIComponent(prod.searchTerm + " food fresh");
              const res = await fetch(
                `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashKey}&per_page=1`,
              );
              if (!res.ok) throw new Error("API Limit or Network Error");
              const data = await res.json();

              if (data && data.results && data.results.length > 0) {
                const photo = data.results[0];
                const alt = (
                  photo.alt_description ||
                  photo.description ||
                  ""
                ).toLowerCase();
                const tags = photo.tags
                  ? photo.tags.map((t) => t.title.toLowerCase())
                  : [];

                // Ensure exactness by checking if the significant words of searchTerm
                // are actually present in the image description or tags
                const termWords = prod.searchTerm
                  .toLowerCase()
                  .split(" ")
                  .filter((w) => w.length > 2);
                const isExact = termWords.every(
                  (w) => alt.includes(w) || tags.some((t) => t.includes(w)),
                );

                if (isExact) {
                  return { ...prod, image: photo.urls.small };
                }
              }
              // Fallback if no exact search match: dont include that product
              return null;
            } catch (error) {
              console.error("Error fetching image for", prod.title);
              return null;
            }
          }),
        );

        if (isMounted) {
          // Filter out the products that returned null (no image)
          setProducts(results.filter((p) => p !== null));
        }
      } catch (error) {
        console.error("Critical error in fetching images", error);
        if (isMounted) {
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
    };
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
        <div className="category-header">Stock up on daily essentials</div>

        <div className="category-body">
          {/* Sidebar Area with its own scroll */}
          <div className="category-sidebar">
            {CATEGORIES.map((cat) => (
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
                        <img src={product.image} alt={product.title} />
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
                          {/* Optional "2 options" text mock like the screenshot */}
                          {product.id === "v5" && !qty && (
                            <div className="add-options-text">2 options</div>
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

export default CategoryPage;

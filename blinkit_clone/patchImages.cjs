const fs = require("fs");

const imagesData = JSON.parse(fs.readFileSync("pharma_images.json", "utf8"));
let jsxContent = fs.readFileSync("src/PharmaPage.jsx", "utf8");

const regex =
  /const PHARMA_PRODUCTS_BY_CATEGORY = \{[\s\S]*?\};\n\nconst PharmaPage/;
const newObjectStr = `const PHARMA_PRODUCTS_BY_CATEGORY = ${JSON.stringify(imagesData, null, 2)};\n\nconst PharmaPage`;

jsxContent = jsxContent.replace(regex, newObjectStr);

fs.writeFileSync("src/PharmaPage.jsx", jsxContent);
console.log(
  "Successfully patched PharmaPage.jsx with new exactly-matched product images.",
);

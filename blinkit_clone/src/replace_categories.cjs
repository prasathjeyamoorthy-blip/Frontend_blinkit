const fs = require("fs");

let b = fs.readFileSync("CategoryPage.jsx", "utf8");

// Replace the PRODUCTS_BY_CATEGORY block
let startIdx = b.indexOf("export const PRODUCTS_BY_CATEGORY = {");
let endIdx = b.indexOf(
  "const CategoryPage = ({ catId, cart, setCart, setSelectedProductId }) => {",
);
if (startIdx !== -1 && endIdx !== -1) {
  b =
    b.slice(0, startIdx) +
    'import { GROCERY_PRODUCTS_BY_CATEGORY as PRODUCTS_BY_CATEGORY } from "./grocery_data_loc.jsx";\nexport { PRODUCTS_BY_CATEGORY };\n\n' +
    b.slice(endIdx);
}

// Replace the fetchImages useEffect hook
let effectStart = b.indexOf(
  "  useEffect(() => {\n    let isMounted = true;\n    const fetchImages = async () => {\n      setLoading(true);",
);
let effectEnd = b.indexOf("  }, [activeCategory]);", effectStart);

if (effectStart !== -1 && effectEnd !== -1) {
  let effectCompleteEnd = effectEnd + "  }, [activeCategory]);".length;
  let replacement = `  useEffect(() => {
    setLoading(true);
    setProducts(PRODUCTS_BY_CATEGORY[activeCategory] || []);
    setLoading(false);
  }, [activeCategory]);`;
  b = b.slice(0, effectStart) + replacement + b.slice(effectCompleteEnd);
}

fs.writeFileSync("CategoryPage.jsx", b, "utf8");
console.log("Replacements complete!");

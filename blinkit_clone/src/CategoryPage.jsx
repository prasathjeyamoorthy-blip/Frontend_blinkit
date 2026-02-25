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

import { GROCERY_PRODUCTS_BY_CATEGORY as PRODUCTS_BY_CATEGORY } from "./grocery_data_loc.jsx";
export { PRODUCTS_BY_CATEGORY };

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
    setLoading(true);
    setProducts(PRODUCTS_BY_CATEGORY[activeCategory] || []);
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

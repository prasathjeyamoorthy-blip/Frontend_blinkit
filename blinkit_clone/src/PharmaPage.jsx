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

import { PHARMA_PRODUCTS_BY_CATEGORY } from "./pharma_data_loc.jsx";

const PharmaPage = ({
  catId,
  cart,
  setCart,
  setSelectedProductId,
  deliveryDisplay,
}) => {
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

  const deliveryText = deliveryDisplay
    ? `${(deliveryDisplay.replace(/\D/g, "") || "8").trim() || "8"} MINS`
    : "8 MINS";

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

                      <div className="category-product-delivery">
                        ⏱ {deliveryText}
                      </div>

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

import React, { useState, useEffect } from "react";
import "./CategoryPage.css";
import SEOFooter from "./SEOFooter";
import { BABY_PRODUCTS_BY_CATEGORY } from "./baby_data_loc";

const BABY_CATEGORIES = [
  { id: "diapers-more", name: "Diapers & More", icon: "🩲" },
  { id: "bathing-needs", name: "Bathing Needs", icon: "🛁" },
  { id: "baby-wipes", name: "Baby Wipes", icon: "🧻" },
  { id: "baby-food", name: "Baby Food", icon: "🍼" },
  { id: "skin-hair-care", name: "Skin & Hair Care", icon: "🧴" },
];

const BabyCarePage = ({ catId, cart, setCart, setSelectedProductId }) => {
  const [activeCategory, setActiveCategory] = useState(catId || "diapers-more");
  const [products, setProducts] = useState(
    BABY_PRODUCTS_BY_CATEGORY[catId || "diapers-more"] || [],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (catId && BABY_PRODUCTS_BY_CATEGORY[catId]) {
      setActiveCategory(catId);
      setProducts(BABY_PRODUCTS_BY_CATEGORY[catId]);
    }
  }, [catId]);

  useEffect(() => {
    if (BABY_PRODUCTS_BY_CATEGORY[activeCategory]) {
      setProducts(BABY_PRODUCTS_BY_CATEGORY[activeCategory]);
    }
  }, [activeCategory]);

  const handleAdd = (id, e) => {
    e.stopPropagation();
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
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
        <div className="category-header">Buy Baby Care & More Online</div>
        <div className="category-body">
          <div className="category-sidebar">
            {BABY_CATEGORIES.map((cat) => (
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
          <div className="category-product-area">
            <div className="category-product-grid">
              {products.map((product) => {
                const qty = cart[product.id] || 0;
                return (
                  <div
                    key={product.id}
                    className="category-product-card"
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    {product.discount && (
                      <div className="category-product-discount">
                        <span className="discount-pct">{product.discount}</span>
                        <span className="discount-txt">OFF</span>
                      </div>
                    )}
                    <div className="category-product-image">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="category-product-delivery"> 20 MINS</div>
                    <div className="category-product-title">
                      {product.title}
                    </div>
                    <div className="category-product-weight">
                      {product.weight}
                    </div>
                    <div className="category-product-price-row">
                      <div className="category-product-prices">
                        <span className="current-price">₹{product.price}</span>
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
                            <span onClick={(e) => handleRemove(product.id, e)}>
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
              {products.length === 0 && (
                <div className="category-empty">No products found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <SEOFooter />
    </div>
  );
};

export default BabyCarePage;

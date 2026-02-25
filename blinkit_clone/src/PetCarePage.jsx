import React, { useState, useEffect } from "react";
import "./CategoryPage.css"; // Reuse styling
import SEOFooter from "./SEOFooter";

const PET_CATEGORIES = [
  { id: "accessories", name: "Accessories & Other Supplies", icon: "🥣" },
  { id: "cat-needs", name: "Cat Needs", icon: "🐈" },
  { id: "diverse", name: "Diverse Pet Food", icon: "🦜" },
  { id: "dog-needs", name: "Dog Needs", icon: "🐕" },
  { id: "pet-grooming", name: "Pet Grooming", icon: "🧴" },
];

import { PET_PRODUCTS_BY_CATEGORY } from "./data/PetProductsData";
export { PET_PRODUCTS_BY_CATEGORY };

const PetCarePage = ({ catId, cart, setCart, setSelectedProductId }) => {
  const [activeCategory, setActiveCategory] = useState(catId || "accessories");
  const [products, setProducts] = useState(
    PET_PRODUCTS_BY_CATEGORY[activeCategory] ||
      PET_PRODUCTS_BY_CATEGORY["accessories"] ||
      [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (catId && PET_PRODUCTS_BY_CATEGORY[catId]) {
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

      const targetProducts = PET_PRODUCTS_BY_CATEGORY[activeCategory] || [];
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
            // Check if product already has an injected image URL
            if (prod.image) {
              return prod;
            }

            try {
              const query = encodeURIComponent(prod.searchTerm);
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
              // Fallback if no exact search match
              return null;
            } catch (error) {
              console.error("Error fetching image for", prod.title);
              return null;
            }
          }),
        );

        if (isMounted) {
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
        <div className="category-header">
          Buy{" "}
          {PET_CATEGORIES.find((c) => c.id === activeCategory)?.name ||
            "Pet Supplies"}{" "}
          Online
        </div>

        <div className="category-body">
          {/* Sidebar Area with its own scroll */}
          <div className="category-sidebar">
            {PET_CATEGORIES.map((cat) => (
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
                      {product.discount && (
                        <div className="category-product-discount">
                          <span className="discount-pct">
                            {product.discount}
                          </span>
                          <span className="discount-txt">OFF</span>
                        </div>
                      )}

                      <div
                        className="category-product-image"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          style={{
                            maxHeight: "120px",
                            maxWidth: "120px",
                            objectFit: "contain",
                          }}
                          src={product.image}
                          alt={product.title}
                        />
                      </div>

                      <div className="category-product-delivery">⏱ 20 MINS</div>

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
                          {product.originalPrice &&
                            product.originalPrice !== product.price && (
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

export default PetCarePage;

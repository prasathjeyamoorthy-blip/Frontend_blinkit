import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { products } from "./data/products";
import ProductCard from "./ProductCard";

const ProductDetails = ({
  productId,
  goBack,
  cart,
  setCart,
  isLoggedIn,
  setShowLoginModal,
  deliveryDisplay,
  navigateToProduct,
}) => {
  const [product, setProduct] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find((p) => p.id === productId);
    setProduct(foundProduct);
  }, [productId]);

  if (!product) return <div className="loading-product">Loading...</div>;

  const count = cart[product.id] || 0;
  const deliveryText = deliveryDisplay
    ? `${(deliveryDisplay.replace(/\D/g, "") || "8").trim() || "8"} MINS`
    : product.delivery;

  const addItem = () => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const increase = () => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const decrease = () => {
    setCart((prev) => {
      const current = prev[product.id] || 0;
      const newCount = current - 1;

      if (newCount <= 0) {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      }

      return {
        ...prev,
        [product.id]: newCount,
      };
    });
  };

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  // Random slice for "People also bought"
  const alsoBought = products
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setCursorPosition({ x, y });
  };

  return (
    <div className="product-details-page">
      <div className="pd-breadcrumbs" onClick={goBack}>
        Home / {product.category} / <span>{product.title}</span>
      </div>

      <div className="pd-main">
        {/* Left Side: Images */}
        <div className="pd-left">
          <div
            className="pd-image-container"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.image}
              alt={product.title}
              className="pd-main-img"
            />
            {isZooming && (
              <div
                className="pd-lens"
                style={{
                  left: `${cursorPosition.x}%`,
                  top: `${cursorPosition.y}%`,
                }}
              />
            )}
          </div>
          <div className="pd-thumbnails">
            {/* Show multiple thumbnails to match screenshot; here just repeating same image */}
            <div className="pd-thumb active">
              <img src={product.image} alt="thumb" />
            </div>
            <div className="pd-thumb">
              <img src={product.image} alt="thumb" />
            </div>
            <div className="pd-thumb">
              <img src={product.image} alt="thumb" />
            </div>
            <div className="pd-thumb">
              <img src={product.image} alt="thumb" />
            </div>
            <div className="pd-thumb">
              <img src={product.image} alt="thumb" />
            </div>
          </div>
          <div className="pd-product-info-block">
            <h3>Product Details</h3>
            <div className="pd-info-item">
              <span className="pd-info-label">Unit</span>
              <span className="pd-info-value">{product.quantity}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="pd-right">
          {isZooming && (
            <div className="pd-zoom-container">
              <div
                className="pd-zoomed-img"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                }}
              />
            </div>
          )}

          <div className="pd-header">
            <div className="pd-brand">Blinkit</div>
            <h1 className="pd-title">{product.title}</h1>
            <div className="pd-quantity">{product.quantity}</div>

            <div className="pd-action-row">
              <div className="pd-price-block">
                <span className="pd-mrp">MRP</span>
                <span className="pd-price">₹{product.price}</span>
                <span className="pd-taxes">(Inclusive of all taxes)</span>
              </div>

              <div className="pd-add-btn-wrapper">
                {count === 0 ? (
                  <button
                    className={`add-btn-large ${!isLoggedIn ? "disabled-btn" : ""}`}
                    onClick={addItem}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="counter-large">
                    <button onClick={decrease}>-</button>
                    <span>{count}</span>
                    <button onClick={increase}>+</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pd-why-shop">
            <h3>Why shop from blinkit?</h3>
            <div className="why-item">
              <img
                src="https://cdn.grofers.com/assets/web/blinkit-promises/10_minute_delivery.png"
                alt="Superfast"
              />
              <div>
                <h4>Superfast Delivery</h4>
                <p>
                  Get your order delivered to your doorstep at the earliest from
                  dark stores near you.
                </p>
              </div>
            </div>
            <div className="why-item">
              <img
                src="https://cdn.grofers.com/assets/web/blinkit-promises/Best_Prices_Offers.png"
                alt="Prices"
              />
              <div>
                <h4>Best Prices & Offers</h4>
                <p>
                  Cheaper prices than your local supermarket, great cashback
                  offers to top it off.
                </p>
              </div>
            </div>
            <div className="why-item">
              <img
                src="https://cdn.grofers.com/assets/web/blinkit-promises/Wide_Assortment.png"
                alt="Assortment"
              />
              <div>
                <h4>Wide Assortment</h4>
                <p>
                  Choose from 5000+ products across food, personal care,
                  household & other categories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pd-related">
        {similarProducts.length > 0 && (
          <div className="pd-carousel-section">
            <h2>Similar products</h2>
            <div className="pd-carousel-row">
              {similarProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  cart={cart}
                  setCart={setCart}
                  isLoggedIn={isLoggedIn}
                  openLoginModal={() => setShowLoginModal(true)}
                  deliveryDisplay={deliveryDisplay}
                  setSelectedProductId={navigateToProduct}
                />
              ))}
            </div>
          </div>
        )}

        <div className="pd-carousel-section">
          <h2>People also bought</h2>
          <div className="pd-carousel-row">
            {alsoBought.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                cart={cart}
                setCart={setCart}
                isLoggedIn={isLoggedIn}
                openLoginModal={() => setShowLoginModal(true)}
                deliveryDisplay={deliveryDisplay}
                setSelectedProductId={navigateToProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

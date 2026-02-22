import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { products } from "./data/products";
import ProductCard from "./ProductCard";

const generateExpirySvg = (price) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fdf8" />
  <rect x="20" y="20" width="360" height="360" rx="16" fill="white" stroke="#e5e7eb" stroke-width="2" />
  <circle cx="200" cy="100" r="40" fill="#fef08a" opacity="0.4" />
  <path d="M185 100 L195 110 L215 90" stroke="#ca8a04" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <text x="200" y="180" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#374151" text-anchor="middle">Expiry Date &amp; MRP</text>
  <rect x="60" y="210" width="280" height="40" fill="#f3f4f6" rx="6" />
  <text x="80" y="235" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="start">Mfg. Date:</text>
  <text x="320" y="235" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#111827" text-anchor="end">01 NOV 2023</text>
  <rect x="60" y="260" width="280" height="40" fill="#f3f4f6" rx="6" />
  <text x="80" y="285" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="start">Exp. Date:</text>
  <text x="320" y="285" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#111827" text-anchor="end">31 OCT 2024</text>
  <rect x="60" y="310" width="280" height="40" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="2" rx="6" />
  <text x="80" y="335" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#065f46" text-anchor="start">MRP:</text>
  <text x="320" y="335" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#059669" text-anchor="end">₹ ${price}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

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
  const [activeImage, setActiveImage] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
    cWidth: "100%",
    cHeight: 350,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find((p) => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct) {
      setActiveImage(foundProduct.image);
    }
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
    const container = e.currentTarget;
    const {
      left,
      top,
      width: cWidth,
      height: cHeight,
    } = container.getBoundingClientRect();

    // Lens position: tracks exact mouse inside container
    let lensX = ((e.clientX - left) / cWidth) * 100;
    let lensY = ((e.clientY - top) / cHeight) * 100;

    // Clamp values so it doesn't pop out
    lensX = Math.max(0, Math.min(100, lensX));
    lensY = Math.max(0, Math.min(100, lensY));

    setCursorPosition({
      x: lensX,
      y: lensY,
      cWidth,
      cHeight,
    });
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
              src={activeImage || product.image}
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
            {[
              product.image,
              generateExpirySvg(product.price),
              "/thumb_contents.svg",
              "/thumb_manufacturer.svg",
              "/thumb_fssai.svg",
            ].map((imgUrl, index) => (
              <div
                key={index}
                className={`pd-thumb ${activeImage === imgUrl ? "active" : ""}`}
                onClick={() => setActiveImage(imgUrl)}
              >
                <img src={imgUrl} alt={`thumb-${index}`} />
              </div>
            ))}
          </div>
          <div className="pd-product-info-block">
            <h3>Product Details</h3>
            <div className="pd-info-wrapper">
              <div className="pd-info-item">
                <span className="pd-info-label">Unit</span>
                <span className="pd-info-value">{product.quantity}</span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">Description</span>
                <span className="pd-info-value">
                  Premium quality {product.title}, sourced carefully to ensure
                  the best taste and freshness. Ideal for your everyday needs.
                </span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">Shelf Life</span>
                <span className="pd-info-value">12 months</span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">Manufacturer Details</span>
                <span className="pd-info-value">
                  Blinkit Clone Industries Pvt. Ltd.
                  <br />
                  Tech Park, Phase 1, City Center
                  <br />
                  Pincode: 123456, India
                </span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">Disclaimer</span>
                <span className="pd-info-value">
                  Every effort is made to maintain the accuracy of all
                  information. However, actual product packaging and materials
                  may contain more and/or different information. It is
                  recommended not to solely rely on the information presented.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="pd-right">
          {isZooming && (
            <div
              className="pd-zoom-container"
              style={{
                width: cursorPosition.cWidth,
                height: cursorPosition.cHeight,
                overflow: "hidden",
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={activeImage || product.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: "scale(2.5)",
                  transformOrigin: `${cursorPosition.x}% ${cursorPosition.y}%`,
                }}
                alt="Zoomed"
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

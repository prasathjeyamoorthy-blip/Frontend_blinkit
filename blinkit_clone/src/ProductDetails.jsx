import { useEffect, useState, useMemo } from "react";
import "./ProductDetails.css";
import ProductCard from "./ProductCard";

function hashStringToSeed(input) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const generateExpirySvg = (product) => {
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
  <text x="320" y="335" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#059669" text-anchor="end">₹ ${product.price}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const generateContentsSvg = (product) => {
  const isFood = [
    "fresh-vegetables",
    "fresh-fruits",
    "cat-needs",
    "dog-needs",
    "diverse",
    "baby-food",
    undefined,
  ].includes(product.category);
  const contentName =
    product.title.length > 20
      ? product.title.substring(0, 20) + "..."
      : product.title;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fdf8" />
  <rect x="20" y="20" width="360" height="360" rx="16" fill="white" stroke="#e5e7eb" stroke-width="2" />
  <circle cx="200" cy="80" r="30" fill="#dbeafe" opacity="0.6" />
  <text x="200" y="90" font-family="Arial" font-size="30" fill="#2563eb" text-anchor="middle" font-weight="bold">+</text>
  <text x="200" y="140" font-family="Arial" font-size="20" font-weight="bold" fill="#374151" text-anchor="middle">Ingredients &amp; Contents</text>
  <text x="200" y="165" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle">${contentName}</text>
  <rect x="40" y="190" width="320" height="1" fill="#e5e7eb" />
  <text x="200" y="220" font-family="Arial" font-size="16" font-weight="bold" fill="#111827" text-anchor="middle">${isFood ? "Nutritional Info (per 100g/ml)" : "Materials &amp; Composition"}</text>
  <text x="200" y="250" font-family="Arial" font-size="14" fill="#4b5563" text-anchor="middle">${isFood ? `Energy: ${Math.floor(product.price * 0.3 + 10)} kcal | Protein: ${product.title.length % 15}g` : "High Quality Materials"}</text>
  <text x="200" y="275" font-family="Arial" font-size="14" fill="#4b5563" text-anchor="middle">${isFood ? `Carbs: ${(product.title.length * 2) % 30}g | Fats: ${product.price % 8}g` : "Safe &amp; Tested"}</text>
  <rect x="40" y="300" width="320" height="1" fill="#e5e7eb" />
  <text x="200" y="330" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">Based on standard formulation</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const generateManufacturerSvg = (product) => {
  const brand = (product.title.split(" ")[0] || "Blinkit").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fdf8" />
  <rect x="20" y="20" width="360" height="360" rx="16" fill="white" stroke="#e5e7eb" stroke-width="2" />
  <path d="M180 50 L220 50 L220 90 L200 110 L180 90 Z" fill="#fca5a5" opacity="0.8" />
  <text x="200" y="150" font-family="Arial" font-size="20" font-weight="bold" fill="#374151" text-anchor="middle">Manufacturer Details</text>
  <text x="200" y="190" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle">Manufactured &amp; Marketed by:</text>
  <text x="200" y="220" font-family="Arial" font-size="16" font-weight="bold" fill="#111827" text-anchor="middle">${brand} INDUSTRIES PVT. LTD.</text>
  <text x="200" y="250" font-family="Arial" font-size="14" fill="#4b5563" text-anchor="middle">Tech Park, Phase ${(product.price % 5) + 1}, City Center</text>
  <text x="200" y="275" font-family="Arial" font-size="14" fill="#4b5563" text-anchor="middle">Pincode: 100${(product.price % 100) + 10}, India</text>
  <text x="200" y="315" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle">Customer Care: 1800-${(product.price % 800) + 100}-${((product.price * 10) % 9000) + 1000}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const generateFssaiSvg = (product) => {
  const license = `100${Math.floor(((product.price * 11) % 900000000) + 100000000)}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <rect width="400" height="400" fill="#f8fdf8" />
  <rect x="20" y="20" width="360" height="360" rx="16" fill="white" stroke="#e5e7eb" stroke-width="2" />
  <path d="M160 80 L240 80 L240 140 L200 180 L160 140 Z" fill="#d1fae5" opacity="0.8" />
  <path d="M185 120 L195 130 L215 110" stroke="#059669" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <text x="200" y="220" font-family="Arial" font-size="20" font-weight="bold" fill="#374151" text-anchor="middle">FSSAI License Info</text>
  <text x="200" y="260" font-family="Arial" font-size="16" font-weight="bold" fill="#065f46" text-anchor="middle">License No. ${license}</text>
  <text x="200" y="300" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle">Quality Assured</text>
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
  allProducts,
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
    const foundProduct = allProducts.find((p) => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct) {
      setActiveImage(foundProduct.image);
    }
  }, [productId, allProducts]);

  const categoryProducts = useMemo(() => {
    if (!product) return [];
    return allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id,
    );
  }, [allProducts, product]);

  const similarProducts = useMemo(() => {
    return categoryProducts.slice(0, 6);
  }, [categoryProducts]);

  const alsoBought = useMemo(() => {
    // Random slice for "People also bought" from the same category
    const remainingCategoryProducts = categoryProducts.slice(6);
    const poolForAlsoBought =
      remainingCategoryProducts.length > 0
        ? remainingCategoryProducts
        : categoryProducts;
    const seed = hashStringToSeed(`${productId}:${product?.category || ""}`);
    const rand = mulberry32(seed);
    const shuffled = poolForAlsoBought.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 6);
  }, [categoryProducts, productId, product]);

  if (!product) return <div className="loading-product">Loading...</div>;

  const count = cart[product.id] || 0;
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
              generateExpirySvg(product),
              generateContentsSvg(product),
              generateManufacturerSvg(product),
              generateFssaiSvg(product),
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
                <span className="pd-info-value">
                  {product.quantity || product.weight || "1 unit"}
                </span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">Description</span>
                <span className="pd-info-value">
                  Premium quality {product.title}, sourced carefully to ensure
                  the best results and satisfaction. Ideal for your everyday
                  needs.
                </span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">Shelf Life</span>
                <span className="pd-info-value">
                  {["fresh-vegetables", "fresh-fruits"].includes(
                    product.category,
                  )
                    ? "3 days"
                    : "12 months"}
                </span>
              </div>
              <div className="pd-info-item">
                <span className="pd-info-label">Manufacturer Details</span>
                <span className="pd-info-value">
                  {(product.title.split(" ")[0] || "Blinkit").toUpperCase()}{" "}
                  INDUSTRIES PVT. LTD.
                  <br />
                  Tech Park, Phase {(product.price % 5) + 1}, City Center
                  <br />
                  Pincode: 100{(product.price % 100) + 10}, India
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
            <div className="pd-brand">
              {product.title.split(" ")[0] || "Blinkit"}
            </div>
            <h1 className="pd-title">{product.title}</h1>
            <div className="pd-quantity">
              {product.quantity || product.weight || "1 unit"}
            </div>

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

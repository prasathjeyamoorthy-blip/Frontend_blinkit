import { useRef } from "react";
import ProductCard from "./ProductCard";
import { products } from "./data/products";
import "./ProductSection.css";

const ProductSection = ({
  cart,
  setCart,
  isLoggedIn,
  setShowLogin,
  deliveryDisplay,
  setSelectedProductId,
}) => {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="section-wrapper">
      {categories.map((category) => (
        <CategoryRow
          key={category}
          title={category}
          products={products.filter((p) => p.category === category)}
          cart={cart}
          setCart={setCart}
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}
          deliveryDisplay={deliveryDisplay}
          setSelectedProductId={setSelectedProductId}
        />
      ))}
    </div>
  );
};

const CategoryRow = ({
  title,
  products,
  cart,
  setCart,
  setShowLogin,
  isLoggedIn,
  deliveryDisplay,
  setSelectedProductId,
}) => {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  return (
    <div className="category-section">
      <div className="section-header">
        <h2>{title}</h2>
        <span className="see-all">see all</span>
      </div>

      <div className="products-container">
        <button className="scroll-btn left" onClick={scrollLeft}>
          ‹
        </button>

        <div className="products-row" ref={scrollRef}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              openLoginModal={() => setShowLogin(true)}
              deliveryDisplay={deliveryDisplay}
              setSelectedProductId={setSelectedProductId}
            />
          ))}
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>
          ›
        </button>
      </div>
    </div>
  );
};

export default ProductSection;

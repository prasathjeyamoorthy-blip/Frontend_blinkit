import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  product,
  cart,
  setCart,
  isLoggedIn = false,
  openLoginModal,
}) => {
  const count = cart[product.id] || 0;

  console.log("ID:", product.id);

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

  return (
    <div className="product-card">
      <div className="top-section">
        <img src={product.image} alt={product.title} loading="lazy" />

        <div className="delivery">⏱ {product.delivery}</div>

        <h4>{product.title}</h4>
        <p>{product.quantity}</p>
      </div>

      <div className="bottom">
        <span className="price">₹{product.price}</span>

        {count === 0 ? (
          <button
            className={`add-btn ${!isLoggedIn ? "disabled-btn" : ""}`}
            onClick={addItem}
          >
            ADD
          </button>
        ) : (
          <div className="counter">
            <button onClick={decrease}>-</button>
            <span>{count}</span>
            <button onClick={increase}>+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

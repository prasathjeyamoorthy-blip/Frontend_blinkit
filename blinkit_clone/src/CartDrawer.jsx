import { useState } from "react";
import "./CartDrawer.css";
import { FiFileText, FiTruck, FiInfo, FiUser } from "react-icons/fi";

const CartDrawer = ({
  cart,
  products,
  setCart,
  closeCart,
  openAddress,
  deliveryDisplay = "18 minutes",
}) => {
  const tipOptions = [
    { amount: 20, image: "/20_tip.webp" },
    { amount: 30, image: "/30_tip.avif" },
    { amount: 50, image: "/50_tip.avif" },
    { amount: -1, image: "/custom_tip.webp", label: "Custom" },
  ];

  const [tip, setTip] = useState(0);
  const [donation, setDonation] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const cartItems = products.filter((p) => cart[p.id]);

  const increase = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decrease = (id) => {
    setCart((prev) => {
      const newCount = prev[id] - 1;
      if (newCount <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: newCount };
    });
  };

  /* ---------------- CALCULATIONS ---------------- */

  // Actual selling total
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item.id],
    0,
  );

  // Original MRP total
  const originalTotal = Math.round(
    cartItems.reduce((sum, item) => sum + item.price * 1.1 * cart[item.id], 0),
  );

  // Savings
  const savings = Math.round(originalTotal - itemsTotal);

  const deliveryCharge = 0;
  const handlingCharge = 2;

  const grandTotal = Math.round(
    itemsTotal + handlingCharge + tip + (donation ? 1 : 0),
  );

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  /* ---------------- UI ---------------- */

  return (
    <div className="cart-drawer">
      <div className="cart-header">
        <h2>My Cart</h2>
        <span onClick={closeCart} style={{ cursor: "pointer" }}>
          ✕
        </span>
      </div>

      <div className="cart-scroll">
        {/* Savings Banner */}
        <div className="savings-banner">
          <span>Your total savings</span>
          <strong>₹{savings}</strong>
        </div>

        {/* Delivery Card */}
        <div className="delivery-card">
          <div className="delivery-icon">⏱</div>
          <div>
            <h4>Delivery in {deliveryDisplay}</h4>
            <p>Shipment of {totalItems} items</p>
          </div>
        </div>

        {/* Products */}
        <div className="items-wrapper">
          {cartItems.map((item) => (
            <div key={item.id} className="item-card">
              <img src={item.image} alt={item.title} />

              <div className="item-info">
                <h4>{item.title}</h4>
                <p>{item.quantity}</p>
                <strong>₹{item.price}</strong>
              </div>

              <div className="counter">
                <button onClick={() => decrease(item.id)}>-</button>
                <span>{cart[item.id]}</span>
                <button onClick={() => increase(item.id)}>+</button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="bill-card">
          <h3 className="bill-title">Bill details</h3>

          {/* Items total */}
          <div className="bill-row">
            <div className="bill-left">
              <FiFileText size={18} />
              <span>Items total</span>
              {savings > 0 && (
                <span className="saved-badge">Saved ₹{savings}</span>
              )}
            </div>

            <div className="bill-right">
              <span className="strike">₹{originalTotal}</span>
              <span className="price">₹{itemsTotal}</span>
            </div>
          </div>

          {/* Delivery */}
          <div className="bill-row">
            <div className="bill-left">
              <FiTruck size={18} />
              <span>Delivery charge</span>
            </div>
            <div className="bill-right free">FREE</div>
          </div>

          {/* Handling */}
          <div className="bill-row">
            <div className="bill-left">
              <FiInfo size={18} />
              <span>Handling charge</span>
            </div>
            <div className="bill-right">₹{handlingCharge}</div>
          </div>

          {/* Tip */}
          {tip > 0 && (
            <div className="bill-row">
              <div className="bill-left">
                <FiUser size={18} />
                <span>Tip for your delivery partner</span>
              </div>
              <div className="bill-right">₹{tip}</div>
            </div>
          )}

          {/* Grand total */}
          <div className="bill-row grand">
            <span>Grand total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        {/* Feeding India Donation */}
        <div className="donation-card">
          <div className="donation-left">
            <img
              src="/donation.png"
              alt="Feeding India"
              className="donation-img"
            />

            <div className="donation-text">
              <h4>Feeding India donation</h4>
              <p>
                Working towards a malnutrition free India.
                <span className="read-more"> read more</span>
              </p>
            </div>
          </div>

          <div className="donation-right">
            <span className="donation-price">₹1</span>

            <input
              type="checkbox"
              checked={donation}
              onChange={() => setDonation(!donation)}
              className="donation-checkbox"
            />
          </div>
        </div>

        {/* Tip Section */}
        {/* Tip Section */}
        {/* Tip Section */}
        <div className="tip-card">
          <div className="tip-header">
            <div>
              <h4>Tip your delivery partner</h4>
              <p>
                Your kindness means a lot! 100% of your tip will go directly to
                your delivery partner.
              </p>
            </div>

            {tip > 0 && !showCustom && (
              <div className="tip-amount">
                ₹ {tip}
                <span className="clear-tip" onClick={() => setTip(0)}>
                  Clear
                </span>
              </div>
            )}
          </div>

          {/* NORMAL TIP OPTIONS */}
          {!showCustom && (
            <div className="tip-options">
              {!showCustom && (
                <div className="tip-options">
                  {tipOptions.map((option) => (
                    <button
                      key={option.amount}
                      className={`tip-btn ${tip === option.amount ? "active" : ""}`}
                      onClick={() => {
                        if (option.amount === -1) {
                          setShowCustom(true);
                          setTip(0);
                        } else {
                          setTip(option.amount);
                          setShowCustom(false);
                        }
                      }}
                    >
                      <img src={option.image} alt="" />
                      {option.label ? option.label : `₹${option.amount}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CUSTOM TIP MODE */}
          {showCustom && (
            <div className="custom-tip-row">
              <button className="tip-btn active">
                <img src="/custom_tip.webp" alt="" />
                Custom
              </button>

              <input
                type="number"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="custom-input"
                placeholder="Enter amount"
              />

              <span
                className={`add-tip ${!customValue ? "close-mode" : ""}`}
                onClick={() => {
                  const value = Number(customValue);

                  if (!customValue || value <= 0) {
                    setShowCustom(false);
                    setCustomValue("");
                    return;
                  }

                  setTip(value);
                  setShowCustom(false);
                  setCustomValue("");
                }}
              >
                {customValue ? "Add" : "Close"}
              </span>
            </div>
          )}
        </div>

        {/* Cancellation Policy */}
        <div className="cancel-card">
          <h4 className="cancel-title">Cancellation Policy</h4>
          <p className="cancel-text">
            Orders cannot be cancelled once packed for delivery. In case of
            unexpected delays, a refund will be provided, if applicable.
          </p>
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="bottom-bar">
        <button className="proceed-btn" onClick={openAddress}>
          <div className="total-section">
            <span className="total-amount">₹{grandTotal}</span>
            <span className="total-label">TOTAL</span>
          </div>

          <div className="proceed-text">
            Proceed <span className="arrow">›</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;

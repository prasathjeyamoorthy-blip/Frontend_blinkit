import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

const Navbar = ({
  cartCount,
  cartTotal,
  openCart,
  isLoggedIn,
  setIsLoggedIn,
  showLoginModal,
  setShowLoginModal,
  setShowCart, // ✅ NEW
  cart, // ✅ NEW
}) => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const suggestions = [
    "curd",
    "chocolate",
    "chips",
    "milk",
    "rice",
    "egg",
    "bread",
    "sugar",
    "butter",
  ];

  const [index, setIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  /* ---------------- SEARCH ANIMATION ---------------- */
  useEffect(() => {
    if (searchValue !== "") return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [searchValue]);

  /* ---------------- CHECK LOGIN ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("blinkitUser");
    if (saved) {
      setIsLoggedIn(true);
      setPhone(saved);
    }
  }, [setIsLoggedIn]);

  const handleLogin = () => {
    if (phone.length !== 10) return;

    localStorage.setItem("blinkitUser", phone);
    setIsLoggedIn(true);
    setLoginSuccess(true);

    setTimeout(() => {
      setShowLoginModal(false);
      setLoginSuccess(false);
    }, 1200);
  };

  const handleLogout = () => {
    localStorage.removeItem("blinkitUser");
    setIsLoggedIn(false);
    setShowAccountDropdown(false);
  };
  console.log("Login Setter:", setShowLoginModal);

  /* ---------------- CART COUNT ---------------- */
  const totalItems = Object.values(cart || {}).reduce(
    (sum, qty) => sum + qty,
    0,
  );

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="logo">
            <span className="blink">blink</span>
            <span className="it">it</span>
          </h1>

          <div className="divider-vertical"></div>

          <div className="location-trigger" onClick={() => setOpen(true)}>
            <p className="delivery-text">Delivery in 8 minutes</p>
            <span className="select-location">
              Select Location <span className="arrow">▼</span>
            </span>
          </div>

          <div className="search-container">
            <span className="search-icon">
              <FiSearch size={20} color="#111" />
            </span>

            {searchValue.length === 0 && (
              <div className="placeholder-mask">
                <div
                  className="placeholder-slider"
                  style={{ transform: `translateY(-${index * 32}px)` }}
                >
                  {suggestions.map((item, i) => (
                    <div key={i} className="placeholder-text">
                      Search "{item}"
                    </div>
                  ))}
                </div>
              </div>
            )}

            <input
              type="text"
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="right-section">
            {!isLoggedIn ? (
              <button
                className="login-btn"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
            ) : (
              <div
                className="account-wrapper"
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              >
                Account ▼
              </div>
            )}

            {/* ---------------- CART BUTTON ---------------- */}
            <div
              className={`cart-btn ${cartCount > 0 ? "active" : ""}`}
              onClick={() => cartCount > 0 && openCart()}
            >
              <FiShoppingCart size={20} />

              {cartCount > 0 ? (
                <div className="cart-info">
                  <span>{cartCount} items</span>
                  <strong>₹{cartTotal}</strong>
                </div>
              ) : (
                <span>My Cart</span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ================= LOGIN MODAL ================= */}
      {showLoginModal && (
        <div className="login-overlay">
          <div className="login-card">
            <div
              className="login-back"
              onClick={() => setShowLoginModal(false)}
            >
              ←
            </div>

            {!loginSuccess ? (
              <>
                <div className="login-logo">
                  <span style={{ color: "#111" }}>blink</span>
                  <span style={{ color: "#16a34a" }}>it</span>
                </div>

                <h2 className="login-title">India's last minute app</h2>

                <p className="login-sub">Log in or Sign up</p>

                <div className="login-input-box">
                  <span>+91</span>
                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="Enter mobile number"
                  />
                </div>

                <button
                  className={`login-continue ${
                    phone.length === 10 ? "active" : ""
                  }`}
                  onClick={handleLogin}
                >
                  Continue
                </button>
              </>
            ) : (
              <div className="success-box">
                <div className="check">✓</div>
                <p>Successfully logged in!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= ACCOUNT DROPDOWN ================= */}
      {showAccountDropdown && (
        <>
          <div
            className="account-backdrop"
            onClick={() => setShowAccountDropdown(false)}
          />

          <div className="account-panel">
            <div className="account-header">
              <p className="account-title">My Account</p>
              <p className="account-number">{phone}</p>
            </div>

            <div className="account-menu">
              <div className="account-item">My Orders</div>
              <div className="account-item">Saved Addresses</div>
              <div className="account-item">My Prescriptions</div>
              <div className="account-item">E-Gift Cards</div>
              <div className="account-item">FAQ's</div>
              <div className="account-item">Account Privacy</div>
              <div className="account-item logout" onClick={handleLogout}>
                Log Out
              </div>
            </div>
          </div>
        </>
      )}

      {/* Overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="backdrop" onClick={() => setOpen(false)}></div>

          {/* Location Modal */}
          <div className="location-overlay">
            <div className="overlay-header">
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#1f2937",
                  letterSpacing: "0.7px",
                  margin: 0,
                }}
              >
                Change Location
              </h3>
            </div>

            <div className="overlay-content">
              <button
                className="detect-btn"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Detect my location
              </button>

              <div className="or-divider">
                <div className="line"></div>
                <span>OR</span>
                <div className="line"></div>
              </div>

              <input
                type="text"
                className="location-input"
                placeholder="search delivery location"
              />
            </div>

            <span className="close-btn" onClick={() => setOpen(false)}>
              ×
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;

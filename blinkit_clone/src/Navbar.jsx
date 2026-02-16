import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    if (searchValue !== "") return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestions.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [searchValue]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          {/* Logo */}
          <h1 className="logo">
            <span className="blink">blink</span>
            <span className="it">it</span>
          </h1>

          <div className="divider-vertical"></div>

          {/* Location */}
          <div className="location-trigger" onClick={() => setOpen(true)}>
            <p className="delivery-text">Delivery in 8 minutes</p>
            <span className="select-location">
              Select Location <span className="arrow">▼</span>
            </span>
          </div>

          {/* Search */}
          <div className="search-container">
            <span className="search-icon">
              <FiSearch size={20} color="#111" />
            </span>

            {/* Hide animation when typing */}
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

          {/* Right Section */}
          <div className="right-section">
            {!isLoggedIn ? (
              <button className="login-btn" onClick={() => setIsLoggedIn(true)}>
                Login
              </button>
            ) : (
              <span className="welcome-text">Hi, User</span>
            )}

            <div
              className={`cart-btn ${!isLoggedIn ? "disabled" : ""}`}
              onClick={() => {
                if (!isLoggedIn) return;
                alert("Opening cart...");
              }}
            >
              <FiShoppingCart size={20} style={{ marginTop: "8px" }} />
              <span
                style={{
                  marginLeft: "10px",
                  marginTop: "8px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                My Cart
              </span>

              {!isLoggedIn && (
                <span className="cart-tooltip">Login to access cart</span>
              )}
            </div>
          </div>
        </div>
      </nav>
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

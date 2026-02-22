import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import LocationMap from "./LocationMap";

const Navbar = ({
  cartCount,
  cartTotal,
  openCart,
  isLoggedIn,
  setIsLoggedIn,
  showLoginModal,
  setShowLoginModal,
  setShowCart,
  cart,
  deliveryDisplay = "8 minutes",
  onLocationUpdate,
  getDeliveryInfoForCoords,
  userLocation,
  deliveryAvailable,
  storeLat,
  storeLng,
  onLogoClick,
}) => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchingLocation, setSearchingLocation] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [pendingLocation, setPendingLocation] = useState(null);

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

  /* ---------------- SEARCH LOCATION (GEOCODE) ---------------- */
  const handleSearchLocation = async () => {
    const query = searchQuery.trim();
    if (!query) return;
    setSearchError(null);
    setSearchingLocation(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
        {
          headers: {
            "Accept-Language": "en",
            "User-Agent": "BlinkitClone/1.0",
          },
        },
      );
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setSearchError("Location not found. Try a different city or area.");
        return;
      }
      const first = data[0];
      const lat = parseFloat(first.lat);
      const lng = parseFloat(first.lon);
      const address = first.display_name || query;
      setPendingLocation({ lat, lng, address });
    } catch (_) {
      setSearchError("Could not search location. Please try again.");
    } finally {
      setSearchingLocation(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="logo" onClick={onLogoClick}>
            <span className="blink">blink</span>
            <span className="it">it</span>
          </h1>

          <div className="divider-vertical"></div>

          <div
            className="location-trigger"
            onClick={() => {
              setLocationError(null);
              setSearchError(null);
              setPendingLocation(null);
              setOpen(true);
            }}
          >
            <p className="delivery-text">Delivery in {deliveryDisplay}</p>
            <span className="select-location" title={userLocation?.address}>
              {userLocation?.address ? (
                <>
                  <span className="location-address-text">
                    {userLocation.address}
                  </span>
                  <span className="arrow">▼</span>
                </>
              ) : (
                <>
                  Select Location <span className="arrow">▼</span>
                </>
              )}
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

            <div className="overlay-content overlay-content-column">
              <div className="overlay-row">
                <button
                  className="detect-btn"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  disabled={detectingLocation || !onLocationUpdate}
                  onClick={async () => {
                    if (!onLocationUpdate) return;
                    setLocationError(null);
                    setDetectingLocation(true);
                    if (!navigator.geolocation) {
                      setLocationError(
                        "Geolocation is not supported by your browser.",
                      );
                      setDetectingLocation(false);
                      return;
                    }
                    navigator.geolocation.getCurrentPosition(
                      async (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        let address = "Current location";
                        try {
                          const res = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
                          );
                          const data = await res.json();
                          if (data.address) {
                            const parts = [
                              data.address.road,
                              data.address.suburb || data.address.neighbourhood,
                              data.address.city ||
                                data.address.town ||
                                data.address.village,
                            ].filter(Boolean);
                            address = parts.length
                              ? parts.join(", ")
                              : data.display_name || address;
                          }
                        } catch (_) {}
                        setPendingLocation({ lat, lng, address });
                        setDetectingLocation(false);
                      },
                      (err) => {
                        setLocationError(
                          err.code === 1
                            ? "Location access denied. Please allow location in browser settings."
                            : "Could not get your location. Please try again.",
                        );
                        setDetectingLocation(false);
                      },
                      {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0,
                      },
                    );
                  }}
                >
                  {detectingLocation ? "Detecting…" : "Detect my location"}
                </button>
                {locationError && (
                  <p
                    className="location-error"
                    style={{
                      color: "#dc2626",
                      fontSize: "13px",
                      marginTop: "8px",
                    }}
                  >
                    {locationError}
                  </p>
                )}

                <div className="or-divider">
                  <div className="line"></div>
                  <span>OR</span>
                  <div className="line"></div>
                </div>

                <div className="location-search-row">
                  <input
                    type="text"
                    className="location-input"
                    placeholder="Search delivery location (e.g. Chennai, Bangalore)"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearchLocation();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="location-search-btn"
                    disabled={searchingLocation || !searchQuery.trim()}
                    onClick={handleSearchLocation}
                  >
                    {searchingLocation ? "Searching…" : "Search"}
                  </button>
                </div>
                {searchError && (
                  <p className="location-error search-err">{searchError}</p>
                )}
              </div>

              {pendingLocation &&
                getDeliveryInfoForCoords &&
                (() => {
                  const info = getDeliveryInfoForCoords(
                    pendingLocation.lat,
                    pendingLocation.lng,
                  );
                  return (
                    <div className="location-confirm-card">
                      {info.deliveryAvailable ? (
                        <>
                          <div className="location-confirm-icon">📍</div>
                          <h4 className="location-confirm-title">
                            Use this location for delivery?
                          </h4>
                          <p className="location-confirm-address">
                            {pendingLocation.address}
                          </p>
                          <div className="location-confirm-badge available">
                            ✓ Delivery in {info.deliveryMinutes} minutes
                          </div>
                          <div className="location-confirm-actions">
                            <button
                              type="button"
                              className="location-confirm-btn primary"
                              onClick={() => {
                                onLocationUpdate(pendingLocation);
                                setPendingLocation(null);
                                setOpen(false);
                              }}
                            >
                              Yes, use this location
                            </button>
                            <button
                              type="button"
                              className="location-confirm-btn secondary"
                              onClick={() => setPendingLocation(null)}
                            >
                              No, let me choose
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="location-confirm-address">
                            {pendingLocation.address}
                          </p>
                          <div className="location-confirm-badge unavailable">
                            Delivery not available in this area
                          </div>
                          <button
                            type="button"
                            className="location-confirm-btn secondary location-confirm-btn-full"
                            onClick={() => setPendingLocation(null)}
                          >
                            Choose different location
                          </button>
                        </>
                      )}
                    </div>
                  );
                })()}

              {userLocation && !pendingLocation && (
                <div className="location-map-section">
                  <div
                    className={`delivery-availability-badge ${deliveryAvailable ? "available" : "unavailable"}`}
                  >
                    {deliveryAvailable ? (
                      <>✓ Delivery available at your location</>
                    ) : (
                      <>Delivery not available in your area</>
                    )}
                  </div>
                  <LocationMap
                    lat={userLocation.lat}
                    lng={userLocation.lng}
                    address={userLocation.address}
                    showStore={true}
                    storeLat={storeLat}
                    storeLng={storeLng}
                  />
                </div>
              )}
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

import React, { useState, useEffect } from "react";
import "./Checkout.css";
import {
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiSearch,
  FiCheck,
} from "react-icons/fi";

const Checkout = ({ cart, products, goBack }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    try {
      const sel = localStorage.getItem("blinkitSelectedAddress");
      if (sel) {
        setSelectedAddress(JSON.parse(sel));
      } else {
        const s = localStorage.getItem("blinkitSavedAddresses");
        if (s) {
          const parsed = JSON.parse(s);
          if (parsed.length > 0) {
            setSelectedAddress(parsed[0]);
          }
        }
      }
    } catch (_) {}
  }, []);

  const cartItems = products.filter((p) => cart[p.id]);

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.price * cart[item.id],
    0,
  );

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const [activePayment, setActivePayment] = useState("UPI");
  const [qrUrl] = useState(() => {
    const randomData = `upi://pay?pa=random${Math.floor(
      Math.random() * 1000000,
    )}@upi&pn=Test&am=${(Math.random() * 100).toFixed(2)}`;

    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=0&data=${encodeURIComponent(
      randomData,
    )}`;
  });
  const [qrRevealed, setQrRevealed] = useState(false);

  const paymentMethods = [
    { id: "Wallets", title: "Wallets" },
    { id: "Cards", title: "Add credit or debit cards" },
    { id: "Netbanking", title: "Netbanking" },
    { id: "UPI", title: "UPI" },
    { id: "Cash", title: "Cash" },
    { id: "PayLater", title: "Pay Later" },
  ];

  const handleGenerateQr = () => {
    setQrRevealed(true);
  };

  return (
    <div className="checkout-page">
      {/* Header */}
      <header className="checkout-header">
        <div className="checkout-logo" onClick={goBack}>
          <span className="logo-blink">blink</span>
          <span className="logo-it">it</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="checkout-container">
        <div className="checkout-left">
          <h2 className="payment-title">Select Payment Method</h2>
          <div className="payment-accordion">
            {paymentMethods.map((method) => (
              <div key={method.id} className="payment-method-container">
                <div
                  className={`payment-method-header ${
                    activePayment === method.id ? "active" : ""
                  }`}
                  onClick={() =>
                    setActivePayment(
                      activePayment === method.id ? null : method.id,
                    )
                  }
                >
                  <span>{method.title}</span>
                  {activePayment === method.id ? (
                    <FiChevronUp className="chevron" />
                  ) : (
                    <FiChevronDown className="chevron" />
                  )}
                </div>

                {activePayment === method.id && (
                  <div className="payment-method-body">
                    {/* WALLETS */}
                    {method.id === "Wallets" && (
                      <div className="wallets-grid">
                        <div className="wallet-card">
                          <div className="wallet-card-top">
                            <div className="wallet-icon-blue">
                              <span>M</span>
                            </div>
                            <FiCheckCircle size={18} color="#d1d5db" />
                          </div>
                          <p className="wallet-name">Mobikwik</p>
                          <p className="wallet-link">LINK</p>
                        </div>
                      </div>
                    )}

                    {/* CARDS */}
                    {method.id === "Cards" && (
                      <div className="cards-section">
                        <div className="cards-box">
                          <div className="cards-box-header">
                            <FiCheckCircle size={18} color="#0d9488" />
                            <span>Add Debit / Credit / ATM Card</span>
                          </div>
                          <div className="card-logos">
                            <div className="card-logo visa">VISA</div>
                            <div className="card-logo mastercard">
                              <div className="mc-circle red"></div>
                              <div className="mc-circle orange"></div>
                            </div>
                            <div className="card-logo rupay">RuPay</div>
                            <div className="card-logo amex">AMEX</div>
                          </div>

                          <div className="card-form">
                            <div className="form-group full-width">
                              <input type="text" placeholder=" " />
                              <label>Name on Card</label>
                            </div>
                            <div className="form-group full-width">
                              <input type="text" placeholder=" " />
                              <label>Card Number</label>
                            </div>
                            <div className="form-row">
                              <div className="form-group half-width">
                                <input type="text" placeholder=" " />
                                <label>Expiry Date (MM/YY)</label>
                              </div>
                              <div className="form-group half-width">
                                <input type="password" placeholder=" " />
                                <label>CVV</label>
                              </div>
                            </div>
                            <div className="form-group full-width">
                              <input type="text" placeholder=" " />
                              <label>Nickname for card (Optional)</label>
                            </div>
                            <button className="card-checkout-btn">
                              Checkout
                            </button>
                          </div>

                          <p className="card-footer-text">
                            We accept Credit and Debit Cards from Visa,
                            Mastercard, Rupay, Pluxee, American Express &
                            Diners.
                          </p>
                          <div className="secure-badges">
                            <span className="badge">PCI DSS</span>
                            <span className="badge">Verified by VISA</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* NETBANKING */}
                    {method.id === "Netbanking" && (
                      <div className="netbanking-section">
                        <div className="bank-grid">
                          {[
                            {
                              id: "HDFC",
                              logo:
                                "/hdfc.avif",
                            },
                            {
                              id: "Kotak",
                              logo:
                                "/kotak.avif",
                            },
                            {
                              id: "ICICI",
                              logo:
                                "/icici.avif",
                            },
                            {
                              id: "SBI",
                              logo:
                                "/sbi.avif",
                            },
                            {
                              id: "Axis",
                              logo:
                                "/axis.avif",
                            },
                          ].map((bank) => (
                            <div key={bank.id} className="bank-card">
                              <div className="bank-card-check">
                                <FiCheckCircle size={14} color="#d1d5db" />
                              </div>
                              <div className="bank-logo-icon">
                                <img
                                  src={bank.logo}
                                  alt={`${bank.id} logo`}
                                  className="bank-logo-img"
                                />
                              </div>
                              <p>{bank.id}</p>
                            </div>
                          ))}
                        </div>
                        <div className="bank-search">
                          <FiSearch size={16} color="#9ca3af" />
                          <input type="text" placeholder="All Banks" />
                          <FiChevronDown size={16} color="#9ca3af" />
                        </div>
                      </div>
                    )}

                    {/* UPI */}
                    {method.id === "UPI" && (
                      <div className="upi-section">
                        <div className="upi-scan-area">
                          <p className="upi-scan-title">Scan QR to pay</p>
                          <p className="upi-scan-desc">
                            Use any UPI app on your phone to scan and pay
                          </p>
                          <div className="upi-apps-row">
                            <div className="upi-app-box">
                              <img
                                src="/gpay.webp"
                                alt="Google Pay"
                                className="upi-app-logo"
                              />
                            </div>
                            <div className="upi-app-box">
                              <img
                                src="/phonepe.webp"
                                alt="PhonePe"
                                className="upi-app-logo"
                              />
                            </div>
                            <div className="upi-app-box">
                              <img
                                src="/paytm.webp"
                                alt="Paytm"
                                className="upi-app-logo upi-app-logo--paytm"
                              />
                            </div>
                            <span className="upi-others">or others</span>
                          </div>

                          <div
                            className={`qr-container ${
                              qrRevealed ? "qr-container-plain" : ""
                            }`}
                          >
                            <img
                              src={qrUrl}
                              alt="UPI QR code"
                              className={`qr-image ${
                                qrRevealed ? "" : "qr-image-dimmed"
                              }`}
                            />
                            {!qrRevealed && (
                              <button
                                className="generate-qr-btn"
                                onClick={handleGenerateQr}
                              >
                                Generate QR
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CASH */}
                    {method.id === "Cash" && (
                      <div className="cash-section">
                        <div className="cash-box">
                          <p>
                            Please keep exact change handy to help us serve you
                            better
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-right">
          {/* Address Block */}
          <div className="checkout-address-block">
            <h3 className="section-title">Delivery Address</h3>
            <p className="address-text">
              {selectedAddress ? (
                <>
                  <span className="address-type">{selectedAddress.type}: </span>
                  {selectedAddress.flat ? selectedAddress.flat + ", " : ""}
                  {selectedAddress.area}
                </>
              ) : (
                "No address selected"
              )}
            </p>
          </div>

          {/* Cart Items Block */}
          <div className="checkout-cart-block">
            <div className="cart-block-header">
              <span className="cart-title">My Cart</span>
              <span className="cart-count">{totalItems} items</span>
            </div>

            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <span className="item-qty">{cart[item.id]}</span>
                  <img src={item.image} alt={item.title} className="item-img" />
                  <div className="item-details">
                    <p className="item-name">{item.title}</p>
                    <p className="item-weight">{item.quantity || "1 unit"}</p>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pay Now Button */}
            <div className="pay-now-container">
              <button
                className={`pay-now-btn ${
                  activePayment === "Cash" ? "" : "pay-now-btn-disabled"
                }`}
                disabled={activePayment !== "Cash"}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;

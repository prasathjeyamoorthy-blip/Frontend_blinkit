import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* Useful Links */}
        <div className="footer-section">
          <h3>Useful Links</h3>
          <div className="footer-columns">
            <ul>
              <li>Blog</li>
              <li>Privacy</li>
              <li>Terms</li>
              <li>FAQs</li>
              <li>Security</li>
              <li>Contact</li>
            </ul>
            <ul>
              <li>Partner</li>
              <li>Franchise</li>
              <li>Seller</li>
              <li>Warehouse</li>
              <li>Deliver</li>
              <li>Resources</li>
            </ul>
            <ul>
              <li>Recipes</li>
              <li>Bistro</li>
              <li>District</li>
              <li>Blinkit Ambulance</li>
            </ul>
          </div>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <div className="category-header">
            <h3>Categories</h3>
            <span className="see-all">see all</span>
          </div>

          <div className="footer-columns">
            <ul>
              <li>Vegetables & Fruits</li>
              <li>Cold Drinks & Juices</li>
              <li>Bakery & Biscuits</li>
              <li>Dry Fruits, Masala & Oil</li>
              <li>Paan Corner</li>
              <li>Pharma & Wellness</li>
              <li>Personal Care</li>
              <li>Magazines</li>
              <li>Electronics & Electricals</li>
              <li>Toys & Games</li>
              <li>Rakhi Gifts</li>
            </ul>

            <ul>
              <li>Dairy & Breakfast</li>
              <li>Instant & Frozen Food</li>
              <li>Sweet Tooth</li>
              <li>Sauces & Spreads</li>
              <li>Organic & Premium</li>
              <li>Cleaning Essentials</li>
              <li>Pet Care</li>
              <li>Kitchen & Dining</li>
              <li>Stationery Needs</li>
              <li>Print Store</li>
            </ul>

            <ul>
              <li>Munchies</li>
              <li>Tea, Coffee & Milk Drinks</li>
              <li>Atta, Rice & Dal</li>
              <li>Chicken, Meat & Fish</li>
              <li>Baby Care</li>
              <li>Home Furnishing & Decor</li>
              <li>Beauty & Cosmetics</li>
              <li>Fashion & Accessories</li>
              <li>Books</li>
              <li>E-Gift Cards</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">

        <p>© Blink Commerce Private Limited, 2016-2026</p>

        <div className="download-section">
          <span>Download App</span>
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="store-badge"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="store-badge"
          />
        </div>

        <div className="social-icons">
          <FaFacebookF />
          <FaXTwitter />
          <FaInstagram />
          <FaLinkedinIn />
          <SiThreads />
        </div>
      </div>

      <div className="footer-disclaimer">
        <p>
          “Blinkit” is owned & managed by "Blink Commerce Private Limited" and
          is not related, linked or interconnected in whatsoever manner or
          nature, to “GROFFR.COM”.
        </p>
      </div>

    </footer>
  );
};

export default Footer;

// PromoSection.jsx
import React from "react";
import "./PromoSection.css";

import Medicine from "../public/medicine.png";
import Petfood from "../public/petfood.png";
import Baby from "../public/babydiapers.png";

const PromoSection = ({ navigateToCategory }) => {
  return (
    <div className="promo-container">
      <div
        className="promo-card"
        style={{ backgroundImage: `url(${Medicine})`, cursor: "pointer" }}
        onClick={() =>
          navigateToCategory && navigateToCategory("adult-diapers")
        }
      >
        <div className="promo-content" style={{ marginRight: "170px" }}>
          <h3>Pharmacy at your doorstep!</h3>
          <p>Cough syrups, pain relief sprays & more</p>
          <button className="promo-btn light">Order Now</button>
        </div>
      </div>

      <div
        className="promo-card"
        style={{ backgroundImage: `url(${Petfood})`, cursor: "pointer" }}
        onClick={() => navigateToCategory && navigateToCategory("accessories")}
      >
        <div className="promo-content" style={{ marginLeft: "130px" }}>
          <h3>Pet care supplies at your door</h3>
          <p>Food, treats, toys & more</p>
          <button className="promo-btn dark">Order Now</button>
        </div>
      </div>

      <div
        className="promo-card"
        style={{ backgroundImage: `url(${Baby})`, cursor: "pointer" }}
        onClick={() => navigateToCategory && navigateToCategory("diapers-more")}
      >
        <div className="promo-content">
          <button
            className="promo-btn dark"
            style={{ marginTop: "100px", marginLeft: "10px" }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;

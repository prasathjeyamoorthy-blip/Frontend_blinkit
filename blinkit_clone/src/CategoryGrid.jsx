// CategoryGrid.jsx
import React from "react";
import "./CategoryGrid.css";
import { categories } from "./data/categories.js";

const CategoryGrid = () => {
  return (
    <div className="category-container" style={{ marginRight: "196px" }}>
      {categories.map((item, index) => (
        <div key={index} className="category-card">
          <div className="category-image">
            <img src={item.image} alt={item.name} />
          </div>
          <p className="category-title">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;

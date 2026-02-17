// Hero.jsx
import React from "react";
import "./Hero.css";
import Fruit from "../public/Fruit.png";

const Hero = () => {
  return (
    <div className="container">
      <section
        className="hero"
        style={{
          backgroundImage: `url(${Fruit})`,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div className="hero-content">
          <h1> Stock up on daily essentials</h1>

          <p style={{ letterSpacing: "0.8px" }}>
            Get farm-fresh goodness & a range of exotic <br />
            fruits, vegetables, eggs & more{" "}
          </p>

          <button className="hero-btn">Shop Now</button>
        </div>
      </section>
    </div>
  );
};

export default Hero;

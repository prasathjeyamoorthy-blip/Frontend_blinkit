import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Navbar";
import Hero from "./Hero.jsx";
import PromoSection from "./PromoSection.jsx";
import CategoryGrid from "./CategoryGrid.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Hero />
      <PromoSection />
      <CategoryGrid />
    </>
  );
}

export default App;

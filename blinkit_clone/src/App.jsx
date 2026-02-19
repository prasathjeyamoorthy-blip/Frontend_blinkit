import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import PromoSection from "./PromoSection";
import CategoryGrid from "./CategoryGrid";
import ProductSection from "./ProductSection";
import CartDrawer from "./CartDrawer.jsx";
import Footer from "./Footer";
import { useEffect } from "react";
import AddressDrawer from "./AddressDrawer";

import { products } from "./data/products";

function App() {
  const [cart, setCart] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const totalPrice = products.reduce(
    (sum, item) => sum + (cart[item.id] || 0) * item.price,
    0,
  );

  useEffect(() => {
    const savedCart = localStorage.getItem("blinkitCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  useEffect(() => {
    if (showCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showCart]);

  useEffect(() => {
    localStorage.setItem("blinkitCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setShowCart={setShowCart}
        cart={cart}
        openCart={() => setShowCart(true)}
        cartCount={totalItems}
        cartTotal={totalPrice}
      />

      <Hero />
      <PromoSection />
      <CategoryGrid />

      <ProductSection
        cart={cart}
        setCart={setCart}
        isLoggedIn={isLoggedIn}
        setShowLogin={setShowLogin}
      />

      {showCart && (
        <>
          <div className="cart-backdrop" onClick={() => setShowCart(false)} />

          <CartDrawer
            cart={cart}
            setCart={setCart}
            closeCart={() => setShowCart(false)}
            openAddress={() => setShowAddress(true)}
          />
          {showAddress && (
            <AddressDrawer closeAddress={() => setShowAddress(false)} />
          )}
        </>
      )}

      <Footer />
    </>
  );
}

export default App;

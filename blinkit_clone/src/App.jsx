import { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import PromoSection from "./PromoSection";
import CategoryGrid from "./CategoryGrid";
import ProductSection from "./ProductSection";
import CartDrawer from "./CartDrawer.jsx";
import Footer from "./Footer";
import AddressDrawer from "./AddressDrawer";
import ProductDetails from "./ProductDetails";
import CategoryPage, { PRODUCTS_BY_CATEGORY } from "./CategoryPage";
import PharmaPage from "./PharmaPage";
import { PHARMA_PRODUCTS_BY_CATEGORY } from "./pharma_data_loc.jsx";
import PetCarePage, { PET_PRODUCTS_BY_CATEGORY } from "./PetCarePage";
import BabyCarePage from "./BabyCarePage";
import { BABY_PRODUCTS_BY_CATEGORY } from "./baby_data_loc";

import { products as baseProducts } from "./data/products";

const allProducts = [
  ...baseProducts,
  ...Object.values(PRODUCTS_BY_CATEGORY).flat(),
  ...Object.values(PHARMA_PRODUCTS_BY_CATEGORY).flat(),
  ...Object.values(PET_PRODUCTS_BY_CATEGORY).flat(),
  ...Object.values(BABY_PRODUCTS_BY_CATEGORY).flat(),
];
import { DELIVERY_ZONES } from "./data/deliveryZones";

const DELIVERY_RADIUS_KM = 20; // Delivery available within this distance from nearest service point

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getNearestWarehouse(lat, lng) {
  let nearest = null;
  let minDist = Infinity;
  for (const w of DELIVERY_ZONES) {
    const d = haversineKm(lat, lng, w.lat, w.lng);
    if (d < minDist) {
      minDist = d;
      nearest = { ...w, distanceKm: d };
    }
  }
  return nearest;
}

function getDeliveryMinutesFromCoords(lat, lng) {
  const nearest = getNearestWarehouse(lat, lng);
  if (!nearest) return 25;
  const extra = Math.min(17, Math.round(nearest.distanceKm * 2));
  return Math.max(8, Math.min(25, 8 + extra));
}

export function isDeliveryAvailable(lat, lng) {
  const nearest = getNearestWarehouse(lat, lng);
  return nearest ? nearest.distanceKm <= DELIVERY_RADIUS_KM : false;
}

export function getNearestStoreCoords(lat, lng) {
  const nearest = getNearestWarehouse(lat, lng);
  return nearest ? { lat: nearest.lat, lng: nearest.lng } : null;
}

export function getDeliveryInfoForCoords(lat, lng) {
  const available = isDeliveryAvailable(lat, lng);
  const deliveryMinutes = getDeliveryMinutesFromCoords(lat, lng);
  return { deliveryMinutes, deliveryAvailable: available };
}

function App() {
  const [cart, setCart] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("productId");
    return id ? parseInt(id, 10) : null;
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || null;
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("productId");
      const cat = params.get("category");
      setSelectedProductId(id ? parseInt(id, 10) : null);
      setSelectedCategory(cat || null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToProduct = (id) => {
    window.history.pushState({}, "", `?productId=${id}`);
    setSelectedProductId(id);
    setSelectedCategory(null);
  };

  const navigateToCategory = (cat) => {
    window.history.pushState({}, "", `?category=${cat}`);
    setSelectedCategory(cat);
    setSelectedProductId(null);
  };

  const navigateToHome = () => {
    window.history.pushState({}, "", "/");
    setSelectedProductId(null);
    setSelectedCategory(null);
  };

  // User location & delivery time (updated when user clicks "Detect my location")
  const [userLocation, setUserLocation] = useState(() => {
    try {
      const saved = localStorage.getItem("blinkitUserLocation");
      if (saved) {
        const data = JSON.parse(saved);
        if (
          data.lat != null &&
          data.lng != null &&
          data.deliveryMinutes != null
        )
          return data;
      }
    } catch (_) {}
    return null;
  });

  const deliveryMinutes = userLocation ? userLocation.deliveryMinutes : 8;
  const deliveryDisplay = `${deliveryMinutes} minutes`;
  const deliveryAvailable = userLocation
    ? isDeliveryAvailable(userLocation.lat, userLocation.lng)
    : null;
  const nearestStore = userLocation
    ? getNearestStoreCoords(userLocation.lat, userLocation.lng)
    : null;

  const onLocationUpdate = useCallback((payload) => {
    const { lat, lng, address, deliveryMinutes: mins } = payload;
    const next = {
      lat,
      lng,
      address: address || "Current location",
      deliveryMinutes:
        mins != null ? mins : getDeliveryMinutesFromCoords(lat, lng),
    };
    setUserLocation(next);
    try {
      localStorage.setItem("blinkitUserLocation", JSON.stringify(next));
    } catch (_) {}
  }, []);

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // Note: All products aggregated to fix cart price computation
  const totalPrice = allProducts.reduce(
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
        deliveryDisplay={deliveryDisplay}
        onLocationUpdate={onLocationUpdate}
        getDeliveryInfoForCoords={getDeliveryInfoForCoords}
        userLocation={userLocation}
        deliveryAvailable={deliveryAvailable}
        storeLat={nearestStore?.lat}
        storeLng={nearestStore?.lng}
        onLogoClick={navigateToHome}
      />

      {selectedCategory ? (
        [
          "adult-diapers",
          "health-wellness",
          "protein-workout",
          "antiseptic",
        ].includes(selectedCategory) ? (
          <PharmaPage
            catId={selectedCategory}
            cart={cart}
            setCart={setCart}
            setSelectedProductId={navigateToProduct}
          />
        ) : [
            "accessories",
            "cat-needs",
            "diverse",
            "dog-needs",
            "pet-grooming",
          ].includes(selectedCategory) ? (
          <PetCarePage
            catId={selectedCategory}
            cart={cart}
            setCart={setCart}
            setSelectedProductId={navigateToProduct}
          />
        ) : [
            "diapers-more",
            "bathing-needs",
            "baby-wipes",
            "baby-food",
            "skin-hair-care",
          ].includes(selectedCategory) ? (
          <BabyCarePage
            catId={selectedCategory}
            cart={cart}
            setCart={setCart}
            setSelectedProductId={navigateToProduct}
          />
        ) : (
          <CategoryPage
            catId={selectedCategory}
            cart={cart}
            setCart={setCart}
            setSelectedProductId={navigateToProduct}
          />
        )
      ) : selectedProductId ? (
        <ProductDetails
          productId={selectedProductId}
          goBack={navigateToHome}
          cart={cart}
          setCart={setCart}
          isLoggedIn={isLoggedIn}
          setShowLoginModal={setShowLoginModal}
          deliveryDisplay={deliveryDisplay}
          navigateToProduct={navigateToProduct}
        />
      ) : (
        <>
          <Hero onShopNow={() => navigateToCategory("fresh-vegetables")} />
          <PromoSection navigateToCategory={navigateToCategory} />
          <CategoryGrid />

          <ProductSection
            cart={cart}
            setCart={setCart}
            isLoggedIn={isLoggedIn}
            setShowLogin={setShowLogin}
            deliveryDisplay={deliveryDisplay}
            setSelectedProductId={navigateToProduct}
          />
        </>
      )}

      {showCart && (
        <>
          <div className="cart-backdrop" onClick={() => setShowCart(false)} />

          <CartDrawer
            cart={cart}
            products={allProducts}
            setCart={setCart}
            closeCart={() => setShowCart(false)}
            openAddress={() => setShowAddress(true)}
            deliveryDisplay={deliveryDisplay}
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

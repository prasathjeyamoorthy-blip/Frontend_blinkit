import React, { useState, useCallback, useEffect } from "react";
import Map, { Marker, NavigationControl, useMap } from "react-map-gl/maplibre";
import { FiMapPin, FiSearch, FiHome, FiBriefcase, FiMap } from "react-icons/fi";
import { MdHotel } from "react-icons/md";
import "maplibre-gl/dist/maplibre-gl.css";
import "./AddAddressForm.css";

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

function MapFlyTo({ latitude, longitude }) {
  const { current: mapRef } = useMap();
  React.useEffect(() => {
    if (!mapRef?.getMap || latitude == null || longitude == null) return;
    const m = mapRef.getMap();
    if (m?.flyTo) m.flyTo({ center: [longitude, latitude], zoom: 15, duration: 600 });
  }, [mapRef, latitude, longitude]);
  return null;
}

const MapPanel = React.memo(function MapPanel({
  searchQuery,
  setSearchQuery,
  setSelectedLocation,
  setSearchError,
  searchError,
  handleSearch,
  selectedLocation,
  goingToCurrent,
  handleGoToCurrent,
}) {
  const mapCenter = selectedLocation
    ? { lng: selectedLocation.lng, lat: selectedLocation.lat }
    : { lng: 80.2707, lat: 13.0827 };

  return (
    <div className="add-address-map-panel">
      <div className="add-address-search-wrap">
        <FiSearch size={16} className="add-address-search-icon" />
        <input
          type="text"
          className="add-address-search-input"
          placeholder="Search 'location'"
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setSearchError(null); }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {searchQuery && (
          <span
            className="add-address-search-clear"
            onClick={() => { setSearchQuery(""); setSelectedLocation(null); }}
          >
            ×
          </span>
        )}
      </div>
      {searchError && <p className="add-address-search-err">{searchError}</p>}
      <div className="add-address-map-wrap">
        <Map
          initialViewState={{
            longitude: mapCenter.lng,
            latitude: mapCenter.lat,
            zoom: 14,
          }}
          mapStyle={MAP_STYLE}
          style={{ width: "100%", height: "100%" }}
          scrollZoom={true}
          dragPan={true}
        >
          {selectedLocation && (
            <>
              <MapFlyTo latitude={selectedLocation.lat} longitude={selectedLocation.lng} />
              <Marker
                longitude={selectedLocation.lng}
                latitude={selectedLocation.lat}
                anchor="bottom"
              >
                <div className="add-address-marker" />
              </Marker>
            </>
          )}
          <NavigationControl position="top-left" showCompass={false} />
        </Map>
      </div>
      <button
        type="button"
        className="add-address-current-btn"
        onClick={handleGoToCurrent}
        disabled={goingToCurrent}
      >
        <FiMapPin size={16} />
        {goingToCurrent ? "Getting location…" : "Go to current location"}
      </button>
      {selectedLocation && (
        <div className="add-address-delivering">
          <span className="add-address-delivering-label">Delivering your order to</span>
          <div className="add-address-delivering-addr">
            <FiMapPin size={16} />
            <span>{selectedLocation.address.split(",").slice(0, 2).join(", ")}</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default function AddAddressForm({ onSave, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [goingToCurrent, setGoingToCurrent] = useState(false);
  const [addressType, setAddressType] = useState("home");
  const [customAddressType, setCustomAddressType] = useState("");
  const [customArea, setCustomArea] = useState("");
  const [area, setArea] = useState("");
  const [flat, setFlat] = useState("");
  const [floor, setFloor] = useState("");
  const [landmark, setLandmark] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    const savedPhone = localStorage.getItem("blinkitUser");
    if (savedPhone) setPhone(savedPhone);
  }, []);

  useEffect(() => {
    if (addressType !== "other" && selectedLocation?.address) {
      setArea(selectedLocation.address);
    }
  }, [selectedLocation?.address, addressType]);

  const areaDisplay = addressType === "other" ? customArea : area;

  const handleSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q) return;
    setSearchError(null);
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`,
        { headers: { "Accept-Language": "en", "User-Agent": "BlinkitClone/1.0" } }
      );
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setSearchError("Location not found");
        return;
      }
      const first = data[0];
      setSelectedLocation({
        lat: parseFloat(first.lat),
        lng: parseFloat(first.lon),
        address: first.display_name,
      });
    } catch {
      setSearchError("Search failed");
    } finally {
      setSearching(false);
    }
  }, [searchQuery]);

  const handleGoToCurrent = useCallback(() => {
    if (!navigator.geolocation) {
      setSearchError("Geolocation not supported");
      return;
    }
    setSearchError(null);
    setGoingToCurrent(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        let address = "Current location";
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();
          address = data.display_name || address;
        } catch (_) {}
        setSelectedLocation({ lat, lng, address });
        setSearchQuery(address.slice(0, 80));
        setGoingToCurrent(false);
      },
      () => {
        setSearchError("Could not get location");
        setGoingToCurrent(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleSave = () => {
    setFormError(null);
    if (!selectedLocation) {
      setFormError("Please select a location on the map");
      return;
    }
    if (!flat.trim()) {
      setFormError("Enter flat / house no / building name");
      return;
    }
    if (!name.trim()) {
      setFormError("Enter your name");
      return;
    }
    if (addressType === "other") {
      if (!customAddressType.trim()) {
        setFormError("Enter a custom address name (Save as)");
        return;
      }
    }
    if (!areaDisplay.trim()) {
      setFormError("Enter Area / Sector / Locality");
      return;
    }
    const finalType = addressType === "other" && customAddressType.trim() 
      ? customAddressType.trim() 
      : addressType;
    
    const address = {
      id: Date.now(),
      type: finalType,
      flat: flat.trim(),
      floor: floor.trim(),
      area: areaDisplay,
      landmark: landmark.trim(),
      name: name.trim(),
      phone: phone.trim(),
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      fullAddress: `${flat.trim()}${floor ? `, Floor ${floor}` : ""}, ${areaDisplay}${landmark ? ` (${landmark})` : ""}`,
    };
    onSave(address);
    onClose();
  };

  const addressTypeIcons = {
    home: <FiHome size={16} />,
    work: <FiBriefcase size={16} />,
    hotel: <MdHotel size={16} />,
    other: <FiMap size={16} />,
  };

  return (
    <div className="add-address-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="add-address-container" onClick={(e) => e.stopPropagation()}>
        <div className="add-address-form-header">
          <h3>Enter complete address</h3>
          <span className="add-address-close" onClick={onClose}>×</span>
        </div>

        <div className="add-address-content">
          <MapPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedLocation={setSelectedLocation}
            setSearchError={setSearchError}
            searchError={searchError}
            handleSearch={handleSearch}
            selectedLocation={selectedLocation}
            goingToCurrent={goingToCurrent}
            handleGoToCurrent={handleGoToCurrent}
          />

          {/* Right: Form */}
          <div className="add-address-form-panel">
            <div className="add-address-form-body">
            <label className="add-address-label">Save address as *</label>
            <div className="add-address-type-btns">
              {["home", "work", "hotel", "other"].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`add-address-type-btn ${addressType === t ? "active" : ""}`}
                  onClick={() => {
                    setAddressType(t);
                    if (t !== "other") {
                      setCustomAddressType("");
                      setCustomArea("");
                    } else {
                      setCustomArea(area || selectedLocation?.address || "");
                    }
                  }}
                >
                  {addressTypeIcons[t]}
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
              {addressType === "other" && (
                <div className="add-address-inline-input-wrap">
                  <input
                    type="text"
                    className="add-address-custom-type"
                    placeholder="Save as"
                    value={customAddressType}
                    onChange={(e) => setCustomAddressType(e.target.value)}
                    autoFocus
                  />
                  {customAddressType && (
                    <span
                      className="add-address-input-clear"
                      onClick={() => setCustomAddressType("")}
                    >
                      ×
                    </span>
                  )}
                </div>
              )}
            </div>

            <label className="add-address-label">Area / Sector / Locality *</label>
            {addressType === "other" ? (
              <div className="add-address-inline-input-wrap add-address-area-inline">
                <input
                  type="text"
                  className="add-address-custom-type add-address-area-input"
                  placeholder="Area / Sector / Locality"
                  value={customArea}
                  onChange={(e) => setCustomArea(e.target.value)}
                />
                {customArea && (
                  <span
                    className="add-address-input-clear"
                    onClick={() => setCustomArea("")}
                  >
                    ×
                  </span>
                )}
              </div>
            ) : (
              <input
                type="text"
                className="add-address-input add-address-input-area"
                placeholder="Area / Sector / Locality *"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            )}

            <label className="add-address-label">Flat / House no / Building name *</label>
            <input
              type="text"
              className="add-address-input"
              placeholder="Flat / House no / Building name *"
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
              required
            />

            <label className="add-address-label">Floor (optional)</label>
            <input
              type="text"
              className="add-address-input"
              placeholder="Floor (optional)"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
            />

            <label className="add-address-label">Nearby landmark (optional)</label>
            <input
              type="text"
              className="add-address-input"
              placeholder="Nearby landmark (optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />

            <p className="add-address-form-sub">Enter your details for seamless delivery experience</p>

            <label className="add-address-label">Your name *</label>
            <input
              type="text"
              className="add-address-input"
              placeholder="Your name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="add-address-label">Your phone number (optional)</label>
            <input
              type="tel"
              className="add-address-input"
              placeholder="Your phone number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />

            {formError && <p className="add-address-form-err">{formError}</p>}

            <button type="button" className="add-address-save-btn" onClick={handleSave}>
              Save Address
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

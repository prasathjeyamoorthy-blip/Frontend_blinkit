import React, { useState, useEffect, useCallback } from "react";
import "./AddressDrawer.css";
import AddAddressForm from "./AddAddressForm";
import { FiMapPin } from "react-icons/fi";

const STORAGE_KEY = "blinkitSavedAddresses";

const AddressDrawer = ({ closeAddress }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) return JSON.parse(s);
    } catch (_) {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedAddresses));
    } catch (_) {}
  }, [savedAddresses]);

  const handleSaveAddress = useCallback((address) => {
    setSavedAddresses((prev) => [...prev, address]);
  }, []);

  const handleCloseForm = useCallback(() => setShowAddForm(false), []);

  return (
    <div className="address-drawer">
      {/* Header */}
      <div className="address-header">
        <span className="back-btn" onClick={closeAddress}>
          ←
        </span>
        <h2>Select delivery address</h2>
      </div>

      {/* Add new */}
      <div className="add-address" onClick={() => setShowAddForm(true)}>
        <span style={{ marginRight: "10px" }}>+</span>Add a new address
      </div>

      {/* Saved Address */}
      <p className="saved-title">Your saved address</p>
      {savedAddresses.length > 0 ? (
        <div className="saved-addresses-list">
          {savedAddresses.map((addr) => (
            <div key={addr.id} className="address-card">
              <div className="address-icon">
                <FiMapPin size={22} color="#16a34a" />
              </div>
              <div className="address-info">
                <h4>
                  {addr.flat}
                  {addr.floor ? `, Floor ${addr.floor}` : ""} · {addr.type}
                </h4>
                <p>{addr.area}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="saved-empty">No saved addresses yet</p>
      )}

      {showAddForm && (
        <AddAddressForm
          onSave={handleSaveAddress}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AddressDrawer;

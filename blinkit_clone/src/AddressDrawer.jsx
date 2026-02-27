import React, { useState, useEffect, useCallback } from "react";
import "./AddressDrawer.css";
import AddAddressForm from "./AddAddressForm";
import { FiMapPin, FiHome, FiEdit2, FiBriefcase } from "react-icons/fi";

const STORAGE_KEY = "blinkitSavedAddresses";

const AddressDrawer = ({ closeAddress }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
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
    setSavedAddresses((prev) => {
      const exists = prev.find((a) => a.id === address.id);
      if (exists) {
        return prev.map((a) => (a.id === address.id ? address : a));
      }
      return [...prev, address];
    });
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowAddForm(false);
    setEditingAddress(null);
  }, []);

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setShowAddForm(true);
  };

  const handleSelectAddress = (addr) => {
    try {
      localStorage.setItem("blinkitSelectedAddress", JSON.stringify(addr));
      window.dispatchEvent(new Event("addressUpdated"));
    } catch (_) {}
    closeAddress();
  };

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
            <div
              key={addr.id}
              className="address-card"
              onClick={() => handleSelectAddress(addr)}
              style={{ cursor: "pointer" }}
            >
              <div className="address-icon-wrapper">
                {addr.type && addr.type.toLowerCase() === "home" ? (
                  <div className="icon-bg home-bg">
                    <FiHome size={20} color="#ca8a04" />
                  </div>
                ) : addr.type && addr.type.toLowerCase() === "work" ? (
                  <div className="icon-bg work-bg">
                    <FiBriefcase size={20} color="#2563eb" />
                  </div>
                ) : (
                  <div className="icon-bg other-bg">
                    <FiMapPin size={20} color="#16a34a" />
                  </div>
                )}
              </div>
              <div className="address-info-wrapper">
                <div className="address-info">
                  <h4>{addr.type || "Other"}</h4>
                  <p>
                    {addr.flat ? `${addr.flat}, ` : ""}
                    {addr.floor ? `Floor ${addr.floor}, ` : ""}
                    {addr.area}
                  </p>
                </div>
                <div className="address-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(addr);
                    }}
                  >
                    <FiEdit2 size={14} color="#16a34a" />
                  </button>
                </div>
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
          initialData={editingAddress}
        />
      )}
    </div>
  );
};

export default AddressDrawer;

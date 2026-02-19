import "./AddressDrawer.css";

const AddressDrawer = ({ closeAddress }) => {
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
      <div className="add-address">
        <span style={{ marginRight: "10px" }}>+</span>Add a new address
      </div>

      {/* Saved Address */}
      <p className="saved-title">Your saved address</p>
    </div>
  );
};

export default AddressDrawer;

import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";

const LoginModal = ({ onClose }) => {
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    if (phone.length !== 10) {
      alert("Enter valid 10 digit number");
      return;
    }

    login(phone);
    setSuccess(true);

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        {!success ? (
          <>
            <h2>India's last minute app</h2>
            <p>Log in or Sign up</p>

            <div className="phone-input">
              <span>+91</span>
              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Enter mobile number"
              />
            </div>

            <button onClick={handleLogin}>Continue</button>
          </>
        ) : (
          <div className="success">
            <div className="checkmark">✓</div>
            <p>Successfully logged in!</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoginModal;

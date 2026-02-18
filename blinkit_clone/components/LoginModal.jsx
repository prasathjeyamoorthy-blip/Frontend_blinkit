import { useAuth } from "../src/context/AuthContext";
import "./LoginModal.css";

const LoginModal = ({ close }) => {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Login Required</h3>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginModal;

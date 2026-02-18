import { useCart } from "../src/context/CartContext";
import "./CartDrawer.css";

const CartDrawer = ({ close }) => {
  const { cartItems, increase, decrease, total } = useCart();

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>My Cart</h2>
          <span onClick={close}>✕</span>
        </div>

        <div className="savings">Your total savings ₹54</div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt="" />
              <div>
                <h4>{item.title}</h4>
                <p>
                  {item.quantity} x ₹{item.price}
                </p>
              </div>

              <div className="counter">
                <button onClick={() => decrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item.id)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div>
            <strong>₹{total}</strong>
            <p>TOTAL</p>
          </div>
          <button className="proceed-btn">Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

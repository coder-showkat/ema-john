import { ToastWarning } from "../assets/utilities/Toastify";
import "./AddedCart.css";

export default function AddedCart({ item, removeCart, changeQty }) {
  const { id, img, name, price, shipping, quantity } = item;
  return (
    <div className="added-cart">
      <div className="details">
        <img src={img} alt="" />
        <div>
          <h2>{name}</h2>
          <p>
            Price: <span>${price * quantity}</span>
          </p>
          <p>
            Shipping Charge: <span>${shipping * quantity}</span>
          </p>
        </div>
      </div>
      <div className="details-2">
        <div className="qty-container">
          <p>Quantity:</p>
          <button className="btn" onClick={() => changeQty("minus", id)}>
            -
          </button>
          <p>{quantity}</p>
          <button className="btn" onClick={() => changeQty("plus", id)}>
            +
          </button>
        </div>
        <button
          className="btn-remove"
          onClick={() => {
            removeCart(id);
            ToastWarning(name + " is removed from cart!");
          }}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

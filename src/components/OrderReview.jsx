import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ToastWarning } from "../assets/utilities/Toastify";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
  removeFromDb,
} from "../assets/utilities/fakedb";
import AddedCart from "./AddedCart";
import "./OrderReview.css";
import OrderSummary from "./OrderSummary";

export default function OrderReview() {
  const { addedProducts } = useLoaderData();
  const [addedCarts, setAddedCarts] = useState(addedProducts);
  const [isNavigate, setNavigate] = useState(false);

  const navigate = useNavigate();

  const removeCart = (id) => {
    removeFromDb(id);
    setAddedCarts(addedCarts.filter((i) => i.id !== id));
  };

  const changeQty = (action, id) => {
    switch (action) {
      case "plus": {
        const index = addedCarts.findIndex((i) => i.id === id);
        const newAddedCarts = [...addedCarts];
        newAddedCarts[index].quantity = newAddedCarts[index].quantity + 1;
        setAddedCarts(newAddedCarts);
        addToDb(id);
        break;
      }
      case "minus": {
        const index = addedCarts.findIndex((i) => i.id === id);
        const newAddedCarts = [...addedCarts];
        if (newAddedCarts[index].quantity > 1) {
          newAddedCarts[index].quantity = newAddedCarts[index].quantity - 1;
          setAddedCarts(newAddedCarts);

          const newLocalStorageData = getShoppingCart();
          newLocalStorageData[id] = newLocalStorageData[id] - 1;
          localStorage.setItem(
            "shopping-cart",
            JSON.stringify(newLocalStorageData)
          );
        }
        break;
      }
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const selected_items = addedCarts
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="order-review">
      {addedCarts.length > 0 ? (
        <div className="added-products">
          {addedCarts.map((item) => (
            <AddedCart
              key={item.id}
              item={item}
              removeCart={removeCart}
              changeQty={changeQty}
            />
          ))}
        </div>
      ) : (
        <div className="no-cart">
          <p>
            You did not add any items in the cart. Please go back to order page
            and add some items.
          </p>
          <Link to="/order">
            <button>
              <ion-icon name="arrow-back-outline"></ion-icon> back to Order
            </button>
          </Link>
        </div>
      )}

      <div className="cart-menu" onClick={() => setNavigate(!isNavigate)}>
        <span
          style={{
            position: "absolute",
            zIndex: 800,
            color: "#fff",
            width: "1rem",
            height: "1rem",
            fontSize: ".8rem",
            top: "-6px",
            right: "-6px",
            borderRadius: "50%",
            background: "#ff7700",
            textAlign: "center",
          }}
        >
          {selected_items}
        </span>
        <ion-icon name="cart-outline"></ion-icon>
      </div>

      <div className={`order-summary ${isNavigate ? "expand" : ""}`}>
        <h2>Order Summary</h2>
        <OrderSummary addedCarts={addedCarts} />

        <div className="button-container">
          <button
            className="clear-btn"
            onClick={() => {
              deleteShoppingCart();
              setAddedCarts([]);
              ToastWarning("All item is removed from cart!");
            }}
          >
            Clear Cart <ion-icon name="trash-outline"></ion-icon>
          </button>
          <button onClick={handleCheckout} className="order-btn">
            Proceed Checkout <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

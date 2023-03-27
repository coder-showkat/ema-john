import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiData } from "../App";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../assets/utilities/fakedb";
import { ToastWarning } from "../assets/utilities/Toastify";
import "./Order.css";
import Product from "./Product";

export default function Order() {
  const data = useContext(ApiData);
  const [localStorageData, setLocalStorageData] = useState({});
  const [addedCarts, setAddedCarts] = useState([]);
  const [isNavigate, setNavigate] = useState(false);

  const addToCartHandler = (id) => {
    addToDb(id);
    setLocalStorageData(getShoppingCart());
  };

  useEffect(() => {
    const ema_john = getShoppingCart();
    if (ema_john) setLocalStorageData(ema_john);
  }, []);

  useEffect(() => {
    const localStorageCarts = [];
    Object.keys(localStorageData).length > 0 &&
      data.length > 0 &&
      Object.keys(localStorageData).forEach((id) => {
        const Item = data.find((item) => item["id"] === id);
        Item.quantity = localStorageData[id];
        localStorageCarts.push(Item);
      });

    setAddedCarts(localStorageCarts);
  }, [data, localStorageData]);

  const selected_items = addedCarts
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);

  const total_price = addedCarts
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  const total_shipping = addedCarts
    .map((item) => item.shipping * item.quantity)
    .reduce((a, b) => a + b, 0);

  const total_tax = parseFloat((total_price / 10).toFixed(2));

  const grandTotal = parseFloat(
    (total_price + total_shipping + total_tax).toFixed(2)
  );

  return (
    <section className="order">
      <div className="products" onClick={() => setNavigate(false)}>
        {data.map((item) => (
          <Product
            key={item.id}
            item={item}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
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
      <div className={`summary ${isNavigate ? "expand" : ""}`}>
        <h2>Order Summary</h2>
        <div>
          <p>Selected Items: {selected_items}</p>
          <p>Total Price: ${total_price}</p>
          <p>Total Shipping Charge: ${total_shipping}</p>
          <p>Tax: ${total_tax}</p>
          <h4>Grand Total: ${grandTotal}</h4>
        </div>

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
          <Link to="/order-review">
            <button className="order-btn">
              Review Order <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../assets/utilities/fakedb";
import "./Order.css";
import Product from "./Product";

export default function Order() {
  const [data, setData] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [addedCarts, setAddedCarts] = useState([]);
  const [isNavigate, setNavigate] = useState(false);

  const addToCartHandler = (id) => {
    addToDb(id);
    setAddedItems(getShoppingCart());
  };

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
      )
      .then((data) => setData(data?.data));

    const ema_john = getShoppingCart();
    if (ema_john) setAddedItems(ema_john);
  }, []);

  useEffect(() => {
    const localStorageCarts = [];
    Object.keys(addedItems).length > 0 &&
      data.length > 0 &&
      Object.keys(addedItems).forEach((id) => {
        const Item = data.find((item) => item["id"] === id);
        Item.quantity = addedItems[id];
        localStorageCarts.push(Item);
      });

    setAddedCarts(localStorageCarts);
  }, [data, addedItems]);

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

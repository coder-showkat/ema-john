import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
  removeFromDb,
} from "../assets/utilities/fakedb";
import AddedCart from "./AddedCart";
import "./OrderReview.css";

export default function OrderReview() {
  const [data, setData] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [addedCarts, setAddedCarts] = useState([]);
  const [isNavigate, setNavigate] = useState(false);

  useEffect(() => {
    axios.get("data.json").then((data) => setData(data?.data));

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

  const removeCart = (id) => {
    removeFromDb(id);
    const newItems = getShoppingCart();
    if (newItems) setAddedItems(newItems);
    else setAddedItems({});
  };

  const changeQty = (action, id) => {
    switch (action) {
      case "plus": {
        const Items = { ...addedItems };
        Items[id] = Items[id] + 1;
        addToDb(id);
        setAddedItems(Items);
        break;
      }
      case "minus": {
        const Items = { ...addedItems };
        if (Items[id] > 1) Items[id] = Items[id] - 1;
        localStorage.setItem("shopping-cart", JSON.stringify(Items));
        setAddedItems(Items);
        break;
      }
    }
  };

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
        <ion-icon name="cart-outline"></ion-icon>
      </div>

      <div className={`order-summary ${isNavigate ? "expand" : ""}`}>
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
          <button className="order-btn">
            Proceed Checkout <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

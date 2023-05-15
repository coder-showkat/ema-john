import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { ToastWarning } from "../assets/utilities/Toastify";
import { addToDb, deleteShoppingCart } from "../assets/utilities/fakedb";
import "./Order.css";
import OrderSummary from "./OrderSummary";
import Product from "./Product";

export default function Order() {
  const [products, setProducts] = useState([]);
  const { addedProducts } = useLoaderData();
  const [addedCarts, setAddedCarts] = useState(addedProducts);
  const [isNavigate, setNavigate] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  const totalPages = Math.ceil(totalProducts / limit);

  useEffect(() => {
    fetch("https://ema-john-server-gn7b.onrender.com/api/products-length")
      .then((res) => res.json())
      .then((data) => setTotalProducts(data.total_products))
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    fetch(
      `https://ema-john-server-gn7b.onrender.com/api/products?page=${selectedPage}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err.message));
  }, [selectedPage, limit]);

  const addToCartHandler = (id) => {
    addToDb(id);
    let product = addedCarts.find((i) => i._id === id);
    if (product) {
      product.quantity = product.quantity + 1;
      setAddedCarts([...addedCarts.filter((i) => i._id !== id), product]);
    } else {
      product = products.find((i) => i._id === id);
      product.quantity = 1;
      setAddedCarts([...addedCarts, product]);
    }
  };

  const selected_items = addedCarts
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);

  return (
    <section className="order">
      <div className="products" onClick={() => setNavigate(false)}>
        {products.map((item) => (
          <Product
            key={item._id}
            item={item}
            addToCartHandler={addToCartHandler}
          />
        ))}
        <div className="pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setSelectedPage(page)}
              className={selectedPage === page ? "active" : ""}
            >
              {page + 1}
            </button>
          ))}
          <select
            className="limit"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
              setSelectedPage(0);
            }}
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
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

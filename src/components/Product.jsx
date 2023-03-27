import React from "react";
import "./Product.css";

export default function Product({ item, addToCartHandler }) {
  const { id, img, name, price, seller, ratings } = item;

  return (
    <div className="product">
      <div className="card-header">
        <img src={img} alt={name} />
        <h2>{name}</h2>
        <h4>Price: ${price}</h4>
      </div>
      <div className="card-body">
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} star</p>
        <button onClick={() => addToCartHandler(id)}>
          Add to Cart <ion-icon name="cart-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

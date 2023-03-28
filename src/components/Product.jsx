import React, { useEffect, useRef, useState } from "react";
import spinner from "../assets/images/spinner.svg";
import { ToastSuccess } from "../assets/utilities/Toastify";
import "./Product.css";

export default function Product({ item, addToCartHandler }) {
  const { id, img, name, price, seller, ratings } = item;
  const [shouldLoad, setShouldLoad] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <div ref={divRef} className="product">
      {shouldLoad ? (
        <>
          <div className="card-header">
            <img src={img} alt={name} />
            <h2>{name}</h2>
            <h4>Price: ${price}</h4>
          </div>
          <div className="card-body">
            <p>Manufacturer: {seller}</p>
            <p>Rating: {ratings} star</p>
            <button
              onClick={() => {
                addToCartHandler(id);
                ToastSuccess(name + " is added to cart!");
              }}
            >
              Add to Cart <ion-icon name="cart-outline"></ion-icon>
            </button>
          </div>
        </>
      ) : (
        <img src={spinner} />
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import spinner from "../assets/images/spinner.svg";
import { ToastSuccess } from "../assets/utilities/Toastify";
import "./Product.css";

export default function Product({ item, addToCartHandler }) {
  const { _id, img, name, price, seller, ratings } = item;
  const [shouldLoadImage, setShouldLoadImage] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadImage(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div
      className="product"
      data-aos="fade-down-right"
      data-aos-duration="1000"
    >
      <div className="card-header">
        <img ref={imageRef} src={shouldLoadImage ? img : spinner} alt={name} />
        <h2>{name}</h2>
        <h4>Price: ${price}</h4>
      </div>
      <div className="card-body">
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} star</p>
        <button
          onClick={() => {
            addToCartHandler(_id);
            ToastSuccess(name + " is added to cart!");
          }}
        >
          Add to Cart <ion-icon name="cart-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

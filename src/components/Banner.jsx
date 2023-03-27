import React from "react";
import banner from "../assets/images/banner.jpg";
import "./Banner.css";

export default function Banner() {
  return (
    <section className="banner">
      <div className="left">
        <p>
          <small>Sale up to 70% off</small>
        </p>
        <h1>New Collection For Fall</h1>
        <p>Discover all the new arrivals of ready-to-wear collection.</p>
        <button>shop now</button>
      </div>

      <div className="right">
        <img src={banner} alt="banner" />
      </div>
    </section>
  );
}

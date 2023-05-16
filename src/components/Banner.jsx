import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/images/banner.jpg";
import "./Banner.css";

export default function Banner() {
  return (
    <section className="banner">
      <div
        className="left"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="50"
      >
        <p>
          <small>Sale up to 70% off</small>
        </p>
        <h1>New Collection For Fall</h1>
        <p>Discover all the new arrivals of ready-to-wear collection.</p>
        <Link to="/order">
          <button>shop now</button>
        </Link>
      </div>

      <div
        className="right"
        data-aos="fade"
        data-aos-duration="2000"
        data-aos-delay="400"
      >
        <img src={banner} alt="banner" />
      </div>
    </section>
  );
}

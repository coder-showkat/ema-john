import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./Error.css";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="error-div">
      <p>
        404 <span style={{ color: "#FF9900" }}>|</span> Nothing here to see
      </p>
      <button onClick={() => navigate(-1, { replace: true })}>
        <HiArrowLeft /> Go Back
      </button>
    </div>
  );
}

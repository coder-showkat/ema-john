import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <p className="spinner">
        L<span></span>ading....
      </p>
    </div>
  );
};

export default LoadingSpinner;

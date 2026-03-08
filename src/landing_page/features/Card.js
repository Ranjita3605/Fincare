import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ imageURL, title, description }) {
  const navigate = useNavigate();

  const handleExploreClick = (event) => {
    event.preventDefault(); // prevent <a> reload

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      navigate("/explore");
    } else {
      navigate("/login"); // 🔥 DIRECT login page (no alert, no popup)
    }
  };

  return (
    <div className="card-box">
      <img src={imageURL} className="card-img" alt={title} />

      <div className="card-content">
        <h5 style={{ color: "#2E7D32", fontWeight: "bold" }}>
          {title}
        </h5>

        <p className="mb-3" style={{ color: "#212121" }}>
          {description}
        </p>

        <button
          className="btn"
          style={{ backgroundColor: "#66bb6a", color: "#ffffff", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}
          onClick={handleExploreClick}
        >
          Explore
        </button>
      </div>
    </div>
  );
}

export default Card;
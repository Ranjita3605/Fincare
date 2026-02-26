import React from "react";

function Card({ imageURL, title, description }) {
  return (
    <div className="card-box">
      <img src={imageURL} className="card-img" alt={title} />
      <div className="card-content">
        <h5 style={{color: "#2E7D32" , fontWeight: "bold"}}>{title}</h5>
        <p className="mb-3" style={{color:"#212121"}}>{description}</p>
        <a href="#" className="btn" style={{backgroundColor:"#66bb6a",color:"#ffffff"}}>Explore</a>
      </div>
    </div>
  );
}

export default Card;

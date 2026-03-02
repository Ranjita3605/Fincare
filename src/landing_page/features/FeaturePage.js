import React from 'react';
import Card from './Card';
import './FeaturePage.css';

function FeaturePage() {
  return (
    <div className="card-container">
      {/* Row 1 */}
      <div className="row">
        <Card
          imageURL="media/mudra-yojna-1-1744095402.jpg"
          title="Pradhan Mantri Mudra Yojana"
          description="Collateral‑free loans up to ₹10 lakh for small and micro enterprises."
        />
        <Card
          imageURL="media/Jan-Samarth-Yojana-Portal-.jpg"
          title="JanSamarth Portal"
          description="Unified digital platform for government credit‑linked schemes."
        />
        <Card
          imageURL="media/awas.jpg"
          title="Pradhan Mantri Awas Yojana"
          description="Affordable housing scheme ensuring safe homes for all citizens."
        />
      </div>

      {/* Row 2 */}
      <div className="row">
        <Card
          imageURL="media/ayushman-bharat-yojana.jpg"
          title="Ayushman Bharat"
          description="Free health coverage up to ₹5 lakh per family per year."
        />
        <Card
          imageURL="media/fasal.webp"
          title="PM Fasal Bima Yojana"
          description="Crop insurance scheme protecting farmers against natural calamities."
        />
        <Card
          imageURL="media/Pradhan Mantri Kaushal Vikas Yojana Logo.jpg"
          title="PM Kaushal Vikas Yojana"
          description="Skill development program to train youth in industry‑relevant skills."
        />
      </div>

      {/* Row 3 */}
      <div className="row">
        <Card
          imageURL="media/DIW-i5.jpg"
          title="Digital India"
          description="Transforming India into a digitally empowered and knowledge economy."
        />
        <Card
          imageURL="media/startup-india-feature-image.jpg"
          title="Startup India"
          description="Encouraging entrepreneurship and innovation through funding and support."
        />
        <Card
          imageURL="media/Stand-Up-India-Scheme-2.jpg"
          title="Stand‑Up India"
          description="Providing loans to women and SC/ST entrepreneurs for new ventures."
        />
      </div>
    </div>
  );
}

export default FeaturePage;

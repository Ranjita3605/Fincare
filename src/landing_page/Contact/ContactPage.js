import React from "react";

function ContactPage() {
  return (
    <div className="contactpage">
      {/* Header */}
      <header className="header">
        <h1>Get Started Today</h1>
       
      </header>

      {/* Cards Section */}
      <section className="cards">
        {/* WhatsApp Support */}
        <div className="card">
          <div className="icon">📱</div>
          <h3>WhatsApp Support</h3>
          
          <p>+91 70657 61703</p>
          <p>Send 'Hello' to start your journey</p>
        </div>

        {/* Web Interface */}
        <div className="card">
          <div className="icon">🌐</div>
          <h3>Web Interface</h3>
          
          <button className="try-btn">💻 Try Now</button>
          <p>Full-featured web application</p>
        </div>

        {/* 24/7 Available */}
        <div className="card">
          <div className="icon">⏰</div>
          <h3>24/7 Available</h3>
          
          <p>Get help anytime, anywhere with our AI-powered assistant</p>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;

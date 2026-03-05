import React, { useState, useEffect } from "react";
import startVoiceBot from "/landing_page/HomePage/Voicebot";

function Hero() {
  const totalSlides = 5;
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    // update dots active class when current changes
    const dots = document.querySelectorAll(".dots .dot");
    dots.forEach((dot, idx) => {
      if (idx === current) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  }, [current]);

  // optional auto rotate every 5 seconds
  useEffect(() => {
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section className="hero">
        <button className="nav-btn prev" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="slider">
          <div
            className="slides"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {/* Slide 1 */}
            <div className="slide">
              <div className="slide-content">
                <h1>Smart Finance Management</h1>
                <p>Track, save and grow your money easily with modern tools.</p>
              </div>
              <div className="slide-image">
                <img src="/farm1.webp" alt="Finance Management" />
              </div>
            </div>

            {/* Slide 2 */}
            <div className="slide">
              <div className="slide-content">
                <h1>Government Schemes</h1>
                <p>Find schemes and benefits personalized for you.</p>
              </div>
              <div className="slide-image">
                <img src="/farm2.png" alt="Government Schemes" />
              </div>
            </div>

            {/* Slide 3 */}
            <div className="slide">
              <div className="slide-content">
                <h1>Easy Loan Access</h1>
                <p>Compare, analyse and apply instantly.</p>
              </div>
              <div className="slide-image">
                <img src="/farm3.webp" alt="Easy Loan Access" />
              </div>
            </div>

            {/* Slide 4 */}
            <div className="slide">
              <div className="slide-content">
                <h1>Secure & Fast Platform</h1>
                <p>Your financial future starts here.</p>
              </div>
              <div className="slide-image">
                <img src="/farm4.avif" alt="Secure & Fast Platform" />

              </div>
            </div>

            {/* Slide 5 */}
            <div className="slide">
              <div className="slide-content">
                <h1>AI Financial Assistant</h1>
                <p>Get smart suggestions powered by AI to manage money better.</p>
              </div>
              <div className="slide-image">
                <img src="/farm5.jpg" alt="AI Financial Assistant" />
              </div>
            </div>
          </div>

          <div className="dots">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <span
                key={idx}
                className={`dot${idx === current ? " active" : ""}`}
                onClick={() => setCurrent(idx)}
              ></span>
            ))}
          </div>
        </div>

        <button className="nav-btn next" onClick={nextSlide}>
          &#10095;
        </button>
      </section>

      {/* ===== STATS COUNTER SECTION ===== */}
      <section className="stats-section">
        <Stat number={4000} suffix="+" label="Government Schemes" />
        <Stat number={24} suffix="/7" label="AI Support" />
        <Stat number={100} suffix="%" label="Free Service" />
        <Stat number={10} suffix="+" label="Indian Languages" />
      </section>

      {/* Mic Section */}
      <div className="ai-mic" id="aiMic" onClick={startVoiceBot}>
        <div className="mic-text">Click here to get started</div>
        <div className="ai-ring"></div>
        <div className="ai-core">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15a3 3 0 003-3V7a3 3 0 10-6 0v5a3 3 0 003 3z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M19 11a7 7 0 01-14 0"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="18"
              x2="12"
              y2="22"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

function Stat({ number, suffix, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // animation duration
    const increment = number / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= number) {
        setCount(number);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(counter);
  }, [number]);

  return (
    <div className="stat-box">
      <h2>
        {count}
        {suffix}
      </h2>
      <p>{label}</p>
    </div>
  );
}

export default Hero;
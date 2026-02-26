import React from "react";

function Hero() {
  return (
    <>
      <section className="hero">
        <button className="nav-btn prev">&#10094;</button>

        <div className="slider">
          <div className="slides">
            {/* Slide 1 */}
            <div className="slide">
              <div className="slide-content">
                <h1>Smart Finance Management</h1>
                <p>Track, save and grow your money easily with modern tools.</p>
              </div>
              <div className="slide-image"></div>
            </div>

            {/* Slide 2 */}
            <div className="slide">
              <div className="slide-content">
                <h1>Government Schemes</h1>
                <p>Find schemes and benefits personalized for you.</p>
              </div>
              <div className="slide-image"></div>
            </div>

            {/* Slide 3 */}
            <div className="slide">
              <div className="slide-content">
                <h1>Easy Loan Access</h1>
                <p>Compare, analyse and apply instantly.</p>
              </div>
              <div className="slide-image"></div>
            </div>

            {/* Slide 4 */}
            <div className="slide">
              <div className="slide-content">
                <h1>Secure & Fast Platform</h1>
                <p>Your financial future starts here.</p>
              </div>
              <div className="slide-image"></div>
            </div>

            {/* Slide 5 */}
            <div className="slide">
              <div className="slide-content">
                <h1>AI Financial Assistant</h1>
                <p>Get smart suggestions powered by AI to manage money better.</p>
              </div>
              <div className="slide-image"></div>
            </div>
          </div>

          <div className="dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>

        <button className="nav-btn next">&#10095;</button>
      </section>

      {/* Mic Section */}
      <div className="ai-mic" id="aiMic">
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

export default Hero;

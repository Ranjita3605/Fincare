import React from 'react';

function Info() {
  return (
    <section className="about-info container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Title */}
      <h2 style={{ textAlign: 'center', fontSize: '40px', marginBottom: '20px' ,color:"#79554b",fontWeight:"bold"}}>
        Fincare: "Empowering Farmers Through Voice-Based Financial Access"
      </h2>

      {/* Two-column layout */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0' }}>
        
        {/* Left side: Content */}
        <div style={{ flex: 1, paddingRight: '30px' }}>
          <p style={{ fontSize: '20px', lineHeight: '1.6', textAlign: 'justify',opacity:'0.8' }}>
            Fincare is a multilingual voice-enabled platform designed to help farmers easily discover and apply for 
            government loan and subsidy schemes without needing to read or write. Many farmers are unaware of benefits 
            offered under programs like Pradhan Mantri Kisan Samman Nidhi, Kisan Credit Card, and Pradhan Mantri Fasal 
            Bima Yojana due to language barriers and limited digital literacy. Fincare solves this problem by allowing 
            users to speak in their regional language, receive AI-based scheme suggestions based on their eligibility, 
            complete applications through voice-guided form filling, and verify their details through audio confirmation 
            before submission—making financial access simple, transparent, and inclusive.
          </p>
        </div>

        {/* Right side: Image */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img className='agri'
            src="/Agricultural-Finance-Blog.jpeg"   // ✅ Correct way to access image from public folder
            alt="Financial Inclusion" 
           
          />
        </div>
      </div>

      {/* Vision Statement */}
      <h2 style={{ textAlign: 'center', color: 'black', marginTop: '30px' }}>
        Our Vision: “Financial inclusion should not depend on literacy.”
      </h2>

      <hr style={{ marginTop: '30px' }} />
    </section>
  );
}

export default Info;
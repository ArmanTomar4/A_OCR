import React from 'react'

function Hero() {
  return (
    <div className="landing-container">
      {/* Background layers */}
      <div className="background"></div>
      <div className="earth-overlay"></div>
      <div className="lights-effect"></div>
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-logo">a_OCR</h1>
          <p className="hero-tagline">Any Data to Intelligence</p>
          <div className="hero-button-wrapper">
            <button className="hero-button">
              Request Access
              <svg className="button-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <rect width="24" height="24" transform="translate(0 0.5)" fill="white" fill-opacity="0.01"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83393 18.6665C5.5215 18.3541 5.5215 17.8475 5.83393 17.5352L16.4683 6.90078H9.59961C9.15779 6.90078 8.79961 6.54261 8.79961 6.10078C8.79961 5.65896 9.15779 5.30078 9.59961 5.30078H18.3996C18.6118 5.30078 18.8153 5.38507 18.9654 5.5351C19.1153 5.68513 19.1996 5.88861 19.1996 6.10078V14.9008C19.1996 15.3426 18.8414 15.7008 18.3996 15.7008C17.9579 15.7008 17.5996 15.3426 17.5996 14.9008V8.03216L6.96529 18.6665C6.65288 18.9789 6.14635 18.9789 5.83393 18.6665Z" fill="#1C2024"/>
              </svg>
            </button>
            <img src="/Frame1.svg" alt="Arrow line" className="hero-arrow-line" />
          </div>
        </div>
      </div>
      
      {/* Bottom Info */}
      <div className="bottom-info">
        <div className="bottom-section">
          <div className="info-value" style={{margin: '11px'}}>↓ SCROLL DOWN</div>
        </div>
        
        <div className="bottom-section">
          <div className="info-label">TAGLINE</div>
          <div className="info-value">ANY DATA TO INTELLIGENCE</div>
        </div>
        
        <div className="bottom-section">
          <div className="info-label">PARENT COMPANY</div>
          <div className="info-value">A_PARATUS</div>
        </div>
        
        <div className="bottom-section">
          <div className="info-label">ESTD</div>
          <div className="info-value">2024 -</div>
        </div>
      </div>
    </div>
  )
}

export default Hero 
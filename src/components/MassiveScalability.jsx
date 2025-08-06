import React, { useState, useEffect, useRef } from 'react';

const MassiveScalability = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        /* CSS Reset for component independence */
        .scalability-container,
        .scalability-container * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .scalability-container {
          display: flex;
          min-height: 400px;
          background: #0a0a0a;
          border: 1px solid #333;
          position: relative;
          font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        .scalability-container .left-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .scalability-container .right-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 100px;
          padding: 40px 40px 40px 40px;
          position: relative;
          overflow: hidden;
        }

        .scalability-container .divider {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background-image: repeating-linear-gradient(
            to bottom,
            #333 0,
            #333 5px,
            transparent 5px,
            transparent 10px
          );
        }

        .scalability-container .percentage-wrapper {
          position: relative;
          width: 400px;
          height: 300px;
        }

        .scalability-container .percentage-group {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }

        .scalability-container .percentage-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin: -29px 0;
          position: relative;
          background: black;
          padding-left: 20px;
        }

        .scalability-container .bar-box {
          width: 180px;
          height: 40px;
          margin-right: 30px;
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scalability-container .animate-elements .bar-box {
          opacity: 1;
          transform: translateX(0);
        }

        .scalability-container .bar-blue {
          background: #0066ff;
        }

        .scalability-container .bar-gray {
          background: #333;
        }

        .scalability-container .percentage-text {
          font-size: 110px;
          font-weight: 300;
          letter-spacing: -4px;
          line-height: 0.8;
          opacity: 0;
        }

        .scalability-container .animate-elements .percentage-row:nth-child(1) .percentage-text {
          animation: revealText 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.3s;
        }

        .scalability-container .animate-elements .percentage-row:nth-child(2) .percentage-text {
          animation: revealText 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, pulse 2s ease-in-out infinite;
          animation-delay: 0.4s, 1.5s;
        }

        .scalability-container .animate-elements .percentage-row:nth-child(3) .percentage-text {
          animation: revealText 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.5s;
        }

        /* Professional pulse animation for 99% */
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        /* Bar slide animation */
        @keyframes slideBar {
          0% {
            transform: translateX(-100%) scaleX(0);
            opacity: 0;
          }
          50% {
            transform: translateX(0) scaleX(0.5);
            opacity: 0.5;
          }
          100% {
            transform: translateX(0) scaleX(1);
            opacity: 1;
          }
        }

        .scalability-container .animate-elements .bar-box {
          animation: slideBar 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .scalability-container .animate-elements .percentage-row:nth-child(1) .bar-box {
          animation-delay: 0.1s;
        }

        .scalability-container .animate-elements .percentage-row:nth-child(2) .bar-box {
          animation-delay: 0.2s;
        }

        .scalability-container .animate-elements .percentage-row:nth-child(3) .bar-box {
          animation-delay: 0.3s;
        }

        /* Black background behind 99% */
        .scalability-container .percentage-bg-black {
          position: absolute;
          left: 210px;
          width: 180px;
          height: 100px;
          background: #000;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.6s ease-out;
          transition-delay: 0.5s;
        }

        .scalability-container .animate-elements .percentage-bg-black {
          opacity: 1;
        }

        .scalability-container .percentage-row:nth-child(2) .percentage-text {
          position: relative;
          z-index: 2;
        }

        /* Professional reveal animation */
        @keyframes revealText {
          0% {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .scalability-container .scalability-highlight {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px;
          border-radius: 4px;
        }

        .scalability-container .scalability-label {
          font-size: 11px;
          letter-spacing: 3px;
          color: #666;
          text-transform: uppercase;
        }

        .scalability-container .number-display {
          font-size: 55px;
          font-weight: 300;
          color: #fff;
          letter-spacing: -3px;
          line-height: 1;
          padding: 8px 16px;
          display: inline-block;
          position: relative;
          z-index: 1;
        }

        .scalability-container .description {
          font-size: 10px;
          line-height: 1.8;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          max-width: 280px;
        }

        .scalability-container .features-list {
          display: flex;
          flex-direction: column;
        }

        .scalability-container .feature-item {
          display: flex;
          align-items: flex-start;
          font-size: 9px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .scalability-container .checkmark {
          color: #4ade80;
          font-size: 12px;
          margin-top: -1px;
          margin-right: 12px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scalability-container .animate-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes countUp {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-5deg);
          }
          50% {
            transform: scale(1.1) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .scalability-container .animate-count {
          animation: countUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .scalability-container .percentage-row:nth-child(1) .percentage-text {
          color: #444;
        }

        .scalability-container .percentage-row:nth-child(2) .percentage-text {
          color: white;
        }

        .scalability-container .percentage-row:nth-child(3) .percentage-text {
          color: #444;
        }
      `}</style>

      <div ref={sectionRef} className="scalability-container">
        <div className="left-section">
          <div className={`percentage-wrapper ${isVisible ? 'animate-elements' : ''}`}>
            <div className="percentage-group">
              <div className="percentage-row">
                <div className="bar-box bar-blue"></div>
                <div className="percentage-text">100%</div>
              </div>
              <div className="percentage-row">
                <div className="bar-box bar-blue"></div>
                <div className="percentage-bg-black"></div>
                <div className="percentage-text" style={{ marginBottom: '18px' }}>99%</div>
              </div>
              <div className="percentage-row">
                <div className="bar-box bar-gray" style={{ marginRight: '65px' }}></div>
                <div className="percentage-text">98%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="right-section">
          <div className={isVisible ? 'animate-in' : ''}>
            <div className="scalability-highlight">
              <div className="scalability-label">MASSIVE SCALABILITY</div>
              <div className={`number-display ${isVisible ? 'animate-count' : ''}`}>1000000+</div>
              <div className="description">
                PROCESS MILLIONS OF PAGES<br />
                MONTHLY WITH AUTO-SCALING<br />
                INFRASTRUCTURE
              </div>
            </div>

            <div className="features-list">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>AUTO-SCALING BASED ON DEMAND</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>99.9% UPTIME GUARANTEE</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>LOAD BALANCING FOR PEAK PERFORMANCE</span>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <span>GLOBAL CDN FOR REDUCED LATENCY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MassiveScalability;
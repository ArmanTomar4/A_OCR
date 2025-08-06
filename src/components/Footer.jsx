import React from 'react';

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-container {
          min-height: 100vh;
          background-color: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 32px;
          font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
        }

        .quote-section {
          text-align: center;
          margin-bottom: 80px;
          max-width: 800px;
        }

        .quote-text {
          font-size: 32px;
          font-weight: 300;
          color: #e0e0e0;
          line-height: 1.4;
          margin-bottom: 20px;
          position: relative;
        }

        .quote-marks {
          font-size: 120px;
          color: #e0e0e0;
          font-weight: 200;
          line-height: 0.8;
          position: relative;
        }

        .quote-marks::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: -40px;
        }

        .quote-marks::after {
          content: '"';
          position: absolute;
          bottom: -20px;
          right: -40px;
        }

        .quote-attribution {
          font-size: 14px;
          color: #999;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .apparatus-section {
          text-align: center;
        }

        .apparatus-text {
          font-size: 120px;
          font-weight: 700;
          background: linear-gradient(
            to bottom,
            #e0e0e0 0%,
            #666 50%,
            #333 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          letter-spacing: -2px;
          line-height: 0.9;
        }

        @media (max-width: 768px) {
          .quote-text {
            font-size: 24px;
          }
          
          .apparatus-text {
            font-size: 80px;
          }
          
          .quote-marks {
            font-size: 80px;
          }
        }

        @media (max-width: 480px) {
          .quote-text {
            font-size: 20px;
          }
          
          .apparatus-text {
            font-size: 60px;
          }
          
          .quote-marks {
            font-size: 60px;
          }
        }
      `}</style>

      <div className="footer-container">
        <div className="quote-section">
          <div className="quote-text">
            <span className="quote-marks"></span>
            The goal is to turn data into information, and information into insight
          </div>
          <div className="quote-attribution">
            CARLY FIORINA, FORMER CEO OF HP
          </div>
        </div>
        
        <div className="apparatus-section">
          <div className="apparatus-text">APPARATUS</div>
        </div>
      </div>
    </>
  );
};

export default Footer; 
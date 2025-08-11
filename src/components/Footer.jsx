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
          font-weight: 600;
          color: #e0e0e0;
          line-height: 1.4;
          margin-bottom: 20px;
          position: relative;
        }



        .quote-attribution {
          font-size: 10px;
          color: #999;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .apparatus-section {
        position: absolute;
        bottom: 0;
          text-align: center;
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: center;
        }

        .apparatus-logo {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          padding-left: 20px;
          padding-right: 20px;
        }

        @media (max-width: 768px) {
          .quote-text {
            font-size: 24px;
          }
          
          .apparatus-logo {
            width: 300px;
          }
          
          .quote-marks {
            font-size: 80px;
          }
        }

        @media (max-width: 480px) {
          .quote-text {
            font-size: 20px;
          }
          
          .apparatus-logo {
            width: 250px;
          }
          
          .quote-marks {
            font-size: 60px;
          }
        }
      `}</style>

      <div className="footer-container">
        <div className="quote-section">
          <div className="quote-text">
            " The goal is to turn data into information, and information into insight "</div>
          <div className="quote-attribution">
            CARLY FIORINA, FORMER CEO OF HP
          </div>
        </div>
        
        <div className="apparatus-section">
          <img src="/Union.svg" alt="APPARATUS" className="apparatus-logo" />
        </div>
      </div>
    </>
  );
};

export default Footer; 
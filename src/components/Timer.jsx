import React, { useState, useEffect, useRef } from 'react';

const LightningSpeedTimer = () => {
  const [time, setTime] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

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

  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime >= 10) {
            clearInterval(intervalRef.current);
            return 10;
          }
          return prevTime + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTime(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style>{`
        .lightning-container {
          display: flex;
          background: #000;
          border: 1px solid #333;
          position: relative;
          font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
          padding: 24px 32px;
        }

        .left-section {
          flex: 1.5;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 40px;
        }

        .right-section {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .divider {
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

        .timer-container {
          position: relative;
          width: 350px;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-ticks {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .tick {
          position: absolute;
          width: 3px;
          height: 20px;
          background: #9acd32;
          left: 50%;
          top: 10px;
          transform-origin: center 165px;
          transform: translateX(-50%);
        }

        .timer-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .timer-value {
          font-size: 72px;
          font-weight: 300;
          letter-spacing: 3px;
          line-height: 1;
        }

        .timer-unit {
          font-size: 18px;
          margin-top: 12px;
          opacity: 0.9;
          letter-spacing: 2px;
        }

        .accuracy-highlight {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px;
          border-radius: 4px;
        }

        .accuracy-label {
          font-size: 11px;
          letter-spacing: 3px;
          color: #666;
          text-transform: uppercase;
        }

        .accuracy-percentage {
          font-size: 55px;
          font-weight: 300;
          color: #fff;
          letter-spacing: -3px;
          line-height: 1;
          padding: 8px 16px;
          display: inline-block;
          position: relative;
          z-index: 1;
          background: linear-gradient(
            to right,
            repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255, 255, 255, 0.15) 4px, rgba(255, 255, 255, 0.15) 8px) -0px 0 / 40px 100%,
            transparent 40px
          );
        }

        .accuracy-percentage::after {
          content: '';
          position: absolute;
          left: 0;
          top: 100%;
          width: 200px;
          height: 80px;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 4px,
            rgba(255, 255, 255, 0.05) 4px,
            rgba(255, 255, 255, 0.05) 8px
          );
          z-index: 0;
          pointer-events: none;
        }

        .accuracy-description {
          font-size: 10px;
          line-height: 1.8;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          max-width: 280px;
        }

        .features-list {
          display: flex;
          flex-direction: column;
        }

        .feature-item1 {
          display: flex;
          align-items: flex-start;
          font-size: 9px;
          line-height: 1.6;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .feature-checkmark {
          color: #4ade80;
          font-size: 12px;
          margin-top: -1px;
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

        .animate-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        @keyframes tickGlow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 4px #9acd32;
          }
          50% {
            opacity: 0.6;
            box-shadow: none;
          }
        }

        .tick.active {
          animation: tickGlow 1s ease-in-out infinite;
        }
      `}</style>

      <div ref={sectionRef} className="lightning-container">
        <div className="left-section">
          <div className="timer-container">
            <div className="timer-ticks">
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className={`tick ${i < (time / 10) * 60 ? 'active' : ''}`}
                  style={{
                    transform: `translateX(-50%) rotate(${i * 6}deg)`,
                  }}
                />
              ))}
            </div>
            
            <div className="timer-display">
              <div className="timer-value">{formatTime(time)}</div>
              <div className="timer-unit">SEC.</div>
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="right-section">
          <div className="accuracy-highlight">
            <div className="accuracy-label">LIGHTNING SPEED</div>
            <div className="accuracy-percentage">&lt;10 sec</div>
            <div className="accuracy-description">
              AVERAGE PROCESSING TIME THAT'S 5X FASTER THAN TRADITIONAL SOLUTIONS
            </div>
          </div>
          
          <div className="features-list">
            <div className="feature-item1">
              <span className="feature-checkmark">✓</span>
              <span>REAL-TIME DOCUMENT PROCESSING</span>
            </div>
            <div className="feature-item1">
              <span className="feature-checkmark">✓</span>
              <span>BATCH PROCESSING CAPABILITIES</span>
            </div>
            <div className="feature-item1">
              <span className="feature-checkmark">✓</span>
              <span>OPTIMIZED FOR HIGH-VOLUME WORKFLOWS</span>
            </div>
            <div className="feature-item1">
              <span className="feature-checkmark">✓</span>
              <span>MINIMAL LATENCY FOR API CALLS</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LightningSpeedTimer;
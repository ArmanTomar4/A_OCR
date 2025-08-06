import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import MassiveScalability from './MassiveScalability';
import Percentage from './Percentage';
import Dots from './Dots';

const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.stats-page-container {
  min-height: 100vh;
  background-color: #000;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
}

.stats-header-section {
  background-color: #0e3ba5;
  padding: 20px 24px;
  margin-bottom: 24px;
  border-radius: 4px;
}

.stats-section-label {
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.stats-main-title {
  font-size: 52px;
  font-weight: 300;
  color: #fff;
  line-height: 1.1;
}

.stats-content-wrapper {
  display: flex;
  gap: 0;
  align-items: stretch;
  flex: 1;
  position: relative;
  border: 1px solid #333;
}

.stats-left-section {
  flex: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.stats-right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
}

.stats-divider {
  width: 1px;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 8px,
    #666 8px,
    #666 12px
  );
  margin: 0 20px;
}

`;

export default function WhyChooseAOCR() {
  const [percentages, setPercentages] = useState({ primary: 0, secondary: 0, tertiary: 0 });

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Animate percentages
    const animatePercentages = () => {
      let current = { primary: 0, secondary: 0, tertiary: 0 };
      const targets = { primary: 99, secondary: 100, tertiary: 98 };
      const duration = 2000; // 2 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        current.primary = Math.floor(targets.primary * easeOutQuart);
        current.secondary = Math.floor(targets.secondary * easeOutQuart);
        current.tertiary = Math.floor(targets.tertiary * easeOutQuart);

        setPercentages({ ...current });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      // Start animation after a short delay
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 500);
    };

    animatePercentages();

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="stats-page-container">
      <div className="stats-header-section">
        <div className="stats-section-label">[ STATS ]</div>
        <h1 className="stats-main-title">Why Choose a_OCR</h1>
      </div>

      <Percentage />
      <Timer />
      <MassiveScalability />
      <Dots />
    </div>
  );
} 
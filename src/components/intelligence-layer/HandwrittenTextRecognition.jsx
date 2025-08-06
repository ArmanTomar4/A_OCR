import React from 'react';

const HANDWRITTEN_TEXT_RECOGNITION_STYLES = `
  .handwritten-text-recognition-card {
    background-color: #000;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .handwritten-text-recognition-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .handwritten-text-recognition-number {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    letter-spacing: 1px;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .handwritten-text-recognition-card:hover .handwritten-text-recognition-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .handwritten-text-recognition-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .handwritten-text-recognition-svg {
    width: 40%;
    height: 50%;
    object-fit: cover;
    stroke: #fff;
    stroke-width: 1.5;
    fill: none;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transition: all 0.5s ease;
  }

  .handwritten-text-recognition-svg g {
    transition: all 0.5s ease;
  }

  .handwritten-text-recognition-card:hover .handwritten-text-recognition-svg {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
    transform: scale(1.1);
  }

  .handwritten-text-recognition-card:hover .handwritten-text-recognition-svg g:nth-child(1) {
    transform: translateY(20px) rotate(2deg);
    animation: stack 3s infinite;
  }

  .handwritten-text-recognition-card:hover .handwritten-text-recognition-svg g:nth-child(2) {
    transform: translateY(10px) rotate(1deg);
    animation: stack 3s infinite 0.5s;
  }

  .handwritten-text-recognition-card:hover .handwritten-text-recognition-svg g:nth-child(3) {
    transform: translateY(0px) rotate(0deg);
    animation: stack 3s infinite 1s;
  }

  @keyframes stack {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-5px) rotate(1deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
    75% { transform: translateY(-5px) rotate(1deg); }
  }

  .handwritten-text-recognition-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }

  .handwritten-text-recognition-card:hover .handwritten-text-recognition-title {
    transform: translateX(5px);
    color: #fff;
  }

  .handwritten-text-recognition-description {
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 400;
    transition: color 0.3s ease;
  }

  .handwritten-text-recognition-card:hover .handwritten-text-recognition-description {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function HandwrittenTextRecognition() {
  return (
    <div className="handwritten-text-recognition-card">
      <style>{HANDWRITTEN_TEXT_RECOGNITION_STYLES}</style>
      <div className="handwritten-text-recognition-number">[03]</div>
      <div className="handwritten-text-recognition-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240" fill="none" className="handwritten-text-recognition-svg">
          {/* Bottom layer */}
          <g transform="translate(0, 40)">
            <path d="M83 98V0H22.8411L0 23.0397V98H83Z" fill="black"/>
            <path d="M82.5 0.5V97.5H0.5V23.2451L23.0488 0.5H82.5Z" stroke="white" stroke-opacity="0.5"/>
            <rect x="27.25" y="7.25" width="33.5" height="7.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="26.25" width="69.5" height="18.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="48.25" width="69.5" height="17.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="83.25" width="28.5" height="7.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
          </g>
          {/* Middle layer */}
          <g transform="translate(0, 20)">
            <path d="M83 98V0H22.8411L0 23.0397V98H83Z" fill="black"/>
            <path d="M82.5 0.5V97.5H0.5V23.2451L23.0488 0.5H82.5Z" stroke="white" stroke-opacity="0.5"/>
            <rect x="27.25" y="7.25" width="33.5" height="7.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="26.25" width="69.5" height="18.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="48.25" width="69.5" height="17.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="83.25" width="28.5" height="7.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
          </g>
          {/* Top layer */}
          <g transform="translate(0, 0)">
            <path d="M83 98V0H22.8411L0 23.0397V98H83Z" fill="black"/>
            <path d="M82.5 0.5V97.5H0.5V23.2451L23.0488 0.5H82.5Z" stroke="white" stroke-opacity="0.5"/>
            <rect x="27.25" y="7.25" width="33.5" height="7.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="26.25" width="69.5" height="18.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="48.25" width="69.5" height="17.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
            <rect x="7.25" y="83.25" width="28.5" height="7.5" stroke="white" stroke-opacity="0.5" stroke-width="0.5"/>
          </g>
        </svg>
      </div>
      <h3 className="handwritten-text-recognition-title">HANDWRITTEN TEXT RECOGNITION</h3>
      <p className="handwritten-text-recognition-description">
        EXTRACTS BOTH PRINTED AND HANDWRITTEN CONTENT FROM FORMS, NOTES, AND RECEIPTS WITH INDUSTRY-LEADING ACCURACY.
      </p>
    </div>
  );
} 
import React from 'react';

const AI_POWERED_AUTOMATION_STYLES = `
  .ai-powered-automation-card {
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

  .ai-powered-automation-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .ai-powered-automation-number {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    letter-spacing: 1px;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .ai-powered-automation-card:hover .ai-powered-automation-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .ai-powered-automation-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .ai-powered-automation-svg {
    width: 40%;
    height: 50%;
    object-fit: cover;
    stroke: #fff;
    stroke-width: 1.5;
    fill: none;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transition: all 0.5s ease;
  }

  .ai-powered-automation-svg path {
    transition: all 0.5s ease;
  }

  .ai-powered-automation-card:hover .ai-powered-automation-svg {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
    transform: scale(1.1);
  }

  .ai-powered-automation-card:hover .ai-powered-automation-svg path:nth-child(1) {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 2;
    animation: automate 2s infinite;
  }

  .ai-powered-automation-card:hover .ai-powered-automation-svg path:nth-child(2) {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 2;
    animation: automate 2s infinite 0.3s;
  }

  .ai-powered-automation-card:hover .ai-powered-automation-svg path:nth-child(3) {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 2;
    animation: automate 2s infinite 0.6s;
  }

  @keyframes automate {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
  }

  .ai-powered-automation-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }

  .ai-powered-automation-card:hover .ai-powered-automation-title {
    transform: translateX(5px);
    color: #fff;
  }

  .ai-powered-automation-description {
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 400;
    transition: color 0.3s ease;
  }

  .ai-powered-automation-card:hover .ai-powered-automation-description {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function AIPoweredAutomation() {
  return (
    <div className="ai-powered-automation-card">
      <style>{AI_POWERED_AUTOMATION_STYLES}</style>
      <div className="ai-powered-automation-number">[08]</div>
      <div className="ai-powered-automation-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" className="ai-powered-automation-svg">
          <path d="M20 20H80V40H20V20Z" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
          <path d="M20 50H80V70H20V50Z" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
          <path d="M20 80H80V100H20V80Z" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
        </svg>
      </div>
      <h3 className="ai-powered-automation-title">AI-POWERED AUTOMATION</h3>
      <p className="ai-powered-automation-description">
        LEVERAGE INTELLIGENT AI AGENTS TO AUTOMATE COMPLEX DOCUMENT WORKFLOWS ACROSS YOUR ENTIRE ORGANIZATION.
      </p>
    </div>
  );
} 
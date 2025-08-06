import React from 'react';

const SMART_DOCUMENT_CLASSIFICATION_STYLES = `
  .smart-document-classification-card {
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

  .smart-document-classification-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .smart-document-classification-number {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    letter-spacing: 1px;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .smart-document-classification-card:hover .smart-document-classification-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .smart-document-classification-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .smart-document-classification-svg {
    width: 40%;
    height: 50%;
    object-fit: cover;
    stroke: #fff;
    stroke-width: 1.5;
    fill: none;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transition: all 0.5s ease;
  }

  .smart-document-classification-svg path {
    transition: all 0.5s ease;
  }

  .smart-document-classification-card:hover .smart-document-classification-svg {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
    transform: scale(1.1);
  }

  .smart-document-classification-card:hover .smart-document-classification-svg path {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 2;
    animation: classify 2s infinite;
  }

  @keyframes classify {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .smart-document-classification-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }

  .smart-document-classification-card:hover .smart-document-classification-title {
    transform: translateX(5px);
    color: #fff;
  }

  .smart-document-classification-description {
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 400;
    transition: color 0.3s ease;
  }

  .smart-document-classification-card:hover .smart-document-classification-description {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function SmartDocumentClassification() {
  return (
    <div className="smart-document-classification-card">
      <style>{SMART_DOCUMENT_CLASSIFICATION_STYLES}</style>
      <div className="smart-document-classification-number">[04]</div>
      <div className="smart-document-classification-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" className="smart-document-classification-svg">
          <path d="M20 20H80V80H20V20Z" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
          <path d="M30 30H70V40H30V30Z" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <path d="M30 45H70V55H30V45Z" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <path d="M30 60H50V70H30V60Z" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
        </svg>
      </div>
      <h3 className="smart-document-classification-title">SMART DOCUMENT CLASSIFICATION</h3>
      <p className="smart-document-classification-description">
        AUTOMATICALLY DETECTS AND CLASSIFIES INVOICES, TAX CONTRACTS, POSTAL DOCUMENT TYPE RECOGNITION.
      </p>
    </div>
  );
} 
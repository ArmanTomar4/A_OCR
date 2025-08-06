import React from 'react';

const UNIVERSAL_DOCUMENT_INGESTION_STYLES = `
  .universal-document-ingestion-card {
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

  .universal-document-ingestion-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .universal-document-ingestion-number {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    letter-spacing: 1px;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .universal-document-ingestion-card:hover .universal-document-ingestion-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .universal-document-ingestion-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .universal-document-ingestion-svg {
    width: 40%;
    height: 50%;
    object-fit: cover;
    stroke: #fff;
    stroke-width: 1.5;
    fill: none;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transition: all 0.5s ease;
  }

  .universal-document-ingestion-svg path {
    transition: all 0.5s ease;
  }

  .universal-document-ingestion-card:hover .universal-document-ingestion-svg {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
    transform: scale(1.1);
  }

  .universal-document-ingestion-card:hover .universal-document-ingestion-svg path:nth-child(1) {
    transform: translateY(15px) scale(1.05);
    stroke-width: 2.5;
    stroke: #fff;
    stroke-opacity: 1;
    animation: pulse 2s infinite;
  }

  .universal-document-ingestion-card:hover .universal-document-ingestion-svg path:nth-child(2) {
    transform: translateY(5px) scale(1.05);
    stroke-width: 2.5;
    stroke: #fff;
    stroke-opacity: 1;
    animation: pulse 2s infinite 0.3s;
  }

  .universal-document-ingestion-card:hover .universal-document-ingestion-svg path:nth-child(3) {
    transform: translateY(-5px) scale(1.05);
    stroke-width: 2.5;
    stroke: #fff;
    stroke-opacity: 1;
    animation: pulse 2s infinite 0.6s;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .universal-document-ingestion-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }

  .universal-document-ingestion-card:hover .universal-document-ingestion-title {
    transform: translateX(5px);
    color: #fff;
  }

  .universal-document-ingestion-description {
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 400;
    transition: color 0.3s ease;
  }

  .universal-document-ingestion-card:hover .universal-document-ingestion-description {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function UniversalDocumentIngestion() {
  return (
    <div className="universal-document-ingestion-card">
      <style>{UNIVERSAL_DOCUMENT_INGESTION_STYLES}</style>
      <div className="universal-document-ingestion-number">[01]</div>
      <div className="universal-document-ingestion-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240" fill="none" className="universal-document-ingestion-svg">
          {/* Bottom layer */}
          <path d="M298 169L150 106L2 169L150 232L298 169Z" fill="black" stroke="white" stroke-opacity="0.5" stroke-width="3"/>
          {/* Middle layer */}
          <path d="M298 118L150 55L2 118L150 181L298 118Z" fill="black" stroke="white" stroke-opacity="0.5" stroke-width="3"/>
          {/* Top layer */}
          <path d="M298 67L150 4L2 67L150 130L298 67Z" fill="black" stroke="white" stroke-opacity="0.5" stroke-width="3"/>
        </svg>
      </div>
      <h3 className="universal-document-ingestion-title">UNIVERSAL DOCUMENT INGESTION</h3>
      <p className="universal-document-ingestion-description">
        ACCEPTS PDFS, TRADES, WORD, EXCEL, XML, EDI AND MORE WITH AUTOMATED EMAIL & FTP CONNECTORS FOR SEAMLESS BULK PROCESSING.
      </p>
    </div>
  );
} 
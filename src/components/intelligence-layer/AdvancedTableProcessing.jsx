import React from 'react';

const ADVANCED_TABLE_PROCESSING_STYLES = `
  .advanced-table-processing-card {
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

  .advanced-table-processing-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .advanced-table-processing-number {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    letter-spacing: 1px;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .advanced-table-processing-card:hover .advanced-table-processing-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .advanced-table-processing-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .advanced-table-processing-svg {
    width: 40%;
    height: 50%;
    object-fit: cover;
    stroke: #fff;
    stroke-width: 1.5;
    fill: none;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transition: all 0.5s ease;
  }

  .advanced-table-processing-svg rect {
    transition: all 0.5s ease;
  }

  .advanced-table-processing-card:hover .advanced-table-processing-svg {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
    transform: scale(1.1);
  }

  .advanced-table-processing-card:hover .advanced-table-processing-svg rect {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 2;
    animation: tableExpand 2s infinite;
  }

  @keyframes tableExpand {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .advanced-table-processing-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }



  .advanced-table-processing-description {
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 400;
    transition: color 0.3s ease;
  }

  .advanced-table-processing-card:hover .advanced-table-processing-description {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function AdvancedTableProcessing() {
  return (
    <div className="advanced-table-processing-card">
      <style>{ADVANCED_TABLE_PROCESSING_STYLES}</style>
      <div className="advanced-table-processing-number">[05]</div>
      <div className="advanced-table-processing-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" className="advanced-table-processing-svg">
          <rect x="10" y="10" width="80" height="80" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
          <rect x="10" y="10" width="80" height="20" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <rect x="10" y="30" width="80" height="20" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <rect x="10" y="50" width="80" height="20" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <rect x="10" y="70" width="80" height="20" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <rect x="10" y="10" width="20" height="80" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <rect x="30" y="10" width="20" height="80" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <rect x="50" y="10" width="20" height="80" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
          <rect x="70" y="10" width="20" height="80" stroke="white" stroke-opacity="0.5" stroke-width="1"/>
        </svg>
      </div>
      <h3 className="advanced-table-processing-title">ADVANCED TABLE PROCESSING</h3>
      <p className="advanced-table-processing-description">
        STRUCTURE-AWARE PARSING OF COMPLEX, NESTED, AND BORDERLESS TABLES EXPORT TO EXCEL, CSV, OR JSON.
      </p>
    </div>
  );
} 
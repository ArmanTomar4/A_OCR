import React from 'react';

const HEADER_CARD_STYLES = `
  .intelligence-header-card {
    background-color: #0e3ba5;
    height: 450px;
    padding: 32px;
    border: 1px solid #333333;
    transition: all 0.3s ease;
  }



  .intelligence-header-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 20px;
    transition: color 0.3s ease;
  }

  .intelligence-header-card:hover .intelligence-header-label {
    color: rgba(255, 255, 255, 0.9);
  }

  .intelligence-header-title {
    font-size: 32px;
    font-weight: 300;
    line-height: 1.1;
    margin-bottom: 194px;
    color: #fff;
    transition: all 0.3s ease;
  }

  .intelligence-header-card:hover .intelligence-header-title {
    transform: scale(1.02);
  }

  .intelligence-header-description {
    font-size: 14px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.60);
    font-weight: 400;
    transition: color 0.3s ease;
  }


`;

export default function HeaderCard() {
  return (
    <div className="intelligence-header-card">
      <style>{HEADER_CARD_STYLES}</style>
      <div className="intelligence-header-label">[WHAT WE DO]</div>
      <h1 className="intelligence-header-title">Intelligence Layer for Documents</h1>
      <p className="intelligence-header-description">
        AI-powered OCR that doesn't just read text—it understands <span style={{ color: '#FFF' }}>layouts, context, and entities</span>. Transform any document into <span  style={{ color: '#FFF' }}>structured, analytics-ready data</span> with unprecedented accuracy and intelligence.
      </p>
    </div>
  );
} 
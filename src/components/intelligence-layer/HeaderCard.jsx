import React from 'react';

const HEADER_CARD_STYLES = `
  .intelligence-header-card {
    background-color: #0e3ba5;
    height: 450px;
    padding: 32px;
    border: 1px solid #333333;
    transition: all 0.3s ease;
  }

  .intelligence-header-card:hover {
    background-color: #0a2d7a;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(14, 59, 165, 0.3);
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
    margin-bottom: 20px;
    color: #fff;
    transition: all 0.3s ease;
  }

  .intelligence-header-card:hover .intelligence-header-title {
    transform: scale(1.02);
  }

  .intelligence-header-description {
    font-size: 12px;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    transition: color 0.3s ease;
  }

  .intelligence-header-card:hover .intelligence-header-description {
    color: #fff;
  }
`;

export default function HeaderCard() {
  return (
    <div className="intelligence-header-card">
      <style>{HEADER_CARD_STYLES}</style>
      <div className="intelligence-header-label">[WHAT WE DO]</div>
      <h1 className="intelligence-header-title">Intelligence Layer for Documents</h1>
      <p className="intelligence-header-description">
        AI-powered OCR that doesn't just read text—it understands <strong>layouts, context, and entities</strong>. Transform any document into <strong>structured, analytics-ready data</strong> with unprecedented accuracy and intelligence.
      </p>
    </div>
  );
} 
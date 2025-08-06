import React from 'react';

const NATURAL_LANGUAGE_QUERIES_STYLES = `
  .natural-language-queries-card {
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

  .natural-language-queries-card:hover {
    border-top: 2px solid #fff;
    background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  }

  .natural-language-queries-number {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    letter-spacing: 1px;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: color 0.3s ease;
  }

  .natural-language-queries-card:hover .natural-language-queries-number {
    color: rgba(255, 255, 255, 0.9);
  }

  .natural-language-queries-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 32px 0 16px 0;
  }

  .natural-language-queries-svg {
    width: 40%;
    height: 50%;
    object-fit: cover;
    stroke: #fff;
    stroke-width: 1.5;
    fill: none;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transition: all 0.5s ease;
  }

  .natural-language-queries-svg path {
    transition: all 0.5s ease;
  }

  .natural-language-queries-card:hover .natural-language-queries-svg {
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
    transform: scale(1.1);
  }

  .natural-language-queries-card:hover .natural-language-queries-svg path:nth-child(1) {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 2;
    animation: search 2s infinite;
  }

  .natural-language-queries-card:hover .natural-language-queries-svg path:nth-child(2) {
    stroke: #fff;
    stroke-opacity: 1;
    stroke-width: 2;
    animation: search 2s infinite 0.5s;
  }

  @keyframes search {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .natural-language-queries-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #fff;
    margin-bottom: 12px;
    font-weight: 500;
    line-height: 1.3;
    transition: all 0.3s ease;
  }

  .natural-language-queries-card:hover .natural-language-queries-title {
    transform: translateX(5px);
    color: #fff;
  }

  .natural-language-queries-description {
    font-size: 9px;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 400;
    transition: color 0.3s ease;
  }

  .natural-language-queries-card:hover .natural-language-queries-description {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export default function NaturalLanguageQueries() {
  return (
    <div className="natural-language-queries-card">
      <style>{NATURAL_LANGUAGE_QUERIES_STYLES}</style>
      <div className="natural-language-queries-number">[07]</div>
      <div className="natural-language-queries-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none" className="natural-language-queries-svg">
          <path d="M40 20C40 20 60 20 60 40C60 60 40 60 40 40C40 20 40 20 40 20Z" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
          <path d="M60 60L80 80" stroke="white" stroke-opacity="0.5" stroke-width="2"/>
        </svg>
      </div>
      <h3 className="natural-language-queries-title">NATURAL LANGUAGE QUERIES</h3>
      <p className="natural-language-queries-description">
        QUERY YOUR DOCUMENTS USING EVERYDAY LANGUAGE AND GET INSTANT INSIGHTS FROM STRUCTURED OR UNSTRUCTURED DATA.
      </p>
    </div>
  );
} 
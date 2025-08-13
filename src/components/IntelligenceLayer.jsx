import React from 'react';
import {
  HeaderCard,
  UniversalDocumentIngestion,
  MultiLanguageOCR,
  SmartDocumentClassification,
  AdvancedTableProcessing,
  HandwrittenTextRecognition,
  ContextAwareAI,
  NaturalLanguageQueries,
  AIPoweredAutomation
} from './intelligence-layer';

const INTELLIGENCE_LAYER_STYLES = `
  .intelligence-layer-container {
    min-height: 100vh;
    background-color: #000;
    color: #fff;
    padding:100px 95px 48px 95px;
  }

  .intelligence-features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 1200px) {
    .intelligence-container {
      flex-direction: column;
    }
    
    .header-section {
      width: 100%;
      max-width: 500px;
    }
    
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default function IntelligenceLayer() {
  return (
    <div className="intelligence-layer-container">
      <style>{INTELLIGENCE_LAYER_STYLES}</style>
      <div className="intelligence-features-grid">
        {/* Header Card - First position in grid */}
        <HeaderCard />
        {/* Feature Cards */}
        <UniversalDocumentIngestion />
        <AdvancedTableProcessing />
        <MultiLanguageOCR />
        <HandwrittenTextRecognition />
        <SmartDocumentClassification />
        <ContextAwareAI />
        <NaturalLanguageQueries />
        <AIPoweredAutomation />
        

      </div>
    </div>
  );
} 
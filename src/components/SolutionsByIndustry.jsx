import React, { useEffect, useState } from 'react';

const styles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.solutions-container {
  min-height: 100vh;
  background-color: #FFF;
  padding: 48px 64px;
}

.solutions-header {
margin-top: 100px;

  margin-bottom: 40px;
  display: flex;
  gap: 64px;
  align-items: flex-start;
}

.solutions-left {
  flex: 0 0 auto;
}

.solutions-label {
  font-size: 9px;
  letter-spacing: 2px;
  color: #666;
  margin-bottom: 16px;
}

.solutions-title {
color: #000;
font-size: 2.5rem;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: var(--Typography-Letter-spacing-8, -0.01rem);
}

.solutions-description {
  margin: 50px 0 0 25px;
  font-size: 1rem;
  line-height: 1.625rem;
  color: #444;
  max-width: 100&;
  flex: 1;
color: rgba(0, 0, 0, 0.60);
font-weight: 400;
}

.solutions-description-highlight {
  font-weight: 500;
  color: #000;
}

.solutions-content {
  display: flex;
  gap: 48px;
  margin-top: 48px;
}

.industry-sidebar {
  width: 240px;
  flex-shrink: 0;
}

.industry-item {
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.industry-item:hover {
  padding-left: 5px;

}

.industry-item.active {
  border-bottom-color: #0e3ba5;
}

.industry-name {
  font-size: 16px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
}
  .industry-item.active .industry-name {
    color: #000;
    font-weight: 400;
  }

.industry-item.active {
border-bottom: 1px solid #0e3ba5;
color: #000;
}

.industry-number {
  font-size: 11px;
  color: #999;
  font-weight: 300;
}

.industry-details-panel {
  flex: 1;
  background-color: #0e3ba5;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.panel-header {
  font-size: 10px;
  letter-spacing: 2px;
  opacity: 0.8;
  margin-bottom: 20px;
}

.document-types-grid {
  display: grid;
gap: 5px;
    margin-bottom: 20px;
}

.document-type-item {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.document-type-item:last-child {
  border-bottom: none;
}

.document-type-name {
  font-size: 13px;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
  opacity: 0.9;
}

.document-type-description {
  font-size: 13px;
  line-height: 1.6;
  opacity: 0.8;
}

.benefits-section {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 4px;
  margin-top: auto;
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.benefits-label {
  font-size: 10px;
  letter-spacing: 2px;
  color: rgba(0, 113, 63, 0.87);
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  margin-bottom: 0;
}

.benefits-arrow {
  width: 15px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefits-arrow svg {
  width: 15px;
  height: 21px;
}

.benefits-arrow-span{
  color: rgba(0, 113, 63, 0.87);
  font-weight: 700;
  font-size: 10px;
}

.benefits-text {
  font-size: 10px;
  line-height: 1.8;
  color: rgba(0, 113, 63, 0.87);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  flex: 1;
}

@media (max-width: 1200px) {
  .solutions-container {
    padding: 40px;
  }
  
  .solutions-title {
    font-size: 56px;
  }
  
  .solutions-content {
    flex-direction: column;
  }
  
  .industry-sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .solutions-container {
    padding: 20px;
  }
  
  .solutions-title {
    font-size: 40px;
  }
  
  .document-type-item {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .industry-details-panel {
    padding: 30px;
  }
}
`;

const industries = [
  { name: 'Financial Technology', number: '01' },
  { name: 'Healthcare & Medical', number: '02' },
  { name: 'Legal Services', number: '03' },
  { name: 'Government & Public Sector', number: '04' },
  { name: 'Logistics & Supply Chain', number: '05' }
];

const industryData = {
  'Financial Technology': {
    header: '01 - FINANCIAL TECHNOLOGY',
    documents: [
      {
        name: 'Bank Statements',
        description: 'Extract transaction data, balances, and customer information from multiple banking formats'
      },
      {
        name: 'KYC Documents',
        description: 'Process identity verification including passports, licenses, and proof of address'
      },
      {
        name: 'Loan Applications',
        description: 'Digitize income statements, tax returns, and employment letters'
      },
      {
        name: 'Check Processing',
        description: 'Convert handwritten and printed checks into structured data'
      }
    ]
  },
  'Healthcare & Medical': {
    header: '02 - HEALTHCARE & MEDICAL',
    documents: [
      {
        name: 'Medical Records',
        description: 'Extract patient information, diagnoses, and treatment history from clinical documents'
      },
      {
        name: 'Insurance Claims',
        description: 'Process claim forms, EOBs, and authorization documents automatically'
      },
      {
        name: 'Prescriptions',
        description: 'Digitize handwritten prescriptions and medication orders with high accuracy'
      },
      {
        name: 'Lab Reports',
        description: 'Convert test results and diagnostic reports into searchable data'
      }
    ]
  },
  'Legal Services': {
    header: '03 - LEGAL SERVICES',
    documents: [
      {
        name: 'Contracts',
        description: 'Extract key terms, clauses, and parties from legal agreements'
      },
      {
        name: 'Court Documents',
        description: 'Process pleadings, motions, and judgments with legal entity recognition'
      },
      {
        name: 'Patents & IP',
        description: 'Digitize patent applications and intellectual property documents'
      },
      {
        name: 'Compliance Forms',
        description: 'Automate regulatory filing and compliance document processing'
      }
    ]
  },
  'Government & Public Sector': {
    header: '04 - GOVERNMENT & PUBLIC SECTOR',
    documents: [
      {
        name: 'Citizen Applications',
        description: 'Process permit applications, license renewals, and service requests'
      },
      {
        name: 'Tax Documents',
        description: 'Extract data from tax forms, returns, and assessment notices'
      },
      {
        name: 'Public Records',
        description: 'Digitize historical archives and government documentation'
      },
      {
        name: 'Immigration Papers',
        description: 'Process visa applications, passports, and immigration forms'
      }
    ]
  },
  'Logistics & Supply Chain': {
    header: '05 - LOGISTICS & SUPPLY CHAIN',
    documents: [
      {
        name: 'Shipping Documents',
        description: 'Extract data from bills of lading, packing lists, and manifests'
      },
      {
        name: 'Invoices & POs',
        description: 'Process purchase orders and invoices across multiple formats'
      },
      {
        name: 'Customs Forms',
        description: 'Digitize import/export documentation and customs declarations'
      },
      {
        name: 'Delivery Notes',
        description: 'Convert proof of delivery and receipt confirmations to digital format'
      }
    ]
  }
};

export default function SolutionsByIndustry() {
  const [activeIndustry, setActiveIndustry] = useState('Financial Technology');

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const currentData = industryData[activeIndustry];

  return (
    <div className="solutions-container">
      <div className="solutions-header">
        <div className="solutions-left">
          <div className="solutions-label">[ APPLICATIONS ]</div>
          <h1 className="solutions-title">
            Solutions by<br />Industry
          </h1>
        </div>
        <p className="solutions-description">
          Transform your document processing <span className="solutions-description-highlight">workflow</span> with <span className="solutions-description-highlight">industry-specific OCR solutions</span> designed to
          handle the unique challenges of your sector. Our advanced optical character recognition technology
          delivers precise, <span className="solutions-description-highlight">scalable document digitization</span> across diverse business environments.
        </p>
      </div>

      <div className="solutions-content">
        <div className="industry-sidebar">
          {industries.map((industry) => (
            <div
              key={industry.number}
              className={`industry-item ${activeIndustry === industry.name ? 'active' : ''}`}
              onClick={() => setActiveIndustry(industry.name)}
            >
              <span className="industry-name">{industry.name}</span>
              <span className="industry-number">{industry.number}</span>
            </div>
          ))}
        </div>

        <div className="industry-details-panel">
          <div className="panel-header">{currentData.header}</div>

          <div className="document-types-grid">
            {currentData.documents.map((doc, index) => (
              <div key={index} className="document-type-item">
                <div className="document-type-name">{doc.name}</div>
                <div className="document-type-description">{doc.description}</div>
              </div>
            ))}
          </div>

          <div className="benefits-section">
            <div className="benefits-label">
              <div className="benefits-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="21" viewBox="0 0 15 21" fill="none">
                  <path d="M1 16.5H0.5V17H1V16.5ZM14.8536 16.8536C15.0488 16.6583 15.0488 16.3417 14.8536 16.1464L11.6716 12.9645C11.4763 12.7692 11.1597 12.7692 10.9645 12.9645C10.7692 13.1597 10.7692 13.4763 10.9645 13.6716L13.7929 16.5L10.9645 19.3284C10.7692 19.5237 10.7692 19.8403 10.9645 20.0355C11.1597 20.2308 11.4763 20.2308 11.6716 20.0355L14.8536 16.8536ZM1 0H0.5V16.5H1H1.5V0H1ZM1 16.5V17H14.5V16.5V16H1V16.5Z" fill="#00713F" fill-opacity="0.870588" />
                </svg>
              </div>
              <span className="benefits-arrow-span">KEY BENEFITS</span>
            </div>
            <div className="benefits-text">
              REDUCE MANUAL DATA ENTRY BY 90%, ACCELERATE CUSTOMER ONBOARDING BY 75%,
              ENSURE REGULATORY COMPLIANCE, AND MINIMIZE HUMAN ERROR IN FINANCIAL
              CALCULATIONS.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
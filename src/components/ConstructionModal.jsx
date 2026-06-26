import React from 'react';
import './ConstructionModal.css';

const ConstructionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="construction-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="construction-modal-container">
        <button className="construction-modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="construction-modal-content">
          <iframe 
            src="/construction-ppt/index.html" 
            title="Construction Management Presentation"
            className="construction-iframe"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ConstructionModal;

import React from 'react';
import './InvestEaseModal.css';

const InvestEaseModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="investease-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="investease-modal-container">
        <button className="investease-modal-close" onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="investease-modal-content">
          <iframe 
            src="/investease-ppt/index.html" 
            title="InvestEase Presentation"
            className="investease-iframe"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default InvestEaseModal;

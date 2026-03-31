import { useState, useEffect, useCallback } from 'react';
import './MagazineModal.css';

// All magazine pages in order
const pages = [
  '/images/magazine/1-cover.png',
  '/images/magazine/2.png',
  '/images/magazine/3.png',
  '/images/magazine/4.png',
  '/images/magazine/5.png',
  '/images/magazine/6.png',
  '/images/magazine/7.png',
  '/images/magazine/8.png',
  '/images/magazine/9.png',
  '/images/magazine/10.png',
  '/images/magazine/11.png',
  '/images/magazine/12.png',
  '/images/magazine/13.png',
  '/images/magazine/14.png',
  '/images/magazine/15.png',
  '/images/magazine/16.png',
  '/images/magazine/17.png',
  '/images/magazine/18.png',
  '/images/magazine/19.png',
];

const MagazineModal = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' or 'prev'
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset page when modal opens
  useEffect(() => {
    if (isOpen) setCurrentPage(0);
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, currentPage, flipping, isMobile]);

  const getNextStep = (current, mobile) => mobile ? 1 : (current === 0 ? 1 : 2);
  const getPrevStep = (current, mobile) => mobile ? 1 : (current === 1 ? 1 : 2);

  const goNext = useCallback(() => {
    if (flipping) return;
    const step = getNextStep(currentPage, isMobile);
    if (currentPage + step >= pages.length) return;
    
    setFlipDirection('next');
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => p + step);
      setFlipping(false);
      setFlipDirection(null);
    }, 500);
  }, [flipping, currentPage, isMobile]);

  const goPrev = useCallback(() => {
    if (flipping) return;
    if (currentPage === 0) return;
    const step = getPrevStep(currentPage, isMobile);
    
    setFlipDirection('prev');
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage((p) => Math.max(p - step, 0));
      setFlipping(false);
      setFlipDirection(null);
    }, 500);
  }, [flipping, currentPage, isMobile]);

  // Handle click on page area — right half = next, left half = back
  const handlePageClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;
    if (clickX > halfWidth) {
      goNext();
    } else {
      goPrev();
    }
  }, [goNext, goPrev]);

  if (!isOpen) return null;

  const totalPages = pages.length;
  const pageIndicator = isMobile || (!isMobile && currentPage === 0)
    ? `${currentPage + 1} / ${totalPages}`
    : `${currentPage + 1}–${Math.min(currentPage + 2, totalPages)} / ${totalPages}`;

  return (
    <div className="magazine-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="magazine-modal-close" onClick={onClose} aria-label="Close">
        ×
      </button>

      <div className="magazine-viewer">
        {/* Page indicator */}
        <div className="magazine-page-indicator">{pageIndicator}</div>

        {isMobile || (!isMobile && currentPage === 0) ? (
          /* ===== SINGLE PAGE VIEW (Mobile or Desktop Cover) ===== */
          <div className="magazine-single">
            <div
              className={`magazine-single-page ${flipping ? `flip-${flipDirection}` : ''}`}
              onClick={handlePageClick}
            >
              <img
                src={pages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                draggable={false}
              />
              {/* Invisible click zones with cursors */}
              <div className="page-click-zone left-zone" onClick={(e) => { e.stopPropagation(); goPrev(); }}></div>
              <div className="page-click-zone right-zone" onClick={(e) => { e.stopPropagation(); goNext(); }}></div>
            </div>
          </div>
        ) : (
          /* ===== DESKTOP: Two-page spread ===== */
          <div className="magazine-spread">
            {/* Left page — click to go back */}
            <div
              className={`magazine-spread-page left ${flipping && flipDirection === 'prev' ? 'flip-in-left' : ''} ${flipping && flipDirection === 'next' ? 'flip-out-left' : ''}`}
              onClick={goPrev}
              style={{ cursor: currentPage > 0 ? 'pointer' : 'default' }}
            >
              <img
                src={pages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                draggable={false}
              />
            </div>
            {/* Right page — click to go next */}
            {currentPage + 1 < totalPages && (
              <div
                className={`magazine-spread-page right ${flipping && flipDirection === 'next' ? 'flip-in-right' : ''} ${flipping && flipDirection === 'prev' ? 'flip-out-right' : ''}`}
                onClick={goNext}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={pages[currentPage + 1]}
                  alt={`Page ${currentPage + 2}`}
                  draggable={false}
                />
              </div>
            )}
            {/* Book spine */}
            <div className="magazine-spine"></div>
          </div>
        )}

        {/* Navigation controls */}
        <div className="magazine-nav">
          <button
            className="magazine-nav-btn"
            onClick={goPrev}
            disabled={currentPage === 0 || flipping}
          >
            ← Back
          </button>
          <button
            className="magazine-nav-btn"
            onClick={goNext}
            disabled={currentPage + getNextStep(currentPage, isMobile) >= pages.length || flipping}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MagazineModal;

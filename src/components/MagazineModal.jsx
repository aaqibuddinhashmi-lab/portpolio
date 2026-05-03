import { useState, useEffect, useCallback, useRef } from 'react';
import './MagazineModal.css';

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

const totalSpreads = 1 + Math.ceil((pages.length - 1) / 2);
const spreadLeft  = (s) => (s === 0 ? null : pages[s * 2 - 1] ?? null);
const spreadRight = (s) => (s === 0 ? pages[0] : pages[s * 2] ?? null);

const MagazineModal = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [spread, setSpread] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);

  const [flipState, setFlipState] = useState('idle');
  const [flipDir, setFlipDir] = useState(null);

  const bookRef = useRef(null);
  const flipDirRef = useRef(null);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768);
    c(); window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSpread(0); setMobileIdx(0);
      setFlipState('idle'); setFlipDir(null); flipDirRef.current = null;
    }
  }, [isOpen]);

  const canFwd  = isMobile ? mobileIdx < pages.length - 1 : spread < totalSpreads - 1;
  const canBack = isMobile ? mobileIdx > 0 : spread > 0;

  // Complete the flip: advance page and reset all flip state
  const completeFlip = useCallback(() => {
    const dir = flipDirRef.current;
    if (dir === 'forward') {
      if (isMobile) setMobileIdx(p => p + 1);
      else setSpread(p => p + 1);
    } else if (dir === 'backward') {
      if (isMobile) setMobileIdx(p => p - 1);
      else setSpread(p => p - 1);
    }
    setFlipState('idle');
    setFlipDir(null);
    flipDirRef.current = null;
  }, [isMobile]);

  // Safety timeout — always fires 1300ms after animation starts
  useEffect(() => {
    if (flipState !== 'animating') return;
    const t = setTimeout(completeFlip, 1300);
    return () => clearTimeout(t);
  }, [flipState, completeFlip]);

  // Phase 2: after flip element mounts ('mounting'), start the animation
  useEffect(() => {
    if (flipState !== 'mounting') return;
    // Double rAF ensures browser has painted the initial position
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlipState('animating');
      });
    });
    return () => cancelAnimationFrame(id);
  }, [flipState]);

  // Trigger flip (buttons / keyboard / click)
  const triggerFlip = useCallback((dir) => {
    if (flipState !== 'idle') return;
    if (dir === 'forward' && !canFwd) return;
    if (dir === 'backward' && !canBack) return;
    flipDirRef.current = dir;
    setFlipDir(dir);
    setFlipState('mounting'); // mounts the element at initial position
  }, [flipState, canFwd, canBack]);

  // Handle animationEnd — for the flip-page itself
  const handleAnimationEnd = useCallback((e) => {
    if (e.target !== e.currentTarget) return;
    completeFlip();
  }, [completeFlip]);



  // Keyboard
  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === ' ') triggerFlip('forward');
      if (e.key === 'ArrowLeft') triggerFlip('backward');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, triggerFlip, onClose]);

  if (!isOpen) return null;

  // ---- Compute what to render ----
  const activeDir = flipDir;
  const isFwd = activeDir === 'forward';
  const isBwd = activeDir === 'backward';

  // Flip transform
  let flipStyle = {};
  if (flipState === 'mounting') {
    // Just mounted — at initial position, no transition
    flipStyle = { transform: 'rotateY(0deg)' };
  } else if (flipState === 'animating') {
    // Animating to final position using CSS keyframes for a paper bend effect
    flipStyle = {
      animation: flipDir === 'forward' 
        ? 'flipForward 1.2s ease-in-out forwards' 
        : 'flipBackward 1.2s ease-in-out forwards',
    };
  }

  const shadowOpacity = flipState === 'animating' ? 0.3 : 0;

  // ---- Desktop ----
  const renderDesktop = () => {
    const nextS = Math.min(spread + 1, totalSpreads - 1);
    const prevS = Math.max(spread - 1, 0);
    const isCover = spread === 0 && !activeDir;

    let leftSrc = spreadLeft(spread);
    let rightSrc = spreadRight(spread);
    if (isFwd) rightSrc = spreadRight(nextS);
    if (isBwd) leftSrc = spreadLeft(prevS);

    let flipFront = null, flipBack = null;
    if (isFwd) {
      flipFront = spreadRight(spread);
      flipBack = spreadLeft(nextS);
    } else if (isBwd) {
      flipFront = spreadLeft(spread);
      flipBack = spreadRight(prevS);
    }

    return (
      <div className={`book ${isCover ? 'book--cover' : ''}`} ref={bookRef}>
        <div 
          className="book-page book-left" 
          onClick={() => triggerFlip('backward')}
          style={{ cursor: canBack ? 'pointer' : 'default' }}
        >
          {leftSrc ? <img src={leftSrc} alt="" draggable={false} /> : <div className="book-page-blank" />}
        </div>
        <div 
          className="book-page book-right" 
          onClick={() => triggerFlip('forward')}
          style={{ cursor: canFwd ? 'pointer' : 'default' }}
        >
          {rightSrc ? <img src={rightSrc} alt="" draggable={false} /> : <div className="book-page-blank" />}
        </div>

        {activeDir && (
          <div
            className={`flip-page ${isFwd ? 'flip-forward' : 'flip-backward'}`}
            style={flipStyle}
            onAnimationEnd={handleAnimationEnd}
          >
            <div className="flip-front">
              {flipFront && <img src={flipFront} alt="" draggable={false} />}
            </div>
            <div className="flip-back">
              {flipBack && <img src={flipBack} alt="" draggable={false} />}
            </div>
            <div className="flip-fold-gradient" />
          </div>
        )}

        {activeDir && <div className="flip-cast-shadow" style={{ opacity: shadowOpacity }} />}
        <div className="book-spine" />
      </div>
    );
  };

  // ---- Mobile ----
  const renderMobile = () => {
    const nextP = Math.min(mobileIdx + 1, pages.length - 1);
    const prevP = Math.max(mobileIdx - 1, 0);

    let underSrc = pages[mobileIdx];
    if (isFwd) underSrc = pages[nextP];
    if (isBwd) underSrc = pages[prevP];

    return (
      <div className="book book--mobile" ref={bookRef}>
        <div 
          className="book-page book-single"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const isLeft = e.clientX - rect.left < rect.width / 2;
            triggerFlip(isLeft ? 'backward' : 'forward');
          }}
          style={{ cursor: 'pointer' }}
        >
          <img src={underSrc} alt="" draggable={false} />
        </div>

        {activeDir && (
          <div
            className={`flip-page ${isFwd ? 'flip-forward-mobile' : 'flip-backward-mobile'}`}
            style={flipStyle}
            onAnimationEnd={handleAnimationEnd}
          >
            <div className="flip-front">
              <img src={pages[mobileIdx]} alt="" draggable={false} />
            </div>
            <div className="flip-back">
              <img src={pages[isFwd ? nextP : prevP]} alt="" draggable={false} />
            </div>
            <div className="flip-fold-gradient" />
          </div>
        )}
        {activeDir && <div className="flip-cast-shadow" style={{ opacity: shadowOpacity }} />}
      </div>
    );
  };

  const indicator = isMobile
    ? `${mobileIdx + 1} / ${pages.length}`
    : spread === 0
      ? `Cover`
      : `${spread * 2}–${Math.min(spread * 2 + 1, pages.length)} / ${pages.length}`;

  return (
    <div className="magazine-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="magazine-modal-close" onClick={onClose} aria-label="Close">×</button>

      <div className="magazine-viewer">
        <div className="magazine-page-indicator">{indicator}</div>
        {isMobile ? renderMobile() : renderDesktop()}

        <div className="magazine-nav">
          <button className="magazine-nav-btn" onClick={() => triggerFlip('backward')}
            disabled={!canBack || flipState !== 'idle'}>← Back</button>
          <span className="magazine-drag-hint" style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            Click pages to flip
          </span>
          <button className="magazine-nav-btn" onClick={() => triggerFlip('forward')}
            disabled={!canFwd || flipState !== 'idle'}>Next →</button>
        </div>
      </div>
    </div>
  );
};

export default MagazineModal;

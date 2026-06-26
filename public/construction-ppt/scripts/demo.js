// ============================================
// BuildIQ — Live Demo Integration
// Iframe loading, fullscreen overlay, dynamic scaling
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initDemoLoading();
  initDemoScaling();
  initFullscreenDemo();
});

// --- Iframe Loading State ---
function initDemoLoading() {
  const iframe = document.getElementById('demo-iframe');
  const loading = document.getElementById('demo-loading');

  if (!iframe || !loading) return;

  iframe.addEventListener('load', () => {
    // Small delay for premium feel
    setTimeout(() => {
      loading.classList.add('loaded');
    }, 600);
  });

  // Fallback: hide loading after 8 seconds regardless
  setTimeout(() => {
    loading.classList.add('loaded');
  }, 8000);
}

// --- Dynamic Iframe Scale Calculation ---
function initDemoScaling() {
  const viewport = document.querySelector('.demo-browser__viewport');
  const iframe = document.getElementById('demo-iframe');
  if (!viewport || !iframe) return;

  const IFRAME_NATIVE_WIDTH = 1440;
  const IFRAME_NATIVE_HEIGHT = 900;

  function updateScale() {
    const containerWidth = viewport.offsetWidth;
    const scale = containerWidth / IFRAME_NATIVE_WIDTH;
    
    // Apply scale to iframe
    iframe.style.transform = `scale(${scale})`;
    
    // Set viewport height to exactly match the scaled iframe height to prevent cropping
    const scaledHeight = IFRAME_NATIVE_HEIGHT * scale;
    viewport.style.height = `${scaledHeight}px`;
  }

  // Initial calculation
  updateScale();

  // Recalculate on resize
  window.addEventListener('resize', updateScale);

  // Also recalculate after a brief delay (for late layout shifts)
  setTimeout(updateScale, 500);
}

// --- Fullscreen Demo Overlay ---
function initFullscreenDemo() {
  const overlay = document.getElementById('demo-fullscreen');
  const closeBtn = document.getElementById('demo-fullscreen-close');
  const fullscreenIframe = document.getElementById('demo-fullscreen-iframe');

  if (!overlay || !closeBtn) return;

  // Open fullscreen from any element with data-open-demo
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-demo]');
    if (trigger) {
      e.preventDefault();
      openFullscreenDemo();
    }
  });

  closeBtn.addEventListener('click', () => {
    closeFullscreenDemo();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeFullscreenDemo();
    }
  });

  function openFullscreenDemo() {
    if (fullscreenIframe) {
      fullscreenIframe.src = 'Construction Management- UI/index.html';
    }
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFullscreenDemo() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Unload iframe to free memory
    setTimeout(() => {
      if (fullscreenIframe) {
        fullscreenIframe.src = 'about:blank';
      }
    }, 400);
  }
}

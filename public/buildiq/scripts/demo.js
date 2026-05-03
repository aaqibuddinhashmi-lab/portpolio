// ============================================
// BuildIQ — Live Demo Integration
// Iframe loading, fullscreen overlay, interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initDemoLoading();
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

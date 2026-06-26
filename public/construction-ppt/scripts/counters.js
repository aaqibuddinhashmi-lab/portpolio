// ============================================
// BuildIQ — Animated Number Counters
// Triggers on scroll using IntersectionObserver
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});

function initCounters() {
  const counterElements = document.querySelectorAll('.stat-card__number, .impact-counter__number');
  
  if (!counterElements.length) return;

  // Configuration
  const animationDuration = 2000; // ms
  const frameDuration = 1000 / 60; // 60fps
  const totalFrames = Math.round(animationDuration / frameDuration);

  // Easing function (easeOutQuart)
  const easeOut = t => 1 - Math.pow(1 - t, 4);

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.5 // Start when 50% visible
  });

  counterElements.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const targetValue = parseInt(el.getAttribute('data-count') || el.innerText.replace(/[^0-9]/g, ''), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    
    if (isNaN(targetValue)) return;

    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      
      const progress = easeOut(frame / totalFrames);
      const currentCount = Math.round(targetValue * progress);

      el.innerText = `${prefix}${currentCount}${suffix}`;

      if (frame === totalFrames) {
        clearInterval(counter);
        el.innerText = `${prefix}${targetValue}${suffix}`; // Ensure exact final value
      }
    }, frameDuration);
  }
}

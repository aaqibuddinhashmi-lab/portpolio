// ============================================
// BuildIQ — Animations & Scroll Effects
// Uses GSAP ScrollTrigger and native IntersectionObserver
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initIntersectionObservers();
  
  // Initialize GSAP if loaded
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initGSAPAnimations();
  } else {
    console.warn('GSAP not loaded. Premium parallax and pinning effects disabled.');
  }
});

/**
 * Native Intersection Observers for simple class toggling (reveals)
 */
function initIntersectionObservers() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up');
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve if you only want the animation to play once
        // obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% visible
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Complex animations using GSAP and ScrollTrigger
 */
function initGSAPAnimations() {
  // 1. Hero Parallax
  const heroBg = document.querySelector('.hero__bg-image');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // 2. Journey Map Path Animation
  // Simulating stroke drawing by animating elements
  const journeyNodes = document.querySelectorAll('.journey-step__node');
  if (journeyNodes.length) {
    ScrollTrigger.batch(journeyNodes, {
      start: "top 80%",
      onEnter: batch => gsap.fromTo(batch, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, stagger: 0.15, duration: 0.6, ease: "back.out(1.7)" }
      )
    });
  }

  // 3. IA Tree Diagram Build
  const iaNodes = document.querySelectorAll('.ia-node, .ia-connector, .ia-branch__connector');
  if (iaNodes.length) {
    ScrollTrigger.batch(iaNodes, {
      start: "top 85%",
      onEnter: batch => gsap.fromTo(batch,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power2.out" }
      )
    });
  }

  // 4. Feature Image Parallax
  const featureImages = document.querySelectorAll('.feature-showcase__visual img');
  featureImages.forEach(img => {
    gsap.to(img, {
      yPercent: 15,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}

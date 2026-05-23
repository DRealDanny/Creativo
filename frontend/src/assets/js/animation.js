/* ============================================================
   CREATIVO CREATES — animation.js
   GSAP animations
   Requires: gsap.min.js, ScrollTrigger.min.js (CDN)
   ============================================================

   01  GSAP SETUP
   03  HERO ENTRANCE (GSAP)
   04  INIT

   NOTE: Scroll reveals for cards, service blocks, disciplines,
   and process steps are handled entirely by the CSS [data-reveal]
   system + IntersectionObserver in main.js.
   DO NOT use gsap.set() on elements that also use [data-reveal] —
   GSAP inline styles override CSS class changes and prevent reveals.

   ============================================================ */

(function () {
  'use strict';

  // Guard — only run if GSAP is available
  if (typeof gsap === 'undefined') {
    console.warn('animation.js: GSAP not loaded.');
    return;
  }


  /* ============================================================
     01  GSAP SETUP
     ============================================================ */

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({ limitCallbacks: true });

  /* ============================================================
     03  HERO ENTRANCE (GSAP)
     Handles: subtitle, actions row, scroll indicator only.
     Eyebrow + title words use CSS animations (word-rise, fade-in).
     These elements do NOT use [data-reveal] — safe to use gsap.from().
     ============================================================ */

  function initHeroEntrance() {
    const subtitle = document.querySelector('.hero-subtitle');
    const actions  = document.querySelector('.hero-actions');
    const scroll   = document.querySelector('.hero-scroll');

    // Nothing to animate — not the home page
    if (!subtitle && !actions && !scroll) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (subtitle) tl.from(subtitle, { opacity: 0, y: 28, duration: 0.85 }, 0.75);
    if (actions)  tl.from(actions,  { opacity: 0, y: 22, duration: 0.80 }, 0.90);
    if (scroll)   tl.from(scroll,   { opacity: 0,        duration: 0.70 }, 1.40);
  }

  // Make initHeroEntrance available globally to React if needed
  window.initHeroEntrance = initHeroEntrance;

  /* ============================================================
     04  INIT
     ============================================================ */

  document.addEventListener('DOMContentLoaded', () => {
    initHeroEntrance();
  });

})();
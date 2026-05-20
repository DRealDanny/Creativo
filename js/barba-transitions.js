(function () {
  'use strict';

  if (typeof barba === 'undefined') {
    console.warn('barba-transitions.js: Barba.js not loaded.');
    return;
  }

  /* ============================================================
     01  GSAP INITIAL LOADER
     ============================================================ */
  function runInitialLoader() {
    const loader = document.getElementById('gsap-loader');
    if (!loader) return;

    if (sessionStorage.getItem('loaderHasRun')) {
      loader.style.display = 'none';
      return;
    }

    window.addEventListener('load', () => {
      const letters = loader.querySelectorAll('.loader-letter');
      const dot = loader.querySelector('.loader-dot');

      const tl = gsap.timeline({
        onComplete: () => {
          loader.style.display = 'none';
          sessionStorage.setItem('loaderHasRun', 'true');
        }
      });

      // stagger-rises the "CREATIVO" letters from a clip path
      tl.from(letters, {
        y: '100%',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05
      })
      // The dot animates in blue #2060FF after the letters land
      .to(dot, {
        fill: '#2060FF',
        duration: 0.3,
        ease: 'power2.inOut'
      }, "+=0.1")
      // Brief pause, then GSAP slides the entire loader up
      .to(loader, {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut"
      }, "+=0.4");
    });
  }

  // Remove the old initial loader from main.js if it exists
  // We'll just override it by running this one
  runInitialLoader();

  /* ============================================================
     02  BARBA.JS SETUP
     ============================================================ */

  // DOM Sync (The CSS Fix)
  barba.hooks.beforeEnter((data) => {
    // extract new body class
    const parser = new DOMParser();
    const html = parser.parseFromString(data.next.html, 'text/html');
    document.body.className = html.body.className;

    // extract missing stylesheets
    const newLinks = html.head.querySelectorAll('link[rel="stylesheet"]');
    newLinks.forEach(link => {
      if (!document.head.querySelector(`link[href="${link.getAttribute('href')}"]`)) {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = link.getAttribute('href');
        document.head.appendChild(newLink);
      }
    });
  });

  barba.init({
    prevent: ({ el }) => {
      // Ignore /backend-admin links.
      if (el.href && el.href.includes('/backend-admin')) {
        return true;
      }
      return false;
    },
    transitions: [{
      name: 'curtain-transition',
      leave(data) {
        // Clean up ScrollTrigger and Three.js
        if (window.CreativoAnim && window.CreativoAnim.cleanupAll) {
          window.CreativoAnim.cleanupAll();
        }

        // Blue curtain sweeps up (y: "0%") covering the old page
        const curtain = document.querySelector('.transition-curtain');
        return gsap.to(curtain, {
          y: "0%",
          duration: 0.6,
          ease: "power3.inOut"
        });
      },
      enter(data) {
        // Barba swaps the DOM behind the curtain automatically here
        // Set initial state before the after hook just in case
      },
      after(data) {
        // Blue curtain exits off the top (y: "-100%"), revealing the new page
        const curtain = document.querySelector('.transition-curtain');
        const tl = gsap.timeline();

        tl.to(curtain, {
          y: "-100%",
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            // Instantly reset to y: "100%"
            gsap.set(curtain, { y: "100%" });
          }
        });

        // Re-call all necessary main.js and animation.js init functions.
        if (window.CreativoMain && window.CreativoMain.initAll) {
          window.CreativoMain.initAll();
        }
        if (window.CreativoAnim && window.CreativoAnim.initAll) {
          window.CreativoAnim.initAll();
        }
      }
    }]
  });

})();

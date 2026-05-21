window.__CREATIVO_BARBA__ = true;

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('site-loader');
  const curtain = document.querySelector('.transition-curtain');

  const PAGE_STYLES = {
    home: ['/css/home.css'],
    work: ['/css/work.css'],
    about: ['/css/about.css'],
    services: ['/css/services.css'],
    contact: ['/css/contact.css'],
    'case-branding': ['/css/case-study.css'],
    'case-web': ['/css/case-study.css'],
    'case-video': ['/css/case-study.css'],
  };

  // Phase 1: Loader
  if (!sessionStorage.getItem('creativo-loader-done')) {
    document.body.classList.add('is-loading');

    // Animate loader
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('creativo-loader-done', '1');
        document.body.classList.remove('is-loading');
        if (loader) loader.classList.add('is-hidden');
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }
    });

    // letters mask reveal
    tl.to('.loader-letter', {
      y: 0,
      duration: 1.05,
      stagger: 0.1,
      ease: 'power3.inOut'
    })
    // dot pop
    .to('.loader-dot', {
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    }, '-=0.4')
    // pause
    .to({}, { duration: 0.4 })
    // exit loader
    .to(loader, {
      yPercent: -100,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.inOut'
    });
  } else {
    // Hide loader immediately
    if (loader) loader.classList.add('is-hidden');
  }

  // Initial init
  window.Creativo.initPage();
  const currentNamespace = document.querySelector('[data-barba="container"]').dataset.barbaNamespace;
  if (currentNamespace === 'home' && window.Creativo.initHomeAnimations) {
    window.Creativo.initHomeAnimations();
  }

  // Phase 2 & 3: Barba.js
  barba.init({
    prevent: ({ el }) => {
      if (el.matches('[data-barba-prevent]')) return true;
      if (el.target === '_blank') return true;
      if (el.href.startsWith('mailto:')) return true;
      if (el.origin !== window.location.origin) return true;
      if (el.href.endsWith('#') || el.getAttribute('href') === '#') return true;
      return false;
    },
    transitions: [{
      name: 'curtain',
      async leave(data) {
        // Drop curtain down
        await gsap.to(curtain, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' });

        // Cleanup old page
        if (window.Creativo.destroyPage) window.Creativo.destroyPage();
        if (data.current.namespace === 'home' && window.Creativo.destroyHomeAnimations) {
          window.Creativo.destroyHomeAnimations();
        }
      },
      async beforeEnter(data) {
        // Swap CSS styles
        document.querySelectorAll('link[data-barba-style]').forEach(el => el.remove());
        const styles = PAGE_STYLES[data.next.namespace] || [];
        styles.forEach(href => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.dataset.barbaStyle = 'true';
          document.head.appendChild(link);
        });

        // Update document title from next html
        const match = data.next.html.match(/<title>(.*?)<\/title>/);
        if (match && match[1]) {
          document.title = match[1];
        }
      },
      async enter(data) {
        // Init new page
        window.Creativo.initPage();
        if (data.next.namespace === 'home' && window.Creativo.initHomeAnimations) {
          window.Creativo.initHomeAnimations();
        }

        const footerYear = document.getElementById('footerYear');
        if (footerYear) footerYear.textContent = new Date().getFullYear();

        window.scrollTo(0, 0);

        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        const navBackdrop = document.querySelector('.nav-backdrop');
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (navBackdrop) navBackdrop.classList.remove('visible');
        document.body.style.overflow = '';

        // Lift curtain up
        await gsap.to(curtain, { yPercent: -100, duration: 0.55, ease: 'power3.inOut' });
        gsap.set(curtain, { yPercent: 100 }); // instant reset for next time

        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }
    }]
  });
});

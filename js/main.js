/* ============================================================
   CREATIVO CREATES — GLOBAL JAVASCRIPT v1.0
   ============================================================

   TABLE OF CONTENTS:

   01  INITIALIZATION
   02  CUSTOM CURSOR
   03  NAVIGATION — SCROLL BEHAVIOR
   04  MOBILE MENU TOGGLE
   05  SCROLL REVEAL — INTERSECTION OBSERVER
   06  MAGNETIC BUTTONS
   07  GSAP HERO TEXT ANIMATION
   08  FLOATING ORB PARALLAX (MOUSE)
   09  STATS COUNTER ANIMATION
   10  WORK PAGE — FILTER SYSTEM
   11  FOOTER YEAR
   12  ACTIVE NAV LINK DETECTION

   ============================================================ */


/* ============================================================
   01  INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  initCursor();
  initNav();
  initMobileMenu();
  initScrollReveal();
  initMagneticButtons();
  initOrbParallax();
  initStatsCounter();
  setActiveNavLink();
  setFooterYear();

  // Page-specific initializations
  if (document.querySelector('.work-filter-bar')) {
    initWorkFilter();
  }

  if (document.querySelector('.hero-word-inner')) {
    initHeroGSAP();
  }

});


/* ============================================================
   02  CUSTOM CURSOR
   ============================================================ */

function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (!dot || !ring) return;

  // Bail on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId;

  // Move dot immediately to cursor
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Ring follows with smooth lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.11;
    ringY += (mouseY - ringY) * 0.11;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state targets
  const HOVER_TARGETS = 'a, button, .project-card, .filter-btn, .discipline-item, .service-block, .stat-item, input, textarea, select, label';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(HOVER_TARGETS)) {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(HOVER_TARGETS)) {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    }
  });

  document.addEventListener('mousedown', () => {
    dot.classList.add('clicking');
    ring.classList.add('clicking');
  });

  document.addEventListener('mouseup', () => {
    dot.classList.remove('clicking');
    ring.classList.remove('clicking');
  });

  // Fade out when leaving viewport
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
}


/* ============================================================
   03  NAVIGATION — SCROLL BEHAVIOR
   ============================================================ */

function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Add scrolled class for backdrop blur
    if (scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }, { passive: true });
}


/* ============================================================
   04  MOBILE MENU TOGGLE
   ============================================================ */

function initMobileMenu() {
  const toggle   = document.querySelector('.nav-toggle');
  const menu     = document.querySelector('.nav-mobile');
  const links    = document.querySelectorAll('.nav-mobile a');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
    animateToggle(true);
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
    animateToggle(false);
  }

  function animateToggle(isOpen) {
    const [s1, s2, s3] = toggle.querySelectorAll('span');
    if (isOpen) {
      s1.style.transform = 'rotate(45deg) translate(4px, 4px)';
      s2.style.opacity   = '0';
      s3.style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      s1.style.transform = '';
      s2.style.opacity   = '';
      s3.style.transform = '';
    }
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  links.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}


/* ============================================================
   05  SCROLL REVEAL — INTERSECTION OBSERVER
   ============================================================ */

function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -55px 0px'
  });

  elements.forEach(el => observer.observe(el));
}


/* ============================================================
   06  MAGNETIC BUTTONS
   ============================================================ */

function initMagneticButtons() {
  const magnets = document.querySelectorAll('.magnetic');

  magnets.forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect  = el.getBoundingClientRect();
      const x     = e.clientX - rect.left - rect.width  / 2;
      const y     = e.clientY - rect.top  - rect.height / 2;

      el.style.transition = 'transform 0.25s cubic-bezier(0.4,0,0.2,1)';
      el.style.transform  = `translate(${x * 0.26}px, ${y * 0.26}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      el.style.transform  = 'translate(0, 0)';
    });
  });
}


/* ============================================================
   07  GSAP HERO TEXT ANIMATION
   ============================================================ */

function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;

  const wordInners = document.querySelectorAll('.hero-word-inner');
  const subtitle   = document.querySelector('.hero-subtitle');
  const actions    = document.querySelector('.hero-actions');
  const eyebrow    = document.querySelector('.hero-eyebrow');
  const scrollInd  = document.querySelector('.scroll-indicator');

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  if (eyebrow) {
    tl.from(eyebrow, { opacity: 0, y: 16, duration: 0.7 }, 0);
  }

  if (wordInners.length) {
    tl.from(wordInners, {
      y: '108%',
      duration: 1.05,
      stagger: 0.085,
    }, 0.1);
  }

  if (subtitle) {
    tl.from(subtitle, { opacity: 0, y: 28, duration: 0.85 }, 0.75);
  }

  if (actions) {
    tl.from(actions, { opacity: 0, y: 22, duration: 0.8 }, 0.9);
  }

  if (scrollInd) {
    tl.from(scrollInd, { opacity: 0, duration: 0.7 }, 1.4);
  }
}


/* ============================================================
   08  FLOATING ORB PARALLAX (MOUSE MOVEMENT)
   ============================================================ */

function initOrbParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;

  // Skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  document.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function updateOrbs() {
    currentX += (targetX - currentX) * 0.04;
    currentY += (targetY - currentY) * 0.04;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 14;
      orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });

    requestAnimationFrame(updateOrbs);
  }

  updateOrbs();
}


/* ============================================================
   09  STATS COUNTER ANIMATION
   ============================================================ */

function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el      = entry.target;
      const end     = parseInt(el.dataset.count, 10);
      const suffix  = el.dataset.suffix || '';
      const duration = 1900;
      const startTime = performance.now();

      function tick(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value    = Math.round(eased * end);

        el.innerHTML = `${value}<em>${suffix}</em>`;

        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}


/* ============================================================
   10  WORK PAGE — FILTER SYSTEM
   ============================================================ */

function initWorkFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.project-item');

  if (!btns.length || !items.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button state
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show / hide items with stagger animation
      let visibleIndex = 0;

      items.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;

        if (match) {
          item.classList.remove('hidden');
          const delay = visibleIndex * 60;
          item.style.transitionDelay = delay + 'ms';
          // Force reflow then animate in
          item.style.opacity   = '0';
          item.style.transform = 'translateY(18px)';

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity    = '1';
              item.style.transform  = 'translateY(0)';
            });
          });

          visibleIndex++;
        } else {
          item.classList.add('hidden');
          item.style.transitionDelay = '0ms';
        }
      });
    });
  });
}


/* ============================================================
   11  FOOTER YEAR
   ============================================================ */

function setFooterYear() {
  const yearEls = document.querySelectorAll('.footer-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => { el.textContent = year; });
}


/* ============================================================
   12  ACTIVE NAV LINK DETECTION
   ============================================================ */

function setActiveNavLink() {
  const path  = window.location.pathname;
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href') || '';

    const isHome    = (path === '/' || path.includes('index')) && (href === 'index.html' || href === './');
    const isMatch   = href !== 'index.html' && href !== './' && path.includes(href.replace('.html', ''));

    if (isHome || isMatch) {
      link.classList.add('active');
    }
  });
}

// ==============================================================
// GLOBAL: SCROLL TO TOP BUTTON
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollToTop");

  if (scrollBtn) {
    // 1. Toggle visibility based on scroll depth
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        scrollBtn.classList.add("is-visible");
      } else {
        scrollBtn.classList.remove("is-visible");
      }
    });

    // 2. Smooth scroll to top on click
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
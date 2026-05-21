/* ============================================================
   CREATIVO CREATES — main.js
   ============================================================ */

(function () {
  'use strict';

  window.Creativo = window.Creativo || {};

  // Store references for cleanup
  let _scrollRevealObserver = null;
  let _statsObservers = [];

  let _events = [];

  function addEvent(target, type, listener, options) {
    target.addEventListener(type, listener, options);
    _events.push({ target, type, listener, options });
  }

  function clearAllEvents() {
    for (const { target, type, listener, options } of _events) {
      target.removeEventListener(type, listener, options);
    }
    _events = [];
  }

  function initNavbar() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
    addEvent(window, 'scroll', onScroll, { passive: true });
    onScroll();

    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (!href) return;

      const hrefBase = href.replace('.html', '').replace(/^\//, '');
      const pathBase = currentPath.replace('.html', '').replace(/^\//, '');

      if ((hrefBase === 'index' || hrefBase === '') && (pathBase === '' || pathBase === 'index')) {
        link.classList.add('active');
        return;
      }
      if (hrefBase === 'work' && pathBase.startsWith('case-study')) {
        link.classList.add('active');
        return;
      }
      if (hrefBase && pathBase.includes(hrefBase)) {
        link.classList.add('active');
      }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const hrefBase = href.replace('.html', '').replace(/^\//, '');
      const pathBase = currentPath.replace('.html', '').replace(/^\//, '');

      if ((hrefBase === 'index' || hrefBase === '') && (pathBase === '' || pathBase === 'index')) {
        link.classList.add('active');
        return;
      }
      if (hrefBase === 'work' && pathBase.startsWith('case-study')) {
        link.classList.add('active');
        return;
      }
      if (hrefBase && pathBase.includes(hrefBase)) {
        link.classList.add('active');
      }
    });
  }

  function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const menu      = document.querySelector('.mobile-menu');
    const closeBtn  = document.querySelector('.mobile-close');
    const backdrop  = document.querySelector('.nav-backdrop');

    if (!hamburger || !menu) return;

    const links = menu.querySelectorAll('.mobile-link');

    function openMenu() {
      menu.classList.add('open');
      backdrop && backdrop.classList.add('visible');
      document.body.style.overflow = 'hidden';

      links.forEach((link, i) => {
        link.style.animationDelay = `${0.08 * (i + 1)}s`;
      });
    }

    function closeMenu() {
      menu.classList.remove('open');
      backdrop && backdrop.classList.remove('visible');
      document.body.style.overflow = '';

      links.forEach(link => {
        link.style.animationDelay = '0s';
      });
    }

    addEvent(hamburger, 'click', openMenu);
    if (closeBtn) addEvent(closeBtn, 'click', closeMenu);
    if (backdrop) addEvent(backdrop, 'click', closeMenu);

    addEvent(document, 'keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
  }

  function initCursor() {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (!dot || !ring) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    const HOVER_TARGETS = 'a, button, .project-card, .filter-btn, .discipline-item, .service-block, .stat-item, input, textarea, select, label, .tab-btn, .accordion-btn, .dropdown-item, .dropdown-trigger';

    const onMove = e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.11;
      ringY += (mouseY - ringY) * 0.11;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      window.Creativo._cursorRafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    const onOver = e => {
      if (e.target.closest(HOVER_TARGETS)) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };

    const onOut = e => {
      if (e.target.closest(HOVER_TARGETS)) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };

    const onDown = () => {
      dot.classList.add('clicking');
      ring.classList.add('clicking');
    };

    const onUp = () => {
      dot.classList.remove('clicking');
      ring.classList.remove('clicking');
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onEnter = () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    addEvent(document, 'mousemove',  onMove);
    addEvent(document, 'mouseover',  onOver);
    addEvent(document, 'mouseout',   onOut);
    addEvent(document, 'mousedown',  onDown);
    addEvent(document, 'mouseup',    onUp);
    addEvent(document, 'mouseleave', onLeave);
    addEvent(document, 'mouseenter', onEnter);
  }

  function initOrbParallax() {
    if (window.matchMedia('(hover: none)').matches) return;

    const orbs = document.querySelectorAll('.orb');
    if (!orbs.length) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMove = e => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const update = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 14;
        orb.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
      });

      window.Creativo._orbRafId = requestAnimationFrame(update);
    };
    update();

    addEvent(document, 'mousemove', onMove);
  }

  function initScrollReveal() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    _scrollRevealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            _scrollRevealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    elements.forEach(el => _scrollRevealObserver.observe(el));
  }

  function initStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item[data-count]');
    if (!statItems.length) return;

    statItems.forEach(item => {
      const end      = parseInt(item.dataset.count, 10);
      const duration = 1900;
      const valueEl  = item.querySelector('.stat-count-value');
      if (!valueEl) return;

      let started = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const startTime = performance.now();

            const tick = now => {
              const elapsed  = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased    = 1 - Math.pow(1 - progress, 3);
              valueEl.textContent = Math.round(eased * end);
              if (progress < 1) {
                  window.Creativo._statsRafIds.push(requestAnimationFrame(tick));
              }
            };

            window.Creativo._statsRafIds.push(requestAnimationFrame(tick));
            observer.unobserve(item);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(item);
      _statsObservers.push(observer);
    });
  }

  function initShowreelModal() {
    const openBtn = document.getElementById('openShowreel');
    const modal   = document.getElementById('showreelModal');
    const closeBtn = document.getElementById('closeShowreel');
    const player  = document.getElementById('vimeoPlayer');

    if (!openBtn || !modal || !player) return;

    const VIMEO_ID = 'YOUR_VIMEO_ID';
    const VIMEO_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&color=2060ff`;

    function openModal() {
      player.src = VIMEO_SRC;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      player.src = '';
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    window.Creativo._closeModal = closeModal;

    addEvent(openBtn, 'click', openModal);
    if (closeBtn) addEvent(closeBtn, 'click', closeModal);

    addEvent(modal, 'click', e => {
      if (e.target === modal) closeModal();
    });

    addEvent(document, 'keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  function initScrollToTop() {
    const btn = document.querySelector('.scroll-to-top');
    if (!btn) return;

    addEvent(window, 'scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });

    addEvent(btn, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initWorkFilter() {
    const dropdown    = document.querySelector('.filter-dropdown');
    const workItems   = document.querySelectorAll('.work-item');

    if (!dropdown || !workItems.length) return;

    const trigger     = dropdown.querySelector('.dropdown-trigger');
    const menu        = dropdown.querySelector('.dropdown-menu');
    const items       = dropdown.querySelectorAll('.dropdown-item');
    const triggerText = dropdown.querySelector('.dropdown-trigger-text');

    addEvent(trigger, 'click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    addEvent(document, 'click', e => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });

    items.forEach(item => {
      addEvent(item, 'click', () => {
        const filter = item.dataset.filter;

        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        triggerText.textContent = item.textContent.trim();
        dropdown.classList.remove('open');

        workItems.forEach(proj => {
          const category = proj.dataset.category;
          const show = filter === 'All' || category === filter;
          proj.classList.toggle('hidden', !show);
        });

        document.querySelectorAll('.work-item:not(.hidden) [data-reveal]:not(.revealed)').forEach(el => {
          el.classList.add('revealed');
        });
      });
    });
  }

  function initToolsTabs() {
    const tabs   = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tools-panel-section');

    if (!tabs.length || !panels.length) return;

    tabs[0] && tabs[0].classList.add('tab-active');
    panels[0] && (panels[0].style.display = 'flex');

    tabs.forEach(tab => {
      addEvent(tab, 'click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('tab-active'));
        tab.classList.add('tab-active');

        panels.forEach(panel => {
          panel.style.display = panel.dataset.panel === target ? 'flex' : 'none';
        });
      });
    });
  }

  function initAccordion() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    if (!accordionBtns.length) return;

    accordionBtns.forEach(btn => {
      addEvent(btn, 'click', () => {
        const item   = btn.closest('.accordion-item');
        const isOpen = item.classList.contains('accordion-open');

        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('accordion-open');
        });

        if (!isOpen) item.classList.add('accordion-open');
      });
    });
  }

  window.Creativo.initPage = function () {
    window.Creativo._statsRafIds = [];
    initNavbar();
    initMobileMenu();
    initCursor();
    initOrbParallax();
    initScrollReveal();
    initStatsCounter();
    initShowreelModal();
    initScrollToTop();
    initWorkFilter();
    initToolsTabs();
    initAccordion();
  };

  window.Creativo.destroyPage = function () {
    clearAllEvents();

    if (_scrollRevealObserver) {
      _scrollRevealObserver.disconnect();
      _scrollRevealObserver = null;
    }

    _statsObservers.forEach(obs => obs.disconnect());
    _statsObservers = [];

    if (window.Creativo._cursorRafId) {
      cancelAnimationFrame(window.Creativo._cursorRafId);
      window.Creativo._cursorRafId = null;
    }

    if (window.Creativo._orbRafId) {
      cancelAnimationFrame(window.Creativo._orbRafId);
      window.Creativo._orbRafId = null;
    }

    if (window.Creativo._statsRafIds) {
        window.Creativo._statsRafIds.forEach(id => cancelAnimationFrame(id));
        window.Creativo._statsRafIds = [];
    }

    if (window.Creativo._closeModal) {
        window.Creativo._closeModal();
    }

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  };

  if (!window.__CREATIVO_BARBA__) {
    document.addEventListener('DOMContentLoaded', () => window.Creativo.initPage());
  }

})();

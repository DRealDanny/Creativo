/* ============================================================
   CREATIVO CREATES — animation.js
   GSAP + Three.js animations
   Requires: gsap.min.js, ScrollTrigger.min.js, three.min.js (CDN)
   ============================================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') {
    console.warn('animation.js: GSAP not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ limitCallbacks: true });

  window.Creativo = window.Creativo || {};

  let _renderer = null;
  let _heroRafId = null;

  function initHeroCanvas() {
    const container = document.getElementById('heroCanvas');
    if (!container) return;
    if (window.innerWidth <= 1024) return;
    if (typeof THREE === 'undefined') {
      console.warn('animation.js: Three.js not loaded.');
      return;
    }

    if (_renderer) return; // already initialized

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    _renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    _renderer.setSize(500, 500);
    _renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(_renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2.5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1A5BFF,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 5;

    const clock = new THREE.Clock();

    function animate() {
      _heroRafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.002;
      sphere.position.y  = Math.sin(t * 0.5) * 0.1;
      _renderer.render(scene, camera);
    }

    animate();
  }

  function initHeroEntrance() {
    const subtitle = document.querySelector('.hero-subtitle');
    const actions  = document.querySelector('.hero-actions');
    const scroll   = document.querySelector('.hero-scroll');

    if (!subtitle && !actions && !scroll) return;

    window.Creativo._heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    if (subtitle) window.Creativo._heroTl.from(subtitle, { opacity: 0, y: 28, duration: 0.85 }, 0.75);
    if (actions)  window.Creativo._heroTl.from(actions,  { opacity: 0, y: 22, duration: 0.80 }, 0.90);
    if (scroll)   window.Creativo._heroTl.from(scroll,   { opacity: 0,        duration: 0.70 }, 1.40);
  }

  window.Creativo.initHomeAnimations = function () {
    initHeroCanvas();
    initHeroEntrance();
  };

  window.Creativo.destroyHomeAnimations = function () {
    if (_heroRafId) {
      cancelAnimationFrame(_heroRafId);
      _heroRafId = null;
    }

    if (_renderer) {
      _renderer.dispose();
      if (_renderer.domElement && _renderer.domElement.parentNode) {
        _renderer.domElement.parentNode.removeChild(_renderer.domElement);
      }
      _renderer = null;
    }

    if (window.Creativo._heroTl) {
      window.Creativo._heroTl.kill();
      window.Creativo._heroTl = null;
    }
  };

  if (!window.__CREATIVO_BARBA__) {
    document.addEventListener('DOMContentLoaded', () => window.Creativo.initHomeAnimations());
  }

})();

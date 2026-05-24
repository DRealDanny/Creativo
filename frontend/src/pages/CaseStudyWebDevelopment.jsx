import React from 'react';
import { NavLink } from 'react-router-dom';

const CaseStudyWebDevelopment = () => {
  return (
    <main>

      {/* HERO: Full bleed — consistent with all case studies */}
      <section className="cs-hero">
        <div className="cs-hero-bg" style={{ backgroundImage: "url('https://picsum.photos/seed/luminal-hero/1600/900')" }}></div>
        <div className="cs-hero-overlay"></div>
        <div className="cs-hero-content">
          <div className="cs-hero-meta"><span className="cs-category">Web Development</span></div>
          <h1 className="cs-hero-title">Luminal<br />— Website</h1>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="cs-info-bar">
        <div className="cs-info-bar-inner container">
          <div className="cs-info-tag">
            <span className="cs-info-label">Sector</span>
            <span className="cs-info-value">Web Development</span>
          </div>
          <div className="cs-info-tag">
            <span className="cs-info-label">What We Did</span>
            <span className="cs-info-value">Creative Web Design &amp; UI · Web Development · SEO · CMS Integration</span>
          </div>
          <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-primary cs-case-btn">
            <span>Visit Website</span><i className="ri-arrow-right-up-line"></i>
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <article className="cs-content">
        <div className="container">
          <div className="cs-text-block">
            <p className="cs-lead">Luminal needed a website that matched the quality of their product — fast, intentional, and completely custom. Off-the-shelf templates weren't on the table. The brief was clear: build something that earns attention and keeps it.</p>
            <p className="cs-body">The architecture was built on a custom HTML/CSS/JS codebase with a PHP/JSON headless CMS for content management. This gave the client full control over their content without locking them into a heavy platform. Performance was non-negotiable from the start.</p>
          </div>
          <div className="cs-image-block">
            <img src="https://picsum.photos/seed/luminal-web-01/1400/800" alt="Luminal website homepage" loading="lazy" width="1400" height="800" />
          </div>
          <div className="cs-text-block">
            <h2 className="cs-block-heading">Animation &amp; Motion</h2>
            <p className="cs-body">GSAP ScrollTrigger drove all scroll-based animations — each section reveals with a purposeful transition that guides the eye without distracting from the content. The hero features a custom Three.js wireframe element that responds to mouse movement.</p>
            <p className="cs-body">Every animation was performance-tested before shipping. No layout-triggering properties. No will-change abuse. Smooth 60fps on mid-range Android devices.</p>
          </div>
          <div className="cs-image-block">
            <img src="https://picsum.photos/seed/luminal-web-02/1400/800" alt="Luminal website animation detail" loading="lazy" width="1400" height="800" />
          </div>
          <div className="cs-text-block">
            <h2 className="cs-block-heading">Mobile &amp; Performance</h2>
            <p className="cs-body">Mobile was designed first, not adapted last. Every breakpoint was considered as its own layout problem. The result is a site that feels native to whatever screen it's on — not a desktop site that was squished to fit a phone.</p>
          </div>
          <div className="cs-image-block">
            <img src="https://picsum.photos/seed/luminal-web-03/1400/800" alt="Luminal website mobile view" loading="lazy" width="1400" height="800" />
          </div>
        </div>
      </article>

      {/* CTA DIVIDER + BANNER */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Need a Website Like This?</span>
            <h2 className="t-hero">Let's build your<br />next web project.</h2>
            <div className="cta-actions">
              <NavLink to="/contact" className="btn btn-primary"><span>Start a Web Project</span><i className="ri-arrow-right-line"></i></NavLink>
              <NavLink to="/work" className="btn btn-outline">View All Work</NavLink>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default CaseStudyWebDevelopment;

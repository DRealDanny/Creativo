import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Load CSS specifically for Case Study
import '../../assets/css/case-study.css';

const VideoEditing = () => {
  useEffect(() => {
    // Re-initialize global JS if needed
    if (window.initOrbParallax) window.initOrbParallax();
    if (window.initScrollReveal) window.initScrollReveal();
  }, []);

  return (
    <>


      <div className="noise-layer" aria-hidden="true"></div>
      <div className="orb-container" aria-hidden="true">
        <div className="orb orb-1"></div><div className="orb orb-2"></div><div className="orb orb-3"></div>
      </div>

      <Header />

      <main>
        {/* HERO: Full bleed — consistent with all case studies */}
        <section className="cs-hero">
          <div className="cs-hero-bg" style={{ backgroundImage: "url('https://picsum.photos/seed/vanta-hero/1600/900')" }}></div>
          <div className="cs-hero-overlay"></div>
          <div className="cs-hero-content">
            <div className="cs-hero-meta"><span className="cs-category">Video Editing</span></div>
            <h1 className="cs-hero-title">Vanta<br />— Edit Reel</h1>
          </div>
        </section>

        {/* INFO BAR */}
        <section className="cs-info-bar">
          <div className="cs-info-bar-inner container">
            <div className="cs-info-tag">
              <span className="cs-info-label">Sector</span>
              <span className="cs-info-value">Video Editing</span>
            </div>
            <div className="cs-info-tag">
              <span className="cs-info-label">What We Did</span>
              <span className="cs-info-value">Long-form Editing · Reels &amp; Shorts · Color Grading · Sound Design · Thumbnails</span>
            </div>
            <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-primary cs-case-btn">
              <span>Watch Reel</span><i className="ri-arrow-right-up-line"></i>
            </a>
          </div>
        </section>

        {/* CONTENT */}
        <article className="cs-content">
          <div className="container">
            <div className="cs-text-block" data-reveal="true">
              <p className="cs-lead">Vanta is a content creator with a growing YouTube channel and Instagram presence. The footage was strong — the editing wasn't keeping up. The brief was to build an editing style that matched the quality of the content and gave the channel a consistent, recognisable look.</p>
              <p className="cs-body">We started by studying the top 10 performing videos on the channel and identifying what made the audience stay — and what made them leave. Every editing decision that followed was built around those findings.</p>
            </div>
            <div className="cs-image-block" data-reveal="true">
              <img src="https://picsum.photos/seed/vanta-edit-01/1400/800" alt="Vanta YouTube video edit" loading="lazy" width="1400" height="800" />
            </div>
            <div className="cs-text-block" data-reveal="true">
              <h2 className="cs-block-heading">Long-Form YouTube Editing</h2>
              <p className="cs-body">The long-form content required a pacing system — not just cutting to music, but building a rhythm that pulled viewers through 20+ minute videos without dropping retention. We built a custom intro sequence, lower thirds, and chapter transitions that felt native to the content.</p>
              <p className="cs-body">Color grading was consistent across every video: a warm, high-contrast grade that felt premium without looking over-processed. Sound design filled the gaps between speech and music with ambient layers that kept energy high without being distracting.</p>
            </div>
            <div className="cs-image-block" data-reveal="true">
              <img src="https://picsum.photos/seed/vanta-edit-02/1400/800" alt="Vanta color grading and sound design" loading="lazy" width="1400" height="800" />
            </div>
            <div className="cs-text-block" data-reveal="true">
              <h2 className="cs-block-heading">Reels &amp; Short-Form Content</h2>
              <p className="cs-body">The same footage, re-cut for short-form. Instagram Reels and YouTube Shorts demand a completely different approach — the hook lives in the first two seconds, and every frame needs to earn its place. We built a content repurposing system that turned one long-form video into four platform-ready Reels per week.</p>
            </div>
            <div className="cs-image-block" data-reveal="true">
              <img src="https://picsum.photos/seed/vanta-edit-03/1400/800" alt="Vanta Reels and Shorts editing" loading="lazy" width="1400" height="800" />
            </div>
          </div>
        </article>

        {/* CTA DIVIDER + BANNER */}
        <div className="cta-divider" aria-hidden="true"></div>
        <section className="cta-banner" aria-label="Call to Action">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div data-reveal="true">
              <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Ready to Elevate Your Content?</span>
              <h2 className="t-hero">Let's create edits<br />people can't scroll past.</h2>
              <div className="cta-actions">
                <Link to="/contact" className="btn btn-primary"><span>Start a Video Project</span><i className="ri-arrow-right-line"></i></Link>
                <Link to="/work" className="btn btn-outline">View All Work</Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default VideoEditing;

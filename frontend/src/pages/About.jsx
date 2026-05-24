import { useState } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [activeTab, setActiveTab] = useState('design');

  return (
    <main style={{overflowX: 'hidden'}}>

      {/* HERO */}
      <section className="about-hero" aria-labelledby="about-heading">
        <div className="about-hero-inner">
          <div className="page-eyebrow">
            <span className="page-eyebrow-line" aria-hidden="true"></span>
            <span className="t-label">The Person Behind the Work</span>
          </div>
          <h1 id="about-heading">Built to<br /><em>Build</em><br />Brands.</h1>
          <p className="t-body-lg about-hero-sub">I'm Creativo — a Brand Structuralist and Video Editor based in Lagos. I design the systems and experiences that make brands impossible to ignore. From identity to interface, strategy to screen.</p>
        </div>
        <div className="page-hero-bottom" aria-hidden="true"></div>
      </section>

      {/* STORY */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container">
          <div className="story-grid">
            <div className="story-col">
              <div className="section-label" style={{marginBottom: '22px'}}><span className="t-label">My Story</span></div>
              <h2 className="t-h2" id="story-heading" style={{marginBottom: '32px'}}>I don't just design things. I build the visual logic behind brands that mean something.</h2>
              <p className="t-body-lg">I'm Creativo — a multidisciplinary creative professional based in Lagos, Nigeria. My work lives at the intersection of strategy, design, and code. I've spent years sharpening the craft of making brands not just look good, but work — at every touchpoint, across every channel.</p>
              <p className="t-body-lg" style={{marginTop: '22px'}}>My philosophy is simple: intentional design. Clarity over noise. Every decision should earn its place — whether that's a typeface choice, a line of code, or the way a button responds when you hover it.</p>
              <p className="t-body-lg" style={{marginTop: '22px'}}>I work with ambitious brands — businesses that understand that design is not decoration, it is infrastructure. If you're building something that needs to mean something to the people it serves, that's the kind of work I want to be part of.</p>
              <a href="#" className="cv-btn" download aria-label="Download CV"><i className="ri-download-line"></i>Download CV</a>
            </div>
            <div className="photo-wrap">
              <div className="photo-frame">
                <div className="photo-inner">
                  <img src="assets/web/about-portrait.jpg" alt="Creativo — Brand Structuralist" loading="lazy" width="600" height="750" />
                </div>
                <div className="photo-badge">
                  <p className="photo-badge-role">Brand Structuralist &amp; Video Editor</p>
                  <p className="photo-badge-name">Creativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS — card grid design */}
      <section className="section" aria-labelledby="tools-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label"><span className="t-label">Tools &amp; Stack</span></div>
            <h2 className="t-h1" id="tools-heading">The kit that<br />builds the work.</h2>
          </div>

          {/* TAB BUTTONS (Desktop) */}
          <div className="tools-tabs desk-only" role="tablist" aria-label="Tool Categories">
            <button
              className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'design'}
              aria-controls="panel-design"
              id="tab-design"
              onClick={() => setActiveTab('design')}
            >
              Creative &amp; Visual Design
            </button>
            <button
              className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'web'}
              aria-controls="panel-web"
              id="tab-web"
              onClick={() => setActiveTab('web')}
            >
              Web Development
            </button>
            <button
              className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === 'video'}
              aria-controls="panel-video"
              id="tab-video"
              onClick={() => setActiveTab('video')}
            >
              Video Editing
            </button>
          </div>

          <div className="tools-grid">

            {/* DESIGN TAB / ACCORDION */}
            <div className={`tools-card ${activeTab === 'design' ? 'active' : ''}`} id="panel-design" role="tabpanel" aria-labelledby="tab-design">
              <button
                className="accordion-trigger mob-only"
                aria-expanded={activeTab === 'design'}
                aria-controls="content-design"
                onClick={() => setActiveTab(activeTab === 'design' ? '' : 'design')}
              >
                <span className="tools-card-icon" aria-hidden="true">✦</span>
                <h4 className="tools-card-title">Creative &amp; Visual Design</h4>
                <i className="ri-arrow-down-s-line accordion-icon"></i>
              </button>

              <div className="accordion-content desk-block" id="content-design">
                <div className="tools-card-pills">
                  <span className="tool-pill">Figma</span>
                  <span className="tool-pill">Adobe Photoshop</span>
                  <span className="tool-pill">Adobe Illustrator</span>
                  <span className="tool-pill">Affinity Designer</span>
                </div>
              </div>
            </div>

            {/* WEB TAB / ACCORDION */}
            <div className={`tools-card ${activeTab === 'web' ? 'active' : ''}`} id="panel-web" role="tabpanel" aria-labelledby="tab-web">
              <button
                className="accordion-trigger mob-only"
                aria-expanded={activeTab === 'web'}
                aria-controls="content-web"
                onClick={() => setActiveTab(activeTab === 'web' ? '' : 'web')}
              >
                <span className="tools-card-icon" aria-hidden="true">⬡</span>
                <h4 className="tools-card-title">Web Development</h4>
                <i className="ri-arrow-down-s-line accordion-icon"></i>
              </button>

              <div className="accordion-content desk-block" id="content-web">
                <div className="tools-card-pills">
                  <span className="tool-pill">HTML &amp; CSS</span>
                  <span className="tool-pill">JavaScript</span>
                  <span className="tool-pill">PHP</span>
                  <span className="tool-pill">React</span>
                  <span className="tool-pill">GSAP</span>
                  <span className="tool-pill">Tailwind CSS</span>
                  <span className="tool-pill">Flutter &amp; Dart</span>
                </div>
              </div>
            </div>

            {/* VIDEO TAB / ACCORDION */}
            <div className={`tools-card ${activeTab === 'video' ? 'active' : ''}`} id="panel-video" role="tabpanel" aria-labelledby="tab-video">
              <button
                className="accordion-trigger mob-only"
                aria-expanded={activeTab === 'video'}
                aria-controls="content-video"
                onClick={() => setActiveTab(activeTab === 'video' ? '' : 'video')}
              >
                <span className="tools-card-icon" aria-hidden="true">▷</span>
                <h4 className="tools-card-title">Video Editing</h4>
                <i className="ri-arrow-down-s-line accordion-icon"></i>
              </button>

              <div className="accordion-content desk-block" id="content-video">
                <div className="tools-card-pills">
                  <span className="tool-pill">Adobe After Effects</span>
                  <span className="tool-pill">Premiere Pro</span>
                  <span className="tool-pill">CapCut</span>
                  <span className="tool-pill">DaVinci Resolve</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS — 4 cards */}
      <section className="section" aria-label="Stats">
        <div className="container">
          <div className="stats-bar">
            <div className="stat-item"><div className="stat-number"><span className="stat-count-value">60</span><em>+</em></div><p className="stat-label">Projects Delivered</p></div>
            <div className="stat-item"><div className="stat-number"><span className="stat-count-value">30</span><em>+</em></div><p className="stat-label">Brands Built</p></div>
            <div className="stat-item"><div className="stat-number"><span className="stat-count-value">5</span><em>+</em></div><p className="stat-label">Years Experience</p></div>
            <div className="stat-item"><div className="stat-number"><span className="stat-count-value">3</span></div><p className="stat-label">Disciplines Mastered</p></div>
          </div>
        </div>
      </section>

      {/* CTA DIVIDER + BANNER */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{position: 'relative', zIndex: '1'}}>
          <div>
            <span className="t-label" style={{display: 'block', marginBottom: '18px'}}>Ready to Work Together?</span>
            <h2 className="t-hero">Let's build<br />something worth<br />remembering.</h2>
          </div>
          <div>
            <Link to="/contact" className="btn btn-primary" style={{marginTop: '32px'}}><span>Start a Project</span><i className="ri-arrow-right-up-line"></i></Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default About;

import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <>
      <main style={{overflowX: 'hidden'}}>

        {/* ── HERO ── */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-inner">
            <div className="hero-text">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" aria-hidden="true"></span>
                <span className="t-label">Brand Structuralist</span>
              </div>
              <h1 className="hero-title" id="hero-heading">
                <span className="hero-title-line">
                  <span className="hero-word"><span className="hero-word-inner">Design</span></span>
                  <span className="hero-word"><span className="hero-word-inner">&nbsp;that</span></span>
                </span>
                <span className="hero-title-line accent">
                  <span className="hero-word"><span className="hero-word-inner">Thinks.</span></span>
                </span>
                <span className="hero-title-line">
                  <span className="hero-word"><span className="hero-word-inner">Work</span></span>
                  <span className="hero-word"><span className="hero-word-inner">&nbsp;that</span></span>
                </span>
                <span className="hero-title-line">
                  <span className="hero-word"><span className="hero-word-inner">Lasts.</span></span>
                </span>
              </h1>
              <p className="hero-subtitle">I design systems and build experiences that make brands impossible to ignore — from identity to interface, strategy to screen.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" id="openShowreel" onClick={() => setShowreelOpen(true)}><span>Watch Showreel</span><i className="ri-play-line"></i></button>
                <Link to="/about" className="btn btn-outline">About Creativo</Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-video-wrap">
                <video autoPlay muted loop playsInline>
                  <source src="assets/web/v2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <div className="hero-marquee">
            <div className="marquee-content">
              <span>Brand Identity</span>
              <span className="marquee-dot"></span>
              <span>Web Development</span>
              <span className="marquee-dot"></span>
              <span>Video Editing</span>
              <span className="marquee-dot"></span>
              <span>UI/UX Design</span>
              <span className="marquee-dot"></span>
              <span>Brand Strategy</span>
              <span className="marquee-dot"></span>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <span>Brand Identity</span>
              <span className="marquee-dot"></span>
              <span>Web Development</span>
              <span className="marquee-dot"></span>
              <span>Video Editing</span>
              <span className="marquee-dot"></span>
              <span>UI/UX Design</span>
              <span className="marquee-dot"></span>
              <span>Brand Strategy</span>
              <span className="marquee-dot"></span>
            </div>
          </div>
        </section>

        {/* ── ABOUT PREVIEW ── */}
        <section className="section about-prev container">
          <div className="section-header">
            <h2 className="section-title">The Architect Behind the Brand</h2>
            <Link to="/about" className="btn btn-outline desk-only">Get to Know Me</Link>
          </div>
          <div className="about-prev-content">
            <div className="about-prev-img">
              <img src="assets/web/about-hero.jpg" alt="Portrait of Creativo" loading="lazy" />
              <div className="about-badge">
                <span className="badge-num">10+</span>
                <span className="badge-text">Years<br />Experience</span>
              </div>
            </div>
            <div className="about-prev-text">
              <p className="t-lead">I am a multidisciplinary creator who bridges the gap between aesthetics and function.</p>
              <p>For over a decade, I have partnered with startups and enterprise teams to distill complex ideas into elegant, high-performing digital realities. My approach is rooted in structuralism—believing that a brand’s visual output must be an exact reflection of its strategic core.</p>
              <ul className="about-prev-list">
                <li><i className="ri-check-line"></i> Comprehensive Brand Systems</li>
                <li><i className="ri-check-line"></i> Scalable Web Architecture</li>
                <li><i className="ri-check-line"></i> Cinematic Post-Production</li>
              </ul>
              <Link to="/about" className="btn btn-outline mob-only">Get to Know Me</Link>
            </div>
          </div>
        </section>

        {/* ── FEATURED WORK ── */}
        <section className="section work-prev">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Selected Works</h2>
              <Link to="/work" className="btn btn-outline desk-only">View All Projects</Link>
            </div>
            <div className="work-grid">

              <article className="work-card">
                <Link to="/case-study/branding" className="work-card-img">
                  <img src="assets/web/w1.jpg" alt="Aura Skincare Packaging" loading="lazy" />
                  <div className="work-card-overlay">
                    <span className="work-card-btn">View Case Study <i className="ri-arrow-right-up-line"></i></span>
                  </div>
                </Link>
                <div className="work-card-info">
                  <div className="work-card-tags">
                    <span className="tag">Brand Identity</span>
                    <span className="tag">Packaging</span>
                  </div>
                  <h3 className="work-card-title"><Link to="/case-study/branding">Aura Skincare</Link></h3>
                  <p className="work-card-desc">Complete visual identity and packaging system for a premium organic skincare line.</p>
                </div>
              </article>

              <article className="work-card">
                <Link to="/case-study/web-development" className="work-card-img">
                  <img src="assets/web/w2.jpg" alt="Fintech Dashboard Interface" loading="lazy" />
                  <div className="work-card-overlay">
                    <span className="work-card-btn">View Case Study <i className="ri-arrow-right-up-line"></i></span>
                  </div>
                </Link>
                <div className="work-card-info">
                  <div className="work-card-tags">
                    <span className="tag">UI/UX</span>
                    <span className="tag">Web Dev</span>
                  </div>
                  <h3 className="work-card-title"><Link to="/case-study/web-development">Nova Finance</Link></h3>
                  <p className="work-card-desc">A high-performance SaaS dashboard designed to simplify complex financial data.</p>
                </div>
              </article>

            </div>
            <div className="mob-only" style={{marginTop: '2rem'}}>
              <Link to="/work" className="btn btn-outline" style={{width: '100%', justifyContent: 'center'}}>View All Projects</Link>
            </div>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section className="section services-prev">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Core Disciplines</h2>
              <p className="section-desc">A holistic approach to digital creation.</p>
            </div>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon"><i className="ri-pen-nib-line"></i></div>
                <h3 className="service-title">Brand Identity</h3>
                <p className="service-desc">Crafting distinct, memorable visual systems that communicate your core values and stand out in crowded markets.</p>
              </div>
              <div className="service-card">
                <div className="service-icon"><i className="ri-code-s-slash-line"></i></div>
                <h3 className="service-title">Web Development</h3>
                <p className="service-desc">Building responsive, lightning-fast websites and applications with modern frameworks and robust architecture.</p>
              </div>
              <div className="service-card">
                <div className="service-icon"><i className="ri-film-line"></i></div>
                <h3 className="service-title">Video Editing</h3>
                <p className="service-desc">Delivering cinematic cuts, dynamic motion graphics, and compelling narratives for commercials and digital content.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section cta-section">
          <div className="container">
            <div className="cta-box">
              <div className="cta-content">
                <h2 className="cta-title">Ready to build something exceptional?</h2>
                <p className="cta-desc">Whether you need a brand overhaul, a new platform, or a promotional cut, let’s discuss how we can bring your vision to life.</p>
                <Link to="/contact" className="btn btn-primary"><span>Start a Project</span><i className="ri-arrow-right-up-line"></i></Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <div id="showreelModal" className={`modal-overlay ${showreelOpen ? 'visible' : ''}`} role="dialog" aria-modal="true" aria-label="Showreel video" aria-hidden={!showreelOpen}>
        <div className="modal-container">
          <button className="modal-close" id="closeShowreel" aria-label="Close showreel" onClick={() => setShowreelOpen(false)}>
            <i className="ri-close-line"></i>
          </button>
          <div className="modal-video-wrap">
            <iframe id="vimeoPlayer" src="https://player.vimeo.com/video/824804225?h=02ab5b5f8b&title=0&byline=0&portrait=0" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Creativo Showreel"></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

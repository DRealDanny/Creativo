import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main style={{ overflowX: 'hidden' }}>
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
              <button className="btn btn-primary" id="openShowreel"><span>Watch Showreel</span><i className="ri-play-line"></i></button>
              <Link to="/about" className="btn btn-outline">About Creativo</Link>
            </div>
          </div>
          <div id="heroCanvas" aria-hidden="true"></div>
          <div className="hero-scroll" aria-hidden="true">
            <div className="hero-scroll-indicator">
              <div className="hero-scroll-line"></div>
              <span>Scroll</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom-line" aria-hidden="true"></div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Branding</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Web Development</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Video Editing</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Branding</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Web Development</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Video Editing</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Branding</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Web Development</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Video Editing</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Branding</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Web Development</div>
          <div className="marquee-item"><span className="marquee-dot"></span>&nbsp;Video Editing</div>
        </div>
      </div>

      {/* ── WORK GRID — uniform 3×3 ── */}
      <section className="section" aria-labelledby="work-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label" data-reveal="true"><span className="t-label">Selected Work</span></div>
            <div className="flex-between" data-reveal="true" data-delay="2">
              <h2 className="t-h1" id="work-heading">Work that earns<br />its place.</h2>
              <Link to="/work" className="btn-arrow">View All Projects <i className="ri-arrow-right-up-line"></i></Link>
            </div>
          </div>
          <div className="work-grid-home">
            {/* Row 1 */}
            <Link to="/case-study/branding" className="project-card" data-reveal="true">
              <div className="card-img"><img src="https://picsum.photos/seed/apex-brand/800/600" alt="Apex Brand Identity" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Apex — Brand Identity</h3><p className="card-sub">Visual system for a premium consulting firm</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
            <Link to="/case-study/web-development" className="project-card" data-reveal="true" data-delay="2">
              <div className="card-img"><img src="https://picsum.photos/seed/luminal-web/800/600" alt="Luminal Website" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Luminal — Website</h3><p className="card-sub">Custom coded site with GSAP animations</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
            <Link to="/case-study/video-editing" className="project-card" data-reveal="true" data-delay="3">
              <div className="card-img"><img src="https://picsum.photos/seed/vanta-motion/800/600" alt="Vanta Edit Reel" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Vanta — Edit Reel</h3><p className="card-sub">Long-form &amp; Reels editing package</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
            {/* Row 2 — slightly taller via CSS nth-child */}
            <Link to="/case-study/branding" className="project-card" data-reveal="true">
              <div className="card-img"><img src="https://picsum.photos/seed/mesh-co/800/600" alt="Mesh Co Identity" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Mesh Co. — Identity</h3><p className="card-sub">Visual identity for a creative studio</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
            <Link to="/case-study/web-development" className="project-card" data-reveal="true" data-delay="2">
              <div className="card-img"><img src="https://picsum.photos/seed/vortex-web/800/600" alt="Vortex Landing Page" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Vortex — Landing Page</h3><p className="card-sub">Custom codebase, scroll animations</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
            <Link to="/case-study/video-editing" className="project-card" data-reveal="true" data-delay="3">
              <div className="card-img"><img src="https://picsum.photos/seed/nova-mkt/800/600" alt="Nova Content Package" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Nova — Content Package</h3><p className="card-sub">YouTube &amp; Reels editing series</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
            {/* Row 3 */}
            <Link to="/case-study/branding" className="project-card" data-reveal="true">
              <div className="card-img"><img src="https://picsum.photos/seed/rova-brand/800/600" alt="Rova Brand Refresh" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Rova — Brand Refresh</h3><p className="card-sub">Identity redesign · Brand strategy</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
            <Link to="/case-study/web-development" className="project-card" data-reveal="true" data-delay="2">
              <div className="card-img"><img src="https://picsum.photos/seed/crest-web/800/600" alt="Crest Studio Portfolio" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Crest Studio — Portfolio</h3><p className="card-sub">Custom HTML/CSS/JS · CMS integration</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
            <Link to="/case-study/video-editing" className="project-card" data-reveal="true" data-delay="3">
              <div className="card-img"><img src="https://picsum.photos/seed/klave-deck/800/600" alt="Klave YouTube Series" loading="lazy" width="800" height="600" /></div>
              <div className="card-overlay"><h3 className="card-title">Klave — YouTube Series</h3><p className="card-sub">Long-form editing · Thumbnails · SEO</p></div>
              <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} aria-label="About Creativo">
        <div className="container">
          <div className="about-strip">
            <div data-reveal="true">
              <div className="section-label" style={{ marginBottom: '22px' }}><span className="t-label">The Person Behind The Work</span></div>
              <p className="about-pull-quote">I don't just design things. I build <em>visual logic</em> behind brands that mean something.</p>
              <p className="t-body-lg" style={{ marginBottom: '36px' }}>I'm a multidisciplinary creative operating at the intersection of strategy, design, and code. Every project is an exercise in clarity: turning complex needs into experiences that feel obvious, inevitable, and alive.</p>
              <Link to="/about" className="btn btn-outline">Meet Creativo</Link>
            </div>
            <div className="about-visual" data-reveal="right">
              <div className="about-badge">
                <p className="about-badge-role">Brand Structuralist &amp; Video Editor</p>
                <p className="about-badge-name">Creativo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SNAP ── */}
      <section className="section" aria-labelledby="services-snap-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label" data-reveal="true"><span className="t-label">What I Do</span></div>
            <div className="flex-between" data-reveal="true" data-delay="2">
              <h2 className="t-h1" id="services-snap-heading">Full-spectrum<br />creative execution.</h2>
              <Link to="/services" className="btn-arrow">All Services <i className="ri-arrow-right-up-line"></i></Link>
            </div>
          </div>
          <div className="services-grid" data-reveal="true">
            <div className="service-item"><span className="service-glyph" aria-hidden="true">✦</span><h3 className="service-title">Branding</h3><p className="service-desc">Visual systems that hold meaning across every touchpoint.</p><Link to="/services" className="service-cta">Explore →</Link></div>
            <div className="service-item"><span className="service-glyph" aria-hidden="true">⬡</span><h3 className="service-title">Web Development</h3><p className="service-desc">Clean code, considered motion, performance built in.</p><Link to="/services" className="service-cta">Explore →</Link></div>
            <div className="service-item"><span className="service-glyph" aria-hidden="true">▷</span><h3 className="service-title">Video Editing</h3><p className="service-desc">Edits that stop the scroll. Built for creators.</p><Link to="/services" className="service-cta">Explore →</Link></div>
          </div>
        </div>
      </section>

      {/* ── STATS — 4 cards ── */}
      <section className="section" aria-label="Stats">
        <div className="container">
          <div className="stats-bar">
            <div className="stat-item" data-reveal="true" data-delay="1" data-count="60"><div className="stat-number"><span className="stat-count-value">0</span><em>+</em></div><p className="stat-label">Projects Delivered</p></div>
            <div className="stat-item" data-reveal="true" data-delay="2" data-count="30"><div className="stat-number"><span className="stat-count-value">0</span><em>+</em></div><p className="stat-label">Brands Built</p></div>
            <div className="stat-item" data-reveal="true" data-delay="3" data-count="5"><div className="stat-number"><span className="stat-count-value">0</span><em>+</em></div><p className="stat-label">Years Experience</p></div>
            <div className="stat-item" data-reveal="true" data-delay="4" data-count="3"><div className="stat-number"><span className="stat-count-value">0</span></div><p className="stat-label">Disciplines Mastered</p></div>
          </div>
        </div>
      </section>

      {/* ── CTA DIVIDER + BANNER ── */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal="true">
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Let's Build Something</span>
            <h2 className="t-hero">Have a project<br />in mind? Let's<br />make it real.</h2>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary"><span>Start a Conversation</span><i className="ri-arrow-right-line"></i></Link>
              <Link to="/work" className="btn btn-outline">View All Work</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

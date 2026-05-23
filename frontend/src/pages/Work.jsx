import { Link } from 'react-router-dom';

export default function Work() {
  return (
    <main style={{ overflowX: 'hidden' }}>
      {/* HERO */}
      <section className="work-hero" aria-labelledby="work-heading">
        <div className="work-hero-inner">
          <div className="page-eyebrow">
            <span className="page-eyebrow-line" aria-hidden="true"></span>
            <span className="t-label">Selected Projects</span>
          </div>
          <h1 id="work-heading">Three<br />disciplines.<br /><em>One</em> standard.</h1>
          <p className="t-body-lg work-hero-sub">Every project here is a case of problem-solving, craft, and intentional execution — from the first brief to the final pixel.</p>
        </div>
        <div className="page-hero-bottom" aria-hidden="true"></div>
      </section>

      {/* WORK GRID */}
      <div className="work-main">
        <div className="work-main-inner">

          <div className="filter-bar">
            <div className="filter-container">
              <span className="filter-label">Filter by type</span>
              <div className="filter-dropdown" id="work-filter">
                <button className="dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
                  <span className="dropdown-trigger-text">All</span>
                  <i className="ri-arrow-down-s-line dropdown-arrow"></i>
                </button>
                <ul className="dropdown-menu" role="listbox">
                  <li className="dropdown-item active" data-filter="All" role="option">All</li>
                  <li className="dropdown-item" data-filter="Branding" role="option">Branding</li>
                  <li className="dropdown-item" data-filter="Web Development" role="option">Web Development</li>
                  <li className="dropdown-item" data-filter="Video Editing" role="option">Video Editing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="work-grid">
            <div className="work-item" data-reveal="true" data-category="Branding" data-delay="1">
              <Link to="/case-study/branding" className="project-card" aria-label="Apex — Complete Brand Identity">
                <div className="card-img"><img src="https://picsum.photos/seed/apex-wide/800/600" alt="Apex Brand Identity" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Apex — Complete Brand Identity</h3><p className="card-sub">Logo system · Colour palette · Brand guidelines</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Web Development" data-delay="2">
              <Link to="/case-study/web-development" className="project-card" aria-label="Luminal — Website">
                <div className="card-img"><img src="https://picsum.photos/seed/luminal-web/800/600" alt="Luminal Website" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Luminal — Website</h3><p className="card-sub">Custom codebase · GSAP animations</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Video Editing" data-delay="3">
              <Link to="/case-study/video-editing" className="project-card" aria-label="Vanta — Edit Reel">
                <div className="card-img"><img src="https://picsum.photos/seed/vanta-motion/800/600" alt="Vanta Motion Reel" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Vanta — Edit Reel</h3><p className="card-sub">Long-form editing · Sound design · Reels</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Web Development" data-delay="1">
              <Link to="/case-study/web-development" className="project-card" aria-label="Vortex — Landing Page">
                <div className="card-img"><img src="https://picsum.photos/seed/vortex-web/800/600" alt="Vortex Landing Page" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Vortex — Landing Page</h3><p className="card-sub">Custom HTML/CSS/JS · SEO optimised</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Branding" data-delay="2">
              <Link to="/case-study/branding" className="project-card" aria-label="Mesh Co — Visual Identity">
                <div className="card-img"><img src="https://picsum.photos/seed/mesh-co/800/600" alt="Mesh Co Brand Identity" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Mesh Co. — Visual Identity</h3><p className="card-sub">Logo · Typography · Brand system</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Video Editing" data-delay="3">
              <Link to="/case-study/video-editing" className="project-card" aria-label="Solace — Social Pack">
                <div className="card-img"><img src="https://picsum.photos/seed/solace-motion/800/600" alt="Solace Social Pack" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Solace — Social Pack</h3><p className="card-sub">Instagram Reels · YouTube Shorts</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Web Development" data-delay="1">
              <Link to="/case-study/web-development" className="project-card" aria-label="Crest Studio — Portfolio Site">
                <div className="card-img"><img src="https://picsum.photos/seed/crest-web/800/600" alt="Crest Studio Portfolio" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Crest Studio — Portfolio</h3><p className="card-sub">Custom HTML/CSS/JS · CMS integration</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Branding" data-delay="2">
              <Link to="/case-study/branding" className="project-card" aria-label="Rova — Brand Refresh">
                <div className="card-img"><img src="https://picsum.photos/seed/rova-brand/800/600" alt="Rova Brand Refresh" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Rova — Brand Refresh</h3><p className="card-sub">Identity redesign · Brand strategy</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Video Editing" data-delay="3">
              <Link to="/case-study/video-editing" className="project-card" aria-label="Klave — YouTube Series">
                <div className="card-img"><img src="https://picsum.photos/seed/klave-deck/800/600" alt="Klave YouTube Series" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Klave — YouTube Series</h3><p className="card-sub">Long-form editing · Thumbnails · SEO</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Web Development" data-delay="1">
              <Link to="/case-study/web-development" className="project-card" aria-label="Forma — Web App">
                <div className="card-img"><img src="https://picsum.photos/seed/forma-ui/800/600" alt="Forma Dashboard" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Forma — Web App</h3><p className="card-sub">React · PHP backend · Design system</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Branding" data-delay="2">
              <Link to="/case-study/branding" className="project-card" aria-label="Nova — Brand Launch">
                <div className="card-img"><img src="https://picsum.photos/seed/nova-mkt/800/600" alt="Nova Brand Launch" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Nova — Brand Launch</h3><p className="card-sub">Identity · Campaign visuals · Assets</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
            <div className="work-item" data-reveal="true" data-category="Video Editing" data-delay="3">
              <Link to="/case-study/video-editing" className="project-card" aria-label="Dossier — Content Series">
                <div className="card-img"><img src="https://picsum.photos/seed/dossier-app/800/600" alt="Dossier Content Series" loading="lazy" width="800" height="600" /></div>
                <div className="card-overlay"><h3 className="card-title">Dossier — Content Series</h3><p className="card-sub">YouTube · Reels · Color grading</p></div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA DIVIDER + BANNER */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div data-reveal="true">
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Have a project in mind?</span>
            <h2 className="t-hero">Let's build<br />something worth<br />remembering.</h2>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary"><span>Start a Conversation</span><i className="ri-arrow-right-line"></i></Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

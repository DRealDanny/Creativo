
import { NavLink } from 'react-router-dom';

const CaseStudyBranding = () => {
  return (
    <main>

      {/* HERO: Full bleed image + overlay */}
      <section className="cs-hero">
        <div className="cs-hero-bg" style={{ backgroundImage: "url('https://picsum.photos/seed/apex-brand-hero/1600/900')" }}></div>
        <div className="cs-hero-overlay"></div>
        <div className="cs-hero-content">
          <div className="cs-hero-meta"><span className="cs-category">Branding</span></div>
          <h1 className="cs-hero-title">Apex — Complete<br />Brand Identity</h1>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="cs-info-bar">
        <div className="cs-info-bar-inner container">
          <div className="cs-info-tag">
            <span className="cs-info-label">Sector</span>
            <span className="cs-info-value">Brand Identity</span>
          </div>
          <div className="cs-info-tag">
            <span className="cs-info-label">What We Did</span>
            <span className="cs-info-value">Brand Strategy · Visual Identity · Logo System · Brand Guidelines · Mockups</span>
          </div>
          <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-primary cs-case-btn">
            <span>View Deliverables</span><i className="ri-arrow-right-up-line"></i>
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <article className="cs-content">
        <div className="container">
          <div className="cs-text-block">
            <p className="cs-lead">Apex came to us without a clear visual identity. They had a name, a vision, and an audience — but no system to communicate who they were. Our goal was to build a brand that felt premium without feeling cold, and strategic without feeling corporate.</p>
            <p className="cs-body">The process started with a deep brand audit and positioning session. We mapped their competitive landscape, defined their tone of voice, and established a visual direction rooted in precision and clarity. The result was a comprehensive identity system built to scale across every touchpoint.</p>
          </div>
          <div className="cs-image-block">
            <img src="https://picsum.photos/seed/apex-brand-01/1400/800" alt="Apex brand identity overview" loading="lazy" width="1400" height="800" />
          </div>
          <div className="cs-text-block">
            <h2 className="cs-block-heading">The Visual Direction</h2>
            <p className="cs-body">The logo system was built around a single geometric mark — a form that communicates both precision and forward motion. We developed three lockups: primary, secondary, and icon mark, each with clear usage guidelines documented in a 40-page brand bible.</p>
            <p className="cs-body">Colour was chosen deliberately: a deep navy as the foundation, with a sharp copper accent that communicates value and expertise without the clichés of gold. Typography pairing of a geometric sans with a refined serif created contrast that felt considered, never forced.</p>
          </div>
          <div className="cs-image-block">
            <img src="https://picsum.photos/seed/apex-brand-02/1400/800" alt="Apex colour and typography system" loading="lazy" width="1400" height="800" />
          </div>
          <div className="cs-text-block">
            <h2 className="cs-block-heading">Real-World Application</h2>
            <p className="cs-body">A brand identity only works when it holds across every application. We delivered mockup suites covering business stationery, digital assets, signage, and social media templates — every element designed to the same standard as the core identity.</p>
          </div>
          <div className="cs-image-block">
            <img src="https://picsum.photos/seed/apex-brand-03/1400/800" alt="Apex brand mockups and applications" loading="lazy" width="1400" height="800" />
          </div>
        </div>
      </article>

      {/* CTA DIVIDER + BANNER */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Like What You See?</span>
            <h2 className="t-hero">Let's build your<br />brand identity.</h2>
            <div className="cta-actions">
              <NavLink to="/contact" className="btn btn-primary"><span>Start a Branding Project</span><i className="ri-arrow-right-line"></i></NavLink>
              <NavLink to="/work" className="btn btn-outline">View All Work</NavLink>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default CaseStudyBranding;

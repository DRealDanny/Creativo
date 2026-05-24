import { Link } from 'react-router-dom';

function Branding() {
  return (
    <main>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-bg" style={{backgroundImage: "url('/assets/web/brand-hero.jpg')"}}></div>
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
            <span className="cs-info-value">Consulting &amp; Strategy</span>
          </div>
          <div className="cs-info-tag">
            <span className="cs-info-label">What We Did</span>
            <span className="cs-info-value">Brand Strategy · Visual Identity · Logo System · Brand Guidelines · Mockups</span>
          </div>
          <a href="#" className="btn btn-primary cs-case-btn">
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
            <img src="/assets/web/brand-1.jpg" alt="Apex brand identity overview" loading="lazy" width="1400" height="800" />
          </div>
          <div className="cs-text-block">
            <h2>The System</h2>
            <p className="cs-body">At the core of the identity is a bespoke logo mark that references their strategic foundation. The typography pairs a strong serif with a utilitarian sans-serif, giving them the flexibility to be loud or quiet depending on the application.</p>
            <p className="cs-body">We built out a full colour system, photography guidelines, and detailed rules for real-world application, ensuring that whether the brand lives on a business card or a billboard, it remains consistent.</p>
          </div>
          <div className="cs-gallery-grid">
            <img src="/assets/web/brand-2.jpg" alt="Apex brand application 1" loading="lazy" width="800" height="800" />
            <img src="/assets/web/brand-3.jpg" alt="Apex brand application 2" loading="lazy" width="800" height="800" />
          </div>
        </div>
      </article>

      {/* NEXT PROJECT */}
      <section className="cs-next">
        <div className="cs-next-inner container">
          <span className="cs-next-label">Next Project</span>
          <Link to="/case-study/web-development" className="cs-next-title">Luminal — Website <i className="ri-arrow-right-line"></i></Link>
        </div>
      </section>

    </main>
  );
}

export default Branding;

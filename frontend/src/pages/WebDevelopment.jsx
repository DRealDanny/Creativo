import { Link } from 'react-router-dom';

function WebDevelopment() {
  return (
    <main>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-bg" style={{backgroundImage: "url('/assets/web/web-hero.jpg')"}}></div>
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
            <span className="cs-info-value">Technology</span>
          </div>
          <div className="cs-info-tag">
            <span className="cs-info-label">What We Did</span>
            <span className="cs-info-value">Creative Web Design &amp; UI · Web Development · SEO · CMS Integration</span>
          </div>
          <a href="#" className="btn btn-primary cs-case-btn">
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
            <img src="/assets/web/web-1.jpg" alt="Luminal website homepage" loading="lazy" width="1400" height="800" />
          </div>
          <div className="cs-text-block">
            <h2>The Build</h2>
            <p className="cs-body">Visually, the site relies on a stark contrast between pure blacks, off-whites, and highly saturated photography. The UI typography is exclusively sans-serif, using weight and scale rather than colour to establish hierarchy.</p>
            <p className="cs-body">Interactivity is driven by GSAP — custom scroll-triggered reveals and page transitions ensure the site feels like a native application rather than a static document. The end result is a platform that converts users at a significantly higher rate than their previous build.</p>
          </div>
          <div className="cs-gallery-grid">
            <img src="/assets/web/web-2.jpg" alt="Luminal website internal page" loading="lazy" width="800" height="800" />
            <img src="/assets/web/web-3.jpg" alt="Luminal website mobile view" loading="lazy" width="800" height="800" />
          </div>
        </div>
      </article>

      {/* NEXT PROJECT */}
      <section className="cs-next">
        <div className="cs-next-inner container">
          <span className="cs-next-label">Next Project</span>
          <Link to="/case-study/video-editing" className="cs-next-title">Vanta — Edit Reel <i className="ri-arrow-right-line"></i></Link>
        </div>
      </section>

    </main>
  );
}

export default WebDevelopment;

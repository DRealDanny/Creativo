import { Link } from 'react-router-dom';

function VideoEditing() {
  return (
    <main>

      {/* HERO */}
      <section className="cs-hero">
        <div className="cs-hero-bg" style={{backgroundImage: "url('/assets/web/video-hero.jpg')"}}></div>
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
            <span className="cs-info-value">Content Creation</span>
          </div>
          <div className="cs-info-tag">
            <span className="cs-info-label">What We Did</span>
            <span className="cs-info-value">Long-form Editing · Reels &amp; Shorts · Color Grading · Sound Design · Thumbnails</span>
          </div>
          <a href="#" className="btn btn-primary cs-case-btn">
            <span>Watch Reel</span><i className="ri-arrow-right-up-line"></i>
          </a>
        </div>
      </section>

      {/* CONTENT */}
      <article className="cs-content">
        <div className="container">
          <div className="cs-text-block">
            <p className="cs-lead">Vanta is a content creator with a growing YouTube channel and Instagram presence. The footage was strong — the editing wasn't keeping up. The brief was to build an editing style that matched the quality of the content and gave the channel a consistent, recognisable look.</p>
            <p className="cs-body">We started by studying the top 10 performing videos on the channel and identifying what made the audience stay — and what made them leave. Every editing decision that followed was built around those findings.</p>
          </div>
          <div className="cs-image-block">
            <img src="/assets/web/video-1.jpg" alt="Vanta YouTube video edit" loading="lazy" width="1400" height="800" />
          </div>
          <div className="cs-text-block">
            <h2>The Approach</h2>
            <p className="cs-body">For the long-form videos, the focus was entirely on pacing and narrative structure. We cut the dead air, implemented custom motion graphics to break down complex topics, and built a sound design library specifically for the channel to ensure consistency across every upload.</p>
            <p className="cs-body">The short-form content (Reels/Shorts) required a different strategy. We extracted the highest-retention moments from the long-form videos and reframed them with aggressive pacing and burned-in captions to stop the scroll.</p>
          </div>
          <div className="cs-gallery-grid">
            <img src="/assets/web/video-2.jpg" alt="Vanta Instagram Reel edit" loading="lazy" width="800" height="800" />
            <img src="/assets/web/video-3.jpg" alt="Vanta YouTube Short edit" loading="lazy" width="800" height="800" />
          </div>
        </div>
      </article>

      {/* NEXT PROJECT */}
      <section className="cs-next">
        <div className="cs-next-inner container">
          <span className="cs-next-label">Next Project</span>
          <Link to="/case-study/branding" className="cs-next-title">Apex — Complete Brand Identity <i className="ri-arrow-right-line"></i></Link>
        </div>
      </section>

    </main>
  );
}

export default VideoEditing;

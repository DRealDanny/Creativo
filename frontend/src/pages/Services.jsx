
import { NavLink } from 'react-router-dom';

const Services = () => {
  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* HERO */}
      <section className="services-hero" aria-labelledby="services-heading">
        <div className="services-hero-inner">
          <div className="page-eyebrow">
            <span className="page-eyebrow-line" aria-hidden="true"></span>
            <span className="t-label">What I Offer</span>
          </div>
          <h1 id="services-heading">From first<br />sketch to<br /><em>final pixel.</em></h1>
          <p className="t-body-lg services-hero-sub">Full-spectrum creative execution across three disciplines. Every service is built to deliver work that is intentional, polished, and built to last.</p>
        </div>
        <div className="page-hero-bottom" aria-hidden="true"></div>
      </section>

      {/* SERVICE BLOCKS */}
      <section className="section" aria-label="Services list">
        <div className="container">

          <div className="service-block">
            <div className="service-block-num" aria-hidden="true">01</div>
            <div className="service-block-body">
              <h3 className="service-block-name">Branding</h3>
              <p className="service-block-desc">For businesses that want to be remembered. I build complete visual identity systems — not just logos. From brand positioning and strategy to logo systems, colour and typography, comprehensive brand guidelines, and real-world application across every touchpoint. Every element is intentional. Every decision is documented.</p>
              <NavLink to="/contact" className="service-block-link">Start a Branding Project <i className="ri-arrow-right-line"></i></NavLink>
            </div>
            <div className="service-deliverables">
              <h5 className="deliverables-title">Deliverables</h5>
              <ul>
                <li className="deliverable-item">Logo system (primary, secondary, icon mark)</li>
                <li className="deliverable-item">Colour palette &amp; typography system</li>
                <li className="deliverable-item">Brand strategy &amp; positioning</li>
                <li className="deliverable-item">Brand guidelines document</li>
                <li className="deliverable-item">Brand asset design</li>
                <li className="deliverable-item">Mockups &amp; real-world application</li>
              </ul>
            </div>
          </div>

          <div className="service-block">
            <div className="service-block-num" aria-hidden="true">02</div>
            <div className="service-block-body">
              <h3 className="service-block-name">Web Development</h3>
              <p className="service-block-desc">Websites that don't just look good — they work. I build custom websites with clean code, considered motion, and performance baked in. From fully custom HTML/CSS/JS codebases to WordPress builds, every site is developed without shortcuts. Because shortcuts show up eventually.</p>
              <NavLink to="/contact" className="service-block-link">Start a Web Project <i className="ri-arrow-right-line"></i></NavLink>
            </div>
            <div className="service-deliverables">
              <h5 className="deliverables-title">Deliverables</h5>
              <ul>
                <li className="deliverable-item">Custom HTML/CSS/JS codebase</li>
                <li className="deliverable-item">Custom Management System (CMS)</li>
                <li className="deliverable-item">Fully responsive (mobile, tablet, desktop)</li>
                <li className="deliverable-item">GSAP &amp; scroll animations</li>
                <li className="deliverable-item">Performance-optimised</li>
                <li className="deliverable-item">SEO best practices implemented</li>
                <li className="deliverable-item">Handoff or ongoing maintenance</li>
              </ul>
            </div>
          </div>

          <div className="service-block">
            <div className="service-block-num" aria-hidden="true">03</div>
            <div className="service-block-body">
              <h3 className="service-block-name">Video Editing</h3>
              <p className="service-block-desc">For content creators who know their audience deserves better than average edits. I turn raw footage into polished, platform-ready content — YouTube videos, Instagram Reels, YouTube Shorts, and beyond. Every edit is built around the creator's voice and the platform it lives on.</p>
              <NavLink to="/contact" className="service-block-link">Start a Video Project <i className="ri-arrow-right-line"></i></NavLink>
            </div>
            <div className="service-deliverables">
              <h5 className="deliverables-title">Deliverables</h5>
              <ul>
                <li className="deliverable-item">YouTube long-form video editing</li>
                <li className="deliverable-item">Instagram Reels &amp; YouTube Shorts editing</li>
                <li className="deliverable-item">Transition, pacing &amp; sound design</li>
                <li className="deliverable-item">Thumbnail design</li>
                <li className="deliverable-item">Content creator packages</li>
                <li className="deliverable-item">Platform-optimised exports</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} aria-labelledby="process-heading">
        <div className="container">
          <div className="edge-glow" aria-hidden="true"></div>
          <div className="section-header">
            <div className="section-label"><span className="t-label">The Process</span></div>
            <div className="flex-between">
              <h2 className="t-h1" id="process-heading">How I work.<br />No surprises.</h2>
              <p className="t-body" style={{ maxWidth: '340px' }}>Four stages. Clear communication at every step. You always know where we are and what's next.</p>
            </div>
          </div>
          <div className="process-grid">
            <div className="process-step"><div className="process-num" aria-hidden="true">01</div><h3 className="process-title">Discover</h3><p className="process-desc">Understanding your business, your audience, your goals, and your gap. Before a single pixel is placed, we get aligned on what the work needs to achieve.</p></div>
            <div className="process-step"><div className="process-num" aria-hidden="true">02</div><h3 className="process-title">Define</h3><p className="process-desc">Shaping the strategy, the creative direction, and the deliverables. This is where ambiguity becomes clarity — and where we agree on what success looks like.</p></div>
            <div className="process-step"><div className="process-num" aria-hidden="true">03</div><h3 className="process-title">Design</h3><p className="process-desc">Crafting the work with precision, creativity, and intention at every step. Revisions are part of the process. The goal is to get it right — not just done.</p></div>
            <div className="process-step"><div className="process-num" aria-hidden="true">04</div><h3 className="process-title">Deliver</h3><p className="process-desc">Handing over production-ready files, a live build, or final assets — with full documentation and support. The project isn't done until you're confident.</p></div>
          </div>
        </div>
      </section>

      {/* CTA DIVIDER + BANNER */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Ready to Start?</span>
            <h2 className="t-hero">Got a project?<br />Let's make<br />it real.</h2>
            <div className="cta-actions">
              <NavLink to="/contact" className="btn btn-primary"><span>Start a Conversation</span><i className="ri-arrow-right-line"></i></NavLink>
              <NavLink to="/work" className="btn btn-outline">See My Work</NavLink>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Services;

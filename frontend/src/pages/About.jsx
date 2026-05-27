import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('design');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`/data/skills.json?t=${new Date().getTime()}`);
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        } else {
          console.error('Failed to fetch skills data, falling back to defaults.');
          setSkills({ creativeDesign: [], webDevelopment: [], videoEditing: [] });
        }
      } catch (error) {
        console.error('Failed to fetch skills data:', error);
        setSkills({ creativeDesign: [], webDevelopment: [], videoEditing: [] });
      }
    };
    fetchSkills();
  }, []);

  const toggleAccordion = (tab) => {
    if (activeAccordion === tab) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(tab);
    }
  };

  return (
    <main style={{ overflowX: 'hidden' }}>
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
              <div className="section-label" style={{ marginBottom: '22px' }}><span className="t-label">My Story</span></div>
              <h2 className="t-h2" id="story-heading" style={{ marginBottom: '32px' }}>I don't just design things. I build the visual logic behind brands that mean something.</h2>
              <p className="t-body-lg">I'm Creativo — a multidisciplinary creative professional based in Lagos, Nigeria. My work lives at the intersection of strategy, design, and code. I've spent years sharpening the craft of making brands not just look good, but work — at every touchpoint, across every channel.</p>
              <p className="t-body-lg" style={{ marginTop: '22px' }}>My philosophy is simple: intentional design. Clarity over noise. Every decision should earn its place — whether that's a typeface choice, a line of code, or the way a button responds when you hover it.</p>
              <p className="t-body-lg" style={{ marginTop: '22px' }}>I work with ambitious brands — businesses that understand that design is not decoration, it is infrastructure. If you're building something that needs to mean something to the people it serves, that's the kind of work I want to be part of.</p>
              <a href="#" className="cv-btn" download aria-label="Download CV"><i className="ri-download-line"></i>Download CV</a>
            </div>
            <div className="photo-wrap">
              <div className="photo-frame">
                <div className="photo-inner">
                  <img src="https://picsum.photos/seed/creativo-portrait/600/750" alt="Creativo — Brand Structuralist" loading="lazy" width="600" height="750" />
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

      {/* DISCIPLINES */}
      <section className="section" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} aria-labelledby="disciplines-heading">
        <div className="container">
          <div className="edge-glow" aria-hidden="true"></div>
          <div className="section-header">
            <div className="section-label"><span className="t-label">My Disciplines</span></div>
            <h2 className="t-h1" id="disciplines-heading">Three ways I show up<br />for the work.</h2>
          </div>
          <div className="discipline-list" role="list">
            <div className="discipline-item" role="listitem">
              <p className="discipline-num">01</p>
              <p className="discipline-name">Brand Identity</p>
              <p className="discipline-desc">I design identity systems that hold their meaning across every touchpoint — from the logo to the language, the colour to the campaign. A brand is not a logo. It's a belief system made visible.</p>
            </div>
            <div className="discipline-item" role="listitem">
              <p className="discipline-num">02</p>
              <p className="discipline-name">Web Development</p>
              <p className="discipline-desc">I build websites with clean code, considered motion, and performance baked in. Whether it's a fully custom codebase or a WordPress build, every line is written with intention. Shortcuts show up eventually — I don't take them.</p>
            </div>
            <div className="discipline-item" role="listitem">
              <p className="discipline-num">03</p>
              <p className="discipline-name">Video Editing</p>
              <p className="discipline-desc">I craft edits that make content impossible to scroll past. Whether it's a YouTube long-form, a Reel, or a Short — every cut, transition, and sound choice is intentional. Good editing shapes how the viewer feels from the first frame to the last.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS & STACK */}
    <section className="section" aria-labelledby="tools-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-label"><span className="t-label">Tools &amp; Stack</span></div>
          <h2 className="t-h1" id="tools-heading">The kit that<br />builds the work.</h2>
        </div>
        {skills ? (
          <div className="tools-grid">
            <div className="tools-card">
              <span className="tools-card-icon" aria-hidden="true">✦</span>
              <h4 className="tools-card-title">Creative &amp; Visual Design</h4>
              <div className="tools-card-pills">
                {skills.creativeDesign?.map((skill, i) => (
                  <span key={i} className="tool-pill">{skill}</span>
                ))}
              </div>
            </div>

            <div className="tools-card">
              <span className="tools-card-icon" aria-hidden="true">⬡</span>
              <h4 className="tools-card-title">Web Development</h4>
              <div className="tools-card-pills">
                {skills.webDevelopment?.map((skill, i) => (
                  <span key={i} className="tool-pill">{skill}</span>
                ))}
              </div>
            </div>

            <div className="tools-card">
              <span className="tools-card-icon" aria-hidden="true">▷</span>
              <h4 className="tools-card-title">Video Editing</h4>
              <div className="tools-card-pills">
                {skills.videoEditing?.map((skill, i) => (
                  <span key={i} className="tool-pill">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading skills...</p>
        )}
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
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Ready to Work Together?</span>
            <h2 className="t-hero">Let's build<br />something worth<br />remembering.</h2>
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

export default About;

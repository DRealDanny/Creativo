import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Work = () => {
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'Apex — Brand Identity',
      category: 'Branding',
      sub: 'Visual system for a premium consulting firm',
      imgSrc: 'https://picsum.photos/seed/apex-brand/800/600',
      link: '/case-study/branding'
    },
    {
      id: 2,
      title: 'Luminal — Website',
      category: 'Web',
      sub: 'Custom coded site with GSAP animations',
      imgSrc: 'https://picsum.photos/seed/luminal-web/800/600',
      link: '/case-study/web-development'
    },
    {
      id: 3,
      title: 'Vanta — Edit Reel',
      category: 'Video',
      sub: 'Long-form & Reels editing package',
      imgSrc: 'https://picsum.photos/seed/vanta-motion/800/600',
      link: '/case-study/video-editing'
    },
    {
      id: 4,
      title: 'Mesh Co. — Identity',
      category: 'Branding',
      sub: 'Visual identity for a creative studio',
      imgSrc: 'https://picsum.photos/seed/mesh-co/800/600',
      link: '/case-study/branding'
    },
    {
      id: 5,
      title: 'Vortex — Landing Page',
      category: 'Web',
      sub: 'Custom codebase, scroll animations',
      imgSrc: 'https://picsum.photos/seed/vortex-web/800/600',
      link: '/case-study/web-development'
    },
    {
      id: 6,
      title: 'Nova — Content Package',
      category: 'Video',
      sub: 'YouTube & Reels editing series',
      imgSrc: 'https://picsum.photos/seed/nova-mkt/800/600',
      link: '/case-study/video-editing'
    },
    {
      id: 7,
      title: 'Rova — Brand Refresh',
      category: 'Branding',
      sub: 'Identity redesign · Brand strategy',
      imgSrc: 'https://picsum.photos/seed/rova-brand/800/600',
      link: '/case-study/branding'
    },
    {
      id: 8,
      title: 'Crest Studio — Portfolio',
      category: 'Web',
      sub: 'Custom HTML/CSS/JS · CMS integration',
      imgSrc: 'https://picsum.photos/seed/crest-web/800/600',
      link: '/case-study/web-development'
    },
    {
      id: 9,
      title: 'Klave — YouTube Series',
      category: 'Video',
      sub: 'Long-form editing · Thumbnails · SEO',
      imgSrc: 'https://picsum.photos/seed/klave-deck/800/600',
      link: '/case-study/video-editing'
    }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section className="page-hero" aria-labelledby="work-heading">
        <div className="container">
          <div className="page-eyebrow">
            <span className="page-eyebrow-line" aria-hidden="true"></span>
            <span className="t-label">Selected Work</span>
          </div>
          <h1 id="work-heading">Work that earns<br /><em>its place</em>.</h1>
          <p className="page-sub">A curated selection of brand identities, websites, and video edits. Driven by strategy, built with precision.</p>
        </div>
        <div className="page-hero-bottom" aria-hidden="true"></div>
      </section>

      {/* ── WORK LIST ── */}
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">

          {/* FILTER CONTROLS */}
          <div className="work-controls">
            <span className="work-count">{filteredProjects.length} Projects</span>

            <div className={`filter-dropdown ${isDropdownOpen ? 'open' : ''}`}>
              <button
                className="dropdown-trigger"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="dropdown-trigger-text">{filter === 'All' ? 'All Work' : filter}</span>
                <i className="ri-arrow-down-s-line"></i>
              </button>

              {isDropdownOpen && (
                <ul className="dropdown-menu" role="listbox" aria-label="Filter projects">
                  <li
                    className={`dropdown-item ${filter === 'All' ? 'active' : ''}`}
                    role="option"
                    aria-selected={filter === 'All'}
                    onClick={() => { setFilter('All'); setIsDropdownOpen(false); }}
                  >
                    All Work
                  </li>
                  <li
                    className={`dropdown-item ${filter === 'Branding' ? 'active' : ''}`}
                    role="option"
                    aria-selected={filter === 'Branding'}
                    onClick={() => { setFilter('Branding'); setIsDropdownOpen(false); }}
                  >
                    Branding
                  </li>
                  <li
                    className={`dropdown-item ${filter === 'Web' ? 'active' : ''}`}
                    role="option"
                    aria-selected={filter === 'Web'}
                    onClick={() => { setFilter('Web'); setIsDropdownOpen(false); }}
                  >
                    Web
                  </li>
                  <li
                    className={`dropdown-item ${filter === 'Video' ? 'active' : ''}`}
                    role="option"
                    aria-selected={filter === 'Video'}
                    onClick={() => { setFilter('Video'); setIsDropdownOpen(false); }}
                  >
                    Video
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* GRID */}
          <div className="work-grid" aria-label="Projects">
            {filteredProjects.map((project) => (
              <NavLink to={project.link} className={`project-card work-item`} key={project.id}>
                <div className="card-img">
                  <img src={project.imgSrc} alt={project.title} loading="lazy" width="800" height="600" />
                </div>
                <div className="card-overlay">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-sub">{project.sub}</p>
                </div>
                <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
              </NavLink>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA DIVIDER + BANNER ── */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Let's Build Something</span>
            <h2 className="t-hero">Have a project<br />in mind? Let's<br />make it real.</h2>
            <div className="cta-actions">
              <NavLink to="/contact" className="btn btn-primary"><span>Start a Conversation</span><i className="ri-arrow-right-line"></i></NavLink>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Work;

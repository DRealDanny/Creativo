import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import workHeroImg from '../assets/work-hero.webp';

const Work = () => {
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const timestamp = new Date().getTime();
        const [brandingRes, webDevRes, videoRes] = await Promise.all([
          fetch(`/data/branding.json?t=${timestamp}`),
          fetch(`/data/web-development.json?t=${timestamp}`),
          fetch(`/data/video-editing.json?t=${timestamp}`)
        ]);

        let allProjects = [];

        if (brandingRes.ok) {
          const brandingJson = await brandingRes.json();
          if (Array.isArray(brandingJson)) {
            const mappedBranding = brandingJson.map(p => ({
              id: p.id,
              title: p.gridPreview?.gridTitle || 'Branding Project',
              category: 'Branding',
              sub: p.gridPreview?.gridNarrative || '',
              imgSrc: p.gridPreview?.gridImage || '',
              link: `/case-study/${p.slug || 'branding'}`
            }));
            allProjects = [...allProjects, ...mappedBranding];
          }
        } else {
          console.error('Error fetching branding data: response not ok');
        }

        if (webDevRes.ok) {
          const webDevJson = await webDevRes.json();
          if (Array.isArray(webDevJson)) {
            const mappedWebDev = webDevJson.map(p => ({
              id: p.id,
              title: p.gridPreview?.gridTitle || 'Web Development Project',
              category: 'Web Development',
              sub: p.gridPreview?.gridNarrative || '',
              imgSrc: p.gridPreview?.gridImage || '',
              link: `/case-study/${p.slug || 'web-development'}`
            }));
            allProjects = [...allProjects, ...mappedWebDev];
          }
        } else {
          console.error('Error fetching web development data: response not ok');
        }

        if (videoRes.ok) {
          const videoJson = await videoRes.json();
          if (Array.isArray(videoJson)) {
            const mappedVideo = videoJson.map(p => ({
              id: p.id,
              title: p.gridPreview?.gridTitle || 'Video Editing Project',
              category: 'Video Editing',
              sub: p.gridPreview?.gridNarrative || '',
              imgSrc: p.gridPreview?.gridImage || '',
              link: `/case-study/${p.slug || 'video-editing'}`
            }));
            allProjects = [...allProjects, ...mappedVideo];
          }
        } else {
          console.error('Error fetching video editing data: response not ok');
        }

        setProjects(allProjects);
      } catch (err) {
        console.error('Error fetching project data', err);
      }
    };

    fetchProjects();
  }, []);

  const categories = ['All', 'Branding', 'Web Development', 'Video Editing'];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ── HERO ── */}
      <section className="work-hero" aria-labelledby="work-heading">
        <div className="work-hero-inner">
          <div className="hero-text">
            <div className="page-eyebrow">
              <span className="page-eyebrow-line" aria-hidden="true"></span>
              <span className="t-label">Selected Projects</span>
            </div>
            <h1 id="work-heading">Three<br />disciplines.<br /><em>One</em> standard.</h1>
            <p className="t-body-lg work-hero-sub">Every project here is a case of problem-solving, craft, and intentional execution — from the first brief to the final pixel.</p>
          </div>
          <div className="hero-visual">
            <img src={workHeroImg} alt="" className="hero-anchor-img" />
          </div>
        </div>
        <div className="page-hero-bottom" aria-hidden="true"></div>
      </section>

      {/* ── WORK LIST ── */}
      <div className="work-main">
        <div className="work-main-inner">

          {/* FILTER */}
          <div className="filter-bar">
            <div className="filter-container">
              <span className="filter-label">Filter by type</span>
              
              <div className={`filter-dropdown ${isDropdownOpen ? 'active open' : ''}`} id="work-filter">
                <button 
                  className="dropdown-trigger" 
                  aria-haspopup="listbox" 
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="dropdown-trigger-text">{filter}</span>
                  <i className="ri-arrow-down-s-line dropdown-arrow"></i>
                </button>

                <ul 
                  className="dropdown-menu" 
                  role="listbox"
                  style={{ 
                    display: isDropdownOpen ? 'block' : 'none',
                    opacity: isDropdownOpen ? 1 : 0,
                    visibility: isDropdownOpen ? 'visible' : 'hidden',
                    position: 'absolute', /* Ensure it floats over the grid */
                    zIndex: 50
                  }}
                >
                  {categories.map((category) => (
                    <li 
                      key={category}
                      className={`dropdown-item ${filter === category ? 'active' : ''}`} 
                      role="option"
                      onClick={() => {
                        setFilter(category);
                        setIsDropdownOpen(false);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          </div>

          {/* GRID OR EMPTY STATE */}
          {filteredProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 0', gridColumn: '1 / -1' }}>
              <p className="t-body-lg" style={{ color: 'var(--c-text-sec)', margin: 0 }}>No Work At The Moment</p>
            </div>
          ) : (
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
          )}

        </div>
      </div>

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

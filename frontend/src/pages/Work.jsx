import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Work = () => {
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['All', 'Branding', 'Web Development', 'Video Editing'];

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
      category: 'Web Development',
      sub: 'Custom coded site with GSAP animations',
      imgSrc: 'https://picsum.photos/seed/luminal-web/800/600',
      link: '/case-study/web-development'
    },
    {
      id: 3,
      title: 'Vanta — Edit Reel',
      category: 'Video Editing',
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
      category: 'Web Development',
      sub: 'Custom codebase, scroll animations',
      imgSrc: 'https://picsum.photos/seed/vortex-web/800/600',
      link: '/case-study/web-development'
    },
    {
      id: 6,
      title: 'Nova — Content Package',
      category: 'Video Editing',
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
      category: 'Web Development',
      sub: 'Custom HTML/CSS/JS · CMS integration',
      imgSrc: 'https://picsum.photos/seed/crest-web/800/600',
      link: '/case-study/web-development'
    },
    {
      id: 9,
      title: 'Klave — YouTube Series',
      category: 'Video Editing',
      sub: 'Long-form editing · Thumbnails · SEO',
      imgSrc: 'https://picsum.photos/seed/klave-deck/800/600',
      link: '/case-study/video-editing'
    }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* ── HERO ── */}
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
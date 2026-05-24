import { useState } from 'react';
import { Link } from 'react-router-dom';

function Work() {
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilter = (category) => {
    setFilter(category);
    setIsDropdownOpen(false);
  };

  const workItems = [
    { category: 'Branding',        link: '/case-study/branding',        title: 'Apex — Complete Brand Identity', sub: 'Logo system · Colour palette · Brand guidelines', imgSrc: 'assets/web/w1.jpg', imgAlt: 'Apex Brand Identity' },
    { category: 'Web Development', link: '/case-study/web-development', title: 'Luminal — Website',              sub: 'Custom codebase · GSAP animations',               imgSrc: 'assets/web/w2.jpg', imgAlt: 'Luminal Website' },
    { category: 'Video Editing',   link: '/case-study/video-editing',   title: 'Vanta — Edit Reel',              sub: 'Long-form editing · Sound design · Reels',        imgSrc: 'assets/web/w3.jpg', imgAlt: 'Vanta Motion Reel' },
    { category: 'Web Development', link: '/case-study/web-development', title: 'Vortex — Landing Page',          sub: 'Custom HTML/CSS/JS · SEO optimised',              imgSrc: 'assets/web/w5.jpg', imgAlt: 'Vortex Landing Page' },
    { category: 'Branding',        link: '/case-study/branding',        title: 'Mesh Co. — Visual Identity',     sub: 'Logo · Typography · Brand system',                imgSrc: 'assets/web/w4.jpg', imgAlt: 'Mesh Co Brand Identity' },
    { category: 'Video Editing',   link: '/case-study/video-editing',   title: 'Solace — Social Pack',           sub: 'Instagram Reels · YouTube Shorts',                imgSrc: 'assets/web/w6.jpg', imgAlt: 'Solace Social Pack' },
    { category: 'Web Development', link: '/case-study/web-development', title: 'Crest Studio — Portfolio',       sub: 'Custom HTML/CSS/JS · CMS integration',            imgSrc: 'assets/web/w8.jpg', imgAlt: 'Crest Studio Portfolio' },
    { category: 'Branding',        link: '/case-study/branding',        title: 'Rova — Brand Refresh',           sub: 'Identity redesign · Brand strategy',              imgSrc: 'assets/web/w7.jpg', imgAlt: 'Rova Brand Refresh' },
    { category: 'Video Editing',   link: '/case-study/video-editing',   title: 'Klave — YouTube Series',         sub: 'Long-form editing · Thumbnails · SEO',            imgSrc: 'assets/web/w9.jpg', imgAlt: 'Klave YouTube Series' },
    { category: 'Web Development', link: '/case-study/web-development', title: 'Forma — Web App',                sub: 'React · PHP backend · Design system',             imgSrc: 'assets/web/w10.jpg', imgAlt: 'Forma Dashboard' },
    { category: 'Branding',        link: '/case-study/branding',        title: 'Nova — Brand Launch',            sub: 'Identity · Campaign visuals · Assets',            imgSrc: 'assets/web/w11.jpg', imgAlt: 'Nova Brand Launch' },
    { category: 'Video Editing',   link: '/case-study/video-editing',   title: 'Dossier — Content Series',       sub: 'YouTube · Reels · Color grading',                 imgSrc: 'assets/web/w12.jpg', imgAlt: 'Dossier Content Series' }
  ];

  const filteredItems = workItems.filter(item => filter === 'All' || item.category === filter);

  return (
    <main style={{overflowX: 'hidden'}}>
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
              <div className={`filter-dropdown ${isDropdownOpen ? 'open' : ''}`} id="work-filter">
                <button className="dropdown-trigger" aria-haspopup="listbox" aria-expanded={isDropdownOpen} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span className="dropdown-trigger-text">{filter}</span>
                  <i className="ri-arrow-down-s-line dropdown-arrow"></i>
                </button>
                <ul className="dropdown-menu" role="listbox">
                  <li className={`dropdown-item ${filter === 'All' ? 'active' : ''}`} onClick={() => handleFilter('All')} role="option">All</li>
                  <li className={`dropdown-item ${filter === 'Branding' ? 'active' : ''}`} onClick={() => handleFilter('Branding')} role="option">Branding</li>
                  <li className={`dropdown-item ${filter === 'Web Development' ? 'active' : ''}`} onClick={() => handleFilter('Web Development')} role="option">Web Development</li>
                  <li className={`dropdown-item ${filter === 'Video Editing' ? 'active' : ''}`} onClick={() => handleFilter('Video Editing')} role="option">Video Editing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="work-grid">
            {filteredItems.map((item, index) => (
              <div key={index} className="work-item" data-category={item.category}>
                <Link to={item.link} className="project-card" aria-label={item.title}>
                  <div className="card-img"><img src={item.imgSrc} alt={item.imgAlt} loading="lazy" width="800" height="600" /></div>
                  <div className="card-overlay"><h3 className="card-title">{item.title}</h3><p className="card-sub">{item.sub}</p></div>
                  <div className="card-view-btn" aria-hidden="true"><i className="ri-arrow-right-up-line"></i></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA DIVIDER + BANNER */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{position: 'relative', zIndex: 1}}>
          <div>
            <span className="t-label" style={{display: 'block', marginBottom: '18px'}}>Have a project in mind?</span>
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

export default Work;

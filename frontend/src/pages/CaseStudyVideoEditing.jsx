import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const getVimeoEmbedUrl = (url) => {
  if (!url) return '';
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return url;
};

const CaseStudyVideoEditing = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [showreelUrl, setShowreelUrl] = useState('');

  const openShowreel = () => {
    if (project?.caseStudyHero?.heroWatchReelLink) {
      let url = project.caseStudyHero.heroWatchReelLink;
      const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (match && match[1]) {
        setShowreelUrl(`https://player.vimeo.com/video/${match[1]}?autoplay=1`);
      } else {
        setShowreelUrl(url);
      }
    }
    setIsVideoModalOpen(true);
  };

  const closeShowreel = () => {
    setIsVideoModalOpen(false);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/data/video-editing.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Failed to load data');
        const json = await response.json();

        if (json && Array.isArray(json)) {
          const foundProject = json.find(p => p.slug === slug || (!p.slug && slug === 'video-editing'));
          if (foundProject) {
            setProject(foundProject);
          } else {
            // navigate to 404 or work
            navigate('/work');
          }
        }
      } catch (err) {
        console.error('Error fetching video-editing project:', err);
        navigate('/work');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug, navigate]);

  if (loading) {
    return <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</main>;
  }

  if (!project) return null;

  const { caseStudyHero, dynamicBlocks } = project;

  return (
    <>
    <main>

      {/* HERO: Full bleed — consistent with all case studies */}
      <section className="cs-hero">
        <div className="cs-hero-bg" style={{ backgroundImage: `url('${caseStudyHero?.heroBgImage || ''}')` }}></div>
        <div className="cs-hero-overlay"></div>
        <div className="cs-hero-content">
          <div className="cs-hero-meta"><span className="cs-category">{project.projectCategory || 'Video Editing'}</span></div>
          <h1 className="cs-hero-title" dangerouslySetInnerHTML={{ __html: caseStudyHero?.heroTitle || 'Video Editing Project' }}></h1>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="cs-info-bar">
        <div className="cs-info-bar-inner container">
          <div className="cs-info-tag">
            <span className="cs-info-label">Sector</span>
            <span className="cs-info-value">{caseStudyHero?.heroSector || 'N/A'}</span>
          </div>
          <div className="cs-info-tag">
            <span className="cs-info-label">What We Did</span>
            <span className="cs-info-value">{caseStudyHero?.heroWhatWeDid || 'N/A'}</span>
          </div>
          {caseStudyHero?.heroWatchReelLink ? (
            <button className="btn btn-primary cs-case-btn" onClick={openShowreel}>
              <span>Watch Reel</span><i className="ri-play-line"></i>
            </button>
          ) : (
            <button className="btn btn-primary cs-case-btn" style={{ opacity: 0.5, cursor: 'not-allowed' }} disabled>
              <span>Watch Reel</span><i className="ri-play-line"></i>
            </button>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <article className="cs-content">
        <div className="container">
          {caseStudyHero?.heroHookRichText && (
            <div className="cs-text-block">
               <div dangerouslySetInnerHTML={{ __html: caseStudyHero.heroHookRichText }}></div>
            </div>
          )}

          {dynamicBlocks && dynamicBlocks.map((block, index) => (
             <React.Fragment key={block.blockId || index}>
                {(block.blockHeading || block.blockSubHeading) && (
                   <div className="cs-text-block">
                     {block.blockHeading && <h2 className="cs-block-heading">{block.blockHeading}</h2>}
                     {block.blockSubHeading && <p className="cs-body" style={{ whiteSpace: 'pre-line' }}>{block.blockSubHeading}</p>}
                   </div>
                )}

                {block.blockVimeoLink && (
                  <div className="cs-video-block" style={{ marginTop: '40px', marginBottom: '40px' }}>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                      <iframe src={getVimeoEmbedUrl(block.blockVimeoLink)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" title={`Vimeo Video ${index}`}></iframe>
                    </div>
                  </div>
                )}

                {block.blockImage && !block.blockVimeoLink && (
                   <div className="cs-image-block">
                      <img src={block.blockImage} alt={block.blockHeading || `Project visual ${index + 1}`} loading="lazy" width="1400" />
                   </div>
                )}
             </React.Fragment>
          ))}
        </div>
      </article>

      {/* CTA DIVIDER + BANNER */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Ready to Elevate Your Content?</span>
            <h2 className="t-hero">Let's create edits<br />people can't scroll past.</h2>
            <div className="cta-actions">
              <NavLink to="/contact" className="btn btn-primary"><span>Start a Video Project</span><i className="ri-arrow-right-line"></i></NavLink>
              <NavLink to="/work" className="btn btn-outline">View All Work</NavLink>
            </div>
          </div>
        </div>
      </section>

    </main>

    {isVideoModalOpen && (
      <div id="showreelModal" className="modal-overlay is-open" role="dialog" aria-modal="true" aria-label="Showreel video">
        <div className="modal-container">
          <button className="modal-close" onClick={closeShowreel} aria-label="Close showreel"><i className="ri-close-line"></i></button>
          <div className="modal-video-wrap">
            <iframe id="vimeoPlayer" src={isVideoModalOpen ? showreelUrl : ""} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Creativo Showreel"></iframe>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default CaseStudyVideoEditing;

import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const getVimeoEmbedUrl = (url) => {
  if (!url) return '';
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return url;
};

const CaseStudyBranding = () => {
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { slug } = useParams();
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const openPdfModal = (e, url) => {
    e.preventDefault();
    if (url) {
      setPdfUrl(url);
      setIsPdfModalOpen(true);
    }
  };

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  useEffect(() => {
    if (isPdfModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPdfModalOpen]);

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const response = await fetch('/data/branding.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Failed to load');
        const json = await response.json();

        if (json && Array.isArray(json)) {
          const matchedProject = json.find(p => p.slug === slug || (!p.slug && slug === 'branding'));

          if (matchedProject) {
            setData(matchedProject);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Error fetching branding data', err);
        setNotFound(true);
      }
    };
    fetchBranding();
  }, [slug]);

  if (notFound) return <main style={{ padding: '200px 20px', textAlign: 'center' }}><p className="t-body-lg" style={{ color: 'var(--c-text-sec)', margin: 0 }}>Project Not Found</p><NavLink to="/work" className="btn btn-outline" style={{ marginTop: '30px', display: 'inline-flex' }}>Back to Work</NavLink></main>;
  if (!data) return <main style={{ padding: '200px 20px', textAlign: 'center' }}><p className="t-body-lg" style={{ color: 'var(--c-text-sec)' }}>Loading...</p></main>;

  const { caseStudyHero, dynamicBlocks } = data;

  return (
    <>
    <main>

      {/* HERO: Full bleed image + overlay */}
      <section className="cs-hero">
        <div className="cs-hero-bg" style={{ backgroundImage: `url('${caseStudyHero.heroBgImage || ''}')` }}></div>
        <div className="cs-hero-overlay"></div>
        <div className="cs-hero-content">
          <div className="cs-hero-meta"><span className="cs-category">Branding</span></div>
          <h1 className="cs-hero-title" dangerouslySetInnerHTML={{ __html: caseStudyHero.heroTitle || 'Branding Project' }}></h1>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="cs-info-bar">
        <div className="cs-info-bar-inner container">
          <div className="cs-info-tag">
            <span className="cs-info-label">Sector</span>
            <span className="cs-info-value">{caseStudyHero.heroSector}</span>
          </div>
          <div className="cs-info-tag">
            <span className="cs-info-label">What We Did</span>
            <span className="cs-info-value">{caseStudyHero.heroDeliverables}</span>
          </div>
          {caseStudyHero.heroDeliverablesLink ? (
            <button onClick={(e) => openPdfModal(e, caseStudyHero.heroDeliverablesLink)} className="btn btn-primary cs-case-btn">
              <span>View Deliverables</span><i className="ri-arrow-right-up-line"></i>
            </button>
          ) : (
            <button className="btn btn-primary cs-case-btn" style={{ opacity: 0.5, cursor: 'not-allowed' }} disabled>
              <span>View Deliverables</span><i className="ri-arrow-right-up-line"></i>
            </button>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <article className="cs-content">
        <div className="container">

          <div className="cs-text-block" dangerouslySetInnerHTML={{ __html: caseStudyHero.heroHookRichText || '' }}></div>

          {dynamicBlocks && dynamicBlocks.map((block, index) => {
            const embedUrl = getVimeoEmbedUrl(block.blockVimeoLink);
            return (
              <React.Fragment key={block.blockId || index}>
                {(block.blockHeading || block.blockSubHeading) && (
                  <div className="cs-text-block">
                    {block.blockHeading && <h2 className="cs-block-heading">{block.blockHeading}</h2>}
                    {block.blockSubHeading && <p className="cs-body" style={{ whiteSpace: 'pre-line' }}>{block.blockSubHeading}</p>}
                  </div>
                )}
                {block.blockImage && (
                  <div className="cs-image-block">
                    <img src={block.blockImage} alt={block.blockHeading || `Branding block ${index}`} loading="lazy" width="1400" />
                  </div>
                )}
                {embedUrl && (
                  <div className="cs-video-block" style={{ marginTop: '40px', marginBottom: '40px' }}>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                      <iframe
                        src={embedUrl}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={`Video ${index}`}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })}

        </div>
      </article>

      {/* CTA DIVIDER + BANNER */}
      <div className="cta-divider" aria-hidden="true"></div>
      <section className="cta-banner" aria-label="Call to Action">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <span className="t-label" style={{ display: 'block', marginBottom: '18px' }}>Like What You See?</span>
            <h2 className="t-hero">Let's build your<br />brand identity.</h2>
            <div className="cta-actions">
              <NavLink to="/contact" className="btn btn-primary"><span>Start a Branding Project</span><i className="ri-arrow-right-line"></i></NavLink>
              <NavLink to="/work" className="btn btn-outline">View All Work</NavLink>
            </div>
          </div>
        </div>
      </section>

    </main>

    {isPdfModalOpen && (
      <div className="modal-overlay is-open" role="dialog" aria-modal="true" aria-label="PDF Document">
        <div className="modal-container pdf-modal-container">
          <button className="modal-close" onClick={closePdfModal} aria-label="Close PDF"><i className="ri-close-line"></i></button>
          <div className="modal-pdf-wrap">
            <iframe src={pdfUrl} title="PDF Document Viewer"></iframe>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default CaseStudyBranding;

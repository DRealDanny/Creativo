import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [socials, setSocials] = useState({
    email: '',
    whatsapp: '',
    instagram: '',
    behance: '',
    pinterest: ''
  });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await fetch(`/data/socials.json?t=${new Date().getTime()}`);
        if (response.ok) {
          const data = await response.json();
          setSocials(data);
        } else {
          console.error('Failed to fetch socials data, falling back to defaults.');
        }
      } catch (error) {
        console.error('Failed to fetch socials data:', error);
      }
    };
    fetchSocials();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="footer" aria-label="Site footer">
        <div className="footer-glow" aria-hidden="true"></div>
        <div className="footer-inner container">
          <div className="footer-grid">
            <div className="footer-brand">
              <NavLink to="/" className="footer-logo">Creativo<span>.</span></NavLink>
              <p className="footer-tagline">Brand Structuralist &amp; Video Editor</p>
              <p className="footer-desc">Design that thinks. Work that lasts.<br />Based in Lagos, Nigeria.</p>
              <div className="footer-socials">
                {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social"><i className="ri-instagram-line"></i></a>}
                {socials.behance && <a href={socials.behance} target="_blank" rel="noopener noreferrer" aria-label="Behance" className="footer-social"><i className="ri-behance-line"></i></a>}
                {socials.pinterest && <a href={socials.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="footer-social"><i className="ri-pinterest-line"></i></a>}
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Navigation</h4>
              <nav className="footer-nav-links" aria-label="Footer navigation">
                <NavLink to="/" className="footer-nav-link">Home     <i className="ri-arrow-right-up-line"></i></NavLink>
                <NavLink to="/work" className="footer-nav-link">Work     <i className="ri-arrow-right-up-line"></i></NavLink>
                <NavLink to="/about" className="footer-nav-link">About    <i className="ri-arrow-right-up-line"></i></NavLink>
                <NavLink to="/services" className="footer-nav-link">Services <i className="ri-arrow-right-up-line"></i></NavLink>
                <NavLink to="/contact" className="footer-nav-link">Contact  <i className="ri-arrow-right-up-line"></i></NavLink>
              </nav>
            </div>
            <div className="footer-contact-col">
              <h4 className="footer-col-title">Get In Touch</h4>
              {socials.email && <a href={`mailto:${socials.email}`} className="footer-contact-item"><i className="ri-mail-line"></i> {socials.email}</a>}
              {socials.whatsapp && <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="footer-contact-item"><i className="ri-whatsapp-line"></i> Chat on WhatsApp</a>}
              <NavLink to="/contact" className="btn btn-primary footer-cta"><span>Start a Project</span><i className="ri-arrow-right-up-line"></i></NavLink>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© <span>{currentYear}</span> <span>Creativo Creates</span>. All Rights Reserved.</p>
            <p className="footer-made">Designed &amp; Built by <em>Creativo</em></p>
          </div>
        </div>
      </footer>

      <button
        className={`scroll-to-top ${isVisible ? 'is-visible' : ''}`}
        aria-label="Scroll to top"
        onClick={scrollToTop}
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      {/* ── FOOTER — wordmark & location removed ── */}
      <footer className="footer" aria-label="Site footer">
        <div className="footer-glow" aria-hidden="true"></div>
        <div className="footer-inner container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">Creativo<span>.</span></Link>
              <p className="footer-tagline">Brand Structuralist &amp; Video Editor</p>
              <p className="footer-desc">Design that thinks. Work that lasts.<br />Based in Lagos, Nigeria.</p>
              <div className="footer-socials">
                <a href="https://instagram.com/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social"><i className="ri-instagram-line"></i></a>
                <a href="https://behance.net/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="footer-social"><i className="ri-behance-line"></i></a>
                <a href="https://pinterest.com/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="footer-social"><i className="ri-pinterest-line"></i></a>
              </div>
            </div>
            <div>
              <h4 className="footer-col-title">Navigation</h4>
              <nav className="footer-nav-links" aria-label="Footer navigation">
                <Link to="/" className="footer-nav-link">Home <i className="ri-arrow-right-up-line"></i></Link>
                <Link to="/work" className="footer-nav-link">Work <i className="ri-arrow-right-up-line"></i></Link>
                <Link to="/about" className="footer-nav-link">About <i className="ri-arrow-right-up-line"></i></Link>
                <Link to="/services" className="footer-nav-link">Services <i class="ri-arrow-right-up-line"></i></Link>
                <Link to="/contact" className="footer-nav-link">Contact <i className="ri-arrow-right-up-line"></i></Link>
              </nav>
            </div>
            <div className="footer-contact-col">
              <h4 className="footer-col-title">Get In Touch</h4>
              <a href="mailto:hello@creativocreates.live" className="footer-contact-item"><i className="ri-mail-line"></i> hello@creativocreates.live</a>
              <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="footer-contact-item"><i className="ri-whatsapp-line"></i> Chat on WhatsApp</a>
              <Link to="/contact" className="btn btn-primary footer-cta"><span>Start a Project</span><i className="ri-arrow-right-up-line"></i></Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© <span id="footerYear">{new Date().getFullYear()}</span> <span>Creativo Creates</span>. All Rights Reserved.</p>
            <p className="footer-made">Designed &amp; Built by <em>Creativo</em></p>
          </div>
        </div>
      </footer>

      <button className="scroll-to-top" aria-label="Scroll to top"><i className="ri-arrow-up-line"></i></button>
    </>
  );
};

export default Footer;

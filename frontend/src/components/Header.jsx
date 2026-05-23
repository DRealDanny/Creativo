import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Basic navigation scroll effect
    const nav = document.querySelector('.nav');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>Creativo<span>.</span></Link>
        <ul className="nav-links" role="list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/work" className="nav-link">Work</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/services" className="nav-link">Services</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>
        <Link to="/contact" className="nav-cta">Let's Talk</Link>
        <button
          className="nav-hamburger"
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <i className="ri-menu-line"></i>
        </button>
      </nav>

      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button className="mobile-close" aria-label="Close navigation menu" onClick={closeMobileMenu}>
          <i className="ri-close-line"></i>
        </button>
        <nav className="mobile-links">
          <Link to="/" className="mobile-link" onClick={closeMobileMenu}>Home</Link>
          <Link to="/work" className="mobile-link" onClick={closeMobileMenu}>Work</Link>
          <Link to="/about" className="mobile-link" onClick={closeMobileMenu}>About</Link>
          <Link to="/services" className="mobile-link" onClick={closeMobileMenu}>Services</Link>
          <Link to="/contact" className="mobile-link" onClick={closeMobileMenu}>Contact</Link>
        </nav>
        <div className="mobile-social">
          <hr className="mobile-divider" />
          <span className="mobile-social-label">Social</span>
          <div className="mobile-social-icons">
            <a href="https://instagram.com/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mobile-social-icon"><i className="ri-instagram-line"></i></a>
            <a href="https://behance.net/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Behance" className="mobile-social-icon"><i className="ri-behance-line"></i></a>
            <a href="https://pinterest.com/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="mobile-social-icon"><i className="ri-pinterest-line"></i></a>
          </div>
        </div>
      </div>
      <div className={`nav-backdrop ${isMobileMenuOpen ? 'is-active' : ''}`} aria-hidden="true" onClick={closeMobileMenu}></div>
    </>
  );
};

export default Header;

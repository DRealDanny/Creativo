import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <NavLink to="/" className="nav-logo">Creativo<span>.</span></NavLink>
        <ul className="nav-links" role="list">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/work" className="nav-link">Work</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          <li><NavLink to="/services" className="nav-link">Services</NavLink></li>
          <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
        </ul>
        <NavLink to="/contact" className="nav-cta">Let's Talk</NavLink>
        <button
          className="nav-hamburger"
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <i className="ri-menu-line"></i>
        </button>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button className="mobile-close" aria-label="Close navigation menu" onClick={toggleMobileMenu}>
          <i className="ri-close-line"></i>
        </button>
        <nav className="mobile-links">
          <NavLink to="/" className="mobile-link" onClick={toggleMobileMenu}>Home</NavLink>
          <NavLink to="/work" className="mobile-link" onClick={toggleMobileMenu}>Work</NavLink>
          <NavLink to="/about" className="mobile-link" onClick={toggleMobileMenu}>About</NavLink>
          <NavLink to="/services" className="mobile-link" onClick={toggleMobileMenu}>Services</NavLink>
          <NavLink to="/contact" className="mobile-link" onClick={toggleMobileMenu}>Contact</NavLink>
        </nav>
        <div className="mobile-social">
          <hr className="mobile-divider" />
          <span className="mobile-social-label">Social</span>
          <div className="mobile-social-icons">
            <a href="https://instagram.com/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mobile-social-icon"><i className="ri-instagram-line"></i></a>
            <a href="https://behance.net/creativocreates"   target="_blank" rel="noopener noreferrer" aria-label="Behance"   className="mobile-social-icon"><i className="ri-behance-line"></i></a>
            <a href="https://pinterest.com/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="mobile-social-icon"><i className="ri-pinterest-line"></i></a>
          </div>
        </div>
      </div>
      <div className={`nav-backdrop ${isMobileMenuOpen ? 'visible' : ''}`} aria-hidden="true" onClick={toggleMobileMenu}></div>
    </>
  );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

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
          <li><NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
          <li><NavLink to="/work" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Work</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Services</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink></li>
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
          <NavLink to="/" className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>Home</NavLink>
          <NavLink to="/work" className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>Work</NavLink>
          <NavLink to="/about" className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>Contact</NavLink>
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

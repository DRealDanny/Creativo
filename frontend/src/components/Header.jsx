import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <Link to="/" className="nav-logo">Creativo<span>.</span></Link>
        <ul className="nav-links" role="list">
          <li><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li><NavLink to="/work" className="nav-link">Work</NavLink></li>
          <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          <li><NavLink to="/services" className="nav-link">Services</NavLink></li>
          <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
        </ul>
        <Link to="/contact" className="nav-cta">Let's Talk</Link>
        <button className="nav-hamburger" aria-label="Open navigation menu" aria-expanded={isMenuOpen} onClick={toggleMenu}>
          <i className="ri-menu-line"></i>
        </button>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button className="mobile-close" aria-label="Close navigation menu" onClick={toggleMenu}>
          <i className="ri-close-line"></i>
        </button>
        <nav className="mobile-links">
          <Link to="/" className="mobile-link" onClick={toggleMenu}>Home</Link>
          <Link to="/work" className="mobile-link" onClick={toggleMenu}>Work</Link>
          <Link to="/about" className="mobile-link" onClick={toggleMenu}>About</Link>
          <Link to="/services" className="mobile-link" onClick={toggleMenu}>Services</Link>
          <Link to="/contact" className="mobile-link" onClick={toggleMenu}>Contact</Link>
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
      <div className={`nav-backdrop ${isMenuOpen ? 'active' : ''}`} aria-hidden="true" onClick={toggleMenu}></div>
    </>
  );
}

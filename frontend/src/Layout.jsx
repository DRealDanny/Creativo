import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const curtainRef = useRef(null);

  useEffect(() => {
    // Run global initializations that bind event listeners to window/document once
    if (window.initCursor) {
      window.initCursor();
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // The curtain exit animation
      if (typeof window.gsap !== 'undefined' && curtainRef.current) {

        // Setup initial state: curtain below screen
        window.gsap.set(curtainRef.current, { y: '100%' });

        // Animate up to cover screen
        window.gsap.to(curtainRef.current, {
          y: '0%',
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => {
            // Update the display location to actually change the route components
            setDisplayLocation(location);

            // Scroll to top
            window.scrollTo(0, 0);

            // Reset revealed elements
            const revealedElements = document.querySelectorAll('.revealed');
            revealedElements.forEach(el => {
              el.classList.remove('revealed');
            });

            // Allow React to render the new component before animating the curtain away
            setTimeout(() => {
              // Re-initialize GSAP stuff
              if (window.initScrollReveal) window.initScrollReveal();
              if (window.initOrbParallax) window.initOrbParallax();
              if (window.initHeroEntrance) window.initHeroEntrance();

              // The curtain entry animation (reveal new page by moving up)
              window.gsap.to(curtainRef.current, {
                y: '-100%',
                duration: 0.5,
                ease: 'power3.inOut',
              });
            }, 50);
          }
        });
      } else {
        setDisplayLocation(location);
        window.scrollTo(0, 0);
      }
    }
  }, [location, displayLocation]);

  return (
    <>
      {/* Global Cursor Elements */}
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>

      <div
        ref={curtainRef}
        className="curtain-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#050508', // Dark background
          zIndex: 9999,
          pointerEvents: 'none',
          transform: 'translateY(100%)' // Initially hidden
        }}
      ></div>

      {React.cloneElement(children, { location: displayLocation })}
    </>
  );
};

export default Layout;

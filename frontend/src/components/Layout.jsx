import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
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
      <Header />
      {children}
      <Footer />
      <button
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
        onClick={scrollToTop}
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </>
  );
}

export default Layout;

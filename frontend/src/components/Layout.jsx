import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <div className="noise-layer" aria-hidden="true"></div>
      <div className="orb-container" aria-hidden="true">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <Header />

      {children}

      <Footer />
    </>
  );
};

export default Layout;

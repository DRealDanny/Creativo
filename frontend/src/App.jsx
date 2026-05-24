import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './assets/css/global.css';
import './assets/css/home.css';
import './assets/css/about.css';
import './assets/css/contact.css';
import './assets/css/services.css';
import './assets/css/work.css';
import './assets/css/case-study.css';
import './assets/css/tablet-res.css';
import './assets/css/mobile-res.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Work from './pages/Work';
import CaseStudyBranding from './pages/CaseStudyBranding';
import CaseStudyVideoEditing from './pages/CaseStudyVideoEditing';
import CaseStudyWebDevelopment from './pages/CaseStudyWebDevelopment';

import ScrollToTop from './components/ScrollToTop';
import CurtainTransition from './components/CurtainTransition';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <ScrollToTop />
      <CurtainTransition key={location.pathname} />
      <div key={location.pathname} className="page-content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/case-study/branding" element={<CaseStudyBranding />} />
          <Route path="/case-study/video-editing" element={<CaseStudyVideoEditing />} />
          <Route path="/case-study/web-development" element={<CaseStudyWebDevelopment />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;

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
import CaseStudyResolver from './pages/CaseStudyResolver';
import CaseStudyVideoEditing from './pages/CaseStudyVideoEditing';

import { AnimatePresence } from 'framer-motion';

import ScrollToTop from './components/ScrollToTop';
import CurtainTransition from './components/CurtainTransition';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  return (
    <Layout>
      <ScrollToTop />
      <CurtainTransition key={`curtain-${location.pathname}`} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
          <Route path="/case-study/:slug" element={<PageTransition><CaseStudyResolver /></PageTransition>} />
          <Route path="/case-study/video-editing" element={<PageTransition><CaseStudyVideoEditing /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;

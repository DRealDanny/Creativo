import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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
import Branding from './pages/Branding';
import VideoEditing from './pages/VideoEditing';
import WebDevelopment from './pages/WebDevelopment';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/case-study/branding" element={<Branding />} />
          <Route path="/case-study/video-editing" element={<VideoEditing />} />
          <Route path="/case-study/web-development" element={<WebDevelopment />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

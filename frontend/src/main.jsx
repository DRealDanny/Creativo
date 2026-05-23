import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Case Studies
import Branding from './pages/case-study/Branding';
import WebDevelopment from './pages/case-study/WebDevelopment';
import VideoEditing from './pages/case-study/VideoEditing';

// Import CSS
import './assets/css/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work.html" element={<Work />} />
        <Route path="/about.html" element={<About />} />
        <Route path="/services.html" element={<Services />} />
        <Route path="/contact.html" element={<Contact />} />
        <Route path="/case-study/branding.html" element={<Branding />} />
        <Route path="/case-study/web-development.html" element={<WebDevelopment />} />
        <Route path="/case-study/video-editing.html" element={<VideoEditing />} />

        {/* Catch-all to allow React Router without `.html` in URLs but keep backward compat */}
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-study/branding" element={<Branding />} />
        <Route path="/case-study/web-development" element={<WebDevelopment />} />
        <Route path="/case-study/video-editing" element={<VideoEditing />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

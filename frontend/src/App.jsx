import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/css/global.css'
import './assets/css/home.css'
import './assets/css/about.css'
import './assets/css/work.css'
import './assets/css/services.css'
import './assets/css/contact.css'
import './assets/css/case-study.css'
import './assets/css/tablet-res.css'
import './assets/css/mobile-res.css'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Branding from './pages/Branding'
import VideoEditing from './pages/VideoEditing'
import WebDevelopment from './pages/WebDevelopment'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-study/branding" element={<Branding />} />
        <Route path="/case-study/video-editing" element={<VideoEditing />} />
        <Route path="/case-study/web-development" element={<WebDevelopment />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

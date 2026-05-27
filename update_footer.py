with open('frontend/src/components/Footer.jsx', 'r') as f:
    content = f.read()

content = content.replace("const [isVisible, setIsVisible] = useState(false);", "const [isVisible, setIsVisible] = useState(false);\n  const [socials, setSocials] = useState({});\n\n  useEffect(() => {\n    fetch('/data/socials.json')\n      .then(res => res.json())\n      .then(data => setSocials(data))\n      .catch(console.error);\n  }, []);")

content = content.replace('''              <div className="footer-socials">
                <a href="https://instagram.com/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social"><i className="ri-instagram-line"></i></a>
                <a href="https://behance.net/creativocreates"   target="_blank" rel="noopener noreferrer" aria-label="Behance"   className="footer-social"><i className="ri-behance-line"></i></a>
                <a href="https://pinterest.com/creativocreates" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="footer-social"><i className="ri-pinterest-line"></i></a>
              </div>''', '''              <div className="footer-socials">
                {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social"><i className="ri-instagram-line"></i></a>}
                {socials.behance && <a href={socials.behance} target="_blank" rel="noopener noreferrer" aria-label="Behance" className="footer-social"><i className="ri-behance-line"></i></a>}
                {socials.pinterest && <a href={socials.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="footer-social"><i className="ri-pinterest-line"></i></a>}
              </div>''')

content = content.replace('''              <a href="mailto:hello@creativocreates.live" className="footer-contact-item"><i className="ri-mail-line"></i> hello@creativocreates.live</a>
              <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer" className="footer-contact-item"><i className="ri-whatsapp-line"></i> Chat on WhatsApp</a>''', '''              <a href={`mailto:${socials.email || 'hello@creativocreates.live'}`} className="footer-contact-item"><i className="ri-mail-line"></i> {socials.email || 'hello@creativocreates.live'}</a>
              <a href={socials.whatsapp || '#'} target="_blank" rel="noopener noreferrer" className="footer-contact-item"><i className="ri-whatsapp-line"></i> Chat on WhatsApp</a>''')

with open('frontend/src/components/Footer.jsx', 'w') as f:
    f.write(content)

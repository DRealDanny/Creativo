import React from 'react';

const Contact = () => {
  return (
    <main style={{ overflowX: 'hidden' }}>

      {/* HERO */}
      <section className="contact-hero" aria-labelledby="contact-heading">
        <div className="contact-hero-inner">
          <div className="page-eyebrow">
            <span className="page-eyebrow-line" aria-hidden="true"></span>
            <span className="t-label">Get In Touch</span>
          </div>
          <h1 id="contact-heading">Got a<br />project?<br />Let's make<br /><em>it real.</em></h1>
        </div>
        <div className="page-hero-bottom" aria-hidden="true"></div>
      </section>

      {/* FORM + INFO */}
      <section className="section" aria-label="Contact form and information">
        <div className="container">
          <div className="edge-glow" aria-hidden="true"></div>

          <div className="avail-badge" aria-label="Currently available for new projects">
            <span className="avail-dot" aria-hidden="true"></span>
            <span className="avail-text">Available for New Projects</span>
          </div>

          <div className="contact-layout">

            {/* Form */}
            <div>
              <div className="section-label" style={{ marginBottom: '18px' }}><span className="t-label">Send a Message</span></div>
              <p className="t-body" style={{ marginBottom: '36px' }}>Fill in the form below and I'll get back to you within 24 hours.</p>

              <form className="contact-form" action="#" method="POST" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Full Name <span className="req">*</span></label>
                    <input className="form-input" type="text" id="name" name="name" placeholder="Your full name" required autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address <span className="req">*</span></label>
                    <input className="form-input" type="email" id="email" name="email" placeholder="your@email.com" required autoComplete="email" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="projectType">Project Type <span className="req">*</span></label>
                    <select className="form-select" id="projectType" name="projectType" required defaultValue="">
                      <option value="" disabled>Select a service</option>
                      <option value="branding">Branding</option>
                      <option value="web">Web Development</option>
                      <option value="video">Video Editing</option>
                      <option value="multiple">Multiple Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="budget">Budget Range <span className="opt">(Optional)</span></label>
                    <select className="form-select" id="budget" name="budget" defaultValue="">
                      <option value="" disabled>Estimated budget</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1000">$500 – $1,000</option>
                      <option value="1000-3000">$1,000 – $3,000</option>
                      <option value="3000-5000">$3,000 – $5,000</option>
                      <option value="5000+">$5,000+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Tell Me About Your Project <span className="req">*</span></label>
                  <textarea className="form-textarea" id="message" name="message" placeholder="Describe your project, goals, timeline, and anything else that feels relevant." required rows="6"></textarea>
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                  <span>Send Message</span>
                  <i className="ri-arrow-right-line"></i>
                </button>
              </form>
            </div>

            {/* Info sidebar */}
            <aside className="contact-info" aria-label="Contact details">
              <div className="info-block">
                <h5>Email Direct</h5>
                <a href="mailto:hello@creativocreates.live">hello@creativocreates.live</a>
              </div>
              <div className="info-divider" aria-hidden="true"></div>
              <div className="info-block">
                <h5>WhatsApp</h5>
                <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a>
              </div>
              <div className="info-divider" aria-hidden="true"></div>
              <div className="info-block">
                <h5>Find Me On</h5>
                <a href="https://instagram.com/creativocreates" className="social-link" target="_blank" rel="noopener noreferrer">
                  <span className="social-link-icon"><i className="ri-instagram-line"></i></span>
                  @creativocreates
                </a>
                <a href="https://behance.net/creativocreates" className="social-link" target="_blank" rel="noopener noreferrer">
                  <span className="social-link-icon"><i className="ri-behance-line"></i></span>
                  creativocreates
                </a>
              </div>
              <div className="info-divider" aria-hidden="true"></div>
              <div className="response-box">
                <span className="response-icon"><i className="ri-time-line"></i></span>
                <div className="response-box-content">
                  <p>Response Time</p>
                  <p>I typically reply within <strong>24 hours</strong> on weekdays.</p>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;

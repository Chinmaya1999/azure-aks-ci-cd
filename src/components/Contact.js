import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-description">
            Have a project or opportunity? I'd love to hear from you!
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>engineer@multicloud.dev</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>San Francisco, CA</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🔗</div>
              <h3>Connect</h3>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-submit">
              Send Message
            </button>

            {isSubmitted && (
              <div className="success-message">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CloudEngineer</h3>
            <p>Building scalable cloud infrastructure for the future</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#cloud-architecture">Cloud Architecture</a></li>
              <li><a href="#devops">DevOps Consulting</a></li>
              <li><a href="#iac">Infrastructure as Code</a></li>
              <li><a href="#kubernetes">Kubernetes Services</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">GitHub</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">Twitter</a>
              <a href="mailto:engineer@multicloud.dev" className="social-icon">Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CloudEngineer. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <div className="hero-text animate-fade-in-up">
          <h1 className="hero-title">
            Multi-Cloud <span className="gradient-text">Devops Engineer</span>
          </h1>
          <p className="hero-subtitle">
            Building scalable infrastructure across AWS, Azure, and GCP
          </p>
          <p className="hero-description">
            Specialized in Kubernetes, Infrastructure as Code, CI/CD pipelines, and cloud-native architecture
          </p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary">View My Work</button>
            <button className="btn btn-secondary">Download CV</button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <h3>50+</h3>
              <p>Projects Deployed</p>
            </div>
            <div className="stat">
              <h3>3</h3>
              <p>Cloud Platforms</p>
            </div>
            <div className="stat">
              <h3>10+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </div>

        <div className="hero-visual animate-slide-in-right">
          <div className="floating-card card-1">
            <div className="card-icon">☁️</div>
            <p>Cloud</p>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">⚙️</div>
            <p>DevOps</p>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">🐳</div>
            <p>Docker</p>
          </div>
          <div className="floating-card card-4">
            <div className="card-icon">📦</div>
            <p>Kubernetes</p>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">☁️</span>
          <span className="logo-text">CloudEngineer</span>
        </div>

        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('hero')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          <button onClick={() => scrollToSection('experience')} className="nav-link">Experience</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </nav>

        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;

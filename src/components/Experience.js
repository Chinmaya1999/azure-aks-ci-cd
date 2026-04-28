import React, { useState } from 'react';
import './Experience.css';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const experiences = [
    {
      company: 'CloudTech Solutions',
      position: 'Senior Cloud Engineer',
      period: '2021 - Present',
      description: 'Leading cloud infrastructure initiatives and managing multi-cloud deployments. Responsible for scaling Kubernetes clusters and implementing disaster recovery solutions.',
      achievements: [
        'Reduced infrastructure costs by 40% through optimization',
        'Implemented zero-downtime deployment strategies',
        'Mentored 5+ junior engineers on cloud best practices'
      ]
    },
    {
      company: 'DevOps Innovations',
      position: 'DevOps Engineer',
      period: '2018 - 2021',
      description: 'Designed and implemented CI/CD pipelines for 50+ microservices. Managed Kubernetes clusters supporting 1M+ daily transactions.',
      achievements: [
        'Decreased deployment time from 2 hours to 15 minutes',
        'Achieved 99.95% uptime SLA',
        'Automated infrastructure provisioning using Terraform'
      ]
    },
    {
      company: 'Cloud Infrastructure Corp',
      position: 'Systems Administrator',
      period: '2016 - 2018',
      description: 'Managed AWS and Azure cloud environments, implemented monitoring and logging solutions. Supported migration of legacy applications to cloud.',
      achievements: [
        'Migrated 20+ on-premises applications to AWS',
        'Implemented ELK stack for centralized logging',
        'Maintained 99% system uptime'
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="section-header">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-description">
            10+ years of expertise in cloud infrastructure and DevOps
          </p>
        </div>

        <div className="experience-content">
          <div className="experience-tabs">
            {experiences.map((exp, index) => (
              <button
                key={index}
                className={`tab-button ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {exp.company}
              </button>
            ))}
          </div>

          <div className="experience-details">
            {experiences.map((exp, index) => (
              activeTab === index && (
                <div key={index} className="experience-card animate-fade-in-up">
                  <div className="experience-header">
                    <h3 className="experience-position">{exp.position}</h3>
                    <span className="experience-period">{exp.period}</span>
                  </div>
                  <p className="experience-company">{exp.company}</p>
                  <p className="experience-description">{exp.description}</p>
                  
                  <div className="experience-achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>2016</h4>
              <p>Started Cloud Journey</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>2018</h4>
              <p>Kubernetes Expertise</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>2021</h4>
              <p>Senior Leadership</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <h4>2024</h4>
              <p>Multi-Cloud Expert</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

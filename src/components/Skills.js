import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Cloud Platforms',
      icon: '☁️',
      skills: ['AWS', 'Azure', 'Google Cloud Platform', 'Multi-Cloud Strategy']
    },
    {
      title: 'Container & Orchestration',
      icon: '🐳',
      skills: ['Docker', 'Kubernetes', 'Docker Compose', 'Helm Charts']
    },
    {
      title: 'Infrastructure as Code',
      icon: '📝',
      skills: ['Terraform', 'Bicep', 'CloudFormation', 'Ansible']
    },
    {
      title: 'CI/CD & DevOps',
      icon: '⚙️',
      skills: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'Azure DevOps']
    },
    {
      title: 'Monitoring & Logging',
      icon: '📊',
      skills: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch']
    },
    {
      title: 'Programming Languages',
      icon: '💻',
      skills: ['Python', 'Go', 'Bash', 'JavaScript']
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-description">
            Expertise across multiple cloud platforms and DevOps technologies
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="skill-icon">{category.icon}</div>
              <h3 className="skill-title">{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, idx) => (
                  <li key={idx} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="proficiency-section">
          <h3 className="proficiency-title">Proficiency Levels</h3>
          <div className="proficiency-grid">
            <div className="proficiency-item">
              <span className="proficiency-label">Kubernetes</span>
              <div className="proficiency-bar">
                <div className="proficiency-fill" style={{ width: '95%' }}></div>
              </div>
              <span className="proficiency-percent">95%</span>
            </div>
            <div className="proficiency-item">
              <span className="proficiency-label">AWS</span>
              <div className="proficiency-bar">
                <div className="proficiency-fill" style={{ width: '90%' }}></div>
              </div>
              <span className="proficiency-percent">90%</span>
            </div>
            <div className="proficiency-item">
              <span className="proficiency-label">Azure</span>
              <div className="proficiency-bar">
                <div className="proficiency-fill" style={{ width: '92%' }}></div>
              </div>
              <span className="proficiency-percent">92%</span>
            </div>
            <div className="proficiency-item">
              <span className="proficiency-label">Terraform</span>
              <div className="proficiency-bar">
                <div className="proficiency-fill" style={{ width: '88%' }}></div>
              </div>
              <span className="proficiency-percent">88%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

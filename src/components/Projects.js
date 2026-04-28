import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Multi-Cloud K8s Cluster',
      description: 'Deployed and managed Kubernetes clusters across AWS, Azure, and GCP with automated CI/CD pipelines',
      technologies: ['Kubernetes', 'Terraform', 'Docker', 'GitHub Actions'],
      image: '🚀',
      link: '#'
    },
    {
      title: 'Microservices Platform',
      description: 'Built scalable microservices architecture with service mesh, monitoring, and auto-scaling capabilities',
      technologies: ['Kubernetes', 'Istio', 'Prometheus', 'Grafana'],
      image: '🏗️',
      link: '#'
    },
    {
      title: 'Infrastructure Automation',
      description: 'Developed IaC templates using Terraform and Bicep for consistent infrastructure provisioning',
      technologies: ['Terraform', 'Bicep', 'Azure DevOps', 'AWS CloudFormation'],
      image: '⚡',
      link: '#'
    },
    {
      title: 'CI/CD Pipeline Optimization',
      description: 'Implemented advanced CI/CD pipelines reducing deployment time by 70% with intelligent caching',
      technologies: ['Jenkins', 'GitHub Actions', 'Docker', 'SonarQube'],
      image: '🔄',
      link: '#'
    },
    {
      title: 'Disaster Recovery System',
      description: 'Designed and implemented multi-region disaster recovery with RTO < 15 minutes',
      technologies: ['AWS', 'Azure', 'Backup Solutions', 'Failover Automation'],
      image: '🛡️',
      link: '#'
    },
    {
      title: 'Security & Compliance',
      description: 'Implemented containerized security scanning and compliance automation across environments',
      technologies: ['Trivy', 'Falco', 'OPA', 'RBAC'],
      image: '🔐',
      link: '#'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            Showcasing my expertise in cloud infrastructure and DevOps
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="project-image">{project.image}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="project-tag">{tech}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

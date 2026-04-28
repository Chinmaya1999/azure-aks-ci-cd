# Multi-Cloud Engineer Portfolio

A modern, responsive React portfolio website for a multi-cloud engineer showcasing expertise in AWS, Azure, GCP, Kubernetes, and DevOps.

## Features

✨ **Modern Design**
- Dark theme with gradient accents
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Accessibility-first approach

🎯 **Sections**
- **Hero**: Eye-catching introduction with floating cards
- **Skills**: Interactive skill showcase with proficiency levels
- **Projects**: Featured portfolio projects with technologies
- **Experience**: Career timeline and achievements
- **Contact**: Contact form and social links
- **Footer**: Navigation and legal links

⚙️ **Technical Stack**
- React 18
- CSS3 with animations
- Responsive Grid/Flexbox layout
- No external UI library (lightweight)
- Cross-browser compatible

☁️ **Cloud Integration**
- Docker containerization
- Kubernetes deployment-ready
- Multi-cloud support (AWS, Azure, GCP)
- CI/CD integration friendly

## Project Structure

```
azure-aks-ci-cd/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Skills.js
│   │   ├── Projects.js
│   │   ├── Experience.js
│   │   ├── Contact.js
│   │   ├── Footer.js
│   │   └── *.css          # Component styles
│   ├── App.js             # Main App component
│   ├── App.css
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies
├── Dockerfile             # Docker build config
├── nginx.conf            # Nginx configuration
├── k8s/
│   └── deployment.yaml   # Kubernetes manifest
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Docker (for containerization)
- kubectl (for Kubernetes deployment)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Visit http://localhost:3000
```

### Build for Production

```bash
# Create optimized build
npm run build

# Output goes to build/ directory
```

## Docker Deployment

### Build Docker Image

```bash
# Build image
docker build -t multi-cloud-portfolio:latest .

# Tag for registry
docker tag multi-cloud-portfolio:latest your-registry/multi-cloud-portfolio:latest
```

### Run Container

```bash
# Run locally
docker run -p 80:80 multi-cloud-portfolio:latest

# Visit http://localhost
```

## Kubernetes Deployment

### Update Deployment

Edit `k8s/deployment.yaml` and update the image:

```yaml
image: your-registry/multi-cloud-portfolio:latest
```

### Deploy to Cluster

```bash
# Apply deployment
kubectl apply -f k8s/deployment.yaml

# Check status
kubectl get pods
kubectl get svc

# Access service
# Use LoadBalancer IP or port-forward
kubectl port-forward svc/web-service 8080:80
```

## Customization

### Update Personal Info

Edit component files to customize:
- **Hero.js**: Name, title, description
- **Skills.js**: Add/remove skill categories
- **Projects.js**: Add your projects
- **Experience.js**: Update work history
- **Contact.js**: Contact information

### Styling

All components use CSS modules:
- Colors defined in component CSS
- Modify gradients in `.gradient-text` class
- Update color scheme: `#3b82f6` (blue), `#8b5cf6` (purple)

### Animation Timing

Adjust animation delays and duration:
- Component animations: 0.6s
- Hover effects: 0.3s
- Stagger delay: 0.1s

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t portfolio:${{ github.sha }} .
      - name: Deploy to K8s
        run: kubectl set image deployment/web-deploy web=${{ registry }}/portfolio:${{ github.sha }}
```

## Performance Optimization

✅ Already included:
- Multi-stage Docker build (smaller image size)
- Nginx gzip compression
- Static asset caching (1 year)
- Lazy loading ready
- Optimized animations (use transform/opacity)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## Deployment to Cloud

### AWS
```bash
# ECR
aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/multi-cloud-portfolio:latest

# ECS or EKS deployment
kubectl apply -f k8s/deployment.yaml
```

### Azure
```bash
# ACR
az acr login --name $REGISTRY_NAME
docker tag multi-cloud-portfolio:latest $REGISTRY_NAME.azurecr.io/multi-cloud-portfolio:latest
docker push $REGISTRY_NAME.azurecr.io/multi-cloud-portfolio:latest

# AKS deployment
kubectl apply -f k8s/deployment.yaml
```

### Google Cloud
```bash
# GCR
docker tag multi-cloud-portfolio:latest gcr.io/$PROJECT_ID/multi-cloud-portfolio:latest
docker push gcr.io/$PROJECT_ID/multi-cloud-portfolio:latest

# GKE deployment
kubectl apply -f k8s/deployment.yaml
```

## Troubleshooting

### Container won't start
- Check logs: `docker logs <container-id>`
- Verify port 80 is available
- Check Nginx config: `docker exec <container-id> nginx -t`

### Kubernetes pod fails
- Check logs: `kubectl logs <pod-name>`
- Verify image availability: `kubectl describe pod <pod-name>`
- Check resource limits in deployment.yaml

### Styling issues
- Clear browser cache (Ctrl+F5)
- Check component CSS imports
- Verify color gradients are applied

## License

MIT License - feel free to use for personal portfolio

## Contributing

Feel free to fork, improve, and submit pull requests!

## Contact

For questions about the portfolio or multi-cloud engineering, reach out through the contact form on the website.

---

**Built with ❤️ for cloud engineers everywhere**

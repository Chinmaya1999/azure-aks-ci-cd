# Multi-Cloud Portfolio Deployment Guide

Complete guide for deploying the React portfolio across different cloud platforms.

## Prerequisites

- Docker installed
- kubectl installed
- Access to a cloud provider (AWS, Azure, or GCP)
- Container registry (Docker Hub, ECR, ACR, or GCR)

## Step 1: Prepare Your Environment

### Update Personal Information

1. **Edit Hero Section** - `src/components/Hero.js`
   - Update your name and title
   - Modify statistics (projects, experience years, etc.)

2. **Edit Skills** - `src/components/Skills.js`
   - Add/remove cloud platforms
   - Update skill categories

3. **Edit Projects** - `src/components/Projects.js`
   - Add your actual projects
   - Update technologies used

4. **Edit Experience** - `src/components/Experience.js`
   - Add your work history
   - Update achievements

5. **Edit Contact** - `src/components/Contact.js`
   - Update contact information
   - Add your social links

## Step 2: Build Docker Image

```bash
# Navigate to project directory
cd /Users/chinmayakumarmallick/Desktop/az/azure-aks-ci-cd

# Build the Docker image
docker build -t multi-cloud-portfolio:latest .

# Tag with your registry
docker tag multi-cloud-portfolio:latest YOUR_REGISTRY/multi-cloud-portfolio:latest

# Test locally
docker run -p 80:80 multi-cloud-portfolio:latest
# Visit http://localhost
```

## Step 3: Deploy to Cloud

### Option A: AWS (ECS/EKS)

#### Using ECS:
```bash
# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

docker tag multi-cloud-portfolio:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/multi-cloud-portfolio:latest

docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/multi-cloud-portfolio:latest

# Create ECS task definition and service in AWS Console
```

#### Using EKS (Kubernetes):
```bash
# Push to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/multi-cloud-portfolio:latest

# Update deployment.yaml with image
sed -i 's|IMAGE|'$AWS_ACCOUNT_ID'.dkr.ecr.us-east-1.amazonaws.com/multi-cloud-portfolio:latest|g' k8s/deployment.yaml

# Deploy to EKS
kubectl apply -f k8s/deployment.yaml

# Get LoadBalancer URL
kubectl get svc web-service
```

### Option B: Azure (AKS/Azure Container Instances)

#### Using AKS (Kubernetes):
```bash
# Login to Azure
az login

# Get credentials for your AKS cluster
az aks get-credentials --resource-group YOUR_RG --name YOUR_CLUSTER

# Push to ACR
az acr login --name YOUR_REGISTRY

docker tag multi-cloud-portfolio:latest YOUR_REGISTRY.azurecr.io/multi-cloud-portfolio:latest

docker push YOUR_REGISTRY.azurecr.io/multi-cloud-portfolio:latest

# Update deployment.yaml
sed -i 's|IMAGE|YOUR_REGISTRY.azurecr.io/multi-cloud-portfolio:latest|g' k8s/deployment.yaml

# Deploy
kubectl apply -f k8s/deployment.yaml

# Get LoadBalancer IP
kubectl get svc web-service
```

#### Using Azure Container Instances:
```bash
# Create ACI container group
az container create \
  --resource-group YOUR_RG \
  --name multi-cloud-portfolio \
  --image YOUR_REGISTRY.azurecr.io/multi-cloud-portfolio:latest \
  --registry-login-server YOUR_REGISTRY.azurecr.io \
  --registry-username YOUR_USERNAME \
  --registry-password YOUR_PASSWORD \
  --ip-address Public \
  --ports 80
```

### Option C: Google Cloud (GKE)

```bash
# Set project
gcloud config set project YOUR_PROJECT_ID

# Push to GCR
docker tag multi-cloud-portfolio:latest gcr.io/YOUR_PROJECT_ID/multi-cloud-portfolio:latest

docker push gcr.io/YOUR_PROJECT_ID/multi-cloud-portfolio:latest

# Get GKE credentials
gcloud container clusters get-credentials YOUR_CLUSTER --zone YOUR_ZONE

# Update deployment.yaml
sed -i 's|IMAGE|gcr.io/YOUR_PROJECT_ID/multi-cloud-portfolio:latest|g' k8s/deployment.yaml

# Deploy to GKE
kubectl apply -f k8s/deployment.yaml

# Get LoadBalancer IP
kubectl get svc web-service
```

## Step 4: Verify Deployment

```bash
# Check pod status
kubectl get pods -l app=web

# Check service
kubectl get svc web-service

# View logs
kubectl logs -l app=web --tail=50

# Test health endpoint
kubectl port-forward svc/web-service 8080:80
curl http://localhost:8080/health
```

## Step 5: Setup Custom Domain

### Using Route 53 (AWS):
```bash
# Create or update DNS record to point to LoadBalancer DNS
```

### Using Azure DNS:
```bash
# Create DNS zone in Azure
az network dns zone create --resource-group YOUR_RG --name yourdomain.com

# Add A record pointing to LoadBalancer IP
az network dns record-set a add-record --resource-group YOUR_RG --zone-name yourdomain.com --record-set-name @ --ipv4-address LOADBALANCER_IP
```

### Using Google Cloud DNS:
```bash
# Create DNS zone
gcloud dns managed-zones create yourdomain --dns-name=yourdomain.com

# Add A record
gcloud dns record-sets transaction start --zone=yourdomain
gcloud dns record-sets transaction add LOADBALANCER_IP --name=yourdomain.com --ttl=300 --type=A --zone=yourdomain
gcloud dns record-sets transaction execute --zone=yourdomain
```

## Step 6: Enable HTTPS (Optional but Recommended)

### Using Let's Encrypt with Cert-Manager:

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml

# Create issuer
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF

# Create ingress with certificate
cat <<EOF | kubectl apply -f -
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - yourdomain.com
    secretName: web-tls
  rules:
  - host: yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-service
            port:
              number: 80
EOF
```

## Step 7: Setup CI/CD Pipeline

### GitHub Actions Example:

Create `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy Portfolio

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: docker build -t multi-cloud-portfolio:${{ github.sha }} .
    
    - name: Login to registry
      run: |
        echo ${{ secrets.REGISTRY_PASSWORD }} | docker login -u ${{ secrets.REGISTRY_USERNAME }} --password-stdin
    
    - name: Push image
      run: docker push ${{ secrets.REGISTRY }}/multi-cloud-portfolio:${{ github.sha }}
    
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/web-deploy \
          web=${{ secrets.REGISTRY }}/multi-cloud-portfolio:${{ github.sha }} \
          --record
      env:
        KUBECONFIG: ${{ secrets.KUBECONFIG }}
```

## Monitoring & Logging

### View Logs:
```bash
# Recent logs
kubectl logs -l app=web --tail=100

# Follow logs
kubectl logs -l app=web -f

# Specific pod
kubectl logs POD_NAME
```

### Metrics:
```bash
# Pod resource usage
kubectl top pods -l app=web

# HPA status
kubectl get hpa web-hpa --watch
```

## Troubleshooting

### Pod won't start
```bash
# Check events
kubectl describe pod POD_NAME

# Check logs
kubectl logs POD_NAME

# Check image availability
kubectl describe pod POD_NAME | grep Image
```

### LoadBalancer pending
```bash
# Check service status
kubectl describe svc web-service

# Check events
kubectl get events --sort-by='.lastTimestamp'
```

### Image pull errors
```bash
# Verify registry credentials
kubectl get secrets

# Check image exists in registry
docker pull YOUR_REGISTRY/multi-cloud-portfolio:latest
```

## Performance Optimization

✅ Already configured:
- 3 replicas for high availability
- Auto-scaling (3-10 pods based on CPU/memory)
- Pod disruption budgets
- Health checks (liveness & readiness)
- Resource limits
- Security context
- Anti-affinity for pod distribution

## Security Best Practices

✅ Implemented:
- Non-root user (nginx user)
- Read-only root filesystem
- Dropped all Linux capabilities
- RBAC enabled
- NetworkPolicies (optional, add if needed)
- Security headers in Nginx
- Gzip compression

## Cost Optimization

💡 Tips:
- Use spot/preemptible instances
- Scale down during low-traffic hours
- Use CloudFront/CDN for static assets
- Archive old container images
- Use reserved instances for baseline capacity

## Next Steps

1. Customize portfolio content for your profile
2. Test locally with `docker run`
3. Push image to your registry
4. Deploy to Kubernetes cluster
5. Setup custom domain
6. Enable HTTPS with Let's Encrypt
7. Monitor performance
8. Setup alerting

## Support

For issues or questions, check:
- Kubernetes documentation: https://kubernetes.io/docs/
- Cloud provider docs (AWS, Azure, GCP)
- Docker documentation: https://docs.docker.com/
- Nginx documentation: https://nginx.org/en/docs/

---

**Happy deploying! 🚀**

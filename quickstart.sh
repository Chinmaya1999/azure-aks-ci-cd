#!/bin/bash

# Multi-Cloud Portfolio - Quick Start Script
# This script helps you get started quickly

set -e

echo "🚀 Multi-Cloud Portfolio - Quick Start"
echo "======================================"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You'll need it for containerization."
fi

echo "✅ Prerequisites checked"
echo ""

# Menu
echo "What would you like to do?"
echo "1) Install dependencies & start development server"
echo "2) Build Docker image"
echo "3) Run Docker container locally"
echo "4) Deploy to Kubernetes"
echo "5) View current deployment status"
echo "6) View portfolio URL"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo ""
        echo "📦 Installing dependencies..."
        npm install
        echo ""
        echo "🚀 Starting development server..."
        echo "Visit http://localhost:3000"
        npm start
        ;;
    2)
        echo ""
        read -p "Enter image name (e.g., my-portfolio): " image_name
        read -p "Enter tag (default: latest): " tag
        tag=${tag:-latest}
        echo ""
        echo "🐳 Building Docker image..."
        docker build -t $image_name:$tag .
        echo "✅ Image built: $image_name:$tag"
        ;;
    3)
        echo ""
        echo "🐳 Running Docker container..."
        read -p "Enter image name: " image_name
        read -p "Enter tag (default: latest): " tag
        tag=${tag:-latest}
        echo ""
        echo "Starting container... Visit http://localhost"
        docker run -p 80:80 $image_name:$tag
        ;;
    4)
        echo ""
        echo "☸️  Deploying to Kubernetes..."
        read -p "Enter image URL (e.g., registry/my-portfolio:latest): " image_url
        echo ""
        echo "Updating deployment.yaml..."
        sed -i.bak "s|IMAGE|$image_url|g" k8s/deployment.yaml
        echo ""
        echo "📋 Deploying..."
        kubectl apply -f k8s/deployment.yaml
        echo ""
        echo "⏳ Waiting for deployment..."
        kubectl rollout status deployment/web-deploy
        echo "✅ Deployment complete!"
        ;;
    5)
        echo ""
        echo "📊 Deployment Status:"
        echo ""
        echo "Pods:"
        kubectl get pods -l app=web
        echo ""
        echo "Service:"
        kubectl get svc web-service
        echo ""
        echo "HPA:"
        kubectl get hpa web-hpa
        ;;
    6)
        echo ""
        echo "🌐 Getting portfolio URL..."
        svc_ip=$(kubectl get svc web-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "PENDING")
        svc_dns=$(kubectl get svc web-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "PENDING")
        
        if [ "$svc_ip" != "PENDING" ]; then
            echo "✅ Portfolio available at: http://$svc_ip"
        elif [ "$svc_dns" != "PENDING" ]; then
            echo "✅ Portfolio available at: http://$svc_dns"
        else
            echo "⏳ LoadBalancer IP/DNS is still pending..."
            echo ""
            echo "Check status with:"
            echo "  kubectl get svc web-service"
        fi
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "======================================"
echo "For more information, see:"
echo "  - README.md for project overview"
echo "  - DEPLOYMENT_GUIDE.md for detailed instructions"
echo "  - SUMMARY.md for complete feature list"
echo ""

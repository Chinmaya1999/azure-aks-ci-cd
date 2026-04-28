#!/usr/bin/env bash

# Environment verification and setup script for local development

echo "🔍 Checking environment..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
if command -v node &> /dev/null; then
    node_version=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js ${node_version} installed"
else
    echo -e "${RED}✗${NC} Node.js not found"
    echo "  Install from: https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    npm_version=$(npm -v)
    echo -e "${GREEN}✓${NC} npm ${npm_version} installed"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check Docker
if command -v docker &> /dev/null; then
    docker_version=$(docker --version)
    echo -e "${GREEN}✓${NC} ${docker_version} installed"
else
    echo -e "${YELLOW}⚠${NC} Docker not found (needed for containerization)"
fi

# Check kubectl
if command -v kubectl &> /dev/null; then
    kubectl_version=$(kubectl version --client --short 2>/dev/null | grep "Client Version" || echo "kubectl installed")
    echo -e "${GREEN}✓${NC} kubectl installed"
else
    echo -e "${YELLOW}⚠${NC} kubectl not found (needed for Kubernetes deployment)"
fi

# Check Git
if command -v git &> /dev/null; then
    git_version=$(git --version)
    echo -e "${GREEN}✓${NC} ${git_version} installed"
else
    echo -e "${YELLOW}⚠${NC} Git not found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check project structure
echo "🗂️  Checking project structure..."
echo ""

required_files=(
    "package.json"
    "Dockerfile"
    "nginx.conf"
    "src/App.js"
    "src/index.js"
    "public/index.html"
    "k8s/deployment.yaml"
)

all_files_exist=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} ${file}"
    else
        echo -e "${RED}✗${NC} ${file} (missing)"
        all_files_exist=false
    fi
done

echo ""

if [ "$all_files_exist" = true ]; then
    echo -e "${GREEN}All files present!${NC}"
else
    echo -e "${RED}Some files are missing. Please ensure all files are created.${NC}"
    exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Environment check complete!"
echo ""
echo "Next steps:"
echo "  1. npm install        (install dependencies)"
echo "  2. npm start          (start development server)"
echo "  3. docker build ...   (build docker image)"
echo ""
echo "For detailed instructions, see:"
echo "  - README.md"
echo "  - DEPLOYMENT_GUIDE.md"
echo "  - ARCHITECTURE.md"
echo ""

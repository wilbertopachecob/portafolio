#!/bin/bash

# GitHub Pages Deployment Script
# This script builds the Vue.js app and deploys it to GitHub Pages

set -e  # Exit on any error

echo "🚀 Starting deployment to GitHub Pages..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if dist directory exists and remove it
if [ -d "dist" ]; then
    print_status "Removing existing dist directory..."
    rm -rf dist
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
fi

# Build the project
print_status "Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    print_error "Build failed - dist directory not created"
    exit 1
fi

print_success "Build completed successfully!"

# Navigate to dist directory
cd dist

# Initialize git repository
print_status "Initializing git repository in dist..."
git init

# Add all files
git add -A

# Get current timestamp for commit message
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Commit changes
print_status "Committing changes..."
git commit -m "Deploy to GitHub Pages - $TIMESTAMP"

# Push to gh-pages branch
print_status "Pushing to GitHub Pages..."
git push -f https://github.com/wilbertopachecob/portafolio.git main:gh-pages

# Go back to project root
cd ..

print_success "Deployment completed successfully! 🎉"
print_status "Your site should be available at: https://wilbertopachecob.github.io/portafolio/"
print_warning "It may take a few minutes for changes to appear." 
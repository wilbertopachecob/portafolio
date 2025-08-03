# Deployment Guide

This guide explains how to deploy your portfolio to GitHub Pages.

## Quick Deployment

To deploy your changes to GitHub Pages, simply run:

```bash
npm run deploy
```

This will:
1. Build your Vue.js application
2. Deploy it to the `gh-pages` branch
3. Make it available at https://wilbertopachecob.github.io/portafolio/

## Manual Deployment

If you prefer to deploy manually, you can use the deployment script directly:

```bash
./deploy-gh-pages.sh
```

## What the Deployment Script Does

1. **Checks prerequisites** - Ensures you're in the project root
2. **Cleans build** - Removes existing `dist` directory
3. **Installs dependencies** - Runs `npm install` if needed
4. **Builds project** - Runs `npm run build`
5. **Deploys to GitHub Pages** - Pushes to `gh-pages` branch
6. **Provides feedback** - Shows colored status messages

## Prerequisites

- Git configured with access to the repository
- Node.js and npm installed
- All changes committed to your working branch

## Troubleshooting

### Build Errors
If the build fails, check:
- All dependencies are installed (`npm install`)
- No syntax errors in your code
- All required files are present

### Deployment Errors
If deployment fails:
- Ensure you have write access to the repository
- Check your internet connection
- Verify the repository URL is correct

### Site Not Updating
- GitHub Pages can take 5-10 minutes to update
- Check the `gh-pages` branch for your latest changes
- Clear your browser cache

## GitHub Pages Configuration

Your site is configured to use the `gh-pages` branch as the source. This is set in your GitHub repository settings under Pages.

## Custom Domain (Optional)

If you want to use a custom domain:
1. Add your domain to the `CNAME` file in the `public` directory
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain 
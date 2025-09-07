# Personal Portfolio - Wilberto Pacheco Batista

A modern, responsive personal portfolio website built with Vue.js 3, featuring a clean design, dark/light mode toggle, and multilingual support (English/Spanish).

## 🌟 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Multilingual**: English and Spanish language support
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **Performance**: Optimized FontAwesome imports and efficient code splitting
- **Service Worker**: Offline functionality and improved performance
- **SEO Optimized**: Structured data and meta tags for better search visibility

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3
- **Build Tool**: Vite 7.1.4
- **Package Manager**: npm (migrated from Yarn)
- **Styling**: CSS3 with CSS Custom Properties (variables)
- **Icons**: FontAwesome 6
- **Internationalization**: Vue I18n
- **Testing**: Vitest + Vue Test Utils
- **Deployment**: GitHub Pages
- **Service Worker**: Custom implementation for offline support

## 📋 Sections

- **About**: Personal introduction and contact information
- **Experience**: Professional work history with timeline
- **Skills**: Technical skills organized by category
- **Education**: Academic background and certifications
- **Languages**: Language proficiency display
- **Certifications**: Professional certifications and achievements

## 🚀 Getting Started

### Prerequisites

- Node.js (v24.7.0 or higher) - See `.nvmrc` file
- npm (v11.0.0 or higher)

### Node.js Version Management

This project uses Node.js v24.7.0. To ensure you're using the correct version:

1. **Using nvm (recommended)**:
   ```bash
   nvm use
   ```
   This will automatically use the version specified in `.nvmrc`

2. **Manual installation**:
   ```bash
   nvm install 24.7.0
   nvm use 24.7.0
   ```

3. **Verify your version**:
   ```bash
   node --version  # Should output v24.7.0
   ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wilbertopachecob/portafolio.git
   cd portafolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8083/`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run lint` - Lint and fix files
- `npm run lint:check` - Check linting without fixing

## 🧪 Testing

The project includes comprehensive unit tests for all components:

```bash
# Run all tests
npm run test:run

# Run tests with coverage (if needed)
npm run test:coverage
```

All 176 tests should pass successfully, covering:
- Component rendering and functionality
- Internationalization (i18n) features
- Service Worker functionality
- Accessibility compliance

## 🚀 Deployment

The portfolio is automatically deployed to GitHub Pages when changes are pushed to the master branch.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
./deploy.sh
```

**Live Site**: https://wilbertopachecob.github.io/portafolio/

### Deployment Features

- **GitHub Pages**: Automatic deployment from master branch
- **Base Path Configuration**: Properly configured for `/portafolio/` subdirectory
- **Static Assets**: Images and assets served from `/portafolio/img/` and `/portafolio/assets/`
- **Service Worker**: Offline functionality and caching

## 📁 Project Structure

```
portafolio/
├── public/                 # Static assets (images, PDFs, etc.)
│   ├── img/               # Production images
│   ├── sw.js              # Service Worker
│   └── manifest.json      # PWA manifest
├── src/
│   ├── assets/            # Source images and static files
│   ├── components/        # Vue components
│   ├── i18n/             # Internationalization
│   ├── config/           # Configuration files
│   └── main.js           # Application entry point
├── tests/                # Unit tests
├── .github/workflows/    # GitHub Actions
├── eslint.config.mjs     # ESLint configuration
├── vite.config.js        # Vite configuration
├── vitest.config.js      # Vitest configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Configuration

### Build Configuration
- **Vite**: Modern build tool with fast HMR and optimized bundling
- **Base Path**: Configured for GitHub Pages subdirectory deployment
- **Asset Handling**: Images copied to public directory for static serving
- **Code Splitting**: Optimized chunks for better performance

### ESLint Configuration
- Uses flat config format (`.mjs`)
- Configured for Vue.js 3 and modern JavaScript
- Includes accessibility rules

### FontAwesome Icons
- Optimized imports for better performance
- Only imports required icons to reduce bundle size
- Supports both solid (`fas`) and brand (`fab`) icons

### Service Worker
- Custom implementation for offline functionality
- Caches static assets and API responses
- Handles fallback for missing resources

## 🚀 Recent Updates

### v2.0.0 - Major Improvements
- ✅ **Package Manager Migration**: Migrated from Yarn to npm
- ✅ **Build Tool Upgrade**: Upgraded from Vue CLI to Vite 7.1.4
- ✅ **Image Loading Fix**: Resolved 404 errors for all production images
- ✅ **Service Worker**: Added offline functionality and caching
- ✅ **Test Coverage**: Increased to 176 tests with comprehensive coverage
- ✅ **Performance**: Improved build times and bundle optimization
- ✅ **CI/CD**: Enhanced GitHub Actions workflows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Contact

- **Name**: Wilberto Pacheco Batista
- **Email**: wilbertopachecob@gmail.com
- **LinkedIn**: [Wilberto Pacheco Batista](https://www.linkedin.com/in/wilberto-pacheco-batista/)
- **GitHub**: [wilbertopachecob](https://github.com/wilbertopachecob)

---

⭐ If you find this portfolio helpful, please give it a star!

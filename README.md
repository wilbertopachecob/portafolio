# Personal Portfolio - Wilberto Pacheco Batista

A modern, responsive personal portfolio website built with Vue.js 3, featuring a clean design, dark/light mode toggle, and multilingual support (English/Spanish).

## 🌟 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Multilingual**: English and Spanish language support
- **Modern UI**: Clean, professional design with smooth animations
- **Accessibility**: WCAG compliant with proper ARIA labels and semantic HTML
- **Performance**: Optimized FontAwesome imports and efficient code splitting

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3
- **Build Tool**: Vue CLI
- **Styling**: CSS3 with CSS Custom Properties (variables)
- **Icons**: FontAwesome 6
- **Internationalization**: Vue I18n
- **Testing**: Vitest + Vue Test Utils
- **Deployment**: GitHub Pages

## 📋 Sections

- **About**: Personal introduction and contact information
- **Experience**: Professional work history with timeline
- **Skills**: Technical skills organized by category
- **Education**: Academic background and certifications
- **Languages**: Language proficiency display
- **Certifications**: Professional certifications and achievements

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wilbertopachecob/portafolio.git
   cd portafolio
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start development server**
   ```bash
   yarn serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:8083/`

### Available Scripts

- `yarn serve` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests in watch mode
- `yarn test:run` - Run tests once
- `yarn lint` - Lint and fix files
- `yarn lint:check` - Check linting without fixing

## 🧪 Testing

The project includes comprehensive unit tests for all components:

```bash
# Run all tests
yarn test:run

# Run tests with coverage (if needed)
yarn test:coverage
```

All 146 tests should pass successfully.

## 🚀 Deployment

The portfolio is automatically deployed to GitHub Pages when changes are pushed to the master branch.

### Manual Deployment

```bash
# Build the project
yarn build

# Deploy to GitHub Pages
./deploy.sh
```

**Live Site**: https://wilbertopachecob.github.io/portafolio/

## 📁 Project Structure

```
portafolio/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── components/        # Vue components
│   ├── i18n/             # Internationalization
│   └── main.js           # Application entry point
├── tests/                # Unit tests
├── eslint.config.mjs     # ESLint configuration
├── vitest.config.js      # Vitest configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Configuration

### ESLint Configuration
- Uses flat config format (`.mjs`)
- Configured for Vue.js 3 and modern JavaScript
- Includes accessibility rules

### FontAwesome Icons
- Optimized imports for better performance
- Only imports required icons to reduce bundle size
- Supports both solid (`fas`) and brand (`fab`) icons

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

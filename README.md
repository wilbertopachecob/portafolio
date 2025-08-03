# Wilberto Pacheco Batista - Portfolio

A modern, responsive portfolio website built with Vue.js 3, showcasing professional experience, skills, and achievements.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Toggle**: User-friendly dark/light theme switching
- **Smooth Scrolling**: Seamless navigation between sections
- **Interactive Timeline**: Visual representation of work experience
- **Modern UI**: Clean, professional design using Bootstrap 5
- **FontAwesome Icons**: Rich iconography throughout the interface

## 🛠️ Tech Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **Styling**: Bootstrap 5 + Custom CSS
- **Icons**: FontAwesome 7
- **Build Tool**: Vue CLI 5
- **Package Manager**: Yarn

## 📁 Project Structure

```
src/
├── components/           # Vue components
│   ├── About.vue        # Personal information and social links
│   ├── Certifications.vue # Professional certifications
│   ├── DarkModeToggle.vue # Dark mode toggle component
│   ├── Education.vue    # Educational background
│   ├── Experience.vue   # Work experience timeline
│   ├── ExperienceItem.vue # Individual experience item
│   ├── Footer.vue       # Footer with scroll-to-top
│   ├── Languages.vue    # Language proficiency
│   ├── Main.vue         # Main layout component
│   ├── Sidebar.vue      # Navigation sidebar
│   ├── Skills.vue       # Technical skills display
│   └── SkillItem.vue    # Individual skill item
├── assets/              # Static assets
│   ├── css/            # Stylesheets
│   └── img/            # Images and icons
├── App.vue             # Root application component
└── main.js            # Application entry point
```

## 🎯 Key Improvements Made

### Code Organization
- **Component Separation**: Extracted reusable components (DarkModeToggle, SkillItem, ExperienceItem)
- **Data-Driven Approach**: Moved hardcoded content to data properties for easier maintenance
- **Consistent Naming**: Standardized component and method names
- **Proper File Extensions**: Added `.vue` extensions to all imports

### Performance Optimizations
- **Efficient Rendering**: Used `v-for` with proper keys for list rendering
- **Optimized Intersection Observer**: Improved navigation highlighting logic
- **Smooth Scrolling**: Enhanced scroll behavior with proper error handling

### Code Quality
- **Comprehensive Comments**: Added JSDoc-style comments for all methods
- **Semantic HTML**: Used proper HTML5 elements (footer, section, etc.)
- **Accessibility**: Improved alt text and ARIA labels
- **Error Handling**: Added null checks and fallbacks

### Maintainability
- **Configuration Objects**: Centralized data in component properties
- **Reusable Components**: Created modular, single-responsibility components
- **Consistent Styling**: Organized CSS with clear comments and structure

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.15.1 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

4. **Build for production**
   ```bash
   yarn build
   ```

## 📝 Customization

### Adding New Skills
Edit the `skillCategories` array in `src/components/Skills.vue`:

```javascript
skillCategories: [
  {
    title: "New Category",
    skills: [
      { name: "Skill Name", icon: ["fab", "icon-name"], iconColor: "#color" },
      { name: "Another Skill" }, // Without icon
    ],
  },
]
```

### Adding New Experience
Edit the `workExperience` array in `src/components/Experience.vue`:

```javascript
workExperience: [
  {
    company: "Company Name",
    position: "Job Title",
    period: "Start Date - End Date",
    responsibilities: [
      "Responsibility 1",
      "Responsibility 2",
    ],
  },
]
```

### Adding New Certifications
Edit the `certifications` array in `src/components/Certifications.vue`:

```javascript
certifications: [
  {
    issuer: "Certification Issuer",
    title: "Certification Title",
    date: "Date",
    link: "Verification URL",
    badgeImage: require("@/assets/img/badge.png"),
    badgeAlt: "Alt text",
    description: "Description",
    skills: ["Skill 1", "Skill 2"],
  },
]
```

## 🎨 Styling

The project uses a combination of:
- **Bootstrap 5**: For responsive grid and components
- **Custom CSS**: Located in `src/assets/css/`
- **Component-scoped styles**: For component-specific styling

### Dark Mode
Dark mode is implemented using CSS classes and can be toggled via the button in the top-right corner.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: ≥ 992px

## 🔧 Development

### Code Style
- Use Vue 3 Composition API patterns
- Follow Vue.js style guide recommendations
- Add JSDoc comments for complex methods
- Use semantic HTML elements

### Component Guidelines
- Keep components focused and single-purpose
- Use props for data passing
- Emit events for parent communication
- Use scoped styles when possible

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Wilberto Pacheco Batista**
- LinkedIn: [Wilberto Pacheco Batista](https://www.linkedin.com/in/wilberto-pacheco-batista/)
- GitHub: [wilbertopachecob](https://github.com/wilbertopachecob)
- Twitter: [@PachecoWilberto](https://twitter.com/PachecoWilberto)

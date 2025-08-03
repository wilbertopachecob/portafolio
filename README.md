# Wilberto Pacheco Batista - Portfolio

A modern, responsive portfolio website built with Vue.js 3, showcasing professional experience, skills, and achievements.

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: WCAG compliant with proper focus states
- **Performance Optimized**: Fast loading with optimized assets

## 🛠 Tech Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **Styling**: Bootstrap 5 + Custom CSS with Flexbox/Grid
- **Icons**: FontAwesome 7
- **Build Tool**: Vue CLI 5
- **Package Manager**: Yarn
- **Code Quality**: ESLint 9

## 📁 Project Structure

```
src/
├── components/          # Vue components
│   ├── About.vue       # Personal information and social links
│   ├── Skills.vue      # Technical skills with categories
│   ├── Experience.vue  # Work experience timeline
│   ├── Education.vue   # Educational background
│   ├── Languages.vue   # Language proficiency
│   ├── Certifications.vue # Professional certifications
│   ├── DarkModeToggle.vue # Dark mode toggle component
│   ├── SkillItem.vue   # Individual skill item
│   ├── ExperienceItem.vue # Individual experience entry
│   └── ...
├── assets/
│   ├── css/            # Stylesheets
│   │   ├── main.css    # Main styles with modern CSS
│   │   └── tweaks.css  # Custom enhancements
│   └── img/            # Images and assets
└── main.js             # Application entry point
```

## 🎨 Modern CSS Improvements

### Flexbox Layout System
- **Replaced floats** with modern flexbox layouts throughout
- **Responsive grid** using CSS Grid and Flexbox
- **Better alignment** with `align-items` and `justify-content`
- **Gap spacing** instead of margins for consistent spacing

### Enhanced Components

#### Skills Section
- **Card-based layout** with hover effects
- **Flexible skill categories** with modern styling
- **Responsive design** that adapts to screen size
- **Interactive elements** with smooth transitions

#### Experience Timeline
- **Modern timeline design** with flexbox layout
- **Hover animations** and visual feedback
- **Improved typography** and spacing
- **Better mobile experience** with responsive breakpoints

#### Certifications & Education
- **Card-based presentation** with consistent styling
- **Flexible layouts** that work on all devices
- **Enhanced visual hierarchy** with better typography
- **Interactive elements** with hover states

#### Social Icons
- **Perfect centering** using flexbox
- **Smooth hover animations** with transform effects
- **Responsive sizing** for different screen sizes
- **Modern color scheme** with brand colors

### Modern CSS Features
- **CSS Custom Properties** for consistent theming
- **Flexbox and Grid** for modern layouts
- **Smooth transitions** and animations
- **Responsive design** with mobile-first approach
- **Accessibility improvements** with focus states
- **Print styles** for better document output

### Color Scheme & Typography
- **Consistent color palette** with primary brand colors
- **Modern typography** with improved readability
- **Better contrast ratios** for accessibility
- **Gradient backgrounds** for visual appeal

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/wilbertopachecob/portafolio.git
cd portafolio

# Install dependencies
yarn install

# Start development server
yarn serve

# Build for production
yarn build
```

## 🎯 Customization

### Adding New Skills
Edit the `skillCategories` array in `src/components/Skills.vue`:

```javascript
skillCategories: [
  {
    title: "Category Name",
    skills: [
      { name: "Skill Name", icon: ["fas", "icon-name"], iconColor: "#color" },
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
    location: "Location",
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
- **Modern CSS**: Flexbox, Grid, Custom Properties
- **Custom CSS**: Located in `src/assets/css/`
- **Component-scoped styles**: For component-specific styling

### CSS Architecture
- **Mobile-first** responsive design
- **Flexbox-based** layouts for better alignment
- **CSS Grid** for complex layouts
- **Custom properties** for consistent theming
- **Smooth animations** with CSS transitions

### Dark Mode
Dark mode is implemented using CSS classes and can be toggled via the button in the top-right corner.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: ≥ 992px

### Responsive Features
- **Flexible layouts** that adapt to screen size
- **Optimized typography** for different devices
- **Touch-friendly** interactive elements
- **Performance optimized** for mobile devices

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

### CSS Best Practices
- Use flexbox for layouts instead of floats
- Implement mobile-first responsive design
- Use CSS custom properties for theming
- Ensure accessibility with proper focus states

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Wilberto Pacheco Batista**
- LinkedIn: [Wilberto Pacheco Batista](https://www.linkedin.com/in/wilberto-pacheco-batista/)
- GitHub: [wilbertopachecob](https://github.com/wilbertopachecob)
- Twitter: [@PachecoWilberto](https://twitter.com/PachecoWilberto)

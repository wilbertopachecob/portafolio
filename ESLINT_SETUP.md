# ESLint Configuration

This project uses ESLint v9 with a modern flat configuration format to ensure code quality and consistency.

## Configuration

The ESLint configuration is defined in `eslint.config.js` and includes:

- **JavaScript Standards**: Uses `@eslint/js` recommended rules
- **Code Style**: Enforces consistent formatting (2-space indentation, single quotes, no semicolons)
- **Best Practices**: Prevents common mistakes and enforces modern JavaScript patterns
- **Vue.js Support**: Currently configured for JavaScript files only (Vue files can be added later)

## Available Scripts

```bash
# Check for linting issues
yarn lint

# Automatically fix formatting issues
yarn lint:fix

# Check with zero warnings allowed
yarn lint:check
```

## Key Rules

- **Indentation**: 2 spaces
- **Quotes**: Single quotes preferred
- **Semicolons**: Not required
- **Commas**: Trailing commas in multiline objects/arrays
- **Spacing**: Consistent spacing around operators and keywords
- **Variables**: Use `const` and `let` instead of `var`
- **Equality**: Use strict equality (`===` and `!==`)

## Adding Vue.js Support

To add Vue.js linting support, you can extend the configuration with:

```javascript
import vue from 'eslint-plugin-vue'

// Add to the configuration array
{
  files: ['**/*.vue'],
  plugins: { vue },
  rules: {
    // Vue-specific rules
  }
}
```

## IDE Integration

Most modern IDEs (VS Code, WebStorm, etc.) will automatically use this ESLint configuration. Make sure to install the ESLint extension for your editor.

## Troubleshooting

If you encounter issues:

1. Make sure all dependencies are installed: `yarn install`
2. Clear ESLint cache: `yarn lint --cache-location .eslintcache`
3. Check for syntax errors in your code
4. Verify the ESLint configuration is valid

## Migration from ESLint v8

This project uses ESLint v9 with the new flat configuration format. The main differences:

- Configuration is in `eslint.config.js` instead of `.eslintrc.js`
- Uses ES modules syntax (`import`/`export`)
- Ignores are defined in the configuration file instead of `.eslintignore`
- More explicit and type-safe configuration 
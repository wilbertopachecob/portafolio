# Unit Tests

This directory contains unit tests for the portfolio components using Jest.

## Test Structure

- `tests/unit/components.spec.js` - Tests for component structure and content validation
- `tests/unit/setup.js` - Jest setup configuration

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

The current tests cover:

### Component Structure Tests
- **About Component**: Tests for hero section content, accessibility attributes, and proper structure
- **Languages Component**: Tests for language display, flag images, and accessibility
- **Navigation Component**: Tests for navigation links, theme toggle, and mobile menu
- **Skills Component**: Tests for skill categories, icons, and proper organization
- **Experience Component**: Tests for work experience timeline and job details

### Accessibility Validation
- All components are tested for proper ARIA attributes
- Role attributes are validated
- Accessibility labels are checked

### Content Validation
- Expected text content is verified
- Component structure is validated
- File existence is confirmed

## Test Configuration

The tests use a simplified Jest configuration that:
- Uses Node.js test environment
- Reads component files directly to avoid Vue compilation issues
- Validates component structure and content without mounting
- Focuses on accessibility and content validation

## Adding New Tests

To add tests for new components:

1. Add the component file to the `componentFiles` array in `components.spec.js`
2. Create specific test cases for the component's content and structure
3. Ensure accessibility attributes are tested
4. Run tests to verify everything passes

## Test Commands

- `npm test` - Run all tests once
- `npm run test:watch` - Run tests in watch mode for development
- `npm run test:coverage` - Generate coverage report 
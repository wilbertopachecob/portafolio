# Branch Protection Setup

This document explains how to set up branch protection rules in GitHub to prevent merging pull requests when tests are failing.

## GitHub Actions Workflow

The `.github/workflows/pr-checks.yml` file has been created and will:

1. **Trigger on**: Pull requests and pushes to main/master branches
2. **Run tests**: Using `yarn test:run` (non-watch mode as preferred)
3. **Run linting**: Using `yarn lint:check`
4. **Run coverage**: Using `yarn test:coverage`
5. **Build project**: Ensure the project builds successfully

## Setting up Branch Protection Rules

To prevent PRs from being merged when tests fail, you need to set up branch protection rules in GitHub:

### Steps:

1. **Go to your repository on GitHub**
2. **Navigate to Settings > Branches**
3. **Click "Add rule" or edit existing rule for main/master branch**
4. **Configure the following settings:**

#### Required Status Checks
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- ✅ **Select the following status checks:**
  - `test` (from the GitHub Actions workflow)
  - `build` (from the GitHub Actions workflow)

#### Additional Protection Options
- ✅ **Require pull request reviews before merging**
- ✅ **Require review from code owners** (if you have a CODEOWNERS file)
- ✅ **Dismiss stale PR approvals when new commits are pushed**
- ✅ **Require conversation resolution before merging**

#### Restrictions
- ✅ **Restrict pushes that create files that are larger than 100 MB**
- ✅ **Require linear history** (optional, but recommended)

### Result

Once configured, GitHub will:
- Block merging of any PR that doesn't pass the required status checks
- Automatically re-run checks when new commits are pushed
- Show the status of each check directly in the PR interface
- Prevent merging until all checks pass

## Local Testing

To test the workflow locally before pushing:

```bash
# Run tests (non-watch mode)
yarn test:run

# Run linting
yarn lint:check

# Run coverage
yarn test:coverage

# Build project
yarn build
```

## Troubleshooting

If the workflow fails:

1. **Check the Actions tab** in your GitHub repository
2. **Review the logs** for specific error messages
3. **Test locally** using the commands above
4. **Update the workflow** if needed based on your specific requirements

## Customization

You can modify the workflow in `.github/workflows/pr-checks.yml` to:

- Add additional test commands
- Change the Node.js version
- Add deployment steps
- Include additional quality checks
- Modify the trigger conditions 
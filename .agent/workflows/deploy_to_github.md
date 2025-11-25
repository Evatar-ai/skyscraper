---
description: How to deploy this project to GitHub Pages
---

# Deploy to GitHub Pages

Follow these steps to publish your 3D skyscraper to the web.

## 1. Initialize Git (if not already done)
If you haven't initialized a git repository yet, run these commands in your terminal:
```bash
git init
git add .
git commit -m "Initial commit"
```

## 2. Create a GitHub Repository
1.  Go to [GitHub.com](https://github.com) and create a new repository.
2.  Name it something like `skyscraper-3d`.
3.  Do **not** initialize with README, .gitignore, or License (keep it empty).

## 3. Push Code to GitHub
Replace `YOUR_USERNAME` and `REPO_NAME` with your actual details:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

## 4. Configure Deployment
This project uses Vite. The easiest way to deploy is to use the `gh-pages` package.

### Install gh-pages
```bash
npm install gh-pages --save-dev
```

### Update package.json
Add these properties to your `package.json`:

1.  Add `homepage` at the top level:
    ```json
    "homepage": "https://YOUR_USERNAME.github.io/REPO_NAME",
    ```

2.  Add `predeploy` and `deploy` scripts to `scripts`:
    ```json
    "scripts": {
      // ... existing scripts
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

### Update vite.config.ts
If you are deploying to a user page (e.g. `username.github.io`), you can skip this.
If you are deploying to a project page (e.g. `username.github.io/repo-name`), you must set the base path:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/REPO_NAME/', // Replace with your repository name
})
```

## 5. Deploy
Run the deploy script:
```bash
npm run deploy
```

## 6. Access Your Site
Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME` in a few minutes!

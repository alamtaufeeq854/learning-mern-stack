# 🚀 Deploying React Projects to GitHub Pages

This guide explains how to deploy the React (Vite) projects in this repository to **GitHub Pages**, step by step.

Repository: `alamtaufeeq854/learning-mern-stack`
Live site: https://alamtaufeeq854.github.io/learning-mern-stack/

---

## 📁 Repository Structure

```
learning-mern-stack/
├── index.html          # Portfolio home page (links all projects)
├── 01.HTML/            # Static HTML  ✅ works on Pages directly
├── 02.CSS/             # Static HTML  ✅ works on Pages directly
├── 03.Tailwind/        # Static HTML  ✅ works on Pages directly
├── 04.JavaScript/      # Static HTML  ✅ works on Pages directly
├── 05.nodejs/          # Static HTML  ✅ works on Pages directly
└── 06.React/           # React apps   ⚠️ must be BUILT first
    ├── 01.basic_react
    ├── 02.basic_vite
    ├── 03.custom_react
    ├── 04.counter
    ├── 05.tailwind_props
    ├── 06.bg_changer
    └── 07.password_generator
```

---

## ❓ Why React Projects Are Different

The static folders (`01.HTML` … `05.nodejs`) serve raw `.html` files, so they work on GitHub Pages instantly.

React (Vite) apps **cannot** run directly — the browser can't read `.jsx` files.
You must **build** the app first (`npm run build`), which produces a `dist/` folder of plain HTML/CSS/JS. That `dist/` folder is what gets deployed.

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) and npm installed
- Git installed and repo cloned locally
- Project runs locally without errors

---

## 🛠️ Deploy a Single React Project

Below we use **`07.password_generator`** as the example. Replace the folder name for other projects.

### Step 1 — Open the project folder

```bash
cd 06.React/07.password_generator
```

### Step 2 — Set the `base` path in `vite.config.js`

The app is served from a subfolder, so Vite must know the correct base path.
Set `base` to `/learning-mern-stack/06.React/<project-folder>/`.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/learning-mern-stack/06.React/07.password_generator/',
})
```

> ⚠️ **Most common mistake:** If you skip this, the deployed page will be **blank** because CSS/JS files return 404.

### Step 3 — Install dependencies

```bash
npm install
```

### Step 4 — Build the project

```bash
npm run build
```

This creates the `dist/` folder.

### Step 5 — Allow `dist/` to be committed

Vite's `.gitignore` usually ignores `dist`. Open the project's `.gitignore` and **remove or comment out** the `dist` line:

```gitignore
# dist        <-- comment out or delete this line
```

### Step 6 — Commit and push the build

```bash
git add 06.React/07.password_generator
git commit -m "Deploy password generator build to GitHub Pages"
git push origin main
```

### Step 7 — Wait, then open the live URL

Wait 1–2 minutes for GitHub Pages to update, then visit:

```
https://alamtaufeeq854.github.io/learning-mern-stack/06.React/07.password_generator/
```

### Step 8 — Link the project from the home page

Add a card in the root `index.html` so it appears on your portfolio:

```html
<a href="./06.React/07.password_generator/"
   class="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-cyan-500 transition block">
  <h4 class="text-xl font-semibold text-cyan-400">Password Generator (React)</h4>
  <p class="mt-3 text-gray-400 text-sm">
    A React + Vite app to generate secure passwords with length, number & symbol options.
  </p>
</a>
```

Then commit and push again:

```bash
git add index.html
git commit -m "Add password generator link to home page"
git push origin main
```

---

## 🔁 Deploy the Other React Projects

Repeat **Steps 1–8** for each project, changing only:

1. The folder you `cd` into
2. The `base` path in `vite.config.js`

Example for the counter app:

```js
base: '/learning-mern-stack/06.React/04.counter/',
```

| Project | `base` value |
|---------|-------------|
| `01.basic_react` | `/learning-mern-stack/06.React/01.basic_react/` |
| `02.basic_vite` | `/learning-mern-stack/06.React/02.basic_vite/` |
| `03.custom_react` | `/learning-mern-stack/06.React/03.custom_react/` |
| `04.counter` | `/learning-mern-stack/06.React/04.counter/` |
| `05.tailwind_props` | `/learning-mern-stack/06.React/05.tailwind_props/` |
| `06.bg_changer` | `/learning-mern-stack/06.React/06.bg_changer/` |
| `07.password_generator` | `/learning-mern-stack/06.React/07.password_generator/` |

---

## ⚡ Quick Command Reference

```bash
cd 06.React/<project-folder>

# 1. Edit vite.config.js -> set base: '/learning-mern-stack/06.React/<project-folder>/'
# 2. Edit .gitignore     -> remove the "dist" line

npm install
npm run build

git add 06.React/<project-folder>
git commit -m "Deploy <project-folder> to GitHub Pages"
git push origin main
```

---

## 🩹 Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Blank page | Wrong or missing `base` | Set `base` in `vite.config.js`, rebuild, recommit |
| Assets 404 in console | Same as above | Verify `base` matches the folder path exactly |
| Changes not showing | Forgot to rebuild | Run `npm run build` again and recommit `dist/` |
| `dist/` not on GitHub | It's git-ignored | Remove `dist` from `.gitignore` |

---

## 📌 Important Notes

1. **Do NOT use `gh-pages -d dist`** for this repo. The site is served from the **`main` branch root** (your HTML portfolio). Running `gh-pages` would create a separate `gh-pages` branch and could hide your portfolio. This repo uses the **commit-`dist`-into-`main`** approach.
2. **Rebuild and recommit `dist/`** every time you change a React app's code — Pages only serves the built files, not your source.

---

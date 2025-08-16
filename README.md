# <p align="center">🌸 Pumki CLI</p>
<p align="center"><em>The easiest way to add prebuilt UI components from <a href="https://github.com/AnshSinghSonkhia/pumki-ui">pumki-ui</a> to your project.</em></p>

<p align="center">
  <a href="https://www.npmjs.com/package/pumki">
    <img src="https://img.shields.io/npm/v/pumki?color=blue&label=npm%20version" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/pumki">
    <img src="https://img.shields.io/npm/dt/pumki?color=brightgreen&label=downloads" alt="npm downloads">
  </a>
  <a href="https://github.com/AnshSinghSonkhia/pumki-cli/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
  </a>
  <a href="https://github.com/AnshSinghSonkhia/pumki-cli/stargazers">
    <img src="https://img.shields.io/github/stars/AnshSinghSonkhia/pumki-cli?style=social" alt="GitHub stars">
  </a>
</p>

<p align="center">
  Works with <strong>npm, pnpm, yarn, and bun</strong> — cross-platform, fast, and developer-friendly.
</p>

---

## Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Quickstart](#-quickstart)
- [Usage](#-usage)
- [Example](#-example)
- [Components](#-components)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features
- One-liner component install
- Auto-detects and uses your package manager
- Fetches components directly from <a href="https://github.com/AnshSinghSonkhia/pumki-ui">pumki-ui</a>
- Cross-platform support: macOS, Linux, Windows, WSL
- Lightweight and blazing fast

---

## 📦 Installation

### Global (recommended)
Install once, use everywhere.
```sh
# npm
npm i -g pumki

# pnpm
pnpm add -g pumki

# yarn
yarn global add pumki

# bun
bun add -g pumki
```

Then run:
```sh
pumki add stats-carousel
```

### Local (per project)
```sh
npm i pumki
```
Then run:
```sh
pumki add stats-carousel
```

If above doesn't work, try running:
```sh
npx pumki add stats-carousel
```

---

## ⚡ Quickstart
Add any component from pumki-ui into your project:
```sh
pumki add stats-carousel
```
That’s it.  
Pumki **fetches the component JSON from pumki-ui and scaffolds it into your project**, integrating with your package manager automatically.

---

## 🛠 Usage
```sh
# Add a component by name
pumki add <component-name>

# Example
pumki add stats-carousel
```

💡 Tip:
- Component names map to entries in [pumki-ui](https://github.com/AnshSinghSonkhia/pumki-ui/tree/main/public/r).

---

## 📥 Example
Command:
```sh
pumki add stats-carousel
```

Output:
```
✨ Adding stats-carousel from Pumki-UI...
✔ Component added successfully!
```

---

## 🧩 Components
Browse the full catalog:
- https://github.com/AnshSinghSonkhia/pumki-ui/tree/main/public/r

---

## ❓ Troubleshooting
- **Command not found**  
  - If **installed globally**, make sure you used: `npm i -g pumki`  
  - Then run: `pumki add <component>`
  - If **installed locally**, run with `npx` (or your package manager’s equivalent): `npx pumki add <component>`
- **Permission errors on global install (macOS/Linux)**  
  - Try: `npm i -g pumki --unsafe-perm`  
  - Or use a Node version manager (nvm, fnm)
- **Wrong package manager being used**  
  - Pumki auto-detects, but you can ensure a lockfile (`package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb`) exists before running.
  - If none exist, it defaults to **npm**.

If you hit an issue, please open an issue with your OS, Node version, package manager, and command used.

---

## 🤝 Contributing
Contributions are welcome!
1. Fork this repo
2. Create a feature branch
3. Commit your changes
4. Push and open a PR 🎉

---

## 📜 License
MIT © [Ansh Singh Sonkhia](https://github.com/AnshSinghSonkhia)

If you find Pumki useful, consider starring the repo to support the project. 🌟

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
- [Doctor Command](#-doctor-command)
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
- Built on top of shadcn/ui ecosystem
- Cross-platform support: macOS, Linux, Windows, WSL
- Lightweight and blazing fast

## ⚠️ Prerequisites

Pumki works with projects that use **shadcn/ui + Tailwind CSS**.

You must initialize shadcn once in your project:

```sh
npx shadcn@latest init
```

This sets up:
- `components.json`
- Tailwind integration
- required project structure

💡 You can verify your setup anytime using:

```bash
npx pumki doctor
```

## 📦 Installation

### Option 1: Use without installation (recommended ✅)

No installation needed — run directly with your package manager:

#### npm

> `npx pumki add <component-name>`
```sh
npx pumki add stats-carousel
```

#### pnpm
```sh
pnpm dlx pumki add stats-carousel
```

#### yarn
```sh
yarn dlx pumki add stats-carousel
```
#### Bun

```sh
# macOS/Linux
bunx pumki add stats-carousel
# or (works everywhere)
bun x pumki add stats-carousel

# Windows (PowerShell/CMD) — use this:
bun x pumki add stats-carousel
```

Note: bunx is a symlink available on macOS/Linux. On Windows, use bun x.

### Option 2: Global install (for convenience)

If you want to avoid typing `npx` every time:

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

Then you can run:

```sh
pumki add stats-carousel
```

---

## ⚡ Quickstart

Add any component from Pumki-UI into your project in one line:

```sh
npx pumki add stats-carousel
```

That’s it.
Pumki **fetches the component JSON from pumki-ui and scaffolds it into your project**.

---

## 🛠 Usage

```sh
# Add a component by name
npx pumki add <component-name>

# Example
npx pumki add stats-carousel
```

💡 Tips:

* Component names map to entries in [pumki-ui](https://github.com/AnshSinghSonkhia/pumki-ui/tree/main/public/r).
* Want shorter commands? → Install globally and just run `pumki add …`.

---


## Doctor Command

check if your project is properly configured:

```bash
npx pumki doctor
```

Example output:

```bash
✔ Project detected
✔ React found
✔ Tailwind configured
✖ shadcn/ui is not initialized
⚠ Missing dependencies: clsx, tailwind-merge

Fix suggestions:
- Run: npx shadcn@latest init
- Install: npm install clsx tailwind-merge
```


## 📥 Example

Command:

```sh
npx pumki add stats-carousel
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

- **shadcn not initialized**
    - `❌ shadcn/ui is not initialized`
    - Fix: ```npx shadcn@latest init```

- **npm error ENOTEMPTY / npx issues**
    - Fix: ```npm cache clean --force```
    - Or delete: `C:\Users\<your-user>\AppData\Local\npm-cache\_npx`

### Command not found

- Global install → use pumki add <component>
- Otherwise → use npx pumki add <component>

### Wrong package manager

Ensure lockfile exists:

- package-lock.json
- pnpm-lock.yaml
- yarn.lock
- bun.lockb

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

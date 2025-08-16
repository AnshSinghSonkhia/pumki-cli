#!/usr/bin/env node

import shell from "shelljs";
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

// Detect package manager by lockfiles or package.json "packageManager"
function detectPackageManager() {
  const cwd = process.cwd();

  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"));
    if (pkg.packageManager) {
      if (pkg.packageManager.startsWith("pnpm")) return "pnpm";
      if (pkg.packageManager.startsWith("yarn")) return "yarn";
      if (pkg.packageManager.startsWith("bun")) return "bun";
      if (pkg.packageManager.startsWith("npm")) return "npm";
    }
  } catch {}

  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";

  console.warn("⚠️ Couldn’t detect package manager, defaulting to npm");
  return "npm"; // fallback
}

function getRunner(pm) {
  switch (pm) {
    case "pnpm":
      return "pnpm dlx";
    case "yarn":
      return "yarn dlx";
    case "bun":
      return "bunx";
    default:
      return "npx";
  }
}

if (args[0] === "add") {
  const component = args[1];
  if (!component) {
    console.error("❌ Please provide a component name, e.g. pumki add button-copy");
    process.exit(1);
  }

  const url = `https://raw.githubusercontent.com/AnshSinghSonkhia/pumki-ui/main/public/r/${component}.json`;

  const pm = detectPackageManager();
  const runner = getRunner(pm);

  console.log(`✨ Detected package manager: ${pm}`);
  console.log(`✨ Adding ${component} from Pumki-UI...`);

  const result = shell.exec(`${runner} shadcn@latest add "${url}"`, { silent: false });

  if (result.code !== 0) {
    console.error("❌ Failed to add component");
    process.exit(1);
  }
} else {
  console.log("Usage: pumki add <component>");
}

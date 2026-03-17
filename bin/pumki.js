#!/usr/bin/env node

import shell from "shelljs";
import fs from "fs";
import path from "path";
import chalk from "chalk";

const args = process.argv.slice(2);

// ------------------------
// Helpers
// ------------------------

function readPackageJson(cwd) {
  const pkgPath = path.join(cwd, "package.json");
  try {
    if (fs.existsSync(pkgPath)) {
      return JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    }
  } catch {}
  return null;
}

function checkProject(cwd) {
  return fs.existsSync(path.join(cwd, "package.json"));
}

function getDeps(pkg) {
  return {
    ...(pkg?.dependencies || {}),
    ...(pkg?.devDependencies || {}),
  };
}

function checkReactNext(pkg) {
  const deps = getDeps(pkg);
  return {
    react: !!deps["react"],
    next: !!deps["next"],
  };
}

function checkTailwindConfig(cwd) {
  return (
    fs.existsSync(path.join(cwd, "tailwind.config.js")) ||
    fs.existsSync(path.join(cwd, "tailwind.config.ts"))
  );
}

function checkTailwindCss(pkg) {
  const deps = getDeps(pkg);
  return !!deps["tailwindcss"];
}

function checkShadcnInitialized(cwd) {
  return fs.existsSync(path.join(cwd, "components.json"));
}

function checkUtilities(pkg) {
  const deps = getDeps(pkg);
  const required = ["clsx", "tailwind-merge", "class-variance-authority"];
  return required.filter((dep) => !deps[dep]);
}

function checkComponentsDir(cwd) {
  return fs.existsSync(path.join(cwd, "components", "ui"));
}

// ------------------------
// Doctor Output
// ------------------------

function printDoctorReport(result) {
  console.log(chalk.bold("\nPumki Doctor Report\n"));

  if (result.projectDetected) {
    console.log(chalk.green("✔ Project detected"));
  } else {
    console.log(chalk.red("✖ No Node.js project detected"));
    return;
  }

  if (result.reactFound) {
    console.log(chalk.green("✔ React found"));
  } else {
    console.log(chalk.yellow("⚠ React not found"));
  }

  if (result.nextFound) {
    console.log(chalk.green("✔ Next.js found"));
  } else {
    console.log(chalk.yellow("⚠ Next.js not found"));
  }

  if (result.tailwindConfig && result.tailwindCss) {
    console.log(chalk.green("✔ Tailwind configured"));
  } else {
    if (!result.tailwindConfig) {
      console.log(chalk.yellow("⚠ tailwind.config.js/ts not found"));
    }
    if (!result.tailwindCss) {
      console.log(chalk.yellow("⚠ tailwindcss dependency not found"));
    }
  }

  if (result.shadcnInitialized) {
    console.log(chalk.green("✔ shadcn/ui initialized"));
  } else {
    console.log(chalk.red("✖ shadcn/ui is not initialized"));
  }

  if (result.missingUtilities.length === 0) {
    console.log(chalk.green("✔ Required utilities found"));
  } else {
    console.log(
      chalk.yellow(
        `⚠ Missing dependencies: ${result.missingUtilities.join(", ")}`
      )
    );
  }

  if (result.componentsDir) {
    console.log(chalk.green("✔ components/ui directory found"));
  } else {
    console.log(chalk.yellow("⚠ components/ui directory not found"));
  }

  const suggestions = [];

  if (!result.shadcnInitialized) {
    suggestions.push("Run: npx shadcn@latest init");
  }

  if (result.missingUtilities.length > 0) {
    suggestions.push(
      `Install: npm install ${result.missingUtilities.join(" ")}`
    );
  }

  if (suggestions.length > 0) {
    console.log(chalk.bold("\nFix suggestions:"));
    suggestions.forEach((s) => console.log(chalk.cyan("- " + s)));
  }

  if (
    result.projectDetected &&
    result.reactFound &&
    result.tailwindConfig &&
    result.tailwindCss &&
    result.shadcnInitialized &&
    result.missingUtilities.length === 0
  ) {
    console.log(chalk.green.bold("\nProject is ready for Pumki ✅\n"));
  } else {
    console.log(chalk.red.bold("\nSetup incomplete ❌\n"));
  }
}

// ------------------------
// Package Manager
// ------------------------

function detectPackageManager() {
  const cwd = process.cwd();

  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(cwd, "package.json"), "utf8")
    );
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
  return "npm";
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

// ------------------------
// Commands
// ------------------------

if (args[0] === "add") {
  const component = args[1];

  if (!component) {
    console.error(
      "❌ Please provide a component name, e.g. pumki add button-copy"
    );
    process.exit(1);
  }

  const cwd = process.cwd();

  // Pre-check (important)
  if (!checkShadcnInitialized(cwd)) {
    console.error("❌ shadcn/ui is not initialized");
    console.log("Run: npx shadcn@latest init");
    process.exit(1);
  }

  const url = `https://raw.githubusercontent.com/AnshSinghSonkhia/pumki-ui/main/public/r/${component}.json`;

  const pm = detectPackageManager();
  const runner = getRunner(pm);

  console.log(`✨ Detected package manager: ${pm}`);
  console.log(`✨ Adding ${component} from Pumki-UI...`);

  const result = shell.exec(
    `${runner} shadcn@latest add "${url}"`,
    { silent: false }
  );

  if (result.code !== 0) {
    console.error("❌ Failed to add component");
    process.exit(1);
  }
} else if (args[0] === "doctor") {
  const cwd = process.cwd();
  const projectDetected = checkProject(cwd);

  let pkg = null;
  let reactFound = false;
  let nextFound = false;
  let tailwindConfig = false;
  let tailwindCss = false;
  let shadcnInitialized = false;
  let missingUtilities = [];
  let componentsDir = false;

  if (projectDetected) {
    pkg = readPackageJson(cwd);
    const reactNext = checkReactNext(pkg);

    reactFound = reactNext.react;
    nextFound = reactNext.next;
    tailwindConfig = checkTailwindConfig(cwd);
    tailwindCss = checkTailwindCss(pkg);
    shadcnInitialized = checkShadcnInitialized(cwd);
    missingUtilities = checkUtilities(pkg);
    componentsDir = checkComponentsDir(cwd);
  }

  const result = {
    projectDetected,
    reactFound,
    nextFound,
    tailwindConfig,
    tailwindCss,
    shadcnInitialized,
    missingUtilities,
    componentsDir,
  };

  printDoctorReport(result);
  process.exit(0);
} else {
  console.log("Usage: pumki add <component> | pumki doctor");
}
# Tailwind CSS Audit

_strib-svelte-vite-template — March 2026_

---

## 1. Current Setup Summary

| Item | Value |
|---|---|
| Tailwind CSS | v3.4.4 (latest v3.x; v4 released Feb 2025) |
| PostCSS | v8.4.39 |
| Autoprefixer | v10.4.19 |
| postcss-prefix-selector | v2.1.0 |
| postcss-import | transitive dep (see Issue 2) |

**Config files:**

```
tailwind.config.js          — theme, content, future flags
postcss.config.js           — PostCSS plugin chain
vite.config.js              — Vite build config (no Tailwind-specific config)
src/main.js                 — CSS entry point (3 imports)
src/styles/tailwind/
  tailwind.css              — @tailwind directives + base utilities
  typography.css            — @font-face rules + @imports for sub-files
  utility.css               — Roboto typography classes (@layer components)
  editorial.css             — Editorial/branding classes (@layer components)
  customFonts.css           — Graphik typography classes (@layer components)
src/styles/tailwind-constants/
  index.ts                  — barrel export
  colors.ts, font-family.ts, font-size.ts, font-weight.ts
  font-size.ts, letter-spacing.ts, line-height.ts
  keyframes.ts, border.ts
```

**PostCSS plugin order in `postcss.config.js`:**

```
postcss-prefix-selector → postcss-import → tailwindcss → autoprefixer
```

---

## 2. Issues in the Current v3 Configuration

### Issue 1 — `tailwind.config.js` uses named exports instead of a default export

**Current:**
```js
export const content = ["./src/**/*.svelte"];
export const theme = { ... };
export const future = { ... };
```

**Expected by Tailwind:**
```js
export default { content, theme, future };
```

Tailwind's config loader expects a default export. Named exports happen to work today because Vite's ESM loader synthesizes a default from named exports in some cases, but this is not guaranteed behavior. IDE tooling (e.g., Tailwind IntelliSense) may not pick up named exports correctly.

**Fix:** Consolidate into a single default export.

---

### Issue 2 — `postcss-import` is an undeclared dependency

`postcss.config.js` lists `postcss-import` as a PostCSS plugin, but it does not appear in `package.json` (neither `dependencies` nor `devDependencies`). It resolves at runtime as a transitive dependency of `tailwindcss` itself.

This is fragile. A patch or major update to `tailwindcss` could drop or rename it, breaking the build silently.

**Fix:** Add `postcss-import` explicitly to `devDependencies`.

```bash
npm install --save-dev postcss-import
```

---

### Issue 3 — `content` array misses `index.html` and JS files

**Current:**
```js
export const content = ["./src/**/*.svelte"];
```

If any Tailwind utility classes are written in `index.html` or `.js` files, Tailwind won't see them and will purge those classes from the production build.

**Fix:**
```js
content: ["./index.html", "./src/**/*.{svelte,js}"],
```

---

### Issue 4 — `utility.css` is imported twice

`src/main.js` imports `utility.css` directly on line 1. `typography.css` (imported on line 2 of `main.js`) also `@import`s `utility.css` on its own line 1.

PostCSS's `postcss-import` deduplicates `@import` statements, but only within a single CSS file's import graph. Because `main.js` imports `utility.css` as a separate JS-side import (not via `@import`), Vite treats it as a separate CSS module. The deduplication behavior is Vite-version-dependent and should not be relied on.

**Fix:** Remove the direct `import "./styles/tailwind/utility.css"` from `main.js`. Let `typography.css` remain the sole importer via `@import`.

---

### Issue 5 — CSS load order obscures intent

`main.js` imports CSS in this order:

```js
import "./styles/tailwind/utility.css";     // @layer components rules
import "./styles/tailwind/typography.css";  // @font-face + more @layer components
import "./styles/tailwind/tailwind.css";    // @tailwind directives (last)
```

The `@tailwind base/components/utilities` directives — which declare the Tailwind layers — are in `tailwind.css`, loaded last. Files loaded before it use `@layer components`, which depends on the layer existing.

This works today because PostCSS processes the entire bundle before emitting output, so layer declaration order doesn't matter at the PostCSS stage. But it's counterintuitive: anyone reading `main.js` would expect the directives to come first.

**Fix:** Move the `tailwind.css` import to the top of `main.js`, then `typography.css`. Drop the redundant `utility.css` import (see Issue 4).

```js
import "./styles/tailwind/tailwind.css";    // @tailwind directives first
import "./styles/tailwind/typography.css";  // fonts + component classes
```

---

### Issue 6 — Stale commented-out import in `tailwind.css`

`tailwind.css` line 4:
```css
/* @import "../scss/local-webfonts.scss"; */
```

This references a nonexistent `scss/` directory. It is dead code and can be deleted.

---

### Issue 7 — Unused variable in `tailwind.config.js`

`tailwind.config.js` line 1:
```js
const fallbackFont = "sans-serif";
```

This variable is declared but never referenced anywhere in the file. Delete it.

---

### Issue 8 — `.ts` files in an otherwise JavaScript project

`src/styles/tailwind-constants/` contains 9 TypeScript files (`.ts`). The rest of the project is JavaScript with `jsconfig.json` + `checkJs: true` for type safety.

The constants work because Vite and `svelte-check` both handle TypeScript. But the inconsistency adds cognitive overhead and means `tailwind.config.js` (a `.js` file) silently imports `.ts` modules.

This is low priority and has no correctness risk — note it and decide if/when to align.

---

## 3. Tailwind v4 Overview

Tailwind CSS v4 (released February 2025) is a major architectural change:

- **Config moves to CSS.** `tailwind.config.js` is replaced by `@theme {}` directives inside your CSS. The JS config file becomes optional for simple projects.
- **`@tailwindcss/vite` plugin.** For Vite projects, a dedicated first-party plugin replaces the PostCSS pipeline entirely.
- **Lightning CSS built in.** Autoprefixer and postcss-import are no longer needed — v4 handles vendor prefixes and `@import` resolution internally.
- **`future.hoverOnlyWhenSupported` is now the default.** The flag in the current config becomes a no-op and can be dropped.
- **Browser floor rises.** Safari 16.4+, Chrome 111+, Firefox 128+.

---

## 4. Migration to v4 — Considerations and Tradeoffs

### The `postcss-prefix-selector` blocker

`postcss-prefix-selector` prefixes every CSS selector with `#proj-container`. This is the mechanism that isolates the embed's CSS from the Arc CMS shell — it prevents style bleed in both directions. It is load-bearing.

In v4, if you use `@tailwindcss/vite` (the recommended path), there is **no PostCSS pipeline** by default. `postcss-prefix-selector` cannot run. Two paths forward:

**Option A — Use `@tailwindcss/postcss` instead of the Vite plugin (lower risk)**

`@tailwindcss/postcss` is the v4 package that runs Tailwind as a PostCSS plugin, preserving the PostCSS chain. This keeps `postcss-prefix-selector` working. The tradeoff is that you don't get Lightning CSS's performance gains.

```js
// postcss.config.js (v4, Option A)
export default {
  plugins: {
    'postcss-prefix-selector': { prefix: '#proj-container' },
    'postcss-import': {},              // still needed with this path
    '@tailwindcss/postcss': {},        // replaces tailwindcss
    autoprefixer: {},                  // still needed with this path
  }
}
```

**Option B — Replace CSS scoping with a Vite-native approach (higher risk, more work)**

Move CSS isolation out of PostCSS and into a Vite plugin or the Svelte component model (e.g., scoped styles in `App.svelte`, or a CSS `@layer` wrapping strategy). This unblocks the full v4/Lightning CSS path but requires verifying that all global CSS is correctly scoped and that Arc CMS embedding still works as expected.

### Recommendation on v4 timing

The current setup is stable on v3. The main motivations to upgrade would be build performance (Lightning CSS) and future-proofing. Given the `postcss-prefix-selector` constraint, **Option A is the lower-risk upgrade path** when the time comes. Option B is worth exploring only if you want to eliminate the PostCSS layer entirely.

---

## 5. Recommended Action Order

Priority order — highest leverage, lowest risk first.

| # | Action | Risk | Effort |
|---|---|---|---|
| 1 | Add `postcss-import` to `devDependencies` in `package.json` | None | 1 min |
| 2 | Delete unused `fallbackFont` variable from `tailwind.config.js` | None | 1 min |
| 3 | Delete commented-out SCSS `@import` in `tailwind.css` | None | 1 min |
| 4 | Switch `tailwind.config.js` to a default export | Very low | 5 min |
| 5 | Expand `content` array to include `index.html` and `*.js` | Very low | 2 min |
| 6 | Remove duplicate `utility.css` import from `main.js`; reorder CSS imports | Low | 5 min |
| 7 | ~~Align `tailwind-constants/` files to `.js`~~ | ~~Low~~ | Done |
| 8 | Evaluate v4 upgrade (Option A path) when ready | Medium | Half day |

# Emotion Design System

Technical documentation for the `emotion-design-system` component library (React + TypeScript + Vite).

This repository contains a small component library and example application built with Vite. The focus is on reusable UI primitives (atoms), small composed components (molecules), and higher-level organisms.

---

## Quick start

Requirements

- Node.js 18+ (LTS)
- npm (or yarn/pnpm)

Install dependencies

```bash
npm install
```

Run dev server

```bash
npm run dev
```

Build (production)

```bash
npm run build
```

Preview production build locally

```bash
npm run preview
```

Deploy to GitHub Pages

```bash
Install (if not already):

```bash
npm install --save-dev gh-pages
```

Publish (one of the following):

Build then publish with gh-pages directly:

```bash
npm run build
npx gh-pages -d dist
```

or use the bundled npm script:

```bash
npm run deploy
```

Notes:
- `predeploy` runs the build; `deploy` publishes `dist/` using `gh-pages`.
- `vite.config.ts` sets `base` for production to the repo path so assets load correctly on GitHub Pages.

---

## Project layout

- `src/`
  - `components/`
    - `atoms/` — primitive building blocks (Checkbox, DownloadButton, Navbar, SearchBar, Slider)
    - `molecules/` — small composed components (DashboardCard, SortableTable)
    - `organisms/` — larger composed components (charts, modal)
  - `styles/`
    - `tokens.css` — global CSS variables and design tokens
  - `App.tsx`, `main.tsx` — example app integration

- `vite.config.ts` — Vite config (`base` set for gh-pages)
- `package.json` — scripts (dev, build, preview, lint, predeploy, deploy)
- `tsconfig.*.json` — TypeScript configurations

---

## Design tokens

Tokens are exposed as CSS variables in `src/styles/tokens.css` and are intended to be the single source of truth for colors, spacing, typography, and elevation.

Example variables:

```css
:root {
  --color-bg: #ffffff;
  --color-foreground: #0f172a;
  --color-primary: #2563eb;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --radius-default: 6px;
}
```

Usage:
- Import `src/styles/tokens.css` in your app root or component story entry.
- Override variables at the document or component scope for theming.

---

## Component API (examples)

This section documents the public props for the main atoms. All components are implemented as typed React components (TypeScript).

Checkbox (src/components/atoms/checkbox/Checkbox.tsx)

Props (TypeScript):

```ts
interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}
```

Notes:
- Controlled via `checked` + `onChange` or use `defaultChecked` for uncontrolled use.
- `onChange` receives the new checked value.
- Styling is driven by `checkbox.css`; CSS variables are used for colors and sizes where appropriate.

DownloadButton (src/components/atoms/download-button/DownloadButton.tsx)

Props (TypeScript):

```ts
interface DownloadButtonProps {
  href: string; // required download URL
  filename?: string; // suggested filename
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
```

Notes:
- Renders a link with `download` where supported; falls back to a normal navigation when not.
- Include `rel="noopener noreferrer"` for external URLs where appropriate.

Navbar, SearchBar, Slider
- Each atom is documented inline in source with JSDoc/TS types. Open the corresponding file to see full prop lists and accessibility notes.

---

## Molecules & Organisms

- Molecules compose atoms and forward meaningful props. For example, `DashboardCard` composes layout, heading, and actions and accepts `title`, `subtitle`, and `actions` props.
- Organisms (charts, modal) encapsulate more complex behavior and may depend on third-party libs (e.g., charting libs). Check `src/components/organisms/` for implementation details and examples.

---

## Theming & Customization

- The design system uses CSS variables for theming. To create a theme, override the variables at a high level:

```css
:root[data-theme='dark'] {
  --color-bg: #0b1220;
  --color-foreground: #e6eef8;
  --color-primary: #60a5fa;
}
```

- Components accept `className` props to allow style extension. Prefer composition over deep DOM overrides.

---

## Accessibility

- All interactive components follow basic accessibility practices:
  - Use semantic elements (`button`, `a`, `input`) where appropriate.
  - Provide `aria-*` attributes for non-semantic controls.
  - Focus styles are visible and keyboard navigation is supported.

- For each component, check the source for specific ARIA roles and keyboard handling. If you need an accessibility audit, I can add axe/core tests.

---

## Publishing as an npm package (optional)

If you want to publish the design system as a package:

- Add a build step that bundles component source as ESM (and optionally CJS) and outputs type declarations (`d.ts`). Tools: `tsup`, `rollup`, or `microbundle`.
- Define `exports` and `types` fields in `package.json` and set an appropriate `main`/`module` entry.
- Keep `src/` as the source; create a `lib/` or `dist/` entry for the published files.

---

## Examples

Import a component in the app:

```tsx
import React from 'react'
import Checkbox from 'src/components/atoms/checkbox/Checkbox'
import 'src/styles/tokens.css'

export default function Example() {
  const [checked, setChecked] = React.useState(false)
  return <Checkbox label="Accept terms" checked={checked} onChange={setChecked} />
}
```

---

## Troubleshooting

- Assets 404 on GitHub Pages: ensure `vite.config.ts` `base` matches the repository path (e.g. `/emotion-design-system/`).
- Deployment issues: run `npx gh-pages -d dist` to inspect errors.
- Type errors: run `npm run build` locally to see TypeScript diagnostics.

---

## Contributing

- Follow the existing TypeScript and lint rules.
- Add tests for logic-heavy components.
- Update this README with component-specific examples as the API evolves.

---

If you'd like, I can add a Storybook setup or GitHub Actions workflow to automate builds and publishing. Feedback or component-specific docs to include? (I can extract prop tables automatically.)

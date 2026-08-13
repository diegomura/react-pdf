# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React-PDF is a library for creating PDF documents using React components. It's a monorepo using Lerna with independent versioning, Yarn 1.22.19 as the package manager, and all packages are ESM (`"type": "module"`).

## Common Commands

```bash
yarn install              # Install dependencies and bootstrap monorepo
yarn build                # Build all packages (lerna run build)
yarn watch                # Watch mode - rebuilds on changes (for development)
yarn test                 # Run all tests (vitest)
yarn test packages/layout # Run tests for a specific package
yarn lint                 # Lint all packages (eslint packages)
yarn typecheck            # TypeScript type checking across all packages
yarn dev                  # Run example apps
```

To run a single test file: `yarn vitest run path/to/test.ts`

## Architecture

The library works as a pipeline: React components → reconciler → layout → render → PDF output.

### Package Dependency Flow

```
@react-pdf/renderer (main entry point - exports Document, Page, View, Text, etc.)
  ├── @react-pdf/reconciler    → React fiber reconciler that creates the internal element tree
  ├── @react-pdf/layout        → Resolves layout using Yoga (flexbox), handles pagination
  │     ├── @react-pdf/textkit     → Text measurement, line breaking, hyphenation
  │     ├── @react-pdf/stylesheet  → CSS-like style parsing and resolution
  │     ├── @react-pdf/image       → PNG/JPEG image fetching and parsing
  │     └── @react-pdf/font        → Font loading, registration, emoji support
  ├── @react-pdf/render        → Renders resolved layout tree to PDF drawing operations
  │     └── @react-pdf/pdfkit      → Low-level PDF generation (fork of pdfkit)
  └── @react-pdf/primitives    → Shared component type constants
```

Utility packages: `@react-pdf/fns` (helpers), `@react-pdf/types` (TypeScript types), `@react-pdf/math` (math utils), `@react-pdf/svgkit` (SVG support).

### Build

Each package uses Rollup for bundling. The renderer package produces multiple builds: server, browser, and minified variants. TypeScript is used throughout with strict mode.

### Testing

- **Framework**: Vitest with workspace configuration (`vitest.workspace.js`)
- **Tested packages**: fns, font, image, render, layout, svgkit, textkit, renderer, stylesheet, primitives
- **Renderer** has two test configs: main (fork pool) and browser (jsdom environment)
- **Snapshot testing**: `jest-image-snapshot` for visual regression tests
- **Multi-React support**: Tests can run against React 16, 17, 18, and 19 via environment variables

### Writing Tests

When making changes, always include tests. Add tests in the same location where tests already exist for the package being modified (e.g. `packages/layout/tests/`, `packages/renderer/tests/`).

### Code Style

- ESLint 9 with TypeScript parser, Prettier (single quotes), enforced via Husky pre-commit hooks
- Packages `pdfkit`, `yoga`, and `examples` are excluded from linting

## Previewing PDFs

To visually inspect generated PDFs during debugging, convert pages to images:

**Using pdftoppm (preferred, often pre-installed via poppler-utils):**

```bash
pdftoppm -png -r 200 document.pdf preview
```

This generates `preview-1.png`, `preview-2.png`, etc. at 200 DPI.

**Fallback: PyMuPDF (if pdftoppm is unavailable):**

```bash
pip install pymupdf
```

```python
import fitz

doc = fitz.open("document.pdf")
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=200)
    pix.save(f"page-{i+1}.png")
```

## Versioning & Release

Uses [Changesets](https://github.com/changesets/changesets) for versioning:

```bash
yarn changeset          # Create a changeset
yarn version-packages   # Apply changesets to bump versions
yarn release            # Publish to npm
```

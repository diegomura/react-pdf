/**
 * Generate PDF files for all examples.
 *
 * Usage:
 *   node generate-pdfs.mjs
 *
 * Requires the renderer and other packages to be built first.
 */
import { build } from 'esbuild';
import { mkdirSync, unlinkSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const EXAMPLES_DIR = join(__dirname, 'src', 'examples');
const OUTPUT_DIR = join(__dirname, 'output');
// Examples to skip (too heavy or not suitable for static generation)
const SKIP = ['image-stress-test'];

// Get example list from index.ts
const exampleNames = [
  'duplicated-images',
  'ellipsis',
  'emoji',
  'font-family-fallback',
  'font-weight',
  'go-to',
  'image-background',
  'jpg-orientation',
  'knobs',
  'link',
  'math',
  'media-queries',
  'min-presence-ahead',
  'multiline-text',
  'object-fit',
  'page-wrap',
  'forms',
  'responsive-images',
  'resume',
  'soft-hyphens',
  'svg',
  'svg-transform',
  'transform-origin',
];

// Plugin to resolve asset imports (.ttf, .jpg, .jpeg, .png) to absolute file paths
const assetPlugin = {
  name: 'asset-resolver',
  setup(build) {
    build.onResolve(
      { filter: /\.(ttf|jpg|jpeg|png|woff|woff2)$/ },
      (args) => {
        // Resolve relative to importer first, then fall back to public dir
        const fromImporter = resolve(dirname(args.importer), args.path);
        return { path: fromImporter, namespace: 'asset' };
      },
    );

    build.onLoad({ filter: /.*/, namespace: 'asset' }, (args) => {
      return {
        contents: `export default ${JSON.stringify(args.path)};`,
        loader: 'js',
      };
    });
  },
};

mkdirSync(OUTPUT_DIR, { recursive: true });

async function generatePdf(name) {
  const entryPoint = join(EXAMPLES_DIR, name, 'index.tsx');
  const bundlePath = join(OUTPUT_DIR, `_bundle_${name}.cjs`);
  const pdfPath = join(OUTPUT_DIR, `${name}.pdf`);

  try {
    // Bundle the example
    await build({
      entryPoints: [entryPoint],
      bundle: true,
      platform: 'node',
      format: 'cjs',
      outfile: bundlePath,
      external: [
        '@react-pdf/renderer',
        '@react-pdf/math',
        'react',
        'react-dom',
      ],
      plugins: [assetPlugin],
      jsx: 'automatic',
      jsxImportSource: 'react',
      logLevel: 'silent',
    });

    // Load the bundle
    const mod = require(bundlePath);
    const example = mod.default || mod;
    const DocumentComponent = example.Document;

    if (!DocumentComponent) {
      console.log(`  ⚠ ${name}: no Document component found, skipping`);
      return false;
    }

    // Render to PDF
    const React = require('react');
    const { renderToFile } = require('@react-pdf/renderer');
    const element = React.createElement(DocumentComponent);

    await renderToFile(element, pdfPath);
    console.log(`  ✓ ${name}`);
    return true;
  } catch (err) {
    console.log(`  ✗ ${name}: ${err.message}`);
    return false;
  } finally {
    try {
      unlinkSync(bundlePath);
    } catch {}
  }
}

console.log('Generating PDFs...\n');

let success = 0;
let failed = 0;

for (const name of exampleNames) {
  if (SKIP.includes(name)) {
    console.log(`  – ${name}: skipped`);
    continue;
  }
  const ok = await generatePdf(name);
  if (ok) success++;
  else failed++;
}

console.log(`\nDone: ${success} generated, ${failed} failed`);
console.log(`Output: ${OUTPUT_DIR}/`);

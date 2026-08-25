import fs from 'node:fs';
import path from 'node:path';
import type React from 'react';
import { expect, test } from 'vitest';
import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';

import { examples } from '../src/repl/examples';
import { transpile } from '../src/repl/transpile';
import { evaluateDocument } from '../src/repl/evaluate';

const DOCS = path.join(import.meta.dirname, '../content/docs');
const PUBLIC = path.join(import.meta.dirname, '../public');

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith('.mdx') ? [p] : [];
  });

// The worker resolves these against the site origin at runtime; Node has no
// origin, so point them at the public/ directory on disk for a node-side
// check. Anchored to a quote so it doesn't also rewrite a `/fonts/` or
// `/images/` segment inside an unrelated remote URL.
const toFsPaths = (source: string) =>
  source.replace(
    /(["'`])\/(images|fonts)\//g,
    (_, quote, dir) => `${quote}${PUBLIC}/${dir}/`,
  );

// mathjax is lazy-loaded in the worker, so the sweep resolves it with a stub.
const stubModules = { '@react-pdf/math': { Math: () => null } };

test('registry holds every legacy example', () => {
  expect(Object.keys(examples)).toHaveLength(42);
});

test('every example is a non-empty source string', () => {
  for (const [name, source] of Object.entries(examples)) {
    expect(name, `${name} is empty`).toBeTruthy();
    expect(typeof source).toBe('string');
    expect(source.trim().length, `${name} is empty`).toBeGreaterThan(0);
  }
});

test('every named GoToExample in the docs resolves to an example', () => {
  const missing = new Set<string>();

  for (const file of walk(DOCS)) {
    const body = fs.readFileSync(file, 'utf8');
    for (const [, name] of body.matchAll(/<GoToExample\s+name="([^"]+)"/g)) {
      if (!(name in examples))
        missing.add(`${path.relative(DOCS, file)}: ${name}`);
    }
  }

  expect([...missing]).toEqual([]);
});

test('every /images and /fonts path referenced by an example exists in public/', () => {
  const missing: string[] = [];

  for (const [name, source] of Object.entries(examples)) {
    for (const [, assetPath] of source.matchAll(
      /["'`](\/(?:images|fonts)\/[^"'`]+)["'`]/g,
    )) {
      if (!fs.existsSync(path.join(PUBLIC, assetPath)))
        missing.push(`${name}: ${assetPath}`);
    }
  }

  expect(missing).toEqual([]);
});

// These 6 examples 404'd or hard-errored on a cold /repl visit before the
// public/ assets and PATCHES renames landed. Render for real (not just
// evaluate) so a broken asset path or stale component name shows up here
// instead of in the browser.
test('previously-broken examples render to a real PDF', async () => {
  const names = [
    'page-wrap',
    'page-breaks',
    'breakable-unbreakable',
    'images',
    'font-register',
    'font-feature-settings',
    'checkbox',
    'formfield',
    'picker-formlist',
  ];
  const failures: string[] = [];

  for (const name of names) {
    try {
      const element = evaluateDocument(
        transpile(toFsPaths(examples[name])),
      ) as React.ReactElement<DocumentProps>;
      const buffer = await renderToBuffer(element);
      if (buffer.length < 500) failures.push(`${name}: suspiciously small`);
    } catch (error) {
      failures.push(`${name}: ${(error as Error).message}`);
    }
  }

  expect(failures).toEqual([]);
});

// `resume` is fixed as far as example content goes (Lato is registered, the
// dead remote photo is swapped for a local one via PATCHES), but it still
// crashes: @react-pdf/layout loses a Text node's wrapper when pagination
// strands it alone as a trailing page's only content, producing a bare
// TEXT_INSTANCE with no `.box`. Reproducible independent of font/image
// content — see the PR description for the minimal repro. This is a
// genuine upstream bug, not an example-content problem, so it's tracked
// here instead of silently passing.
test('resume still fails on a genuine @react-pdf/layout pagination bug', async () => {
  const element = evaluateDocument(
    transpile(toFsPaths(examples['resume'])),
  ) as React.ReactElement<DocumentProps>;

  await expect(renderToBuffer(element)).rejects.toThrow(
    "Cannot read properties of undefined (reading 'height')",
  );
});

test('the math example renders with the real lazy-loaded package', async () => {
  const math = await import('@react-pdf/math');
  const element = evaluateDocument(transpile(examples['math']), {
    '@react-pdf/math': math,
  }) as React.ReactElement<DocumentProps>;

  const buffer = await renderToBuffer(element);
  // a stub Math component yields ~5KB; the real package renders ~22KB
  expect(buffer.length).toBeGreaterThan(10_000);
});

// Runs last: examples mutate Font's global registry (hyphenation-callback
// installs a logging callback that would then spam every later render).
test('every example transpiles and evaluates to an element', () => {
  const failures: string[] = [];

  for (const [name, source] of Object.entries(examples)) {
    try {
      const element = evaluateDocument(transpile(source), stubModules);
      if (!element) failures.push(`${name}: no element captured`);
    } catch (error) {
      failures.push(`${name}: ${(error as Error).message}`);
    }
  }

  expect(failures).toEqual([]);
});

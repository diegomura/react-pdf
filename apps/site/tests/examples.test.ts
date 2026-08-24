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

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith('.mdx') ? [p] : [];
  });

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

import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

import { COMPONENT_USAGE } from '../lib/component-usage';
import { transpile } from '../src/repl/transpile';

const DIR = path.join(import.meta.dirname, '../content/docs/v4/components');

const pages = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith('.mdx') && file !== 'index.mdx');

const referenced = (file: string) =>
  /<Usage\s+name="([^"]+)"\s*\/>/.exec(
    fs.readFileSync(path.join(DIR, file), 'utf8'),
  )?.[1];

test('every component page shows how the component is used', () => {
  expect(pages.length).toBeGreaterThan(0);

  for (const file of pages) {
    const name = referenced(file);
    expect(name, file).toBeTruthy();
    expect(COMPONENT_USAGE[name!], file).toBeTruthy();
  }
});

test('the usage snippets are valid JSX', () => {
  for (const [name, code] of Object.entries(COMPONENT_USAGE)) {
    expect(() => transpile(code), name).not.toThrow();
  }
});

// A snippet is an answer to "how do I use this", not a document to study.
test('the usage snippets stay short', () => {
  for (const [name, code] of Object.entries(COMPONENT_USAGE)) {
    expect(code.split('\n').length, name).toBeLessThanOrEqual(20);
  }
});

// MDX silently strips two spaces of indentation from a multi-line template
// literal in a JSX attribute, which is why these live in a .ts module. If a
// snippet ever moves back inline, this catches the flattening.
test('the snippets keep their nesting', () => {
  const nested = Object.entries(COMPONENT_USAGE).filter(([, code]) =>
    code.split('\n').some((line) => /^ {4}\S/.test(line)),
  );

  expect(nested.length).toBeGreaterThan(0);
});

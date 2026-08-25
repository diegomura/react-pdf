import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

import { transpile } from '../src/repl/transpile';

const DIR = path.join(import.meta.dirname, '../content/docs/v4/components');

const pages = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith('.mdx') && file !== 'index.mdx');

const snippet = (file: string) =>
  /<Usage\s+code={`([\s\S]*?)`}\s*\/>/.exec(
    fs.readFileSync(path.join(DIR, file), 'utf8'),
  )?.[1];

test('every component page shows how the component is used', () => {
  expect(pages.length).toBeGreaterThan(0);

  for (const file of pages) expect(snippet(file), file).toBeTruthy();
});

test('the usage snippets are valid JSX', () => {
  for (const file of pages) {
    expect(() => transpile(snippet(file)!), file).not.toThrow();
  }
});

// A snippet is an answer to "how do I use this", not a document to study.
test('the usage snippets stay short', () => {
  for (const file of pages) {
    expect(snippet(file)!.split('\n').length, file).toBeLessThanOrEqual(20);
  }
});

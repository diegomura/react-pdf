import type React from 'react';
import { expect, test } from 'vitest';
import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';

import { HERO_FILES } from '../app/(home)/hero-files';
import { transpile } from '../src/repl/transpile';
import { evaluateDocument } from '../src/repl/evaluate';

// Same reversal MiniRepl applies before handing the source to the worker.
const concatenated = () =>
  [...HERO_FILES]
    .reverse()
    .map((file) => file.code)
    .join('\n\n');

test('the hero files concatenate into a document that renders', async () => {
  const element = evaluateDocument(
    transpile(concatenated()),
  ) as React.ReactElement<DocumentProps>;

  const buffer = await renderToBuffer(element);

  expect(buffer.subarray(0, 5).toString()).toBe('%PDF-');
});

test('every hero file is valid on its own, so the editor linter is quiet', () => {
  for (const file of HERO_FILES) {
    expect(() => transpile(file.code), file.name).not.toThrow();
  }
});

// The entry tab is the first thing anyone reads: it has to fit the pane whole.
test('the entry file stays short enough to read at a glance', () => {
  const [entry] = HERO_FILES;
  const lines = entry.code.split('\n');

  expect(entry.name).toBe('Invoice.jsx');
  expect(lines.length).toBeLessThanOrEqual(20);
});

// The hero editor does not wrap, so long lines would scroll sideways.
test('no hero file line overflows the editor pane', () => {
  for (const file of HERO_FILES) {
    const longest = Math.max(...file.code.split('\n').map((l) => l.length));
    expect(longest, file.name).toBeLessThanOrEqual(64);
  }
});

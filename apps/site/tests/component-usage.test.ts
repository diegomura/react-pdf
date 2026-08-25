import fs from 'node:fs';
import path from 'node:path';
import type React from 'react';
import { expect, test } from 'vitest';
import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';

import { COMPONENT_USAGE, previewSource } from '../lib/component-usage';
import { evaluateDocument } from '../src/repl/evaluate';
import { transpile } from '../src/repl/transpile';

const DIR = path.join(import.meta.dirname, '../content/docs/v4/components');

const pages = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith('.mdx') && file !== 'index.mdx');

const referenced = (file: string) =>
  /<Usage\s+name="([^"]+)"\s*\/>/.exec(
    fs.readFileSync(path.join(DIR, file), 'utf8'),
  )?.[1];

const previewable = Object.entries(COMPONENT_USAGE).flatMap(([name, usage]) => {
  const source = previewSource(usage);
  return source ? [[name, source] as const] : [];
});

test('every component page shows how the component is used', () => {
  expect(pages.length).toBeGreaterThan(0);

  for (const file of pages) {
    const name = referenced(file);
    expect(name, file).toBeTruthy();
    expect(COMPONENT_USAGE[name!]?.code, file).toBeTruthy();
  }
});

test('the usage snippets are valid JSX', () => {
  for (const [name, usage] of Object.entries(COMPONENT_USAGE)) {
    expect(() => transpile(usage.code), name).not.toThrow();
  }
});

// A snippet is an answer to "how do I use this", not a document to study.
test('the usage snippets stay short', () => {
  for (const [name, usage] of Object.entries(COMPONENT_USAGE)) {
    expect(usage.code.split('\n').length, name).toBeLessThanOrEqual(20);
  }
});

// MDX silently strips two spaces of indentation from a multi-line template
// literal in a JSX attribute, which is why these live in a .ts module. If a
// snippet ever moves back inline, this catches the flattening.
test('the snippets keep their nesting', () => {
  const nested = previewable.filter(([, source]) =>
    source.split('\n').some((line) => /^ {4}\S/.test(line)),
  );

  expect(nested.length).toBeGreaterThan(0);
});

// PDFViewer, PDFDownloadLink and BlobProvider render React to the DOM, not to
// a page: a preview toggle on those pages could only ever fail.
test('the browser-only components offer no preview', () => {
  for (const name of ['pdf-viewer', 'pdf-download-link', 'blob-provider']) {
    expect(COMPONENT_USAGE[name].mount, name).toBeUndefined();
  }
});

// The page a Note renders on is blank, and the viewer draws the annotation
// icon as a broken image. See the comment on the entry.
test('Note offers no preview', () => {
  expect(COMPONENT_USAGE.note.mount).toBeUndefined();
});

test('every previewable snippet renders a real PDF', async () => {
  expect(previewable.length).toBeGreaterThan(0);

  for (const [name, source] of previewable) {
    const element = evaluateDocument(
      transpile(source),
    ) as React.ReactElement<DocumentProps>;

    const buffer = await renderToBuffer(element);

    expect(buffer.subarray(0, 5).toString(), name).toBe('%PDF-');
    expect(buffer.length, name).toBeGreaterThan(1000);
  }
}, 60_000);

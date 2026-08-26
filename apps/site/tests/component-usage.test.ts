import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import type React from 'react';
import { expect, test } from 'vitest';
import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';

import { COMPONENT_USAGE, previewSource } from '../lib/component-usage';
import { evaluateDocument } from '../src/repl/evaluate';
import { transpile } from '../src/repl/transpile';

const V4 = path.join(import.meta.dirname, '../content/docs/v4');

/**
 * Pages that document an element, so should show one. Index pages list their
 * section, and `svg/select-and-list-attributes` only names props the Select
 * and List pages already demonstrate one click away.
 */
const NO_ELEMENT = ['index.mdx', 'select-and-list-attributes.mdx'];

const source = (group: string, file: string) =>
  fs.readFileSync(path.join(V4, group, file), 'utf8');

const pagesIn = (group: string) =>
  fs
    .readdirSync(path.join(V4, group))
    .filter((file) => file.endsWith('.mdx') && !NO_ELEMENT.includes(file))
    .map((file) => [group, file] as const);

const pages = [...pagesIn('components'), ...pagesIn('svg'), ...pagesIn('form')];

const referenced = (group: string, file: string) =>
  /<Usage\s+name="([^"]+)"\s*\/>/.exec(source(group, file))?.[1];

const previewable = Object.entries(COMPONENT_USAGE).flatMap(([name, usage]) => {
  const src = previewSource(usage);
  return src ? [[name, src] as const] : [];
});

const render = async (src: string) =>
  renderToBuffer(
    evaluateDocument(transpile(src)) as React.ReactElement<DocumentProps>,
  );

const isText = (chunk: string) => /^[\t\n\r\x20-\x7e]*$/.test(chunk);

/**
 * The PDF's content streams, which is where the drawing lives. Font and image
 * streams inflate to binary and are dropped, so what is left is only the
 * operators a viewer would run.
 */
const contentOf = (pdf: Buffer) =>
  [...pdf.toString('latin1').matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g)]
    .map(([, body]) => {
      try {
        return zlib.inflateSync(Buffer.from(body, 'latin1')).toString('latin1');
      } catch {
        return body;
      }
    })
    .filter(isText)
    .join('\n');

/** Fill, stroke, text, shading and XObject operators: the page paints. */
const DRAWS = /(^|\s)(f|f\*|S|s|B|B\*|Tj|TJ|sh|Do)(\s|$)/;

test('every component page shows how the component is used', () => {
  expect(pages.length).toBeGreaterThan(0);

  for (const [group, file] of pages) {
    const name = referenced(group, file);
    expect(name, `${group}/${file}`).toBeTruthy();
    expect(COMPONENT_USAGE[name!]?.code, `${group}/${file}`).toBeTruthy();
  }
});

// The SVG and form pages used to carry a registry-driven example at the very
// bottom, below the props table. They now open with a Usage block like every
// other reference page.
test('no v4 reference page still trails a GoToExample', () => {
  for (const [group, file] of pages) {
    expect(source(group, file), `${group}/${file}`).not.toContain(
      '<GoToExample',
    );
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

// A preview that opens on an empty page is worse than no preview, so the check
// is that the viewer has something to paint, not that bytes came back.
test('every previewable snippet renders a page with something on it', async () => {
  expect(previewable.length).toBeGreaterThan(0);

  for (const [name, src] of previewable) {
    const buffer = await render(src);

    expect(buffer.subarray(0, 5).toString(), name).toBe('%PDF-');
    expect(contentOf(buffer), name).toMatch(DRAWS);
  }
}, 120_000);

// Without this the check above would pass on anything that is a PDF at all.
test('an empty page paints nothing', async () => {
  const blank = await render(
    'ReactPDF.render(<Document><Page size="A6" /></Document>);',
  );

  expect(contentOf(blank)).not.toMatch(DRAWS);
}, 30_000);

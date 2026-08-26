import type React from 'react';
import { expect, test } from 'vitest';
import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';

import { examples } from '../src/repl/examples';
import { transpile } from '../src/repl/transpile';
import { evaluateDocument } from '../src/repl/evaluate';

const pageCount = async (name: string) => {
  const element = evaluateDocument(
    transpile(examples[name]),
  ) as React.ReactElement<DocumentProps>;
  const pdf = await renderToBuffer(element);

  return pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;
};

// The four examples behind /docs/v4/advanced/page-wrapping only teach anything
// if they actually wrap. Each is sized so the subject lands across the page
// boundary; nudging a font size, a row count or the A6 page size can quietly
// collapse one onto a single page, where the preview shows a concept-free
// screenshot and nothing else fails.

test('breakable-unbreakable splits one block and moves the other', async () => {
  expect(await pageCount('breakable-unbreakable')).toBe(2);
});

test('disable-wrapping pushes the whole band to a second page', async () => {
  expect(await pageCount('disable-wrapping')).toBe(2);
});

test('page-breaks starts its second chapter on a new page', async () => {
  expect(await pageCount('page-breaks')).toBe(2);
});

test('fixed-components runs long enough to repeat its header', async () => {
  expect(await pageCount('fixed-components')).toBe(2);
});

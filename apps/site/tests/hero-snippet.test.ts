import type React from 'react';
import { expect, test } from 'vitest';
import { renderToBuffer } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';

import { SNIPPET } from '../app/(home)/hero-snippet';
import { transpile } from '../src/repl/transpile';
import { evaluateDocument } from '../src/repl/evaluate';

test('the hero snippet renders to a real PDF', async () => {
  const element = evaluateDocument(
    transpile(SNIPPET),
  ) as React.ReactElement<DocumentProps>;

  const buffer = await renderToBuffer(element);

  expect(buffer.subarray(0, 5).toString()).toBe('%PDF-');
});

// The hero editor pane is sized to show the whole snippet without scrolling.
test('the hero snippet stays within the hero editor pane', () => {
  const lines = SNIPPET.split('\n');

  expect(lines.length).toBeLessThanOrEqual(22);
  expect(Math.max(...lines.map((line) => line.length))).toBeLessThanOrEqual(56);
});

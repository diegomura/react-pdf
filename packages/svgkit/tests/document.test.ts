import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

describe('SVGDocument', () => {
  test('starts with no pages', () => {
    const doc = new SVGDocument();
    doc.end();
    expect(doc.pages).toEqual([]);
  });
});

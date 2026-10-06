import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

describe('SVGDocument', () => {
  test('starts with no pages', () => {
    const doc = new SVGDocument();
    doc.end();
    expect(doc.pages).toEqual([]);
  });

  test('addPage emits one svg per page with size', () => {
    const doc = new SVGDocument();
    doc.addPage({ size: [200, 100] });
    doc.addPage({ size: [300, 400] });
    doc.end();

    expect(doc.pages).toHaveLength(2);
    expect(doc.pages[0]).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100"><defs/></svg>',
    );
    expect(doc.pages[1]).toContain('viewBox="0 0 300 400"');
  });

  test('addPage defaults to letter size and exposes page info', () => {
    const doc = new SVGDocument();
    doc.addPage();
    expect(doc.page.width).toBe(612);
    expect(doc.page.height).toBe(792);
    expect(doc.page.annotations).toEqual([]);
  });

  test('is chainable', () => {
    const doc = new SVGDocument();
    expect(doc.addPage().save().translate(1, 2).restore().end()).toBe(doc);
  });
});

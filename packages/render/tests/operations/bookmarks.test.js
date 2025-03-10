import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';

import PDFDocument from '../../../pdfkit/lib/pdfkit';
import render from '../../src/index';

/**
 * Original issue for this test was that all bookmarks incorrectly
 * pointed to the last page rather than the page for which they were created.
 */
describe('operations bookmarks', () => {
  test('should create 3 pages with unique bookmarks', () => {
    const ctx = new PDFDocument({ autoFirstPage: false });
    const BOOKMARK1 = 'Bookmark 1';
    const BOOKMARK2 = 'Bookmark 2';
    const BOOKMARK3 = 'Bookmark 3';
    const p1 = { bookmark: { ref: 1, title: BOOKMARK1 } };
    const p2 = { bookmark: { ref: 2, title: BOOKMARK2 } };
    const p3 = { bookmark: { ref: 3, title: BOOKMARK3 } };
    const box = { left: 0, top: 0, width: 100, height: 100, x: 0, y: 0 };
    const makeLine = (pageNumber) => {
      const line = {
        ascent: 16.2,
        box,
        descent: 0,
        height: 100,
        overflowLeft: 0,
        overflowRight: 0,
        runs: [],
        string: `Page ${pageNumber}`,
        decorationLines: [],
      };
      return line;
    };
    const doc = {
      type: P.Document,
      children: [
        {
          children: [{ lines: [makeLine(1)], box, props: p1, type: P.Text }],
          box,
          type: P.Page,
        },
        {
          children: [{ lines: [makeLine(2)], box, props: p2, type: P.Text }],
          box,
          type: P.Page,
        },
        {
          children: [{ lines: [makeLine(3)], box, props: p3, type: P.Text }],
          box,
          type: P.Page,
        },
      ],
    };

    render(ctx, doc);

    const kids = ctx._root.data.Pages.data.Kids;
    expect(kids).toHaveLength(3);
    // We expect unique ids
    expect(
      kids[0].id !== kids[1].id &&
        kids[0].id !== kids[2].id &&
        kids[1].id !== kids[2].id,
    ).toBe(true);
    const children = ctx._root.document.outline.children;
    expect(children).toHaveLength(3);
    expect(children[0].outlineData.Title.toString()).toBe(BOOKMARK1);
    expect(children[1].outlineData.Title.toString()).toBe(BOOKMARK2);
    expect(children[2].outlineData.Title.toString()).toBe(BOOKMARK3);
  });
});

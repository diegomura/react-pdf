import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolvePagination from '../../src/steps/resolvePagination';
import resolveDimensions from '../../src/steps/resolveDimensions';
import { SafeDocumentNode, SafeNode } from '../../src/types';

const fontStore = new FontStore();

const calcLayout = (node: SafeDocumentNode) =>
  resolvePagination(resolveDimensions(node, fontStore), fontStore);

const makeBlock = (id: string, style: Record<string, number>): SafeNode =>
  ({
    type: 'VIEW',
    style,
    props: { id },
    children: [],
  }) as any;

describe('pagination with page-level fixed siblings', () => {
  // Regression for a bug in the splitNodes optimization: when a page has a
  // normal-flow fixed sibling (header) above a flex:1 container that must split
  // across pages, the next-page input was given box.top=0 instead of the actual
  // header-offset position. splitChildren then computed availableHeight=wrapArea
  // instead of wrapArea-headerHeight, packing too much content onto subsequent
  // pages and causing yoga to compress sections (content loss).
  test('flex:1 body below fixed header splits without losing content', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children: [
            {
              type: 'VIEW',
              style: { height: 20 },
              props: { id: 'header', fixed: true },
              children: [],
            },
            {
              type: 'VIEW',
              style: { flex: 1, position: 'relative' },
              props: { id: 'body' },
              children: [
                {
                  type: 'VIEW',
                  style: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                  },
                  props: { id: 'bottomBorder', fixed: true },
                  children: [],
                },
                makeBlock('section1', { height: 50 }) as any,
                makeBlock('section2', { height: 50 }) as any,
                makeBlock('section3', { height: 50 }) as any,
                makeBlock('section4', { height: 50 }) as any,
                makeBlock('section5', { height: 50 }) as any,
              ],
            },
          ],
        },
      ],
    });
    // 5 sections × 50pt = 250pt; body area per page = 100 - 20 (header) = 80pt.
    // ceil(250 / 80) = 4 pages expected.
    expect(layout.children.length).toBe(4);

    // Verify the body on every page is laid out below the header.
    for (const page of layout.children) {
      const body = page.children!.find(
        (c) => c.props && (c.props as any).id === 'body',
      );
      expect(body).toBeDefined();
      expect(body!.box!.top).toBe(20);
      expect(body!.box!.height).toBe(80);
    }

    // Verify no content was lost — the heights of all section fragments across
    // pages should sum back to the original (50pt × 5 = 250pt). Buggy behavior
    // compresses sections via yoga shrink and the sum is < 250.
    const fragmentHeightById = new Map<string, number>();
    for (const page of layout.children) {
      const body = page.children!.find(
        (c) => c.props && (c.props as any).id === 'body',
      )!;
      for (const child of body.children || []) {
        const id = (child.props as any).id as string;
        if (!id?.startsWith('section')) continue;
        fragmentHeightById.set(
          id,
          (fragmentHeightById.get(id) || 0) + (child.box?.height ?? 0),
        );
      }
    }
    for (const [id, total] of fragmentHeightById) {
      expect(total, `section ${id} total height after split`).toBe(50);
    }
    expect(fragmentHeightById.size).toBe(5);
  });

  // Regression for incomplete fix: cumulative tracking in splitNodes ignored
  // marginTop/marginBottom of siblings. Yoga's layout positions siblings with
  // these margins included, so without margin awareness the synthesized box.top
  // values for the next page diverge from what yoga relayout would produce —
  // splitNode's `current.style.height = height - nodeTop` becomes too large and
  // yoga compresses content via flex-shrink.
  test('header marginBottom shifts body splits and no content is compressed', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children: [
            {
              type: 'VIEW',
              style: { height: 20, marginBottom: 10 },
              props: { id: 'header', fixed: true },
              children: [],
            },
            makeBlock('section1', { height: 30 }) as any,
            makeBlock('section2', { height: 30 }) as any,
            makeBlock('section3', { height: 30 }) as any,
            makeBlock('section4', { height: 30 }) as any,
            makeBlock('section5', { height: 30 }) as any,
          ],
        },
      ],
    });

    // Effective space below header per page = 100 - 20 - 10 (mb) = 70.
    // 5 sections × 30pt = 150pt; ceil(150 / 70) = 3 pages expected.
    expect(layout.children.length).toBe(3);

    // Heights of each section across pages should sum to original 30.
    const fragmentHeightById = new Map<string, number>();
    for (const page of layout.children) {
      for (const child of page.children || []) {
        const id = (child.props as any).id as string;
        if (!id?.startsWith('section')) continue;
        fragmentHeightById.set(
          id,
          (fragmentHeightById.get(id) || 0) + (child.box?.height ?? 0),
        );
      }
    }
    for (const [id, total] of fragmentHeightById) {
      expect(total, `section ${id} total height after split`).toBe(30);
    }
    expect(fragmentHeightById.size).toBe(5);

    // Header must keep its original height on every page (no flex-shrink).
    for (const page of layout.children) {
      const header = page.children!.find(
        (c) => c.props && (c.props as any).id === 'header',
      );
      expect(header).toBeDefined();
      expect(header!.box!.height).toBe(20);
    }
  });

  // Regression: placeOnNextPage assumed flex-column stacking and applied a
  // cumulative vertical offset to every non-fixed child pushed to nextChildren.
  // In a flex:row container, both columns share top=0 — the left column's height
  // must NOT be added as a top offset to the right column on the next page.
  test('flex:row sectionRow with asymmetric column heights splits without overlap', async () => {
    const yoga = await loadYoga();

    // Structure mirrors form2:
    //   PAGE (w=100, h=100)
    //     header (fixed, h=10)
    //     table (flex:1, position:relative)
    //       tableHeader (fixed, h=10)
    //       encounterWrapper (marginBottom=5)
    //         sectionRow (flexDirection:row)
    //           left  (flex:1) – tall
    //           right (flex:1) – short, stretched to left's height
    //
    // Content area within table per page = 100 - header(10) - tableHeader(10) = 80.
    // sectionRow height = 70 (left content). With marginBottom=5 encounter = 75.
    // First page fits encounter partially (split at 80 - 0 = 80... row.h=70 < 80, fits whole).
    // Actually let's make row tall enough to overflow: left=90, right=20 → row=90.
    // encounter = 90 + 5(mb) = 95 > 80 → split at 80.
    // After split, next page: leftRemainder(h=10) at top=0, rightRemainder(h=10) at top=0.
    // With the bug: rightRemainder.top = leftRemainder.height = 10 → wrong.
    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 100 },
          children: [
            {
              type: 'VIEW',
              style: { height: 10 },
              props: { id: 'header', fixed: true },
              children: [],
            },
            {
              type: 'VIEW',
              style: { flex: 1 },
              props: { id: 'table' },
              children: [
                {
                  type: 'VIEW',
                  style: { height: 10 },
                  props: { id: 'tableHeader', fixed: true },
                  children: [],
                },
                {
                  type: 'VIEW',
                  style: { marginBottom: 5 },
                  props: { id: 'encounter' },
                  children: [
                    {
                      type: 'VIEW',
                      style: { flexDirection: 'row' },
                      props: { id: 'sectionRow' },
                      children: [
                        {
                          type: 'VIEW',
                          style: { flex: 1 },
                          props: { id: 'left' },
                          children: [
                            makeBlock('l1', { height: 10 }) as any,
                            makeBlock('l2', { height: 10 }) as any,
                            makeBlock('l3', { height: 10 }) as any,
                            makeBlock('l4', { height: 10 }) as any,
                            makeBlock('l5', { height: 10 }) as any,
                            makeBlock('l6', { height: 10 }) as any,
                            makeBlock('l7', { height: 10 }) as any,
                            makeBlock('l8', { height: 10 }) as any,
                            makeBlock('l9', { height: 10 }) as any,
                          ],
                        },
                        {
                          type: 'VIEW',
                          style: { flex: 1 },
                          props: { id: 'right' },
                          children: [
                            makeBlock('r1', { height: 10 }) as any,
                            makeBlock('r2', { height: 10 }) as any,
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // The encounter (sectionRow h=90, mb=5) occupies 95pt.
    // Per-page body = 100 - 10(header) = 90; table content = 90 - 10(tableHeader) = 80.
    // 95 > 80, so the encounter must split across pages.
    expect(layout.children.length).toBeGreaterThanOrEqual(2);

    // On every page, left and right columns within sectionRow must share the same
    // top value (both = 0 relative to sectionRow — they are side-by-side in a row).
    for (const page of layout.children) {
      const table = page.children!.find((c) => (c.props as any).id === 'table');
      if (!table) continue;
      const enc = table.children!.find(
        (c) => (c.props as any).id === 'encounter',
      );
      if (!enc) continue;
      const row = enc.children!.find(
        (c) => (c.props as any).id === 'sectionRow',
      );
      if (!row) continue;
      const left = row.children!.find((c) => (c.props as any).id === 'left');
      const right = row.children!.find((c) => (c.props as any).id === 'right');
      if (!left || !right) continue;

      expect(
        left.box!.top,
        `page ${page.subPageNumber}: left.top should equal right.top`,
      ).toBe(right.box!.top);
    }

    // Total height of left fragments must equal original left content (9×10 = 90).
    // Total height of right fragments must equal original right content (2×10 = 20,
    // but right is stretched to match left's height by alignItems:stretch).
    // The key invariant: no content loss (heights sum to the split total).
    let totalLeftH = 0;
    let totalRightH = 0;
    for (const page of layout.children) {
      const table = page.children!.find((c) => (c.props as any).id === 'table');
      if (!table) continue;
      const enc = table.children!.find(
        (c) => (c.props as any).id === 'encounter',
      );
      if (!enc) continue;
      const row = enc.children!.find(
        (c) => (c.props as any).id === 'sectionRow',
      );
      if (!row) continue;
      const left = row.children!.find((c) => (c.props as any).id === 'left');
      const right = row.children!.find((c) => (c.props as any).id === 'right');
      if (left) totalLeftH += left.box?.height ?? 0;
      if (right) totalRightH += right.box?.height ?? 0;
    }
    // sectionRow height = max(leftContent, rightContent) with alignItems:stretch = 90.
    expect(totalLeftH).toBe(90);
    expect(totalRightH).toBe(90);
  });

  // Critical regression: when a flex:row container spans 3+ pages, the buggy
  // placeOnNextPage accumulates cumNonFixedNextHeight per column and assigns
  // right.box.top = left.box.height on the next page.  In iter2 this wrong top
  // trips the `isOutside` guard (availH <= wrongTop), so the right column skips
  // page 2 entirely and lands on page 3 — leaving page 2's right pane empty and
  // page 3 overloaded.
  test('flex:row spanning 3 pages keeps both columns on every page', async () => {
    const yoga = await loadYoga();

    // Minimal structure: sectionRow (flex:row) whose natural height (120)
    // exceeds page height (50) by 2.4×, forcing splits across 3 pages.
    // alignItems:stretch makes right.h == left.h == 120 despite right having
    // only 20pt of content.
    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 50 },
          children: [
            {
              type: 'VIEW',
              style: { flexDirection: 'row' },
              props: { id: 'row' },
              children: [
                {
                  type: 'VIEW',
                  style: { flex: 1 },
                  props: { id: 'left' },
                  children: [
                    makeBlock('la', { height: 30 }) as any,
                    makeBlock('lb', { height: 30 }) as any,
                    makeBlock('lc', { height: 30 }) as any,
                    makeBlock('ld', { height: 30 }) as any,
                  ],
                },
                {
                  type: 'VIEW',
                  style: { flex: 1 },
                  props: { id: 'right' },
                  children: [makeBlock('ra', { height: 20 }) as any],
                },
              ],
            },
          ],
        },
      ],
    });

    // left content = 120pt, right stretched to 120pt.  Page h=50 → 3 pages.
    expect(layout.children.length).toBe(3);

    // Both columns must appear on EVERY page (never missing due to isOutside
    // mis-classification from wrong top offset).
    for (const page of layout.children) {
      const row = page.children!.find((c) => (c.props as any).id === 'row');
      expect(row, `row missing on page`).toBeDefined();
      const left = row!.children!.find((c) => (c.props as any).id === 'left');
      const right = row!.children!.find((c) => (c.props as any).id === 'right');
      expect(left, `left column missing`).toBeDefined();
      expect(right, `right column missing`).toBeDefined();
      // Both columns are side-by-side: same top within the row.
      expect(left!.box!.top, `left/right top mismatch`).toBe(right!.box!.top);
    }

    // Heights across all pages must sum to original (120 each).
    let totalLeft = 0;
    let totalRight = 0;
    for (const page of layout.children) {
      const row = page.children!.find((c) => (c.props as any).id === 'row');
      if (!row) continue;
      const left = row.children!.find((c) => (c.props as any).id === 'left');
      const right = row.children!.find((c) => (c.props as any).id === 'right');
      totalLeft += left?.box?.height ?? 0;
      totalRight += right?.box?.height ?? 0;
    }
    expect(totalLeft).toBe(120);
    expect(totalRight).toBe(120);
  });
});

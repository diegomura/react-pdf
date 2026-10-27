import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolveDimensions from '../../src/steps/resolveDimensions';
import resolveStyles from '../../src/steps/resolveStyles';
import resolveInheritance from '../../src/steps/resolveInheritance';
import legacyPagination from '../../src/steps/resolvePagination';
import resolvePageTemplates from '../../src/steps/resolvePageTemplates';
import nextPagination from '../../src/paginate';
import { SafeDocumentNode, SafeNode } from '../../src/types';

const fontStore = new FontStore();

const view = (style, children = []): any => ({
  type: 'VIEW',
  props: {},
  style,
  children,
});

const fixedView = (style, children = []): any => ({
  type: 'VIEW',
  props: { fixed: true },
  style,
  children,
});

const text = (value: string, style = {}): any => ({
  type: 'TEXT',
  props: {},
  style,
  children: [{ type: 'TEXT_INSTANCE', value }],
});

const doc = async (pageStyle, children): Promise<SafeDocumentNode> => ({
  type: 'DOCUMENT',
  yoga: await loadYoga(),
  props: {},
  children: [{ type: 'PAGE', props: {}, style: pageStyle, children }],
});

const round = (value: number) => Math.round(value * 100) / 100;

const walk = (node: SafeNode, offset = 0, out: string[] = []) => {
  const top = offset + (node.box?.top || 0);

  out.push(`${node.type} ${round(top)} ${round(node.box?.height || 0)}`);

  ((node.children || []) as SafeNode[]).forEach((child) =>
    walk(child, top, out),
  );

  return out;
};

// Zero-height entries carry no geometry, and dropping them hides the one benign
// difference: the legacy step leaves an empty Text stub behind when orphan and
// widow rules move every line to the next page.
const shape = (root: SafeDocumentNode) =>
  root.children.map((page) =>
    ((page.children || []) as SafeNode[])
      .flatMap((child) => walk(child))
      .filter((entry) => !entry.endsWith(' 0')),
  );

// Styles first, like the real pipeline: shorthands such as `gap` only become
// box values once the stylesheet has run.
const both = async (pageStyle, children) => {
  const styled = resolveInheritance(
    resolveStyles(await doc(pageStyle, children)) as any,
  );
  const laid = resolveDimensions(styled as any, fontStore);
  const spliced = resolveDimensions(
    resolvePageTemplates(styled) as any,
    fontStore,
  );

  return {
    legacy: shape(legacyPagination(laid, fontStore)),
    next: shape(nextPagination(spliced)),
  };
};

describe('paginate adapter parity with resolvePagination', () => {
  test('plain blocks wrapping across pages', async () => {
    const { legacy, next } = await both({ width: 100, height: 100 }, [
      view({ height: 30 }),
      view({ height: 30 }),
      view({ height: 30 }),
      view({ height: 30 }),
      view({ height: 30 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('page padding and margins', async () => {
    const { legacy, next } = await both(
      { width: 100, height: 120, paddingTop: 10, paddingBottom: 10 },
      [
        view({ height: 30, marginBottom: 8 }),
        view({ height: 30, marginBottom: 8 }),
        view({ height: 30 }),
        view({ height: 30 }),
      ],
    );

    expect(next).toEqual(legacy);
  });

  test('nested container splitting', async () => {
    const { legacy, next } = await both({ width: 100, height: 100 }, [
      view({ paddingTop: 6, paddingBottom: 6 }, [
        view({ height: 40 }),
        view({ height: 40 }),
        view({ height: 40 }),
      ]),
    ]);

    expect(next).toEqual(legacy);
  });

  test('text flowing over several pages', async () => {
    const { legacy, next } = await both({ width: 200, height: 80 }, [
      text(
        'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      ),
    ]);

    expect(next).toEqual(legacy);
  });

  test('marginTop auto pins a footer without breaking the numbers', async () => {
    const { legacy, next } = await both({ width: 100, height: 200 }, [
      view({ height: 40 }),
      view({ height: 30, marginTop: 'auto' }),
    ]);

    expect(next).toEqual(legacy);

    // every box value must stay numeric — 'auto' margins concatenate otherwise
    next.flat().forEach((entry) => {
      expect(entry).not.toContain('NaN');
      expect(entry).not.toContain('auto');
    });
  });

  test('flexGrow on page children stretches like legacy', async () => {
    const { legacy, next } = await both({ width: 100, height: 200 }, [
      view({ height: 40 }),
      view({ flexGrow: 1 }, [view({ height: 20 })]),
      view({ height: 30 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('nested grow rows stretch like legacy', async () => {
    const { legacy, next } = await both({ width: 100, height: 300 }, [
      view({ height: 30 }),
      view({ flexGrow: 1 }, [
        view({ flexGrow: 1, flexDirection: 'row' }, [
          view({ width: 40 }),
          view({ width: 40, height: 25 }),
        ]),
        view({ flexGrow: 1, flexDirection: 'row' }, [view({ width: 40 })]),
      ]),
    ]);

    expect(next).toEqual(legacy);
  });

  test('mixed flow of blocks and text', async () => {
    const { legacy, next } = await both({ width: 200, height: 150 }, [
      view({ height: 40 }),
      text('lorem ipsum dolor sit amet consectetur adipiscing elit sed do'),
      view({ height: 40 }),
      text('eiusmod tempor incididunt ut labore et dolore magna aliqua'),
      view({ height: 40 }),
    ]);

    expect(next).toEqual(legacy);
  });
});

// Free space is whatever the page has left once its content is placed. The
// first pass runs pages unconstrained, so yoga never distributes it; these
// pin the two ways it comes back — a relayout for growth, arithmetic for
// justifyContent.
describe('free space left at the bottom of a page', () => {
  test('flexGrow filler stretches to the page bottom', async () => {
    const { legacy, next } = await both({ width: 100, height: 200 }, [
      view({ height: 40 }),
      view({ flexGrow: 1 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('growers split the leftover space by weight', async () => {
    const { legacy, next } = await both({ width: 100, height: 300 }, [
      view({ flexGrow: 1, height: 20 }),
      view({ flexGrow: 3, height: 20 }),
      view({ height: 30 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('auto margins on both sides centre a block', async () => {
    const { legacy, next } = await both({ width: 100, height: 200 }, [
      view({ height: 30, marginTop: 'auto', marginBottom: 'auto' }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('grow after a page break', async () => {
    const { legacy, next } = await both({ width: 100, height: 100 }, [
      view({ height: 60 }),
      view({ height: 60 }),
      view({ flexGrow: 1, height: 20 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('grow below a split container', async () => {
    const { legacy, next } = await both({ width: 100, height: 100 }, [
      view({ paddingTop: 6, paddingBottom: 6 }, [
        view({ height: 40 }),
        view({ height: 40 }),
        view({ height: 40 }),
      ]),
      view({ flexGrow: 1, height: 5 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('fixed header repeats above grown content', async () => {
    const { legacy, next } = await both({ width: 100, height: 100 }, [
      fixedView({ height: 20 }),
      view({ height: 50 }),
      view({ height: 50 }),
      view({ flexGrow: 1, height: 10 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('gaps between siblings survive alongside a grower', async () => {
    const { legacy, next } = await both({ width: 100, height: 200, gap: 12 }, [
      view({ height: 30 }),
      view({ height: 30 }),
      view({ flexGrow: 1 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test.each([
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ])('justifyContent %s', async (justifyContent) => {
    const { legacy, next } = await both(
      { width: 100, height: 240, justifyContent },
      [view({ height: 40 }), view({ height: 40 }), view({ height: 40 })],
    );

    expect(next).toEqual(legacy);
  });

  test('justifyContent with a bottom-anchored absolute', async () => {
    const { legacy, next } = await both(
      { width: 100, height: 200, justifyContent: 'center' },
      [
        view({ position: 'absolute', bottom: 10, height: 15 }),
        view({ height: 40 }),
      ],
    );

    expect(next).toEqual(legacy);
  });

  test('justifyContent centres text', async () => {
    const { legacy, next } = await both(
      { width: 200, height: 200, justifyContent: 'center' },
      [text('short line of text')],
    );

    expect(next).toEqual(legacy);
  });
});

// Fixed nodes repeat on every page, and the free-space relayout stacks
// children in the order it finds them — so their position in the source has
// to survive pagination.
describe('repeating fixed nodes keep their place', () => {
  test('header declared first stays above the flow', async () => {
    const { legacy, next } = await both({ width: 100, height: 100 }, [
      fixedView({ height: 20 }),
      view({ height: 50 }),
      view({ height: 50 }),
      view({ flexGrow: 1, height: 10 }),
    ]);

    expect(next).toEqual(legacy);
  });

  test('footer declared last stays below the flow', async () => {
    const { next } = await both({ width: 100, height: 200 }, [
      view({ height: 40 }),
      view({ flexGrow: 1 }),
      fixedView({ height: 20 }),
    ]);

    next.forEach((page) => {
      const tops = page.map((entry) => Number(entry.split(' ')[1]));
      const footerTop = tops[tops.length - 1];

      expect(footerTop).toBeGreaterThan(0);
    });
  });
});

// Cells pushed down by alignment carry their offset as a spacer wrapped with
// the cell, not as a folded-in number — these pin that the offset survives.
describe('row cells offset by alignment', () => {
  test('centered short cell keeps its offset beside a tall one', async () => {
    const { legacy, next } = await both({ width: 100, height: 200 }, [
      view({ flexDirection: 'row', alignItems: 'center' }, [
        view({ width: 40, height: 80 }),
        view({ width: 40, height: 20 }),
      ]),
    ]);

    expect(next).toEqual(legacy);
  });

  test('flex-end row moves whole when the offset cell has nothing to give', async () => {
    // Deliberately not legacy parity: legacy force-splits every cell at the
    // cut and re-aligns the remainders, which strands the short cell flush at
    // the top of the next page. Moving the row whole keeps the alignment.
    const { next } = await both({ width: 100, height: 100 }, [
      view({ height: 60 }),
      view({ flexDirection: 'row', alignItems: 'flex-end' }, [
        view({ width: 40, height: 60 }),
        view({ width: 40, height: 20 }),
      ]),
    ]);

    expect(next).toEqual([
      ['VIEW 0 60'],
      ['VIEW 0 60', 'VIEW 0 60', 'VIEW 40 20'],
    ]);
  });

  describe('minPresenceAhead', () => {
    const presenceView = (style: any, minPresenceAhead: number): any => ({
      type: 'VIEW',
      props: { minPresenceAhead },
      style,
      children: [],
    });

    test('moves a block when too little follows on the page', async () => {
      const { legacy, next } = await both({ width: 100, height: 100 }, [
        view({ height: 60 }),
        presenceView({ height: 30 }, 50),
        view({ height: 40 }),
      ]);

      expect(next).toEqual(legacy);
    });

    test('stays put when enough of what follows fits', async () => {
      const { legacy, next } = await both({ width: 100, height: 100 }, [
        view({ height: 20 }),
        presenceView({ height: 30 }, 50),
        view({ height: 40 }),
      ]);

      expect(next).toEqual(legacy);
    });

    test('inert when the block is first on its page', async () => {
      const { legacy, next } = await both({ width: 100, height: 100 }, [
        presenceView({ height: 30 }, 200),
        view({ height: 90 }),
      ]);

      expect(next).toEqual(legacy);
    });

    test('a trailing window relaxes — deliberate divergence from legacy', async () => {
      // Legacy skips the future-content clamp when nothing follows and moves
      // the element anyway, reserving presence for content that doesn't
      // exist. The new engine only constrains actual breaks, so a window at
      // the end of the flow is inert.
      const { legacy, next } = await both({ width: 100, height: 100 }, [
        view({ height: 60 }),
        presenceView({ height: 30 }, 500),
      ]);

      expect(legacy).toEqual([['VIEW 0 60'], ['VIEW 0 30']]);
      expect(next).toEqual([['VIEW 0 60', 'VIEW 60 30']]);
    });

    test('window spans margins and gaps', async () => {
      const { legacy, next } = await both({ width: 100, height: 100 }, [
        view({ height: 55 }),
        presenceView({ height: 25, marginBottom: 10 }, 30),
        view({ height: 40 }),
      ]);

      expect(next).toEqual(legacy);
    });
  });
});

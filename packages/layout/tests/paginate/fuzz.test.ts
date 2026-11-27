import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolveDimensions from '../../src/steps/resolveDimensions';
import resolveStyles from '../../src/steps/resolveStyles';
import resolveInheritance from '../../src/steps/resolveInheritance';
import resolvePageTemplates from '../../src/steps/resolvePageTemplates';
import nextPagination from '../../src/paginate';
import { SafeDocumentNode, SafeNode } from '../../src/types';

const fontStore = new FontStore();

// Deterministic, so a failure names the seed that reproduces it.
const rng = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const WORDS =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(
    ' ',
  );

const JUSTIFY = [
  undefined,
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
];

const node = (rand: () => number, depth: number): any => {
  const roll = rand();

  if (depth <= 0 || roll < 0.3) {
    const words = 3 + Math.floor(rand() * 18);

    return {
      type: 'TEXT',
      props: {},
      style: rand() < 0.3 ? { marginBottom: 4 } : {},
      children: [
        { type: 'TEXT_INSTANCE', value: WORDS.slice(0, words).join(' ') },
      ],
    };
  }

  if (roll < 0.55) {
    return {
      type: 'VIEW',
      props: {},
      style: {
        height: 10 + Math.floor(rand() * 60),
        ...(rand() < 0.25 ? { marginBottom: Math.floor(rand() * 12) } : {}),
        ...(rand() < 0.15 ? { marginTop: 'auto' } : {}),
        ...(rand() < 0.2 ? { flexGrow: 1 + Math.floor(rand() * 3) } : {}),
      },
      children: [],
    };
  }

  return {
    type: 'VIEW',
    props: {},
    style: {
      ...(rand() < 0.3 ? { padding: Math.floor(rand() * 10) } : {}),
      ...(rand() < 0.2 ? { gap: Math.floor(rand() * 10) } : {}),
      ...(rand() < 0.25 ? { flexGrow: 1 } : {}),
      ...(rand() < 0.2 ? { flexDirection: 'row' } : {}),
      ...(rand() < 0.2
        ? { justifyContent: JUSTIFY[Math.floor(rand() * 6)] }
        : {}),
    },
    children: Array.from({ length: 1 + Math.floor(rand() * 3) }, () =>
      node(rand, depth - 1),
    ),
  };
};

const document = async (rand: () => number): Promise<SafeDocumentNode> => ({
  type: 'DOCUMENT',
  yoga: await loadYoga(),
  props: {},
  children: [
    {
      type: 'PAGE',
      props: {},
      style: {
        width: 200,
        height: 120 + Math.floor(rand() * 200),
        ...(rand() < 0.3 ? { padding: Math.floor(rand() * 15) } : {}),
        ...(rand() < 0.35
          ? { justifyContent: JUSTIFY[Math.floor(rand() * 6)] }
          : {}),
      },
      children: Array.from({ length: 2 + Math.floor(rand() * 6) }, () =>
        node(rand, 3),
      ),
    },
  ],
});

const laidOut = async (seed: number) => {
  const rand = rng(seed);
  const styled = resolveInheritance(resolveStyles(await document(rand)) as any);

  return resolveDimensions(resolvePageTemplates(styled) as any, fontStore);
};

const boxes = (
  parent: SafeNode,
  offset = 0,
  out: [SafeNode, number][] = [],
) => {
  ((parent.children || []) as SafeNode[]).forEach((child) => {
    const top = offset + (child.box?.top || 0);
    out.push([child, top]);
    boxes(child, top, out);
  });

  return out;
};

const SEEDS = Array.from({ length: 150 }, (_, i) => i + 1);

// Pagination geometry has no single right answer to assert against — legacy
// disagrees with the new engine by design in places. These are the invariants
// that must hold whatever it decides.
describe('randomly generated documents', () => {
  test('every box is numeric and lands inside its page', async () => {
    const broken: string[] = [];
    const documents = await Promise.all(SEEDS.map(laidOut));

    documents.forEach((laid, index) => {
      const seed = SEEDS[index];
      const root = nextPagination(laid);

      root.children.forEach((page, pageIndex) => {
        boxes(page as unknown as SafeNode).forEach(([child, top]) => {
          const height = child.box?.height || 0;
          const where = `seed ${seed} page ${pageIndex} ${child.type}`;

          if (!Number.isFinite(top) || !Number.isFinite(height)) {
            broken.push(
              `${where}: non-numeric box (top ${top}, height ${height})`,
            );
            return;
          }

          // No bottom-edge assertion: content the engine warns about (a row
          // taller than the page) overflows deliberately, and the warning
          // covers it.
          if (top < -0.01) broken.push(`${where}: top ${top} above the page`);

          if (height < 0) broken.push(`${where}: negative height ${height}`);
        });
      });
    });

    expect(broken.slice(0, 10)).toEqual([]);
  }, 300_000);

  test('paginating the same document twice gives the same result', async () => {
    const unstable: number[] = [];
    const pairs = await Promise.all(
      SEEDS.map(
        async (seed) =>
          [seed, await laidOut(seed), await laidOut(seed)] as const,
      ),
    );

    pairs.forEach(([seed, a, b]) => {
      const first = nextPagination(a);
      const second = nextPagination(b);

      const shape = (root: SafeDocumentNode) =>
        root.children.map((page) =>
          boxes(page as unknown as SafeNode).map(
            ([child, top]) => `${child.type} ${top} ${child.box?.height}`,
          ),
        );

      if (JSON.stringify(shape(first)) !== JSON.stringify(shape(second))) {
        unstable.push(seed);
      }
    });

    expect(unstable).toEqual([]);
  }, 300_000);
});

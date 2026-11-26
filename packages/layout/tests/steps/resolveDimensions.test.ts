import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadTaffy } from '../../src/taffy';
import resolveDimensions from '../../src/steps/resolveDimensions';
import { SafeDocumentNode, SafeNode } from '../../src/types';

await loadTaffy();

const fontStore = new FontStore();

const view = (style: SafeNode['style'], children: SafeNode[] = []) =>
  ({ type: 'VIEW', props: {}, style, children }) as SafeNode;

const layoutPage = (children: SafeNode[]) => {
  const document = {
    type: 'DOCUMENT',
    props: {},
    children: [
      {
        type: 'PAGE',
        props: {},
        style: { width: 200, height: 200 },
        children,
      },
    ],
  } as SafeDocumentNode;

  return resolveDimensions(document, fontStore).children[0]!;
};

const absolute = view({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 10,
  height: 10,
});

describe('resolveDimensions', () => {
  test('should place absolute nodes in their relative parent', () => {
    const page = layoutPage([
      view({ marginLeft: 20, marginTop: 30, width: 100, height: 100 }, [
        absolute,
      ]),
    ]);

    const box = page.children![0]!.children![0]!.box!;

    expect(box.left).toBe(0);
    expect(box.top).toBe(0);
  });

  test('should place absolute nodes of static parents in the nearest positioned ancestor', () => {
    const page = layoutPage([
      view({ margin: 10, width: 150, height: 150 }, [
        view(
          {
            position: 'static',
            marginLeft: 20,
            marginTop: 30,
            width: 100,
            height: 100,
          },
          [absolute],
        ),
      ]),
    ]);

    const box = page.children![0]!.children![0]!.children![0]!.box!;

    // Relative to the static parent, which sits at (20, 30) in the containing block
    expect(box.left).toBe(-20);
    expect(box.top).toBe(-30);
    expect(box.right).toBe(100 + 20 - 10);
    expect(box.bottom).toBe(100 + 30 - 10);
  });

  test('should skip nested static ancestors', () => {
    const page = layoutPage([
      view({ position: 'static', marginLeft: 5, marginTop: 5 }, [
        view({ position: 'static', marginLeft: 10, marginTop: 20 }, [absolute]),
      ]),
    ]);

    const box = page.children![0]!.children![0]!.children![0]!.box!;

    // The page is the containing block
    expect(box.left).toBe(-15);
    expect(box.top).toBe(-25);
  });

  test('should ignore insets of static nodes', () => {
    const page = layoutPage([
      view({ position: 'static', top: 50, left: 50, width: 10, height: 10 }),
    ]);

    const box = page.children![0]!.box!;

    expect(box.left).toBe(0);
    expect(box.top).toBe(0);
  });
});

import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import { loadYoga } from '../../src/yoga';
import resolveDimensions from '../../src/steps/resolveDimensions';
import resolvePageTemplates from '../../src/steps/resolvePageTemplates';
import {
  SLOT_PROP,
  findSlot,
  instantiateTemplate,
} from '../../src/paginate/template';
import { SafeNode } from '../../src/types';

const fontStore = new FontStore();

const view = (style = {}, children: any[] = []): any => ({
  type: 'VIEW',
  props: { style, children },
});

// Instance-shaped node, as the reconciler produces them (style at top level)
const instance = (style = {}, children: any[] = []): any => ({
  type: 'VIEW',
  style,
  props: {},
  children,
});

const doc = async (pageStyle: any, children: any[], pageProps = {}) => ({
  type: 'DOCUMENT',
  yoga: await loadYoga(),
  props: {},
  children: [{ type: 'PAGE', props: pageProps, style: pageStyle, children }],
});

describe('template', () => {
  test('instantiates the layout with an empty slot', () => {
    const layout = ({ children }: any) =>
      view({ flexDirection: 'row' }, [children]);

    const nodes = instantiateTemplate(layout, { pageNumber: 1 });
    const slot = findSlot({ type: 'PAGE', children: nodes } as any);

    expect(slot).toBeTruthy();
    expect(SLOT_PROP in (slot as any).props).toBe(true);
    expect((slot as any).children ?? []).toHaveLength(0);
  });

  test('the layout receives its page props', () => {
    const seen: any[] = [];
    const layout = ({ children, ...props }: any) => {
      seen.push(props);
      return view({}, [children]);
    };

    instantiateTemplate(layout, { pageNumber: 3, totalPages: 7 });

    expect(seen).toEqual([{ pageNumber: 3, totalPages: 7 }]);
  });

  test('throws when the layout renders children twice or never', () => {
    const twice = ({ children }: any) => view({}, [children, children]);
    const never = () => view({}, []);

    expect(() => instantiateTemplate(twice, { pageNumber: 1 })).toThrow(
      /exactly once/,
    );
    expect(() => instantiateTemplate(never, { pageNumber: 1 })).toThrow(
      /exactly once/,
    );
  });
});

describe('resolvePageTemplates', () => {
  test('grafts the page content into the slot, styles intact', async () => {
    const layout = ({ children }: any) =>
      view({ flexDirection: 'row' }, [view({ width: 40 }), children]);

    const content = [instance({ height: 10 })];
    const root = resolvePageTemplates(
      await doc({ width: 100, height: 100 }, content, { layout }),
    );

    const page = root.children[0];
    const slot = findSlot(page as SafeNode)!;

    expect(slot.children).toHaveLength(1);
    expect((slot.children![0] as any).style).toEqual({ height: 10 });
  });

  test('pages without a layout pass through untouched', async () => {
    const content = [instance({ height: 10 })];
    const root = resolvePageTemplates(
      await doc({ width: 100, height: 100 }, content),
    );

    expect(root.children[0].children).toBe(content);
  });

  test('first pass measures content at slot width', async () => {
    const layout = ({ children }: any) =>
      view({ flexDirection: 'row', flexGrow: 1 }, [
        view({ width: 40 }),
        children,
      ]);

    const content = [instance({ height: 10 })];
    const laid = resolveDimensions(
      resolvePageTemplates(
        await doc({ width: 100, height: 100 }, content, { layout }),
      ) as any,
      fontStore,
    );

    const slot = findSlot(laid.children[0] as unknown as SafeNode)!;

    expect(slot.box?.width).toBe(60);
    expect((slot.children![0] as SafeNode).box?.width).toBe(60);
  });
});

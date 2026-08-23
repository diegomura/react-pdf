import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import layout from '../src';

const fontStore = new FontStore();

const view = (style: any, props: any = {}): any => ({
  type: 'VIEW',
  props,
  style,
  box: {},
  children: [],
});

// A trailing minPresenceAhead is the one place the engines diverge: legacy
// moves the node to its own page, the new engine leaves it in place. That
// difference tells us which engine ran.
const doc = (pageProps: any = {}): any => ({
  type: 'DOCUMENT',
  props: {},
  children: [
    {
      type: 'PAGE',
      props: { size: [100, 100], ...pageProps },
      style: {},
      box: {},
      children: [
        view({ height: 60 }),
        view({ height: 30 }, { minPresenceAhead: 500 }),
      ],
    },
  ],
});

describe('pagination engine selection', () => {
  test('legacy by default', async () => {
    const result = await layout(doc(), fontStore);

    expect(result.children).toHaveLength(2);
  });

  test('experimentalPagination opts into the new engine', async () => {
    const result = await layout(
      doc({ experimentalPagination: true }),
      fontStore,
    );

    expect(result.children).toHaveLength(1);
  });

  test('a page layout implies the new engine', async () => {
    const pageLayout = (_: any, children: any[]) => children;
    const result = await layout(doc({ layout: pageLayout }), fontStore);

    expect(result.children).toHaveLength(1);
  });
});

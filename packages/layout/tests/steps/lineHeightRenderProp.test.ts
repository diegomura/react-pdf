import { describe, expect, test } from 'vitest';
import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';
import { parseFloat } from '@react-pdf/fns';

import { loadYoga } from '../../src/yoga';
import resolvePagination from '../../src/steps/resolvePagination';
import resolveDimensions from '../../src/steps/resolveDimensions';
import { SafeDocumentNode, SafeNode, SafeTextNode } from '../../src/types';

const fontStore = new FontStore();

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

const calcLayout = (node: SafeDocumentNode) =>
  resolvePagination(resolveDimensions(node, fontStore), fontStore);

describe('lineHeight + render prop bug (issues #3083, #3402, #2988)', () => {
  test('should render dynamic text when lineHeight is set on page', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            width: 100,
            height: 200,
            fontSize: 9,
            lineHeight: 1.5,
          },
          children: [
            {
              type: 'TEXT',
              style: {},
              props: {},
              children: [
                {
                  type: 'TEXT_INSTANCE',
                  value: 'static text',
                },
              ],
            },
            {
              type: 'TEXT',
              style: {},
              props: {
                render: () => 'dynamic text',
              },
              children: [],
            },
          ],
        },
      ],
    });

    const page = layout.children[0];
    const children = page.children!;
    const textNodes = children.filter(isText);
    const staticText = textNodes[0];
    const dynamicText = textNodes[1];

    expect(staticText.lines).toBeDefined();
    expect(dynamicText.lines).toBeDefined();
    expect(dynamicText.lines!.length).toBeGreaterThan(0);
    const firstLine = dynamicText.lines![0];
    expect(firstLine.string).toContain('dynamic text');

    // lineHeight 1.5 * fontSize 9 = 13.5; double-multiplied would be 121.5
    expect(dynamicText.box!.height).toBeLessThan(50);
  });

  test('should not double-multiply lineHeight on dynamic text nodes', async () => {
    const yoga = await loadYoga();

    const layout = calcLayout({
      type: 'DOCUMENT',
      yoga,
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            width: 100,
            height: 200,
            fontSize: 10,
            lineHeight: 1.5,
          },
          children: [
            {
              type: 'TEXT',
              style: {},
              props: {
                render: () => 'hello',
              },
              children: [],
            },
          ],
        },
      ],
    });

    const page = layout.children[0];
    const dynamicText = page.children!.find(isText)!;

    const lineHeight = parseFloat(String(dynamicText.style!.lineHeight));
    expect(lineHeight).toBe(15);
  });
});

import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';
import layout from '@react-pdf/layout';
import render from '@react-pdf/render';

import SVGDocument from '../src/index';

const fontStore = new FontStore();

const doc = (children: any[], pageProps: any = {}): any => ({
  type: 'DOCUMENT',
  props: {},
  children: [
    {
      type: 'PAGE',
      props: { size: [200, 200], ...pageProps },
      style: {},
      box: {},
      children,
    },
  ],
});

const view = (style: any, children: any[] = []): any => ({
  type: 'VIEW',
  props: {},
  style,
  box: {},
  children,
});

const text = (value: string, style: any = {}): any => ({
  type: 'TEXT',
  props: {},
  style,
  box: {},
  children: [{ type: 'TEXT_INSTANCE', value, props: {}, style: {} }],
});

const renderToSvg = async (tree: any) => {
  const resolved = await layout(tree, fontStore);
  const ctx = new SVGDocument();
  render(ctx as any, resolved);
  return ctx.pages;
};

describe('svgkit integration', () => {
  test('renders styled views', async () => {
    const pages = await renderToSvg(
      doc([
        view({
          width: 100,
          height: 80,
          backgroundColor: 'tomato',
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 4,
        }),
      ]),
    );

    expect(pages).toHaveLength(1);
    expect(pages[0]).toMatchSnapshot();
  });

  test('renders default-font text as positioned <text>', async () => {
    const pages = await renderToSvg(
      doc([text('Hello World', { fontSize: 14 })]),
    );

    expect(pages[0]).toContain('<text');
    expect(pages[0]).toContain('Hello World');
    expect(pages[0]).toContain('font-family="Helvetica, Arial, sans-serif"');
    expect(pages[0]).toMatchSnapshot();
  });

  test('renders multiple pages to multiple svgs', async () => {
    const tree = {
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: { size: [100, 100] },
          style: {},
          box: {},
          children: [view({ width: 10, height: 10, backgroundColor: 'red' })],
        },
        {
          type: 'PAGE',
          props: { size: [100, 100] },
          style: {},
          box: {},
          children: [view({ width: 10, height: 10, backgroundColor: 'blue' })],
        },
      ],
    };

    const pages = await renderToSvg(tree);
    expect(pages).toHaveLength(2);
    // layout resolves named colors to hex before render sees them
    expect(pages[0]).toContain('#FF0000');
    expect(pages[1]).toContain('#0000FF');
  });

  test('links become anchors', async () => {
    const linkNode: any = {
      type: 'LINK',
      props: { src: 'https://react-pdf.org' },
      style: {},
      box: {},
      children: [
        { type: 'TEXT_INSTANCE', value: 'click', props: {}, style: {} },
      ],
    };

    const pages = await renderToSvg(doc([linkNode]));
    expect(pages[0]).toContain('<a href="https://react-pdf.org">');
  });
});

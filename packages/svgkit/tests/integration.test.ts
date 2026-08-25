import { fileURLToPath } from 'url';
import path from 'path';
import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';
import layout from '@react-pdf/layout';
import render from '@react-pdf/render';

import SVGDocument from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontStore = new FontStore();

fontStore.register({
  family: 'TestFont',
  src: path.join(__dirname, './assets/font.ttf'),
});

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

const textInput = (props: any = {}, style: any = {}): any => ({
  type: 'TEXT_INPUT',
  props,
  style,
  box: {},
  children: [],
});

const checkbox = (props: any = {}, style: any = {}): any => ({
  type: 'CHECKBOX',
  props,
  style,
  box: {},
  children: [],
});

const select = (props: any = {}, style: any = {}): any => ({
  type: 'SELECT',
  props,
  style,
  box: {},
  children: [],
});

const note = (value: string, style: any = {}): any => ({
  type: 'NOTE',
  props: {},
  style,
  box: {},
  children: [{ type: 'TEXT_INSTANCE', value, props: {}, style: {} }],
});

const svgWithGradientPath = (): any => ({
  type: 'SVG',
  props: { width: 100, height: 100 },
  style: { width: 100, height: 100 },
  box: {},
  children: [
    {
      type: 'DEFS',
      props: {},
      box: {},
      children: [
        {
          type: 'LINEAR_GRADIENT',
          props: { id: 'grad1' },
          box: {},
          children: [
            { type: 'STOP', props: { offset: 0, stopColor: 'red' }, box: {} },
            {
              type: 'STOP',
              props: { offset: 1, stopColor: 'blue' },
              box: {},
            },
          ],
        },
      ],
    },
    {
      type: 'PATH',
      props: { d: 'M0 0L50 0L50 50L0 50Z', fill: 'url(#grad1)' },
      style: {},
      box: {},
    },
  ],
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
    expect(pages[0]).toContain('#FF6347');
    expect(pages[0]).toContain('stroke="#000000"');
    expect(pages[0]).toMatchSnapshot();
  });

  test('renders SVG path with linear gradient fill', async () => {
    const pages = await renderToSvg(doc([svgWithGradientPath()]));

    expect(pages[0]).toContain('<linearGradient');
    expect(pages[0]).toContain('fill="url(#');
    expect(pages[0]).toMatchSnapshot();
  });

  test('clips overflow-hidden views', async () => {
    const pages = await renderToSvg(
      doc([
        view({ width: 20, height: 20, overflow: 'hidden' }, [
          view({ width: 200, height: 200, backgroundColor: 'green' }),
        ]),
      ]),
    );

    expect(pages[0]).toContain('<clipPath');
    expect(pages[0]).toContain('clip-path="url(#');
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

  test('renders registered-font text as outline paths plus a selectable overlay', async () => {
    const pages = await renderToSvg(
      doc([text('Hi', { fontSize: 14, fontFamily: 'TestFont' })]),
    );

    expect(pages[0]).toContain('<path');
    expect(pages[0]).toMatch(/transform="translate\([^)]+\) scale\([^)]+\)"/);
    expect(pages[0]).toMatch(/<text[^>]*fill-opacity="0"[^>]*>Hi<\/text>/);
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

  test('links become inert annotations', async () => {
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
    expect(pages[0]).toContain('data-rpdf-link="https://react-pdf.org"');
    expect(pages[0]).not.toContain('<a ');
  });

  test('renders static form fields and a note', async () => {
    const pages = await renderToSvg(
      doc([
        textInput(
          { name: 'field1', value: 'Jane Doe' },
          { width: 120, height: 20 },
        ),
        checkbox({ name: 'field2', checked: true }, { width: 20, height: 20 }),
        select(
          { name: 'field3', select: ['Alpha', 'Beta'], value: 'Beta' },
          { width: 120, height: 20 },
        ),
        note('a helpful comment', { backgroundColor: 'yellow' }),
      ]),
    );

    expect(pages[0]).toContain('Jane Doe');
    expect(pages[0]).toContain('Beta');
    expect(pages[0]).toMatch(/<path[^>]*stroke="[^"]+"[^>]*\/>/);
    expect(pages[0]).toContain('<title>a helpful comment</title>');
  });

  test('form fields and a note also carry annotations for host interactivity', async () => {
    const pages = await renderToSvg(
      doc([
        textInput(
          { name: 'field1', value: 'Jane Doe' },
          { width: 120, height: 20 },
        ),
        checkbox({ name: 'field2', checked: true }, { width: 20, height: 20 }),
        select(
          { name: 'field3', select: ['Alpha', 'Beta'], value: 'Beta' },
          { width: 120, height: 20 },
        ),
        note('a helpful comment', { backgroundColor: 'yellow' }),
      ]),
    );

    expect(pages[0]).toContain('data-rpdf-field="text"');
    expect(pages[0]).toContain('data-rpdf-field-name="field1"');
    expect(pages[0]).toContain('data-rpdf-field-value="Jane Doe"');

    expect(pages[0]).toContain('data-rpdf-field="checkbox"');
    expect(pages[0]).toContain('data-rpdf-field-name="field2"');
    expect(pages[0]).toContain('data-rpdf-field-checked="true"');

    expect(pages[0]).toContain('data-rpdf-field="combo"');
    expect(pages[0]).toContain('data-rpdf-field-name="field3"');
    expect(pages[0]).toContain('data-rpdf-field-value="Beta"');
    expect(pages[0]).toContain(
      'data-rpdf-field-options="[&quot;Alpha&quot;,&quot;Beta&quot;]"',
    );

    expect(pages[0]).toContain('data-rpdf-note="a helpful comment"');
  });

  test('bookmarks and info flow through to outline XML and Dublin Core metadata', async () => {
    const chapter: any = {
      type: 'VIEW',
      props: { bookmark: 'Chapter 1' },
      style: { width: 100, height: 50 },
      box: {},
      children: [
        {
          type: 'VIEW',
          props: { bookmark: 'Section 1.1' },
          style: { width: 50, height: 20 },
          box: {},
          children: [],
        },
      ],
    };

    const resolved = await layout(doc([chapter]), fontStore);
    const ctx = new SVGDocument();
    ctx.info.Title = 'My Document';
    ctx.info.Author = 'Jane Doe';
    render(ctx as any, resolved);

    const [page] = ctx.pages;

    expect(page).toContain('<title>My Document</title>');
    expect(page).toContain(
      '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    );
    expect(page).toContain('<dc:title>My Document</dc:title>');
    expect(page).toContain('<dc:creator>Jane Doe</dc:creator>');

    const chapterMatch = page.match(
      /<rpdf:item title="Chapter 1" page="0" href="#([^"]+)">(.*)<\/rpdf:item><\/rpdf:outline>/,
    );
    expect(chapterMatch).not.toBeNull();
    const [, chapterHref, chapterInner] = chapterMatch!;
    expect(chapterInner).toContain('<rpdf:item title="Section 1.1"');

    const sectionMatch = chapterInner.match(/href="#([^"]+)"/);
    expect(sectionMatch).not.toBeNull();
    const sectionHref = sectionMatch![1];

    expect(page).toContain(`<g id="${chapterHref}"`);
    expect(page).toContain(`<g id="${sectionHref}"`);
  });
});

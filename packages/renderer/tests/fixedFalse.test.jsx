import { describe, expect, test } from 'vitest';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import {
  Document,
  Page,
  Text,
  View,
  renderToBuffer,
} from '@react-pdf/renderer';

const renderPages = async (children) => {
  const buffer = await renderToBuffer(
    <Document>
      <Page size={[200, 100]} style={{ fontSize: 10 }}>
        {children}
      </Page>
    </Document>,
  );
  const document = await getDocument({
    data: new Uint8Array(buffer),
    verbosity: 0,
  }).promise;

  try {
    return await Promise.all(
      Array.from({ length: document.numPages }, async (_, index) => {
        const page = await document.getPage(index + 1);
        const content = await page.getTextContent();
        return content.items
          .filter((item) => item.str)
          .map((item) => ({ text: item.str, y: item.transform[5] }));
      }),
    );
  } finally {
    await document.destroy();
  }
};

const block = (height, text, { key, ...props } = {}) => (
  <View key={key} style={{ height, flexShrink: 0 }} {...props}>
    <Text style={{ fontSize: 8, lineHeight: 1 }}>{text}</Text>
  </View>
);

const pageTexts = (pages) => pages.map((page) => page.map(({ text }) => text));

describe('explicit false fixed flags', () => {
  test.each([{}, { fixed: false }])(
    'honors explicit breaks for %j',
    async (props) => {
      const pages = await renderPages([
        block(30, 'before', { key: 'before' }),
        block(20, 'after', { key: 'after', break: true, ...props }),
      ]);

      expect(pageTexts(pages)).toEqual([['before'], ['after']]);
    },
  );

  test.each([{}, { fixed: false }])(
    'moves an unwrappable overflowing view for %j',
    async (props) => {
      const pages = await renderPages([
        block(70, 'before', { key: 'before' }),
        block(50, 'after', { key: 'after', wrap: false, ...props }),
      ]);

      expect(pageTexts(pages)).toEqual([['before'], ['after']]);
      expect(pages[1][0].y).toBeGreaterThan(80);
    },
  );

  test.each([{}, { fixed: false }])(
    'honors minPresenceAhead for %j',
    async (props) => {
      const pages = await renderPages([
        block(60, 'before', { key: 'before' }),
        block(20, 'heading', {
          key: 'heading',
          minPresenceAhead: 40,
          ...props,
        }),
        block(50, 'following', { key: 'following' }),
      ]);

      expect(pageTexts(pages)).toEqual([['before'], ['heading', 'following']]);
    },
  );

  test.each([{}, { fixed: false }])(
    'counts a fitting future sibling for %j',
    async (props) => {
      const pages = await renderPages([
        block(60, 'before', { key: 'before' }),
        block(20, 'heading', { key: 'heading', minPresenceAhead: 50 }),
        block(10, 'following', { key: 'following', ...props }),
      ]);

      expect(pageTexts(pages)).toEqual([['before', 'heading', 'following']]);
    },
  );

  test('repeats true fixed content across pages', async () => {
    const pages = await renderPages([
      block(10, 'header', { key: 'header', fixed: true }),
      block(60, 'before', { key: 'before' }),
      block(50, 'after', { key: 'after', wrap: false }),
    ]);

    expect(pageTexts(pages)).toEqual([
      ['header', 'before'],
      ['header', 'after'],
    ]);
  });

  test('keeps first-page content with minPresenceAhead to avoid repeated breaks', async () => {
    const pages = await renderPages([
      block(20, 'heading', {
        key: 'heading',
        fixed: false,
        minPresenceAhead: 200,
      }),
      block(10, 'following', { key: 'following' }),
    ]);

    expect(pageTexts(pages)).toEqual([['heading', 'following']]);
  });
});

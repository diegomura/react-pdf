import { describe, expect, test } from 'vitest';

import { Document, Page, Link, Font, Text, View } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

// pdf.js does not render default fonts in node and I use Open Sans (:
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

const mount = async (children, size = [50, 25]) => {
  const image = await renderToImage(
    <Document>
      <Page size={size} style={{ alignItems: 'flex-start' }}>
        {children}
      </Page>
    </Document>,
  );

  return image;
};

describe('Link', () => {
  test('should render text', async () => {
    const image = await mount(
      <Link
        href="https://github.com/wojtekmaj/react-pdf"
        style={{ fontFamily: 'Open Sans' }}
      >
        hello
      </Link>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render TEXT component', async () => {
    const image = await mount(
      <Link
        href="https://github.com/wojtekmaj/react-pdf"
        style={{ fontFamily: 'Open Sans', textDecoration: 'none' }}
      >
        he
        <Text style={{ textDecoration: 'underline' }}>llo</Text>
      </Link>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render hitSlop debug with uniform value', async () => {
    const image = await mount(
      <Link
        href="https://example.com"
        hitSlop={10}
        style={{ margin: 30 }}
        debug
      >
        <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
      </Link>,
      [100, 100],
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render hitSlop debug with per-side values', async () => {
    const image = await mount(
      <Link
        href="https://example.com"
        hitSlop={{ top: 5, bottom: 15, left: 10, right: 10 }}
        style={{ margin: 30 }}
        debug
      >
        <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
      </Link>,
      [100, 100],
    );

    expect(image).toMatchImageSnapshot();
  });
});

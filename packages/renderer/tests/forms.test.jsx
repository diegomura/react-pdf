import { describe, expect, test } from 'vitest';

import ReactPDF from '../src/node';

const { Document, Page, Text, TextInput, Font } = ReactPDF;

Font.register({
  family: 'Custom',
  src: new URL('../../layout/tests/assets/font.ttf', import.meta.url).pathname,
});

describe('forms', () => {
  test('should embed the complete font for text inputs instead of the document subset', async () => {
    const document = await ReactPDF.renderToString(
      <Document>
        <Page style={{ fontFamily: 'Custom' }}>
          <Text>Label</Text>
          <TextInput name="country" value="Switzerland" fontSize={12} />
        </Page>
      </Document>,
    );

    expect(document).toMatch(/\/DA \(\/F\d+ 12 Tf 0 g\)/);
    expect(document).toContain('/BaseFont /Roboto-Regular');
  });

  test('should use style fontSize for text inputs when the prop is not set', async () => {
    const document = await ReactPDF.renderToString(
      <Document>
        <Page style={{ fontFamily: 'Custom' }}>
          <Text>Label</Text>
          <TextInput
            name="country"
            value="Switzerland"
            style={{ height: 20, fontSize: 9.5 }}
          />
        </Page>
      </Document>,
    );

    expect(document).toMatch(/\/DA \(\/F\d+ 9\.5 Tf 0 g\)/);
  });
});

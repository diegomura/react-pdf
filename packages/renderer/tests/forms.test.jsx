import { describe, expect, test } from 'vitest';

import ReactPDF from '../src/node';

const { Document, Page, Text, TextInput, Font } = ReactPDF;

Font.register({
  family: 'Custom',
  src: new URL('../../layout/tests/assets/font.ttf', import.meta.url).pathname,
});

const fontOfDA = (document, size) => {
  const id = document.match(new RegExp(`/DA \\(/(F\\d+) ${size} Tf 0 g\\)`))[1];
  const ref = document.match(new RegExp(`/${id} (\\d+) 0 R`))[1];

  return document.match(new RegExp(`\\n${ref} 0 obj[^]*?/BaseFont /(\\S+)`))[1];
};

describe('forms', () => {
  test('should render text input values in a standard font instead of the document font subset', async () => {
    const document = await ReactPDF.renderToString(
      <Document>
        <Page style={{ fontFamily: 'Custom' }}>
          <Text>Label</Text>
          <TextInput name="country" value="Switzerland" fontSize={12} />
        </Page>
      </Document>,
    );

    expect(fontOfDA(document, '12')).toBe('Helvetica');
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

    expect(fontOfDA(document, '9\\.5')).toBe('Helvetica');
  });
});

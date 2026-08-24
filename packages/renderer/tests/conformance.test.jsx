import { describe, expect, test } from 'vitest';

import ReactPDF from '../src/node';

const { Document, Page, View } = ReactPDF;

const TestDocument = ({ conformance }) => (
  <Document conformance={conformance}>
    <Page>
      <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
    </Page>
  </Document>
);

describe('conformance', () => {
  test('should render PDF/A-1b document as PDF 1.4 with conformance metadata', async () => {
    const document = await ReactPDF.renderToString(
      <TestDocument conformance="PDF/A-1b" />,
    );

    expect(document.indexOf('%PDF-1.4')).toBe(0);
    expect(document).toContain('<pdfaid:part>1</pdfaid:part>');
    expect(document).toContain('<pdfaid:conformance>B</pdfaid:conformance>');
    expect(document).toContain('/OutputIntents');
  });

  test('should render PDF/A-2b document as PDF 1.7 with conformance metadata', async () => {
    const document = await ReactPDF.renderToString(
      <TestDocument conformance="PDF/A-2b" />,
    );

    expect(document.indexOf('%PDF-1.7')).toBe(0);
    expect(document).toContain('<pdfaid:part>2</pdfaid:part>');
    expect(document).toContain('<pdfaid:conformance>B</pdfaid:conformance>');
  });

  test('should respect explicit pdfVersion over conformance default', async () => {
    const document = await ReactPDF.renderToString(
      <Document conformance="PDF/A-3b" pdfVersion="1.6">
        <Page>
          <View style={{ width: 20, height: 20 }} />
        </Page>
      </Document>,
    );

    expect(document.indexOf('%PDF-1.6')).toBe(0);
    expect(document).toContain('<pdfaid:part>3</pdfaid:part>');
  });
});

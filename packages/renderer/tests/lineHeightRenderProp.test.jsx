import { describe, expect, test } from 'vitest';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    lineHeight: 1.5,
    fontSize: 9,
  },
});

const getTextContent = async (pdfBuffer) => {
  const document = await getDocument({
    data: new Uint8Array(pdfBuffer),
    verbosity: 0,
  }).promise;

  const page = await document.getPage(1);
  const content = await page.getTextContent();

  return content.items.map((item) => item.str).join(' ');
};

describe('lineHeight + render prop end-to-end (issues #3083, #3402, #2988)', () => {
  test('should render dynamic text when lineHeight is set on page', async () => {
    const doc = (
      <Document>
        <Page size="LETTER" style={styles.page}>
          <Text>Static text renders fine</Text>
          <View fixed>
            <Text
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </Page>
      </Document>
    );

    const buffer = await renderToBuffer(doc);
    const text = await getTextContent(buffer);

    // Both static and dynamic text should be present
    expect(text).toContain('Static text renders fine');
    expect(text).toContain('1 / 1');
  });

  test('should render dynamic text without lineHeight (control test)', async () => {
    const doc = (
      <Document>
        <Page size="LETTER" style={{ fontSize: 9 }}>
          <Text>Static text renders fine</Text>
          <View fixed>
            <Text
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </Page>
      </Document>
    );

    const buffer = await renderToBuffer(doc);
    const text = await getTextContent(buffer);

    expect(text).toContain('Static text renders fine');
    expect(text).toContain('1 / 1');
  });
});

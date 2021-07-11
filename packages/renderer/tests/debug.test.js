import React from 'react';
import { Document, Page, View, Text, Font } from '..';
import renderToImage from './renderComponent';

// pdf.js does not render default fonts in node and I use Open Sans (:
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

describe('debug', () => {
  test('should show size of Text component', async () => {
    const image = await renderToImage(
      <Document style={{ fontFamily: 'Open Sans' }}>
        <Page size={[50, 25]}>
          <Text debug>hello</Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should show paddings and margins', async () => {
    const image = await renderToImage(
      <Document style={{ fontFamily: 'Open Sans' }}>
        <Page size={[110, 65]}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ margin: 20 }} debug>
              a
            </Text>
            <Text style={{ padding: 20 }} debug>
              b
            </Text>
            <Text debug>c</Text>
          </View>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should show origin pointer', async () => {
    const image = await renderToImage(
      <Document style={{ fontFamily: 'Open Sans' }}>
        <Page size={[50, 25]}>
          <Text style={{ transformOrigin: 'top left' }} debug>
            hello
          </Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});

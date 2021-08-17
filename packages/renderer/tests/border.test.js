import React from 'react';
import { Document, Page, View } from '..';
import renderToImage from './renderComponent';

const Border = ({ borderWidth }) => (
  <Document>
    <Page
      size={[60, 60]}
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <View
        style={{
          border: `${borderWidth}px solid black`,
          width: 50,
          height: 50,
        }}
      />
    </Page>
  </Document>
);

describe('border', () => {
  test('should fully fill corners', async () => {
    const image = await renderToImage(<Border borderWidth={20} />);

    expect(image).toMatchImageSnapshot();
  });

  test('should work fine with small border width', async () => {
    const image = await renderToImage(<Border borderWidth={1} />);

    expect(image).toMatchImageSnapshot();
  });
});

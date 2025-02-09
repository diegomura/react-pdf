import { describe, expect, test } from 'vitest';

import { Document, Page, View } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const mount = async (children) => {
  const image = await renderToImage(
    <Document>
      <Page size={[100, 100]}>{children}</Page>
    </Document>,
  );

  return image;
};

const items = [
  'red',
  'red',
  'red',
  'green',
  'green',
  'green',
  'blue',
  'blue',
  'blue',
];

describe('flex', () => {
  test('should support gap', async () => {
    const image = await mount(
      <View
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: '#e2e2e2',
          gap: 30,
        }}
      >
        {items.map((color, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              backgroundColor: color,
            }}
          />
        ))}
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should support percentage gap', async () => {
    const image = await mount(
      <View
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: '#e2e2e2',
          gap: '15%',
        }}
      >
        {items.map((color, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              backgroundColor: color,
            }}
          />
        ))}
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should support rowGap and columnGap', async () => {
    const image = await mount(
      <View
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: '#e2e2e2',
          rowGap: '60px',
          columnGap: '80px',
        }}
      >
        {items.slice(0, 4).map((color, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              backgroundColor: color,
            }}
          />
        ))}
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should support percentage rowGap and columnGap', async () => {
    const image = await mount(
      <View
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          backgroundColor: '#e2e2e2',
          rowGap: '10%',
          columnGap: '20%',
        }}
      >
        {items.map((color, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              backgroundColor: color,
            }}
          />
        ))}
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });
});

/* eslint-disable react/no-array-index-key */
import { describe, expect, test } from '@jest/globals';

import { Document, Page, View } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const mount = async children => {
  const image = await renderToImage(
    <Document>
      <Page style={{ backgroundColor: '#e2e2e2' }} size={[100, 25]}>
        {children}
      </Page>
    </Document>,
  );

  return image;
};

describe('flex shorthand', () => {
  test('should support auto', async () => {
    const image = await mount(
      <View style={{ flexDirection: 'row', gap: 2 }}>
        <View style={{ height: 20, width: 20, backgroundColor: 'red' }} />
        <View
          style={{
            height: 20,
            width: 20,
            flex: 'auto',
            backgroundColor: 'red',
          }}
        />
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should support flex-basis auto', async () => {
    const image = await mount(
      <View style={{ flexDirection: 'row', gap: 2 }}>
        <View
          style={{
            height: 20,
            width: 20,
            flex: '1 0 auto',
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            height: 20,
            width: 20,
            flex: '1 0 auto',
            backgroundColor: 'red',
          }}
        />
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should do not grow on default', async () => {
    const image = await mount(
      <View style={{ flexDirection: 'row', gap: 2 }}>
        <View
          style={{
            height: 20,
            width: 20,
            flexBasis: 20,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            height: 20,
            width: 20,
            flexBasis: 20,
            backgroundColor: 'red',
          }}
        />
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should shrink on default', async () => {
    const image = await mount(
      <View style={{ flexDirection: 'row', gap: 2 }}>
        <View
          style={{
            height: 20,
            width: 20,
            flexBasis: 60,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            height: 20,
            width: 20,
            flexBasis: 60,
            backgroundColor: 'red',
          }}
        />
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });
});

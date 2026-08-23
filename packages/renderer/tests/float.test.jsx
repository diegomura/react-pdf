import { describe, expect, test } from 'vitest';

import { Document, Page, View, Text } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const mount = async (children, pageProps = {}) => {
  const image = await renderToImage(
    <Document>
      <Page size={[300, 300]} style={{ padding: 10 }} {...pageProps}>
        {children}
      </Page>
    </Document>,
  );

  return image;
};

describe.each([
  ['legacy engine', {}],
  ['next engine', { experimentalPagination: true }],
])('float (%s)', (_, pageProps) => {
  test('should wrap text around left float', async () => {
    const image = await mount(
      <View>
        <View
          style={{
            float: 'left',
            width: 60,
            height: 60,
            marginRight: 8,
            backgroundColor: 'red',
          }}
        />
        <Text style={{ fontSize: 10 }}>{text}</Text>
      </View>,
      pageProps,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should wrap text around right float', async () => {
    const image = await mount(
      <View>
        <View
          style={{
            float: 'right',
            width: 60,
            height: 60,
            marginLeft: 8,
            backgroundColor: 'blue',
          }}
        />
        <Text style={{ fontSize: 10 }}>{text}</Text>
      </View>,
      pageProps,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should wrap text between multiple floats', async () => {
    const image = await mount(
      <View>
        <View
          style={{
            float: 'left',
            width: 50,
            height: 50,
            marginRight: 8,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            float: 'right',
            width: 50,
            height: 50,
            marginLeft: 8,
            backgroundColor: 'blue',
          }}
        />
        <Text style={{ fontSize: 10 }}>{text}</Text>
      </View>,
      pageProps,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should split wrapped text across pages instead of moving it whole', async () => {
    const image = await mount(
      <>
        <Text style={{ fontSize: 14, marginBottom: 10 }}>Title</Text>
        <View>
          <View
            style={{
              float: 'left',
              width: 60,
              height: 60,
              marginRight: 8,
              backgroundColor: 'red',
            }}
          />
          <Text style={{ fontSize: 12 }}>
            {text} {text} {text} {text} {text} {text}
          </Text>
        </View>
      </>,
      pageProps,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should position clear elements below floats', async () => {
    const image = await mount(
      <View>
        <View
          style={{
            float: 'left',
            width: 50,
            height: 80,
            marginRight: 8,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            float: 'right',
            width: 50,
            height: 40,
            marginLeft: 8,
            backgroundColor: 'blue',
          }}
        />
        <Text style={{ fontSize: 10 }}>Wrapping text between floats.</Text>
        <View style={{ clear: 'left', backgroundColor: 'green', padding: 4 }}>
          <Text style={{ fontSize: 8, color: 'white' }}>clear left</Text>
        </View>
        <View style={{ clear: 'both', backgroundColor: 'orange', padding: 4 }}>
          <Text style={{ fontSize: 8 }}>clear both</Text>
        </View>
      </View>,
      pageProps,
    );

    expect(image).toMatchImageSnapshot();
  });
});

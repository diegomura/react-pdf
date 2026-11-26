import { describe, expect, test } from 'vitest';

import { Document, Page, View, Text, Svg, Polygon } from '@react-pdf/renderer';
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

const leftFloat = (pageProps) =>
  mount(
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

const rightFloat = (pageProps) =>
  mount(
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

const multipleFloats = (pageProps) =>
  mount(
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

const splitWrappedText = (pageProps) =>
  mount(
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

const circleShapeOutside = (pageProps) =>
  mount(
    <View>
      <View
        style={{
          float: 'left',
          width: 100,
          height: 100,
          shapeOutside: 'circle(50%)',
          borderRadius: 50,
          backgroundColor: 'red',
        }}
      />
      <Text style={{ fontSize: 10 }}>
        {text} {text}
      </Text>
    </View>,
    pageProps,
  );

const polygonShapeOutside = (pageProps) =>
  mount(
    <View>
      <View
        style={{
          float: 'right',
          width: 100,
          height: 100,
          shapeOutside: 'polygon(100% 0%, 100% 100%, 0% 100%)',
        }}
      >
        <Svg width={100} height={100} viewBox="0 0 100 100">
          <Polygon points="100,0 100,100 0,100" fill="blue" />
        </Svg>
      </View>
      <Text style={{ fontSize: 10 }}>
        {text} {text}
      </Text>
    </View>,
    pageProps,
  );

const clearElements = (pageProps) =>
  mount(
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

describe('float (legacy engine)', () => {
  test('should wrap text around left float', async () => {
    expect(await leftFloat({})).toMatchImageSnapshot();
  });

  test('should wrap text around right float', async () => {
    expect(await rightFloat({})).toMatchImageSnapshot();
  });

  test('should wrap text between multiple floats', async () => {
    expect(await multipleFloats({})).toMatchImageSnapshot();
  });

  test('should split wrapped text across pages instead of moving it whole', async () => {
    expect(await splitWrappedText({})).toMatchImageSnapshot();
  });

  test('should position clear elements below floats', async () => {
    expect(await clearElements({})).toMatchImageSnapshot();
  });

  test('should wrap text around circle shape-outside', async () => {
    expect(await circleShapeOutside({})).toMatchImageSnapshot();
  });

  test('should wrap text around polygon shape-outside', async () => {
    expect(await polygonShapeOutside({})).toMatchImageSnapshot();
  });
});

describe('float (next engine)', () => {
  test('should wrap text around left float', async () => {
    expect(
      await leftFloat({ experimentalPagination: true }),
    ).toMatchImageSnapshot();
  });

  test('should wrap text around right float', async () => {
    expect(
      await rightFloat({ experimentalPagination: true }),
    ).toMatchImageSnapshot();
  });

  test('should wrap text between multiple floats', async () => {
    expect(
      await multipleFloats({ experimentalPagination: true }),
    ).toMatchImageSnapshot();
  });

  test('should split wrapped text across pages instead of moving it whole', async () => {
    expect(
      await splitWrappedText({ experimentalPagination: true }),
    ).toMatchImageSnapshot();
  });

  test('should position clear elements below floats', async () => {
    expect(
      await clearElements({ experimentalPagination: true }),
    ).toMatchImageSnapshot();
  });

  test('should wrap text around circle shape-outside', async () => {
    expect(
      await circleShapeOutside({ experimentalPagination: true }),
    ).toMatchImageSnapshot();
  });

  test('should wrap text around polygon shape-outside', async () => {
    expect(
      await polygonShapeOutside({ experimentalPagination: true }),
    ).toMatchImageSnapshot();
  });
});

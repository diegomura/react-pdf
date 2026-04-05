import { describe, expect, test } from 'vitest';
import fs from 'fs';
import url from 'url';
import path from 'path';
import {
  Document,
  Page,
  View,
  Text,
  ImageBackground,
} from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const Orientation1 = fs.readFileSync(`${__dirname}/images/orientation-1.jpeg`);

const mount = async (children) => {
  const image = await renderToImage(
    <Document>
      <Page size="A6">{children}</Page>
    </Document>,
  );

  return image;
};

describe('ImageBackground', () => {
  test('should render image behind children', async () => {
    const image = await mount(
      <ImageBackground
        src={Orientation1}
        style={{ width: 200, height: 200, padding: 20 }}
      >
        <Text style={{ color: 'white', fontSize: 24 }}>Hello World</Text>
      </ImageBackground>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render with nested views', async () => {
    const image = await mount(
      <ImageBackground
        src={Orientation1}
        style={{ width: 250, height: 250, padding: 10 }}
      >
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            padding: 10,
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: 16 }}>Overlay Content</Text>
        </View>
      </ImageBackground>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render with source prop', async () => {
    const image = await mount(
      <ImageBackground
        source={Orientation1}
        style={{ width: 200, height: 200 }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>Source Prop</Text>
      </ImageBackground>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render without children', async () => {
    const image = await mount(
      <ImageBackground
        src={Orientation1}
        style={{ width: 200, height: 200 }}
      />,
    );

    expect(image).toMatchImageSnapshot();
  });
});

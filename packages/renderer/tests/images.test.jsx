import { describe, expect, test } from 'vitest';
import fs from 'fs';
import url from 'url';
import path from 'path';
import { Document, Page, View, Image } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const Orientation1 = fs.readFileSync(`${__dirname}/images/orientation-1.jpeg`);
const Orientation2 = fs.readFileSync(`${__dirname}/images/orientation-2.jpeg`);
const Orientation3 = fs.readFileSync(`${__dirname}/images/orientation-3.jpeg`);
const Orientation4 = fs.readFileSync(`${__dirname}/images/orientation-4.jpeg`);
const Orientation5 = fs.readFileSync(`${__dirname}/images/orientation-5.jpeg`);
const Orientation6 = fs.readFileSync(`${__dirname}/images/orientation-6.jpeg`);
const Orientation7 = fs.readFileSync(`${__dirname}/images/orientation-7.jpeg`);
const Orientation8 = fs.readFileSync(`${__dirname}/images/orientation-8.jpeg`);

const mount = async children => {
  const image = await renderToImage(
    <Document>
      <Page>{children}</Page>
    </Document>,
  );

  return image;
};

describe('Image', () => {
  test('should render jpgs with different exif orientations', async () => {
    const image = await mount(
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Image src={Orientation1} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation2} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation3} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation4} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation5} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation6} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation7} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation8} style={{ width: 220, margin: 5 }} />
      </View>,
    );

    expect(image).toMatchImageSnapshot();
  });
});

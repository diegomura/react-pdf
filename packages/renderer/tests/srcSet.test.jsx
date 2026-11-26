import { describe, expect, test } from 'vitest';
import url from 'url';
import path from 'path';
import { Document, Page, Image } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const small = path.resolve(__dirname, 'images/srcset-small.png');
const medium = path.resolve(__dirname, 'images/srcset-medium.png');
const large = path.resolve(__dirname, 'images/srcset-large.png');

const srcSet = `${small} 200w, ${medium} 400w, ${large} 600w`;

describe('srcSet', () => {
  test('should select different sources based on page width', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={{ width: 150, height: 100 }}>
          <Image src={small} srcSet={srcSet} style={{ width: 60 }} />
        </Page>
        <Page size={{ width: 300, height: 100 }}>
          <Image src={small} srcSet={srcSet} style={{ width: 60 }} />
        </Page>
        <Page size={{ width: 500, height: 100 }}>
          <Image src={small} srcSet={srcSet} style={{ width: 60 }} />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should respect sizes attribute over page width', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={{ width: 500, height: 100 }}>
          <Image
            src={small}
            srcSet={srcSet}
            sizes={150}
            style={{ width: 60 }}
          />
        </Page>
        <Page size={{ width: 500, height: 100 }}>
          <Image
            src={small}
            srcSet={srcSet}
            sizes="50vw"
            style={{ width: 60 }}
          />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should evaluate sizes media conditions', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={{ width: 300, height: 100 }}>
          <Image
            src={small}
            srcSet={srcSet}
            sizes="(min-width: 400) 500, 150"
            style={{ width: 60 }}
          />
        </Page>
        <Page size={{ width: 500, height: 100 }}>
          <Image
            src={small}
            srcSet={srcSet}
            sizes="(min-width: 400) 500, 150"
            style={{ width: 60 }}
          />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});

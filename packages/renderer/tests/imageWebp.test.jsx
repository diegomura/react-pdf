import { describe, expect, test } from 'vitest';
import fs from 'fs';
import url from 'url';
import path from 'path';
import { Document, Page, View, Image } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const webpImage = fs.readFileSync(`${__dirname}/images/test.webp`);

describe('imageWebp', () => {
  test('should render webp image without throwing and produce non-blank output', async () => {
    const image = await renderToImage(
      <Document>
        <Page>
          <View>
            <Image src={webpImage} style={{ width: 220, margin: 5 }} />
          </View>
        </Page>
      </Document>,
    );

    expect(image).toBeTruthy();

    let isBlank = true;
    for (let i = 0; i < image.length; i++) {
      if (image[i] !== 255 && image[i] !== 0) {
        isBlank = false;
        break;
      }
    }
    expect(isBlank).toBe(false);
  });
});

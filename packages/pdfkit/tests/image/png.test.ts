import fs from 'fs';
import { unzlibSync } from 'fflate';
import { describe, expect, it } from 'vitest';

// src/image/png.js reads BROWSER as a bare identifier that rollup replaces at
// build time; a global stands in for it so the browser branch can be exercised.
globalThis.BROWSER = true;

const { default: PNGImage } = await import('../../src/image/png.js');

const fixtureUrl = new URL('../assets/interlaced-rgb.png', import.meta.url);

const createDocument = () => {
  const refs: { data: Record<string, unknown>; value?: unknown }[] = [];

  return {
    refs,
    ref(data = {}) {
      const ref = {
        data,
        value: undefined,
        end(value?: unknown) {
          this.value = value;
        },
      };

      refs.push(ref);
      return ref;
    },
  };
};

describe('PNG images', () => {
  it('deflates decoded interlaced RGB pixels in browser builds', () => {
    // 8x8 RGB PNG generated with Adam7 interlace, filter type 0 rows, no alpha, and no tRNS chunk.
    const image = new PNGImage(fs.readFileSync(fixtureUrl), 'interlaced-rgb');

    expect(image.image.interlaceMethod).toBe(1);
    expect(image.image.hasAlphaChannel).toBe(false);
    expect(image.image.transparency).toEqual({});

    const decodedPixels = new Uint8Array(
      image.width * image.height * image.image.colors,
    );

    image.image.decodePixels = (callback) => callback(decodedPixels);

    const document = createDocument();

    expect(() => image.embed(document)).not.toThrow();

    // FlateDecode expects a zlib wrapper, not a raw deflate stream
    const imgData = document.refs[0].value as Uint8Array;
    expect(unzlibSync(imgData)).toEqual(decodedPixels);
  });
});

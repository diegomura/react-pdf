import fs from 'fs';
import { afterEach, describe, expect, it, vi } from 'vitest';

import PNGImage from '../../src/image/png.js';

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
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('deflates decoded interlaced RGB pixels as a Buffer in browser zlib builds', () => {
    vi.stubGlobal('BROWSER', true);

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
    expect(Buffer.isBuffer(document.refs[0].value)).toBe(true);
  });
});

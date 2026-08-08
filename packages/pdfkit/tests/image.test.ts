import fs from 'fs';
import { describe, expect, it } from 'vitest';

import PDFImage from '../src/image.js';
import JPEG from '../src/image/jpeg.js';
import PNG from '../src/image/png.js';

// SOI + SOF0 (16x32, 8 bit, 3 channels). Kept under 20 bytes so the EXIF
// parser bails out and orientation falls back to 1.
const JPEG_BYTES = new Uint8Array([
  0xff, 0xd8, 0xff, 0xc0, 0x00, 0x11, 0x08, 0x00, 0x10, 0x00, 0x20, 0x03,
]);

const PNG_BYTES = new Uint8Array(
  fs.readFileSync(new URL('./assets/interlaced-rgb.png', import.meta.url)),
);

const toBase64 = (bytes: Uint8Array) => Buffer.from(bytes).toString('base64');

describe('PDFImage.open', () => {
  it('reads JPEG from a plain Uint8Array', () => {
    const image = PDFImage.open(JPEG_BYTES, 'jpeg');

    expect(image).toBeInstanceOf(JPEG);
    expect(image.width).toBe(32);
    expect(image.height).toBe(16);
    expect(image.bits).toBe(8);
    expect(image.colorSpace).toBe('DeviceRGB');
    expect(image.orientation).toBe(1);
  });

  it('reads PNG from a plain Uint8Array', () => {
    expect(PDFImage.open(PNG_BYTES, 'png')).toBeInstanceOf(PNG);
  });

  it('reads from a Buffer', () => {
    expect(PDFImage.open(Buffer.from(JPEG_BYTES), 'jpeg')).toBeInstanceOf(JPEG);
  });

  it('reads from an ArrayBuffer', () => {
    const image = PDFImage.open(JPEG_BYTES.slice().buffer, 'jpeg');

    expect(image).toBeInstanceOf(JPEG);
    expect(image.width).toBe(32);
  });

  it('reads from a base64 data URI', () => {
    const jpeg = PDFImage.open(
      `data:image/jpeg;base64,${toBase64(JPEG_BYTES)}`,
      'jpeg',
    );
    const png = PDFImage.open(
      `data:image/png;base64,${toBase64(PNG_BYTES)}`,
      'png',
    );

    expect(jpeg).toBeInstanceOf(JPEG);
    expect(jpeg.width).toBe(32);
    expect(png).toBeInstanceOf(PNG);
  });

  it('throws on unknown formats', () => {
    expect(() => PDFImage.open(new Uint8Array([1, 2, 3, 4]), 'nope')).toThrow(
      'Unknown image format.',
    );
  });
});

import fs from 'fs';
import { describe, expect, it } from 'vitest';

import PDFDocument from '../src/document.node.js';

const image = fs.readFileSync(
  new URL('./assets/interlaced-rgb.png', import.meta.url),
);

const render = (options = {}) => {
  const chunks: Uint8Array[] = [];
  const doc = new PDFDocument(options);

  doc.on('data', (chunk) => chunks.push(chunk));

  doc.info.Title = 'Buffer-free — ünïcodé';
  doc.text('hello');
  doc.image(image, 0, 0);
  doc.file(new Uint8Array([1, 2, 3]), { name: 'attachment.bin' });
  doc.addPage();
  doc.end();

  return new Promise<Uint8Array[]>((resolve, reject) => {
    doc.on('end', () => resolve(chunks));
    doc.on('error', reject);
  });
};

// The browser bundle should not need a Buffer polyfill for our own sources, so
// nothing under src/ may touch the global.
describe('generating without a global Buffer', () => {
  it.each([
    ['plain', {}],
    ['compressed', { compress: true }],
    ['encrypted (RC4)', { pdfVersion: '1.3', userPassword: 'pw' }],
    ['encrypted (AES-128)', { pdfVersion: '1.6', userPassword: 'pw' }],
    ['encrypted (AES-256)', { pdfVersion: '1.7ext3', userPassword: 'pw' }],
    ['tagged with metadata', { pdfVersion: '1.7', subset: 'PDF/A-3b' }],
  ])('renders a %s document', async (_name, options) => {
    const { Buffer } = globalThis;
    // @ts-expect-error deliberately removing the global
    delete globalThis.Buffer;

    try {
      const chunks = await render(options);
      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks.every((chunk) => chunk instanceof Uint8Array)).toBe(true);
    } finally {
      globalThis.Buffer = Buffer;
    }
  });
});

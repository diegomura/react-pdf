import fs from 'fs';
import { describe, expect, it } from 'vitest';

// The browser build inlines its own Buffer polyfill, so this has to exercise the
// built artifact instead of src. The previous polyfill shipped a Buffer whose
// concat() rejected plain Uint8Array chunks, which broke font embedding in the
// browser because fontkit v2's subset.encode() returns a Uint8Array.
const bundleUrl = new URL('../lib/pdfkit.browser.js', import.meta.url);

if (!fs.existsSync(bundleUrl)) {
  throw new Error(
    'lib/pdfkit.browser.js is missing. Build the package before running this test.',
  );
}

const { default: PDFDocument, registerStdFonts } = await import(bundleUrl.href);
const { default: Helvetica } = await import(
  new URL('../lib/standard-fonts/Helvetica.js', import.meta.url).href,
);

registerStdFonts(Helvetica);

const render = async (options, fill: (doc) => void) => {
  const doc = new PDFDocument(options);
  const chunks: Uint8Array[] = [];

  doc.on('data', (chunk: Uint8Array) => chunks.push(chunk));
  const done = new Promise((resolve, reject) => {
    doc.on('end', resolve);
    doc.on('error', reject);
  });

  fill(doc);
  doc.end();
  await done;

  const size = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const output = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
};

describe('browser bundle', () => {
  it('writes Uint8Array chunks to a stream reference', async () => {
    let ref;

    const output = await render({ compress: false }, (doc) => {
      ref = doc.ref();
      ref.end(new Uint8Array([1, 2, 3, 4]));
    });

    expect(ref.data.Length).toBe(4);
    expect(Array.from(output).join(',')).toContain('1,2,3,4');
  });

  it('deflates Uint8Array chunks when compression is on', async () => {
    let ref;

    await render({ compress: true }, (doc) => {
      ref = doc.ref();
      ref.end(new Uint8Array(1024));
    });

    expect(ref.data.Filter).toBe('FlateDecode');
    expect(ref.data.Length).toBeLessThan(1024);
  });
});

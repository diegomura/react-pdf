import { beforeEach, describe, expect, test } from 'vitest';
import zlib from 'zlib';

import PDFReference from '../../src/reference';
import PDFDocument from '../../src/document';
import { logData } from './helpers';
import matcher from './toContainChunk';

expect.extend(matcher);

describe('PDFReference', () => {
  let document;
  beforeEach(() => {
    document = new PDFDocument();
  });

  test('instantiated without data', () => {
    const ref = new PDFReference(document, 1);

    expect(ref.id).toBeDefined();
    expect(ref.data).toBeDefined();
    expect(ref.data).toBeInstanceOf(Object);
  });

  test('instantiated with data', () => {
    const refData = { Pages: 0 };
    const ref = new PDFReference(document, 1, refData);

    expect(ref.id).toBe(1);
    expect(ref.data).toBe(refData);
  });

  test('written data of empty reference', () => {
    const ref = new PDFReference(document, 1);

    const docData = logData(document);
    ref.finalize();

    expect(docData).toContainChunk(['1 0 obj', '<<\n>>', 'endobj']);
  });

  test('written data of reference with uncompressed data', () => {
    const docData = logData(document);
    const chunk = Buffer.from('test');
    const ref = new PDFReference(document, 1);
    ref.compress = false;
    ref.write(chunk);
    ref.finalize();
    expect(docData).toContainChunk([
      '1 0 obj',
      `<<
/Length ${chunk.length}
>>`,
      'stream',
      chunk,
      '\nendstream',
      'endobj'
    ]);
  });

  test('written data of reference with compressed data', () => {
    const docData = logData(document);
    const chunk = Buffer.from('test');
    const compressed = zlib.deflateSync(chunk);
    const ref = new PDFReference(document, 1);
    ref.write(chunk);

    ref.finalize();
    expect(docData).toContainChunk([
      '1 0 obj',
      `<<
/Length ${compressed.length}
/Filter /FlateDecode
>>`,
      'stream',
      compressed,
      '\nendstream',
      'endobj'
    ]);
  });
});

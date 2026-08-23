import { describe, expect, it } from 'vitest';

import { fromBinaryString, toBinaryString } from '../src/binary.js';
import PDFDocument from '../src/document.node.js';
import PDFNameTree from '../src/name_tree.js';
import PDFNumberTree from '../src/number_tree.js';
import PDFObject from '../src/object.js';

// Stand-in for a real cipher: uppercasing keeps the expected output readable
// while still showing that every string went through it individually
const encryptFn = (bytes: Uint8Array) =>
  fromBinaryString(toBinaryString(bytes).toUpperCase());

describe.each([
  [
    'name tree',
    {
      Tree: PDFNameTree,
      keys: ['a', 'b'],
      plain: `<<
  /Limits [(a) (b)]
  /Names [
    (a) (one)
    (b) (two)
]
>>`,
      // the keys are PDF strings, so they get encrypted just like the values
      encrypted: `<<
  /Limits [(A) (B)]
  /Names [
    (A) (ONE)
    (B) (TWO)
]
>>`,
    },
  ],
  [
    'number tree',
    {
      Tree: PDFNumberTree,
      keys: [1, 2],
      plain: `<<
  /Limits [1 2]
  /Nums [
    1 (one)
    2 (two)
]
>>`,
      // the keys are numbers rather than strings, so they stay as they are
      encrypted: `<<
  /Limits [1 2]
  /Nums [
    1 (ONE)
    2 (TWO)
]
>>`,
    },
  ],
])('%s', (_treeName, { Tree, keys, plain, encrypted }) => {
  const tree = () => {
    const result = new Tree();
    result.add(keys[0], new String('one'));
    result.add(keys[1], new String('two'));
    return result;
  };

  it('is written in plain text without an encryption function', () => {
    expect(PDFObject.convert(tree())).toEqual(plain);
  });

  it('is encrypted with an encryption function', () => {
    expect(PDFObject.convert(tree(), encryptFn)).toEqual(encrypted);
  });
});

describe('name trees in a document', () => {
  const names = ['(heading)', '(data.txt)', 'app.alert'];

  const writeDocument = (options = {}) => {
    const chunks: Uint8Array[] = [];
    const doc = new PDFDocument(options);

    doc.on('data', (chunk: Uint8Array) => chunks.push(chunk));

    doc.text('link', { destination: 'heading' });
    doc.file(new Uint8Array([1, 2, 3]), { name: 'data.txt' });
    doc.addNamedJavaScript('hello', 'app.alert("hi")');
    doc.end();

    return new Promise<string>((resolve, reject) => {
      doc.on('end', () => resolve(chunks.map(toBinaryString).join('')));
      doc.on('error', reject);
    });
  };

  it.each(names)('writes %s in plain text when not encrypted', async (name) => {
    await expect(writeDocument()).resolves.toContain(name);
  });

  describe.each([
    ['RC4', '1.3'],
    ['AES-128', '1.6'],
    ['AES-256', '1.7ext3'],
  ])('encrypted with %s', (_algorithm, pdfVersion) => {
    it.each(names)('never writes %s', async (name) => {
      await expect(
        writeDocument({ pdfVersion, userPassword: 'pw' }),
      ).resolves.not.toContain(name);
    });
  });
});

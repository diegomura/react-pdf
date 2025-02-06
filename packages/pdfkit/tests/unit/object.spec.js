import { describe, expect, test } from 'vitest';

import PDFObject from '../../src/object';

describe('PDFObject', () => {
  describe('convert', () => {
    test('string literal', () => {
      expect(PDFObject.convert('test')).toEqual('/test');
    });

    test('string literal with unicode', () => {
      expect(PDFObject.convert('αβγδ')).toEqual('/αβγδ');
    });

    test('String object', () => {
      expect(PDFObject.convert(new String('test'))).toEqual('(test)');
    });

    test('String object with unicode', () => {
      const result = PDFObject.convert(new String('αβγδ'));
      expect(result.length).toEqual(12);
      expect(result).toMatchInlineSnapshot(`"(þÿ±²³´)"`);
    });
  });
});

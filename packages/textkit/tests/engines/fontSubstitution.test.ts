import { describe, expect, test } from 'vitest';

import FontStore from '@react-pdf/font';

import fontSubstitution from '../../src/engines/fontSubstitution';

const instance = fontSubstitution();

const fontStore = new FontStore();

describe('FontSubstitution', () => {
  test('should return empty array if no runs passed', () => {
    const string = instance({ string: '', runs: [] });

    expect(string).toHaveProperty('runs', []);
    expect(string).toHaveProperty('string', '');
  });

  test('should merge consecutive runs with same font', () => {
    const helvetica = fontStore.getFont({ fontFamily: 'Helvetica' }).data;

    const run1 = {
      start: 0,
      end: 3,
      attributes: { font: [helvetica] },
    } as any;

    const run2 = {
      start: 3,
      end: 5,
      attributes: { font: [helvetica] },
    } as any;

    const string = instance({ string: 'Lorem', runs: [run1, run2] });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(1);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 5);
    expect(string.runs[0].attributes.font).toEqual([helvetica]);
  });

  test('should substitute many runs', () => {
    const helvetica = fontStore.getFont({ fontFamily: 'Helvetica' }).data;
    const helveticaBold = fontStore.getFont({
      fontFamily: 'Helvetica',
      fontWeight: 700,
    }).data;

    const run1 = {
      start: 0,
      end: 3,
      attributes: { font: [helveticaBold] },
    } as any;

    const run2 = { start: 3, end: 5, attributes: { font: [helvetica] } } as any;

    const string = instance({ string: 'Lorem', runs: [run1, run2] });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(2);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 3);
    expect(string.runs[0].attributes.font).toEqual([helveticaBold]);
    expect(string.runs[1]).toHaveProperty('start', 3);
    expect(string.runs[1]).toHaveProperty('end', 5);
    expect(string.runs[1].attributes.font).toEqual([helvetica]);
  });

  describe('Fallback Font', () => {
    const SimplifiedChineseFont = {
      name: 'SimplifiedChineseFont',
      hasGlyphForCodePoint: (codePoint) => codePoint === 20320,
    };

    test('should utilize a fallback font that supports the provided glyph', () => {
      const helvetica = fontStore.getFont({ fontFamily: 'Helvetica' }).data;

      const run = {
        start: 0,
        end: 1,
        attributes: {
          font: [helvetica, SimplifiedChineseFont],
        },
      } as any;

      const string = instance({ string: '你', runs: [run] });

      expect(string).toHaveProperty('string', '你');
      expect(string.runs).toHaveLength(1);
      expect(string.runs[0]).toHaveProperty('start', 0);
      expect(string.runs[0]).toHaveProperty('end', 1);
      expect(string.runs[0].attributes.font).toEqual([SimplifiedChineseFont]);
    });

    test('should split a run when fallback font is used on a portion of the run', () => {
      const helvetica = fontStore.getFont({ fontFamily: 'Helvetica' }).data;

      const run = {
        start: 0,
        end: 2,
        attributes: {
          font: [helvetica, SimplifiedChineseFont],
        },
      } as any;

      const string = instance({ string: 'A你', runs: [run] });

      expect(string).toHaveProperty('string', 'A你');
      expect(string.runs).toHaveLength(2);
      expect(string.runs[0]).toHaveProperty('start', 0);
      expect(string.runs[0]).toHaveProperty('end', 1);
      expect(string.runs[0].attributes.font).toEqual([helvetica]);
      expect(string.runs[1]).toHaveProperty('start', 1);
      expect(string.runs[1]).toHaveProperty('end', 2);
      expect(string.runs[1].attributes.font).toEqual([SimplifiedChineseFont]);
    });
  });

  describe('Surrogate Pairs', () => {
    const EmojiFont = {
      name: 'EmojiFont',
      unitsPerEm: 1000,
      hasGlyphForCodePoint: (codePoint) =>
        codePoint === 0x1f600 || // 😀 Grinning Face
        codePoint === 0x1f60d, // 😍 Heart Eyes
    };

    const RegularFont = {
      name: 'RegularFont',
      unitsPerEm: 1000,
      hasGlyphForCodePoint: (codePoint) => codePoint < 0xffff,
    };

    test('should handle surrogate pairs in text', () => {
      const run = {
        start: 0,
        end: 3, // A + surrogate pair (2 JS chars)
        attributes: {
          font: [RegularFont, EmojiFont],
          fontSize: 12,
        },
      } as any;

      // A + 😀 (Grinning Face emoji, surrogate pair)
      const string = instance({ string: 'A😀', runs: [run] });

      expect(string).toHaveProperty('string', 'A😀');
      expect(string.runs).toHaveLength(2);

      // First run is the letter "A" with RegularFont
      expect(string.runs[0]).toHaveProperty('start', 0);
      expect(string.runs[0]).toHaveProperty('end', 1);
      expect(string.runs[0].attributes.font).toEqual([RegularFont]);

      // Second run is the emoji "😀" with EmojiFont
      expect(string.runs[1]).toHaveProperty('start', 1);
      expect(string.runs[1]).toHaveProperty('end', 3); // Surrogate pair takes 2 positions
      expect(string.runs[1].attributes.font).toEqual([EmojiFont]);
    });

    test('should handle multiple surrogate pairs in text', () => {
      const run = {
        start: 0,
        end: 5, // A + surrogate pair (2) + B (1) + surrogate pair (2) = 5
        attributes: {
          font: [RegularFont, EmojiFont],
          fontSize: 12,
        },
      } as any;

      // A + 😀 (Grinning Face) + 😍 (Heart Eyes)
      const string = instance({ string: 'A😀😍', runs: [run] });

      expect(string).toHaveProperty('string', 'A😀😍');
      expect(string.runs).toHaveLength(2);

      // First run is the letter "A" with RegularFont
      expect(string.runs[0]).toHaveProperty('start', 0);
      expect(string.runs[0]).toHaveProperty('end', 1);
      expect(string.runs[0].attributes.font).toEqual([RegularFont]);

      // Second run is both emojis with EmojiFont
      expect(string.runs[1]).toHaveProperty('start', 1);
      expect(string.runs[1]).toHaveProperty('end', 5); // Two surrogate pairs
      expect(string.runs[1].attributes.font).toEqual([EmojiFont]);
    });

    test('should handle surrogate pairs interspersed with regular text', () => {
      const run = {
        start: 0,
        end: 7, // A + surrogate pair (2) + B + surrogate pair (2) + C = 7
        attributes: {
          font: [RegularFont, EmojiFont],
          fontSize: 12,
        },
      } as any;

      // A + 😀 (Grinning Face) + B + 😍 (Heart Eyes) + C
      const string = instance({ string: 'A😀B😍C', runs: [run] });

      expect(string).toHaveProperty('string', 'A😀B😍C');
      expect(string.runs).toHaveLength(5);

      // Alternating fonts for regular chars and emojis
      expect(string.runs[0]).toHaveProperty('start', 0);
      expect(string.runs[0]).toHaveProperty('end', 1);
      expect(string.runs[0].attributes.font).toEqual([RegularFont]);

      expect(string.runs[1]).toHaveProperty('start', 1);
      expect(string.runs[1]).toHaveProperty('end', 3);
      expect(string.runs[1].attributes.font).toEqual([EmojiFont]);

      expect(string.runs[2]).toHaveProperty('start', 3);
      expect(string.runs[2]).toHaveProperty('end', 4);
      expect(string.runs[2].attributes.font).toEqual([RegularFont]);

      expect(string.runs[3]).toHaveProperty('start', 4);
      expect(string.runs[3]).toHaveProperty('end', 6);
      expect(string.runs[3].attributes.font).toEqual([EmojiFont]);

      expect(string.runs[4]).toHaveProperty('start', 6);
      expect(string.runs[4]).toHaveProperty('end', 7);
      expect(string.runs[4].attributes.font).toEqual([RegularFont]);
    });
  });
});

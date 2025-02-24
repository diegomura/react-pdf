import { describe, expect, test } from 'vitest';
import fontSubstitution from '../../src/text/fontSubstitution';

const instance = fontSubstitution();

describe('FontSubstitution', () => {
  test('should return empty array if no runs passed', () => {
    const string = instance({ string: '', runs: [] });

    expect(string).toHaveProperty('runs', []);
    expect(string).toHaveProperty('string', '');
  });

  test('should merge consecutive runs with same font', () => {
    const run1 = {
      start: 0,
      end: 3,
      attributes: { font: ['Helvetica'] },
    } as any;

    const run2 = {
      start: 3,
      end: 5,
      attributes: { font: ['Helvetica'] },
    } as any;

    const string = instance({ string: 'Lorem', runs: [run1, run2] });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(1);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 5);
    expect(string.runs[0].attributes.font).toBeTruthy();
  });

  test('should substitute many runs', () => {
    const run1 = { start: 0, end: 3, attributes: { font: ['Courier'] } } as any;

    const run2 = {
      start: 3,
      end: 5,
      attributes: { font: ['Helvetica'] },
    } as any;

    const string = instance({ string: 'Lorem', runs: [run1, run2] });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(2);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 3);
    expect(string.runs[0].attributes.font).toBeTruthy();
    expect(string.runs[1]).toHaveProperty('start', 3);
    expect(string.runs[1]).toHaveProperty('end', 5);
    expect(string.runs[1].attributes.font).toBeTruthy();
  });

  describe('Fallback Font', () => {
    const SimplifiedChineseFont = {
      name: 'SimplifiedChineseFont',
      hasGlyphForCodePoint: (codePoint) => codePoint === 20320,
    };

    test('should utilize a fallback font that supports the provided glyph', () => {
      const run = {
        start: 0,
        end: 1,
        attributes: {
          font: ['Courier', SimplifiedChineseFont],
        },
      } as any;

      const string = instance({ string: '你', runs: [run] });

      expect(string).toHaveProperty('string', '你');
      expect(string.runs).toHaveLength(1);
      expect(string.runs[0]).toHaveProperty('start', 0);
      expect(string.runs[0]).toHaveProperty('end', 1);
      expect(string.runs[0].attributes.font).toBe(SimplifiedChineseFont);
    });

    test('should split a run when fallback font is used on a portion of the run', () => {
      const run = {
        start: 0,
        end: 2,
        attributes: {
          font: ['Courier', SimplifiedChineseFont],
        },
      } as any;

      const string = instance({ string: 'A你', runs: [run] });

      expect(string).toHaveProperty('string', 'A你');
      expect(string.runs).toHaveLength(2);
      expect(string.runs[0]).toHaveProperty('start', 0);
      expect(string.runs[0]).toHaveProperty('end', 1);
      expect(string.runs[0].attributes.font).toBeTruthy();
      expect(string.runs[1]).toHaveProperty('start', 1);
      expect(string.runs[1]).toHaveProperty('end', 2);
      expect(string.runs[1].attributes.font).toBe(SimplifiedChineseFont);
    });
  });
});

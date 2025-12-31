import { describe, expect, test } from 'vitest';

import fromFragments from '../../src/attributedString/fromFragments';

describe('attributeString fromFragments operator', () => {
  test('should return empty attributed string for no fragments', () => {
    const attributedString = fromFragments([]);

    expect(attributedString.string).toBe('');
    expect(attributedString.runs).toHaveLength(0);
  });

  test('should be constructed by one fragment', () => {
    const attributedString = fromFragments([{ string: 'Hey' }]);

    expect(attributedString.string).toBe('Hey');
    expect(attributedString.runs[0]).toHaveProperty('start', 0);
    expect(attributedString.runs[0]).toHaveProperty('end', 3);
  });

  test('should be constructed by fragments', () => {
    const attributedString = fromFragments([
      { string: 'Hey' },
      { string: ' ho' },
    ]);

    expect(attributedString.string).toBe('Hey ho');
    expect(attributedString.runs[0]).toHaveProperty('start', 0);
    expect(attributedString.runs[0]).toHaveProperty('end', 3);
    expect(attributedString.runs[1]).toHaveProperty('start', 3);
    expect(attributedString.runs[1]).toHaveProperty('end', 6);
  });

  test('should preserve fragment attributes', () => {
    const attributedString = fromFragments([
      { string: 'Hey', attributes: { font: [] } },
      { string: ' ho', attributes: { fontSize: 16 } },
    ]);

    expect(attributedString.runs[0]).toHaveProperty('attributes', { font: [] });
    expect(attributedString.runs[1]).toHaveProperty('attributes', {
      fontSize: 16,
    });
  });

  test('should default to empty attributes when not provided', () => {
    const attributedString = fromFragments([
      { string: 'Hey' },
      { string: ' ho' },
    ]);

    expect(attributedString.runs[0]).toHaveProperty('attributes', {});
    expect(attributedString.runs[1]).toHaveProperty('attributes', {});
  });
});

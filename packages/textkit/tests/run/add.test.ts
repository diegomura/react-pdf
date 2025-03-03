import { describe, expect, test } from 'vitest';

import add from '../../src/run/add';

describe('run add operator', () => {
  test('should return equal run if 0', () => {
    const attributes = { font: [] };
    const run = {
      start: 5,
      end: 15,
      attributes,
      glyphIndices: [],
      glyphs: [],
      positions: [],
    };
    const added = add(0, run);

    expect(added).not.toBe(run);
    expect(added).toHaveProperty('start', 5);
    expect(added).toHaveProperty('end', 15);
    expect(added).toHaveProperty('attributes', attributes);
  });

  test('should return added run', () => {
    const attributes = { font: [] };
    const run = {
      start: 5,
      end: 15,
      attributes,
      glyphIndices: [],
      glyphs: [],
      positions: [],
    };
    const added = add(5, run);

    expect(added).not.toBe(run);
    expect(added).toHaveProperty('start', 10);
    expect(added).toHaveProperty('end', 20);
    expect(added).toHaveProperty('attributes', attributes);
  });
});

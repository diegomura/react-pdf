import { describe, expect, test } from '@jest/globals';

import lineIndexAtHeight from '../../src/text/lineIndexAtHeight';

const TEST_LINE = { box: { height: 25 } };
const TEST_LINES = Array(10).fill(TEST_LINE);

describe('text lineIndexAtHeight', () => {
  test('Should return 0 if no lines present', () => {
    const node = { type: 'TEXT' };
    const result = lineIndexAtHeight(node, 5);

    expect(result).toBe(0);
  });

  test('Should return 0 for height lower than first line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = lineIndexAtHeight(node, 10);

    expect(result).toBe(0);
  });

  test('Should return 1 for height higher than first line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = lineIndexAtHeight(node, 30);

    expect(result).toBe(1);
  });

  test('Should return correct line index for intermediate line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = lineIndexAtHeight(node, 85);

    expect(result).toBe(3);
  });

  test('Should return penultimate line index for height lower than last line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = lineIndexAtHeight(node, 230);

    expect(result).toBe(9);
  });

  test('Should return correct line index for last line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = lineIndexAtHeight(node, 250);

    expect(result).toBe(10);
  });

  test('Should return correct line index for height higher than last line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = lineIndexAtHeight(node, 300);

    expect(result).toBe(10);
  });
});

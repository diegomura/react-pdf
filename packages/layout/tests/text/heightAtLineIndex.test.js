import heightAtLineIndex from '../../src/text/heightAtLineIndex';

const TEST_LINE = { box: { height: 25 } };
const TEST_LINES = Array(10).fill(TEST_LINE);

describe('text heightAtLineIndex', () => {
  test('Should return 0 if no lines present', () => {
    const node = { type: 'TEXT' };
    const result = heightAtLineIndex(node, 5);

    expect(result).toBe(0);
  });

  test('Should return correct height for first line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = heightAtLineIndex(node, 1);

    expect(result).toBe(25);
  });

  test('Should return correct height for intermediate line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = heightAtLineIndex(node, 5);

    expect(result).toBe(125);
  });

  test('Should return correct height for last line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = heightAtLineIndex(node, 10);

    expect(result).toBe(250);
  });

  test('Should return correct height for overflow line', () => {
    const node = { type: 'TEXT', lines: TEST_LINES };
    const result = heightAtLineIndex(node, 12);

    expect(result).toBe(250);
  });
});

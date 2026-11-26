import { describe, expect, test } from 'vitest';

import heightAtLineIndex from '../../src/text/heightAtLineIndex';
import { SafeTextNode } from '../../src/types';

const TEST_LINES = Array.from({ length: 10 }, (_, index) => ({
  box: { y: index * 25, height: 25 },
}));

describe('text heightAtLineIndex', () => {
  test('Should return 0 if no lines present', () => {
    const node: SafeTextNode = {
      type: 'TEXT',
      props: {},
      style: {},
      wasSplit: false,
    };
    const result = heightAtLineIndex(node, 5);

    expect(result).toBe(0);
  });

  test('Should return correct height for first line', () => {
    const node: SafeTextNode = {
      wasSplit: false,
      type: 'TEXT',
      props: {},
      style: {},
      lines: TEST_LINES,
    };

    const result = heightAtLineIndex(node, 1);

    expect(result).toBe(25);
  });

  test('Should return correct height for intermediate line', () => {
    const node: SafeTextNode = {
      wasSplit: false,
      type: 'TEXT',
      props: {},
      style: {},
      lines: TEST_LINES,
    };

    const result = heightAtLineIndex(node, 5);

    expect(result).toBe(125);
  });

  test('Should return correct height for last line', () => {
    const node: SafeTextNode = {
      wasSplit: false,
      type: 'TEXT',
      props: {},
      style: {},
      lines: TEST_LINES,
    };

    const result = heightAtLineIndex(node, 10);

    expect(result).toBe(250);
  });

  test('Should return correct height for overflow line', () => {
    const node: SafeTextNode = {
      wasSplit: false,
      type: 'TEXT',
      props: {},
      style: {},
      lines: TEST_LINES,
    };

    const result = heightAtLineIndex(node, 12);

    expect(result).toBe(250);
  });
});

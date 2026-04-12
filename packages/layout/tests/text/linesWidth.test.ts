import { describe, expect, test } from 'vitest';
import * as P from '@react-pdf/primitives';
import { SafeTextNode } from '../../src';
import linesWidth from '../../src/text/linesWidth';

const createTextNode = (style = {}, lines = []): SafeTextNode => ({
  style,
  props: {},
  type: P.Text,
  children: [],
  lines,
});

describe('linesWidth', () => {
  test('should return 0 for no lines', () => {
    const node = createTextNode();
    expect(linesWidth(node)).toBe(0);
  });

  test('should return max xAdvance for horizontal text', () => {
    const lines = [
      { string: 'a', runs: [], xAdvance: 100, box: { x: 0, y: 0, width: 200, height: 20 } },
      { string: 'b', runs: [], xAdvance: 150, box: { x: 0, y: 20, width: 200, height: 20 } },
    ];
    const node = createTextNode({}, lines);
    expect(linesWidth(node)).toBe(150);
  });

  test('should return sum of column widths for vertical-rl text', () => {
    const lines = [
      { string: 'a', runs: [], xAdvance: 100, box: { x: 180, y: 0, width: 20, height: 100 } },
      { string: 'b', runs: [], xAdvance: 100, box: { x: 160, y: 0, width: 20, height: 100 } },
    ];
    const node = createTextNode({ writingMode: 'vertical-rl' }, lines);
    expect(linesWidth(node)).toBe(40);
  });

  test('should return sum of column widths for vertical-lr text', () => {
    const lines = [
      { string: 'a', runs: [], xAdvance: 100, box: { x: 0, y: 0, width: 20, height: 100 } },
      { string: 'b', runs: [], xAdvance: 100, box: { x: 20, y: 0, width: 20, height: 100 } },
    ];
    const node = createTextNode({ writingMode: 'vertical-lr' }, lines);
    expect(linesWidth(node)).toBe(40);
  });
});

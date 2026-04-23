import { describe, expect, test } from 'vitest';
import * as P from '@react-pdf/primitives';
import { SafeTextNode } from '../../src';
import linesHeight from '../../src/text/linesHeight';

const createTextNode = (style = {}, lines = []): SafeTextNode => ({
  style,
  props: {},
  type: P.Text,
  children: [],
  lines,
});

describe('linesHeight', () => {
  test('should return -1 for no lines', () => {
    const node = createTextNode();
    delete node.lines;
    expect(linesHeight(node)).toBe(-1);
  });

  test('should return sum of line heights for horizontal text', () => {
    const lines = [
      { string: 'a', runs: [], box: { x: 0, y: 0, width: 200, height: 20 } },
      { string: 'b', runs: [], box: { x: 0, y: 20, width: 200, height: 20 } },
    ];
    const node = createTextNode({}, lines);
    expect(linesHeight(node)).toBe(40);
  });

  test('should return max column height for vertical-rl text', () => {
    const lines = [
      { string: 'a', runs: [], box: { x: 180, y: 0, width: 20, height: 100 } },
      { string: 'b', runs: [], box: { x: 160, y: 0, width: 20, height: 80 } },
    ];
    const node = createTextNode({ writingMode: 'vertical-rl' }, lines);
    expect(linesHeight(node)).toBe(100);
  });

  test('should return max column height for vertical-lr text', () => {
    const lines = [
      { string: 'a', runs: [], box: { x: 0, y: 0, width: 20, height: 120 } },
      { string: 'b', runs: [], box: { x: 20, y: 0, width: 20, height: 80 } },
    ];
    const node = createTextNode({ writingMode: 'vertical-lr' }, lines);
    expect(linesHeight(node)).toBe(120);
  });
});

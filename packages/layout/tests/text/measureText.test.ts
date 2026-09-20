import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';
import { SafeTextNode } from '../../src';
import measureText from '../../src/text/measureText';
import { MeasureMode } from '../../src/taffy/measure';

const TEXT =
  'Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you';

const fontStore = new FontStore();

const page = {
  type: 'PAGE' as const,
  props: {},
  style: {},
};

const createTextNode = (
  value: string,
  style = {},
  props = {},
): SafeTextNode => ({
  style,
  props,
  type: P.Text,
  children: [{ type: P.TextInstance, value }],
});

describe('measureText', () => {
  describe('widthMode Exactly', () => {
    test('should return width and height', async () => {
      const node = createTextNode(TEXT);
      const measureFunc = measureText(page, node, fontStore);

      const dimensions = measureFunc(100, MeasureMode.Exactly, 50);

      expect(dimensions.width).toStrictEqual(100);
      expect(dimensions.height).toBe(39.599999999999994);
    });
  });

  describe('widthMode AtMost', () => {
    test('should return width and height', async () => {
      const node = createTextNode(TEXT);
      const measureFunc = measureText(page, node, fontStore);

      const dimensions = measureFunc(100, MeasureMode.AtMost, 50);

      expect(dimensions.width).toStrictEqual(100);
      expect(dimensions.height).toBe(39.599999999999994);
    });

    test('should shrink-wrap short text', async () => {
      const node = createTextNode('hi');
      const measureFunc = measureText(page, node, fontStore);

      const dimensions = measureFunc(100, MeasureMode.AtMost, 50);

      expect(dimensions.width).toBeLessThan(100);
      expect(dimensions.width).toBeGreaterThan(0);
    });
  });

  describe('widthMode Undefined (max-content)', () => {
    test('should return the natural single-line width', async () => {
      const node = createTextNode(TEXT);
      const measureFunc = measureText(page, node, fontStore);

      const dimensions = measureFunc(Infinity, MeasureMode.Undefined, Infinity);
      const exactly = measureText(page, createTextNode(TEXT), fontStore)(
        100,
        MeasureMode.Exactly,
        50,
      );

      expect(dimensions.width).toBeGreaterThan(100);
      expect(dimensions.height).toBeLessThan(exactly.height!);
    });

    test('should keep the lines for left aligned text', async () => {
      const node = createTextNode(TEXT);
      measureText(page, node, fontStore)(Infinity, MeasureMode.Undefined, 50);

      expect(node.lines).toHaveLength(1);
    });

    test('should not keep the lines for centered text', async () => {
      const node = createTextNode(TEXT, { textAlign: 'center' });
      measureText(page, node, fontStore)(Infinity, MeasureMode.Undefined, 50);

      expect(node.lines).toBeUndefined();
    });
  });

  describe('line reuse', () => {
    test('should reuse lines that fit a later, narrower constraint', async () => {
      const node = createTextNode('hi');
      const measureFunc = measureText(page, node, fontStore);

      measureFunc(100, MeasureMode.AtMost, 50);
      const lines = node.lines;
      measureFunc(lines![0].xAdvance, MeasureMode.Exactly, 50);

      expect(node.lines).toBe(lines);
    });

    test('should re-layout when lines do not fit', async () => {
      const node = createTextNode(TEXT);
      const measureFunc = measureText(page, node, fontStore);

      measureFunc(Infinity, MeasureMode.Undefined, 50);
      const lines = node.lines;
      measureFunc(100, MeasureMode.Exactly, 50);

      expect(node.lines).not.toBe(lines);
      expect(node.lines!.length).toBeGreaterThan(1);
    });
  });
});

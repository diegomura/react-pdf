import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';
import { SafeTextNode } from '../../src';
import measureText from '../../src/text/measureText';

const TEXT =
  'Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you';

const fontStore = new FontStore();

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
      const page = {
        type: 'PAGE' as const,
        props: {},
        style: {},
      };
      const node = createTextNode(TEXT);
      const measureFunc = measureText(page, node, fontStore);

      const dimensions = measureFunc(100, 1 /*Yoga.MeasureMode.Exactly*/, 50);

      expect(dimensions.width).toStrictEqual(100);
      expect(dimensions.height).toBe(39.599999999999994);
    });
  });

  describe('widthMode AtMost', () => {
    test('should return width and height', async () => {
      const page = {
        type: 'PAGE' as const,
        props: {},
        style: {},
      };
      const node = createTextNode(TEXT);
      const measureFunc = measureText(page, node, fontStore);

      const dimensions = measureFunc(100, 2 /*Yoga.MeasureMode.AtMost*/, 50);

      expect(dimensions.width).toStrictEqual(100);
      expect(dimensions.height).toBe(39.599999999999994);
    });
  });
});

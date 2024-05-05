import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';
import type { FontFeatureSettings } from '@react-pdf/stylesheet';

import getAttributedString from '../../src/text/getAttributedString';
import { SafeTextNode } from '../../src/types';

const font = {};

const fontStore = {
  getFont: () => ({ data: font }),
} as unknown as FontStore;

const getTextNode = (fontFeatureSettings: FontFeatureSettings): SafeTextNode =>
  ({
    type: 'TEXT',
    props: {},
    style: { fontFeatureSettings },
    children: [{ type: 'TEXT_INSTANCE', value: 'Lorem' }],
  }) as SafeTextNode;

describe('getAttributedString', () => {
  test('should map numeric font feature settings to boolean features', () => {
    const result = getAttributedString(
      fontStore,
      getTextNode({ liga: 0, kern: 1 }),
    );

    expect(result.runs[0].attributes.features).toEqual({
      liga: false,
      kern: true,
    });
  });

  test('should preserve font feature setting arrays', () => {
    const result = getAttributedString(fontStore, getTextNode(['tnum']));

    expect(result.runs[0].attributes.features).toEqual(['tnum']);
  });
});

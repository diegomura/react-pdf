import { describe, expect, test } from 'vitest';
import FontStore from '@react-pdf/font';

import getAttributedString from '../../src/text/getAttributedString';
import { SafeTextNode } from '../../src/types';

const font = {};

const fontStore = {
  getFont: () => ({ data: font }),
} as unknown as FontStore;

describe('getAttributedString', () => {
  test('should pass resolved font feature settings as textkit features', () => {
    const node = {
      type: 'TEXT',
      props: {},
      style: { fontFeatureSettings: { liga: false, tnum: true } },
      children: [{ type: 'TEXT_INSTANCE', value: 'Lorem' }],
    } as SafeTextNode;

    const result = getAttributedString(fontStore, node);

    expect(result.runs[0].attributes.features).toEqual({
      liga: false,
      tnum: true,
    });
  });
});

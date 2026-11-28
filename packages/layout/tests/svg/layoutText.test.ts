import { describe, expect, test } from 'vitest';
import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';

import resolveSvg from '../../src/steps/resolveSvg';

const fontStore = new FontStore();

const layoutSvgText = (textProps: Record<string, unknown>, value: string) => {
  const svg = {
    type: P.Svg,
    props: { width: 300, height: 100 },
    style: {},
    children: [
      {
        type: P.Text,
        props: { x: 0, y: 20, fontSize: 10, ...textProps },
        style: {},
        children: [{ type: P.TextInstance, value }],
      },
    ],
  };

  const resolved: any = resolveSvg(svg as any, fontStore);
  const [line] = resolved.children[0].children[0].lines;

  return line;
};

describe('svg layoutText', () => {
  test('should apply textTransform', () => {
    const line = layoutSvgText({ textTransform: 'uppercase' }, 'hello');

    expect(line.string).toBe('HELLO');
  });

  test('should apply letterSpacing', () => {
    const plain = layoutSvgText({}, 'hello');
    const spaced = layoutSvgText({ letterSpacing: 5 }, 'hello');

    expect(spaced.xAdvance).toBeCloseTo(plain.xAdvance + 5 * 5);
  });
});

import { describe, expect, test } from 'vitest';

import getWrap from '../../src/node/getWrap';

describe('node getWrap', () => {
  test('Should return false by default for non-wrap types', () => {
    const svgResult = getWrap({ type: 'SVG', props: {}, style: {} });
    expect(svgResult).toBe(false);

    const noteResult = getWrap({ type: 'NOTE', props: {}, style: {} });
    expect(noteResult).toBe(false);

    const imageResult = getWrap({
      type: 'IMAGE',
      props: { src: '' },
      style: {},
    });
    expect(imageResult).toBe(false);

    const canvasResult = getWrap({
      type: 'CANVAS',
      props: { paint: () => null },
      style: {},
    });
    expect(canvasResult).toBe(false);
  });

  test('Should return true by default for other types', () => {
    const viewResult = getWrap({ type: 'VIEW', props: {}, style: {} });
    expect(viewResult).toBe(true);

    const textResult = getWrap({ type: 'TEXT', props: {}, style: {} });
    expect(textResult).toBe(true);
  });

  test('Should return true if wrap value is null or undefined', () => {
    const undefinedResult = getWrap({
      type: 'VIEW',
      props: { wrap: undefined },
      style: {},
    });
    expect(undefinedResult).toBe(true);

    // @ts-expect-error Deliberately testing an invalid case to ensure it's also handled gracefully
    const nullResult = getWrap({
      type: 'VIEW',
      props: { wrap: null },
      style: {},
    });
    expect(nullResult).toBe(true);
  });

  test('Should return the custom wrap value if provided', () => {
    const trueResult = getWrap({
      type: 'VIEW',
      props: { wrap: true },
      style: {},
    });
    expect(trueResult).toBe(true);

    const falseResult = getWrap({
      type: 'VIEW',
      props: { wrap: false },
      style: {},
    });
    expect(falseResult).toBe(false);
  });
});

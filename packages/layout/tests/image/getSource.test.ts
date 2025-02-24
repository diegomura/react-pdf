import { describe, expect, test } from 'vitest';

import getSource from '../../src/image/getSource';

const VALUE = 'gotcha';

describe('image getSource', () => {
  test('Should get src', () => {
    expect(
      getSource({ type: 'IMAGE', style: {}, props: { src: VALUE } }),
    ).toEqual(VALUE);
  });

  test('Should get source', () => {
    expect(
      getSource({ type: 'IMAGE', style: {}, props: { source: VALUE } }),
    ).toEqual(VALUE);
  });

  test('Should get undefined if either present', () => {
    expect(getSource({ type: 'IMAGE', style: {}, props: {} as any })).toEqual(
      undefined,
    );
  });
});

import { describe, expect, test } from 'vitest';

import getSource from '../../src/image/getSource';

const VALUE = 'gotcha';

describe('image getSource', () => {
  test('Should get src', () => {
    const node = { type: 'IMAGE', props: { src: VALUE } };
    expect(getSource(node)).toEqual(VALUE);
  });

  test('Should get source', () => {
    const node = { type: 'IMAGE', props: { source: VALUE } };
    expect(getSource(node)).toEqual(VALUE);
  });

  test('Should get href', () => {
    const node = { type: 'IMAGE', props: { href: VALUE } };
    expect(getSource(node)).toEqual(VALUE);
  });

  test('Should get undefined if either present', () => {
    const node = { type: 'IMAGE', props: {} };
    expect(getSource(node)).toEqual(undefined);
  });
});

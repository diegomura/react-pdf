import { describe, expect, test } from 'vitest';

import resolvePercentHeight from '../../src/steps/resolvePercentHeight';

describe('layout resolvePercentHeight', () => {
  test('Should keep empty document untouched', () => {
    const result = resolvePercentHeight({
      type: 'DOCUMENT',
      props: {},
      children: [],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should keep empty page untouched', () => {
    const result = resolvePercentHeight({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: {}, style: {}, children: [] }],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should not resolve children if page dont have height', () => {
    const result = resolvePercentHeight({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {},
          children: [
            { type: 'VIEW', props: {}, style: { width: '60%', height: '80%' } },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve children percent dimensions if page have height', () => {
    const result = resolvePercentHeight({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { height: 1000 },
          children: [{ type: 'VIEW', props: {}, style: { height: '80%' } }],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });
});

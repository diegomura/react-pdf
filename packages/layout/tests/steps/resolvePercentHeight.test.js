import { describe, expect, test } from '@jest/globals';

import resolvePercentHeight from '../../src/steps/resolvePercentHeight';

describe('layout resolvePercentHeight', () => {
  test('Should keep empty document untouched', () => {
    const root = {
      type: 'DOCUMENT',
      children: [],
    };
    const result = resolvePercentHeight(root);

    expect(result).toMatchSnapshot();
  });

  test('Should keep empty page untouched', () => {
    const root = {
      type: 'DOCUMENT',
      children: [{ type: 'PAGE' }],
    };
    const result = resolvePercentHeight(root);

    expect(result).toMatchSnapshot();
  });

  test('Should not resolve children if page dont have height', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          children: [{ type: 'VIEW', style: { width: '60%', height: '80%' } }],
        },
      ],
    };
    const result = resolvePercentHeight(root);

    expect(result).toMatchSnapshot();
  });

  test('Should resolve children percent dimensions if page have height', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: { height: 1000 },
          children: [{ type: 'VIEW', style: { height: '80%' } }],
        },
      ],
    };
    const result = resolvePercentHeight(root);

    expect(result).toMatchSnapshot();
  });
});

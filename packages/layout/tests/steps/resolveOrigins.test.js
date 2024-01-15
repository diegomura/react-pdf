import { describe, expect, test } from '@jest/globals';

import resolveOrigins from '../../src/steps/resolveOrigins';

describe('layout resolveOrigins', () => {
  test('should not resolve for node without box', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: {},
          children: [{ type: 'VIEW', style: {} }],
        },
      ],
    };
    const result = resolveOrigins(root);

    expect(result).toMatchSnapshot();
  });

  test('should resolve centered origin by default', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: {},
          box: { top: 50, left: 100, width: 300, height: 400 },
        },
      ],
    };
    const result = resolveOrigins(root);

    expect(result).toMatchSnapshot();
  });

  test('should resolve origin adjusted by fixed values', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          box: { top: 50, left: 100, width: 300, height: 400 },
          style: { transformOriginX: 100, transformOriginY: 50 },
        },
      ],
    };
    const result = resolveOrigins(root);

    expect(result).toMatchSnapshot();
  });

  test('should resolve origin adjusted by percent values', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          box: { top: 50, left: 100, width: 300, height: 400 },
          style: { transformOriginX: '20%', transformOriginY: '70%' },
        },
      ],
    };
    const result = resolveOrigins(root);

    expect(result).toMatchSnapshot();
  });

  test('should resolve origins for nested elements', () => {
    const root = {
      type: 'DOCUMENT',
      children: [
        {
          type: 'PAGE',
          style: {},
          box: { top: 50, left: 100, width: 300, height: 400 },
          children: [
            {
              type: 'VIEW',
              style: {},
              box: { top: 0, left: 10, width: 50, height: 80 },
            },
          ],
        },
      ],
    };
    const result = resolveOrigins(root);

    expect(result).toMatchSnapshot();
  });
});

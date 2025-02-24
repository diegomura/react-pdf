import { describe, expect, test } from 'vitest';

import resolveOrigins from '../../src/steps/resolveOrigins';

describe('layout resolveOrigins', () => {
  test('should not resolve for node without box', () => {
    const result = resolveOrigins({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          style: {},
          props: {},
          children: [{ type: 'VIEW', props: {}, style: {} }],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('should resolve centered origin by default', () => {
    const result = resolveOrigins({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          style: {},
          props: {},
          box: {
            top: 50,
            left: 100,
            bottom: 0,
            right: 0,
            width: 300,
            height: 400,
          },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('should resolve origin adjusted by fixed values', () => {
    const result = resolveOrigins({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          box: {
            top: 50,
            left: 100,
            bottom: 0,
            right: 0,
            width: 300,
            height: 400,
          },
          style: { transformOriginX: 100, transformOriginY: 50 },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('should resolve origin adjusted by percent values', () => {
    const result = resolveOrigins({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          box: {
            top: 50,
            left: 100,
            bottom: 0,
            right: 0,
            width: 300,
            height: 400,
          },
          style: { transformOriginX: '20%', transformOriginY: '70%' },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('should resolve origins for nested elements', () => {
    const result = resolveOrigins({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          style: {},
          props: {},
          box: {
            top: 50,
            left: 100,
            bottom: 0,
            right: 0,
            width: 300,
            height: 400,
          },
          children: [
            {
              type: 'VIEW',
              style: {},
              props: {},
              box: {
                top: 0,
                left: 10,
                bottom: 0,
                right: 0,
                width: 50,
                height: 80,
              },
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });
});

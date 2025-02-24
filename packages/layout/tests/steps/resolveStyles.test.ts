import { describe, expect, test } from 'vitest';

import resolveStyles from '../../src/steps/resolveStyles';

describe('layout resolveStyles', () => {
  test('Should resolve page styles', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            paddingHorizontal: '10in',
            paddingVertical: '10mm',
            backgroundColor: 'red',
            border: '1cm dotted green',
          },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve several pages styles', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {
            paddingHorizontal: '10in',
            paddingVertical: '10mm',
            borderTop: '4 solid #FF00000',
          },
        },
        {
          type: 'PAGE',
          props: {},
          style: {
            backgroundColor: 'red',
            border: '1cm dotted green',
            fontWeight: 'bold',
          },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve page styles array', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: [
            {
              paddingHorizontal: '10in',
              paddingVertical: '10mm',
            },
            {
              backgroundColor: 'red',
              border: '1cm dotted green',
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve nested node styles', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          box: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 100,
            height: 200,
          },
          children: [
            {
              type: 'VIEW',
              props: {},
              style: {
                paddingHorizontal: '10in',
                paddingVertical: '10mm',
                backgroundColor: 'red',
                border: '1cm dotted green',
              },
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve nested node styles media queries', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          box: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 100,
            height: 200,
          },
          children: [
            {
              type: 'VIEW',
              props: {},
              style: {
                backgroundColor: 'red',
                '@media max-width: 500': {
                  backgroundColor: 'green',
                },
              },
            },
            {
              type: 'VIEW',
              props: {},
              style: {
                backgroundColor: 'red',
                '@media min-width: 500': {
                  backgroundColor: 'green',
                },
              },
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve nested node styles media queries with page style', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { width: 100, height: 200 },
          children: [
            {
              type: 'VIEW',
              props: {},
              style: {
                backgroundColor: 'red',
                '@media max-width: 500': {
                  backgroundColor: 'green',
                },
              },
            },
            {
              type: 'VIEW',
              props: {},
              style: {
                backgroundColor: 'red',
                '@media min-width: 500': {
                  backgroundColor: 'green',
                },
              },
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve nested node styles array', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          box: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 100,
            height: 200,
          },
          children: [
            {
              type: 'VIEW',
              props: {},
              style: [
                {
                  paddingHorizontal: '10in',
                  paddingVertical: '10mm',
                },
                {
                  backgroundColor: 'red',
                  border: '1cm dotted green',
                },
              ],
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve default link styles', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          box: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 100,
            height: 200,
          },
          children: [
            {
              type: 'LINK',
              props: {},
              style: {},
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should overide default link styles', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          box: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 100,
            height: 200,
          },
          children: [
            {
              type: 'LINK',
              props: {},
              style: { color: 'wheat', textDecoration: 'none' },
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should overide default link styles with array', () => {
    const result = resolveStyles({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          box: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 100,
            height: 200,
          },
          children: [
            {
              type: 'LINK',
              props: {},
              style: [{ color: 'wheat', textDecoration: 'none' }],
            },
          ],
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });
});

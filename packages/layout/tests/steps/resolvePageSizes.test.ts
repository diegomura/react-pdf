import { describe, expect, test } from 'vitest';

import resolvePageSizes from '../../src/steps/resolvePageSizes';

describe('layout resolvePageSizes', () => {
  test('Should default to A4', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: {} }],
    });

    expect(result.children[0].style).toHaveProperty('width', 595.28);
    expect(result.children[0].style).toHaveProperty('height', 841.89);
  });

  test('Should default to portrait A4', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: { orientation: 'portrait' } }],
    });

    expect(result.children[0].style).toHaveProperty('width', 595.28);
    expect(result.children[0].style).toHaveProperty('height', 841.89);
  });

  test('Should accept size string', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: { size: 'A2' } }],
    });

    expect(result.children[0].style).toHaveProperty('width', 1190.55);
    expect(result.children[0].style).toHaveProperty('height', 1683.78);
  });

  test('Should accept size string in landscape mode', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [
        { type: 'PAGE', props: { size: 'A2', orientation: 'landscape' } },
      ],
    });

    expect(result.children[0].style).toHaveProperty('width', 1683.78);
    expect(result.children[0].style).toHaveProperty('height', 1190.55);
  });

  test('Should accept size array', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: { size: [100, 200] } }],
    });

    expect(result.children[0].style).toHaveProperty('width', 100);
    expect(result.children[0].style).toHaveProperty('height', 200);
  });

  test('Should accept size array in landscape mode', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: { size: [100, 200], orientation: 'landscape' },
        },
      ],
    });

    expect(result.children[0].style).toHaveProperty('width', 200);
    expect(result.children[0].style).toHaveProperty('height', 100);
  });

  test('Should accept size object', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [
        { type: 'PAGE', props: { size: { width: 100, height: 200 } } },
      ],
    });

    expect(result.children[0].style).toHaveProperty('width', 100);
    expect(result.children[0].style).toHaveProperty('height', 200);
  });

  test('Should accept size object in landscape mode', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {
            size: { width: 100, height: 200 },
            orientation: 'landscape',
          },
        },
      ],
    });

    expect(result.children[0].style).toHaveProperty('width', 200);
    expect(result.children[0].style).toHaveProperty('height', 100);
  });

  test('Should accept size number', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: { size: 100 } }],
    });

    expect(result.children[0].style).toHaveProperty('width', 100);
    expect(result.children[0].style).toHaveProperty('height', 100);
  });

  test('Should accept size number in landscape mode', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [
        { type: 'PAGE', props: { size: 100, orientation: 'landscape' } },
      ],
    });

    expect(result.children[0].style).toHaveProperty('width', 100);
    expect(result.children[0].style).toHaveProperty('height', 100);
  });

  test('Should resolve several pages', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [
        { type: 'PAGE', props: {} },
        { type: 'PAGE', props: { size: 'A5' } },
        { type: 'PAGE', props: { size: { width: 100, height: 200 } } },
      ],
    });

    expect(result.children[0].style).toHaveProperty('width', 595.28);
    expect(result.children[0].style).toHaveProperty('height', 841.89);
    expect(result.children[1].style).toHaveProperty('width', 419.53);
    expect(result.children[1].style).toHaveProperty('height', 595.28);
    expect(result.children[2].style).toHaveProperty('width', 100);
    expect(result.children[2].style).toHaveProperty('height', 200);
  });

  test('Should flatten page styles', () => {
    const result = resolvePageSizes({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: { size: 'A4' },
          style: [{ backgroundColor: 'red' }],
        },
      ],
    });

    expect(result.children[0].style).toHaveProperty('width', 595.28);
    expect(result.children[0].style).toHaveProperty('height', 841.89);
    expect(result.children[0].style).toHaveProperty('backgroundColor', 'red');
  });
});

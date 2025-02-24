import { describe, expect, test } from 'vitest';

import getSize from '../../src/page/getSize';

describe('page getSize', () => {
  test('should default to A4', () => {
    const size = getSize({ type: 'PAGE', props: {} });

    expect(size).toHaveProperty('width', 595.28);
    expect(size).toHaveProperty('height', 841.89);
  });

  test('should default to portrait A4', () => {
    const size = getSize({
      type: 'PAGE',
      props: { orientation: 'portrait' },
    });

    expect(size).toHaveProperty('width', 595.28);
    expect(size).toHaveProperty('height', 841.89);
  });

  test('should accept size string', () => {
    const size = getSize({ type: 'PAGE', props: { size: 'A2' } });

    expect(size).toHaveProperty('width', 1190.55);
    expect(size).toHaveProperty('height', 1683.78);
  });

  test('should accept size string in landscape mode', () => {
    const size = getSize({
      type: 'PAGE',
      props: { size: 'A2', orientation: 'landscape' },
    });

    expect(size).toHaveProperty('width', 1683.78);
    expect(size).toHaveProperty('height', 1190.55);
  });

  test('should accept size number array', () => {
    const size = getSize({ type: 'PAGE', props: { size: [100, 200] } });

    expect(size).toHaveProperty('width', 100);
    expect(size).toHaveProperty('height', 200);
  });

  test('should accept size string array', () => {
    const size = getSize({ type: 'PAGE', props: { size: ['50px', '1in'] } });

    expect(size).toHaveProperty('width', 50);
    expect(size).toHaveProperty('height', 72);
  });

  test('should accept size number array in landscape mode', () => {
    const size = getSize({
      type: 'PAGE',
      props: { size: [100, 200], orientation: 'landscape' },
    });

    expect(size).toHaveProperty('width', 200);
    expect(size).toHaveProperty('height', 100);
  });

  test('should accept size string array in landscape mode', () => {
    const size = getSize({
      type: 'PAGE',
      props: { size: ['50px', '1in'], orientation: 'landscape' },
    });

    expect(size).toHaveProperty('width', 72);
    expect(size).toHaveProperty('height', 50);
  });

  test('should accept number size object', () => {
    const size = getSize({
      type: 'PAGE',
      props: { size: { width: 100, height: 200 } },
    });

    expect(size).toHaveProperty('width', 100);
    expect(size).toHaveProperty('height', 200);
  });

  test('should accept string size object', () => {
    const size = getSize({
      type: 'PAGE',
      props: { size: { width: '50px', height: '1in' } },
    });

    expect(size).toHaveProperty('width', 50);
    expect(size).toHaveProperty('height', 72);
  });

  test('should accept size object in landscape mode', () => {
    const size = getSize({
      type: 'PAGE',
      props: { size: { width: 100, height: 200 }, orientation: 'landscape' },
    });

    expect(size).toHaveProperty('width', 200);
    expect(size).toHaveProperty('height', 100);
  });

  test('should accept string size object in landscape mode', () => {
    const size = getSize({
      type: 'PAGE',
      props: {
        size: { width: '50px', height: '1in' },
        orientation: 'landscape',
      },
    });

    expect(size).toHaveProperty('width', 72);
    expect(size).toHaveProperty('height', 50);
  });

  test('should accept size number', () => {
    const size = getSize({ type: 'PAGE', props: { size: 100 } });

    expect(size).toHaveProperty('width', 100);
    expect(size).toHaveProperty('height', 100);
  });

  test('should accept size number in landscape mode', () => {
    const size = getSize({
      type: 'PAGE',
      props: { size: 100, orientation: 'landscape' },
    });

    expect(size).toHaveProperty('width', 100);
    expect(size).toHaveProperty('height', 100);
  });
});

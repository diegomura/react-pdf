import { describe, expect, test } from 'vitest';

import omit from '../../src/run/omit';

describe('run omit operator', () => {
  test('should omit passed attribute', () => {
    const run = { start: 5, end: 15, attributes: { font: {} } };
    const ommited = omit('font', run);

    expect(ommited).toHaveProperty('start', 5);
    expect(ommited).toHaveProperty('end', 15);
    expect(ommited.attributes).not.toHaveProperty('font');
  });

  test('should not omit other attribute', () => {
    const run = { start: 5, end: 15, attributes: { font: {} } };
    const ommited = omit('fontSize', run);

    expect(ommited).toHaveProperty('start', 5);
    expect(ommited).toHaveProperty('end', 15);
    expect(ommited.attributes).toHaveProperty('font', {});
  });

  test('should preserve other attributes', () => {
    const run = {
      start: 5,
      end: 15,
      attributes: { font: {}, fontSize: 16 },
    };
    const ommited = omit('font', run);

    expect(ommited).toHaveProperty('start', 5);
    expect(ommited).toHaveProperty('end', 15);
    expect(ommited.attributes).not.toHaveProperty('font');
    expect(ommited.attributes).toHaveProperty('fontSize', 16);
  });
});

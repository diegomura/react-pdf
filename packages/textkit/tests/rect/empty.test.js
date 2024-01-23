import { describe, expect, test } from 'vitest';

import empty from '../../src/rect/empty';

describe('rect empty operator', () => {
  test('should return empty rect', () => {
    const result = empty();

    expect(result).toHaveProperty('x', 0);
    expect(result).toHaveProperty('y', 0);
    expect(result).toHaveProperty('width', 0);
    expect(result).toHaveProperty('height', 0);
  });
});

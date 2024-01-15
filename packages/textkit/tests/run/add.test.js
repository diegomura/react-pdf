import { describe, expect, test } from '@jest/globals';

import add from '../../src/run/add';

describe('run add operator', () => {
  test('should return equal run if 0', () => {
    const attributes = { something: 'blah' };
    const run = { start: 5, end: 15, attributes };
    const added = add(0, run);

    expect(added).not.toBe(run);
    expect(added).toHaveProperty('start', 5);
    expect(added).toHaveProperty('end', 15);
    expect(added).toHaveProperty('attributes', attributes);
  });

  test('should return added run', () => {
    const attributes = { something: 'blah' };
    const run = { start: 5, end: 15, attributes };
    const added = add(5, run);

    expect(added).not.toBe(run);
    expect(added).toHaveProperty('start', 10);
    expect(added).toHaveProperty('end', 20);
    expect(added).toHaveProperty('attributes', attributes);
  });
});

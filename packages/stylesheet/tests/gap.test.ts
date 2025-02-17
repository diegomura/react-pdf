import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet gap', () => {
  test('should resolve gap shorthand', () => {
    const styles = resolveStyle({ gap: '2px' });

    expect(styles).toEqual({
      columnGap: 2,
      rowGap: 2,
    });
  });

  test('should resolve row gap', () => {
    const styles = resolveStyle({ rowGap: '1in' });

    expect(styles).toEqual({
      rowGap: 72,
    });
  });

  test('should resolve column gap', () => {
    const styles = resolveStyle({ columnGap: '1in' });

    expect(styles).toEqual({
      columnGap: 72,
    });
  });
});

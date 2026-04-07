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

  test('should resolve gap shorthand with two values', () => {
    const styles = resolveStyle({ gap: '10px 20px' });

    expect(styles).toEqual({
      rowGap: 10,
      columnGap: 20,
    });
  });

  test('should resolve gap with rem unit', () => {
    const styles = resolveStyle({ gap: '2rem' });

    expect(styles).toEqual({
      rowGap: 20,
      columnGap: 20,
    });
  });

  test('should resolve gap with vw unit', () => {
    const styles = resolveStyle({ gap: '50vw' });

    expect(styles).toEqual({
      rowGap: 100,
      columnGap: 100,
    });
  });

  test('should resolve gap with vh unit', () => {
    const styles = resolveStyle({ gap: '50vh' });

    expect(styles).toEqual({
      rowGap: 200,
      columnGap: 200,
    });
  });

  test('should resolve gap with pt unit', () => {
    const styles = resolveStyle({ gap: '10pt' });

    expect(styles).toEqual({
      rowGap: 10,
      columnGap: 10,
    });
  });

  test('should resolve gap shorthand with mixed units', () => {
    const styles = resolveStyle({ gap: '1in 2rem' });

    expect(styles).toEqual({
      rowGap: 72,
      columnGap: 20,
    });
  });

  test('should resolve row gap with rem unit', () => {
    const styles = resolveStyle({ rowGap: '2rem' });

    expect(styles).toEqual({
      rowGap: 20,
    });
  });

  test('should resolve column gap with rem unit', () => {
    const styles = resolveStyle({ columnGap: '2rem' });

    expect(styles).toEqual({
      columnGap: 20,
    });
  });

  test('should resolve numeric gap value', () => {
    const styles = resolveStyle({ gap: 10 });

    expect(styles).toEqual({
      rowGap: 10,
      columnGap: 10,
    });
  });

  test('should resolve numeric row gap value', () => {
    const styles = resolveStyle({ rowGap: 15 });

    expect(styles).toEqual({
      rowGap: 15,
    });
  });

  test('should resolve numeric column gap value', () => {
    const styles = resolveStyle({ columnGap: 15 });

    expect(styles).toEqual({
      columnGap: 15,
    });
  });

  test('should resolve gap percentage value', () => {
    const styles = resolveStyle({ gap: '10%' });

    expect(styles).toEqual({
      rowGap: '10%',
      columnGap: '10%',
    });
  });
});

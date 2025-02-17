import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet positioning', () => {
  test('should resolve object positining shorthand', () => {
    const styles = resolveStyle({ objectPosition: '20 30' });

    expect(styles).toEqual({
      objectPositionX: 20,
      objectPositionY: 30,
    });
  });

  test('should resolve object positining percentage shorthand', () => {
    const styles = resolveStyle({ objectPosition: '50% 50%' });

    expect(styles).toEqual({
      objectPositionX: '50%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position left top shorthand', () => {
    const styles = resolveStyle({ objectPosition: 'top left' });

    expect(styles).toEqual({
      objectPositionX: '0%',
      objectPositionY: '0%',
    });
  });

  test('should resolve object position left center shorthand', () => {
    const styles = resolveStyle({ objectPosition: 'left center' });

    expect(styles).toEqual({
      objectPositionX: '0%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position left bottom shorthand', () => {
    const styles = resolveStyle({ objectPosition: 'left bottom' });

    expect(styles).toEqual({
      objectPositionX: '0%',
      objectPositionY: '100%',
    });
  });

  test('should resolve object position right top shorthand', () => {
    const styles = resolveStyle({ objectPosition: 'right top' });

    expect(styles).toEqual({
      objectPositionX: '100%',
      objectPositionY: '0%',
    });
  });

  test('should resolve object position right center shorthand', () => {
    const styles = resolveStyle({ objectPosition: 'right center' });

    expect(styles).toEqual({
      objectPositionX: '100%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position right bottom shorthand', () => {
    const styles = resolveStyle({ objectPosition: 'right bottom' });

    expect(styles).toEqual({
      objectPositionX: '100%',
      objectPositionY: '100%',
    });
  });

  test('should resolve object position center center shorthand', () => {
    const styles = resolveStyle({ objectPosition: 'center center' });

    expect(styles).toEqual({
      objectPositionX: '50%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object positining', () => {
    const styles = resolveStyle({
      objectPositionX: '20',
      objectPositionY: '30',
    });

    expect(styles).toEqual({
      objectPositionX: 20,
      objectPositionY: 30,
    });
  });

  test('should resolve object positining percentage', () => {
    const styles = resolveStyle({
      objectPositionX: '50%',
      objectPositionY: '50%',
    });

    expect(styles).toEqual({
      objectPositionX: '50%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position left top', () => {
    const styles = resolveStyle({
      objectPositionX: 'top',
      objectPositionY: 'left',
    });

    expect(styles).toEqual({
      objectPositionX: '0%',
      objectPositionY: '0%',
    });
  });

  test('should resolve object position left center', () => {
    const styles = resolveStyle({
      objectPositionX: 'left',
      objectPositionY: 'center',
    });

    expect(styles).toEqual({
      objectPositionX: '0%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position left bottom', () => {
    const styles = resolveStyle({
      objectPositionX: 'left',
      objectPositionY: 'bottom',
    });

    expect(styles).toEqual({
      objectPositionX: '0%',
      objectPositionY: '100%',
    });
  });

  test('should resolve object position right top', () => {
    const styles = resolveStyle({
      objectPosition: 'right',
      objectPositionY: 'top',
    });

    expect(styles).toEqual({
      objectPositionX: '100%',
      objectPositionY: '0%',
    });
  });

  test('should resolve object position right center', () => {
    const styles = resolveStyle({
      objectPositionX: 'right',
      objectPositionY: 'center',
    });

    expect(styles).toEqual({
      objectPositionX: '100%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position right bottom', () => {
    const styles = resolveStyle({
      objectPositionX: 'right',
      objectPositionY: 'bottom',
    });

    expect(styles).toEqual({
      objectPositionX: '100%',
      objectPositionY: '100%',
    });
  });

  test('should resolve object position center center', () => {
    const styles = resolveStyle({
      objectPositionX: 'center',
      objectPositionY: 'center',
    });

    expect(styles).toEqual({
      objectPositionX: '50%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object fit', () => {
    const styles = resolveStyle({ objectFit: 'cover' });

    expect(styles).toEqual({
      objectFit: 'cover',
    });
  });
});

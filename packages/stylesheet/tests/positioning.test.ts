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

  test('should resolve object fit contain', () => {
    const styles = resolveStyle({ objectFit: 'contain' });

    expect(styles).toEqual({
      objectFit: 'contain',
    });
  });

  test('should resolve object fit fill', () => {
    const styles = resolveStyle({ objectFit: 'fill' });

    expect(styles).toEqual({
      objectFit: 'fill',
    });
  });

  test('should resolve object fit none', () => {
    const styles = resolveStyle({ objectFit: 'none' });

    expect(styles).toEqual({
      objectFit: 'none',
    });
  });

  test('should resolve object fit scale-down', () => {
    const styles = resolveStyle({ objectFit: 'scale-down' });

    expect(styles).toEqual({
      objectFit: 'scale-down',
    });
  });

  test('should resolve object position single keyword center', () => {
    const styles = resolveStyle({ objectPosition: 'center' });

    expect(styles).toEqual({
      objectPositionX: '50%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position single keyword left', () => {
    const styles = resolveStyle({ objectPosition: 'left' });

    expect(styles).toEqual({
      objectPositionX: '0%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position single keyword right', () => {
    const styles = resolveStyle({ objectPosition: 'right' });

    expect(styles).toEqual({
      objectPositionX: '100%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position single keyword top', () => {
    const styles = resolveStyle({ objectPosition: 'top' });

    expect(styles).toEqual({
      objectPositionX: '50%',
      objectPositionY: '0%',
    });
  });

  test('should resolve object position single keyword bottom', () => {
    const styles = resolveStyle({ objectPosition: 'bottom' });

    expect(styles).toEqual({
      objectPositionX: '50%',
      objectPositionY: '100%',
    });
  });

  test('should resolve object position with in unit', () => {
    const styles = resolveStyle({ objectPosition: '1in 2in' });

    expect(styles).toEqual({
      objectPositionX: 72,
      objectPositionY: 144,
    });
  });

  test('should resolve object position with rem unit', () => {
    const styles = resolveStyle({ objectPosition: '1rem 2rem' });

    expect(styles).toEqual({
      objectPositionX: 10,
      objectPositionY: 20,
    });
  });

  test('should resolve object position with vw unit', () => {
    const styles = resolveStyle({ objectPosition: '50vw 25vw' });

    expect(styles).toEqual({
      objectPositionX: 100,
      objectPositionY: 50,
    });
  });

  test('should resolve object position with vh unit', () => {
    const styles = resolveStyle({ objectPosition: '50vh 25vh' });

    expect(styles).toEqual({
      objectPositionX: 200,
      objectPositionY: 100,
    });
  });

  test('should resolve object position with px unit', () => {
    const styles = resolveStyle({ objectPosition: '10px 20px' });

    expect(styles).toEqual({
      objectPositionX: 10,
      objectPositionY: 20,
    });
  });

  test('should resolve object position with mixed keyword and value', () => {
    const styles = resolveStyle({ objectPosition: 'left 50' });

    expect(styles).toEqual({
      objectPositionX: '0%',
      objectPositionY: 50,
    });
  });

  test('should resolve numeric objectPositionX and objectPositionY', () => {
    const styles = resolveStyle({
      objectPositionX: 20,
      objectPositionY: 30,
    });

    expect(styles).toEqual({
      objectPositionX: 20,
      objectPositionY: 30,
    });
  });

  test('should resolve objectPositionX with in unit', () => {
    const styles = resolveStyle({ objectPositionX: '1in' });

    expect(styles).toEqual({
      objectPositionX: 72,
    });
  });

  test('should resolve objectPositionY with rem unit', () => {
    const styles = resolveStyle({ objectPositionY: '2rem' });

    expect(styles).toEqual({
      objectPositionY: 20,
    });
  });

  test('should resolve object position single numeric value', () => {
    const styles = resolveStyle({ objectPosition: '50' });

    expect(styles).toEqual({
      objectPositionX: 50,
      objectPositionY: '50%',
    });
  });

  test('should resolve object position single percentage value', () => {
    const styles = resolveStyle({ objectPosition: '25%' });

    expect(styles).toEqual({
      objectPositionX: '25%',
      objectPositionY: '50%',
    });
  });

  test('should resolve object position with zero values', () => {
    const styles = resolveStyle({ objectPosition: '0 0' });

    expect(styles).toEqual({
      objectPositionX: 0,
      objectPositionY: 0,
    });
  });

  test('should resolve object position with negative values', () => {
    const styles = resolveStyle({ objectPosition: '-10 -20' });

    expect(styles).toEqual({
      objectPositionX: -10,
      objectPositionY: -20,
    });
  });

  test('should resolve object position with mixed units', () => {
    const styles = resolveStyle({ objectPosition: '1in 2rem' });

    expect(styles).toEqual({
      objectPositionX: 72,
      objectPositionY: 20,
    });
  });

  test('should resolve object position with cm unit', () => {
    const styles = resolveStyle({ objectPosition: '2.54cm 5.08cm' });

    expect(styles).toEqual({
      objectPositionX: 72,
      objectPositionY: 144,
    });
  });

  test('should resolve object position with mm unit', () => {
    const styles = resolveStyle({ objectPosition: '25.4mm 50.8mm' });

    expect(styles).toEqual({
      objectPositionX: 72,
      objectPositionY: 144,
    });
  });

  test('should resolve object position with value and keyword', () => {
    const styles = resolveStyle({ objectPosition: '30% bottom' });

    expect(styles).toEqual({
      objectPositionX: '30%',
      objectPositionY: '100%',
    });
  });
});

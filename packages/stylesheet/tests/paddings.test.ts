import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet paddings', () => {
  test('should ignore invalid values', () => {
    const paddings = [
      { padding: '2 auto' },
      { padding: '"string"' },
      { padding: 'url("link.com")' },
      { padding: 'auto 2 black 4' },
      { padding: 'calc(100% - 10px)' },
      { padding: 'rgba(1 1 1 / 0.3)' },
      { padding: '1, 2, 3' },
      { paddingLeft: 'yellow' },
      { paddingTop: '12lelkek' },
      { paddingBottom: '1 2 3' },
      { paddingHorizontal: '1 2 3' },
      { padding: '1 2 3 4 5' },
      { padding: () => {} },
    ];
    const expanded = {};

    paddings.forEach((style) => {
      expect(resolveStyle(style as any)).toEqual(expanded);
    });
  });

  test('should resolve padding shorthand', () => {
    const styles = resolveStyle({ padding: '2in' });

    expect(styles).toEqual({
      paddingLeft: 144,
      paddingRight: 144,
      paddingTop: 144,
      paddingBottom: 144,
    });
  });

  test('should resolve padding axis shorthand', () => {
    const styles = resolveStyle({ padding: '10px 1in' });

    expect(styles).toEqual({
      paddingTop: 10,
      paddingLeft: 72,
      paddingRight: 72,
      paddingBottom: 10,
    });
  });

  test('should resolve padding edges shorthand', () => {
    const styles = resolveStyle({ padding: '10 20 30 40' });

    expect(styles).toEqual({
      paddingTop: 10,
      paddingLeft: 40,
      paddingRight: 20,
      paddingBottom: 30,
    });
  });

  test('should resolve padding edges shorthand units', () => {
    const styles = resolveStyle({ padding: '10cm 20in 30mm 40pt' });

    expect(styles).toEqual({
      paddingLeft: 40,
      paddingRight: 1440,
      paddingTop: 283.46456692913387,
      paddingBottom: 85.03937007874016,
    });
  });

  test('should resolve padding edges shorthand negative values', () => {
    const styles = resolveStyle({ padding: '-10 -20in -30mm -40%' });

    expect(styles).toEqual({
      paddingTop: -10,
      paddingLeft: '-40%',
      paddingRight: -1440,
      paddingBottom: -85.03937007874016,
    });
  });

  test('should resolve padding edges shorthand units with decimals', () => {
    const styles = resolveStyle({
      padding: '10.5cm 20.005in 30.10mm 40.0000005pt',
    });

    expect(styles).toEqual({
      paddingRight: 1440.36,
      paddingLeft: 40.0000005,
      paddingTop: 297.6377952755905,
      paddingBottom: 85.3228346456693,
    });
  });

  test('should resolve padding horizontal shorthand', () => {
    const styles = resolveStyle({ paddingHorizontal: 4 });

    expect(styles).toEqual({
      paddingLeft: 4,
      paddingRight: 4,
    });
  });

  test('should resolve padding horizontal edges shorthand', () => {
    const styles = resolveStyle({ paddingHorizontal: '1 2' });

    expect(styles).toEqual({
      paddingRight: 1,
      paddingLeft: 2,
    });
  });

  test('should resolve padding vertical shorthand', () => {
    const styles = resolveStyle({ paddingVertical: '4' });

    expect(styles).toEqual({
      paddingTop: 4,
      paddingBottom: 4,
    });
  });

  test('should resolve padding vertical edges shorthand', () => {
    const styles = resolveStyle({ paddingVertical: '2 4' });

    expect(styles).toEqual({
      paddingTop: 2,
      paddingBottom: 4,
    });
  });

  test('should resolve padding units correctly', () => {
    const styles = resolveStyle({
      paddingTop: '10cm',
      paddingRight: '20in',
      paddingBottom: '30mm',
      paddingLeft: '40pt',
    });

    expect(styles).toEqual({
      paddingLeft: 40,
      paddingRight: 1440,
      paddingTop: 283.46456692913387,
      paddingBottom: 85.03937007874016,
    });
  });

  test('should resolve padding vw dimensions', () => {
    const styles = resolveStyle({
      paddingTop: '10vw',
      paddingRight: '20vw',
      paddingBottom: '30vw',
      paddingLeft: '40vw',
    });

    expect(styles.paddingTop).toBe(20);
    expect(styles.paddingRight).toBe(40);
    expect(styles.paddingBottom).toBe(60);
    expect(styles.paddingLeft).toBe(80);
  });

  test('should resolve padding vh dimensions', () => {
    const styles = resolveStyle({
      paddingTop: '10vh',
      paddingRight: '20vh',
      paddingBottom: '30vh',
      paddingLeft: '40vh',
    });

    expect(styles.paddingTop).toBe(40);
    expect(styles.paddingRight).toBe(80);
    expect(styles.paddingBottom).toBe(120);
    expect(styles.paddingLeft).toBe(160);
  });

  test('should resolve expanded padding mm dimensions', () => {
    const styles = resolveStyle({
      paddingTop: '1mm',
      paddingRight: '2mm',
      paddingBottom: '3mm',
      paddingLeft: '4mm',
    });

    expect(styles.paddingTop).toBeCloseTo(2.83, 1);
    expect(styles.paddingRight).toBeCloseTo(2.83 * 2, 1);
    expect(styles.paddingBottom).toBeCloseTo(2.83 * 3, 1);
    expect(styles.paddingLeft).toBeCloseTo(2.83 * 4, 1);
  });

  test('should resolve expanded padding cm dimensions', () => {
    const styles = resolveStyle({
      paddingTop: '1cm',
      paddingRight: '2cm',
      paddingBottom: '3cm',
      paddingLeft: '4cm',
    });

    expect(styles.paddingTop).toBeCloseTo(28.346, 1);
    expect(styles.paddingRight).toBeCloseTo(28.346 * 2, 1);
    expect(styles.paddingBottom).toBeCloseTo(28.346 * 3, 1);
    expect(styles.paddingLeft).toBeCloseTo(28.346 * 4, 1);
  });

  test('should resolve values with improper formatting', () => {
    const styles = resolveStyle({ padding: '  1 ' });

    expect(styles).toEqual({
      paddingTop: 1,
      paddingRight: 1,
      paddingBottom: 1,
      paddingLeft: 1,
    });
  });

  test('should resolve padding rem dimensions', () => {
    const styles = resolveStyle({
      paddingTop: '1rem',
      paddingRight: '2rem',
      paddingBottom: '3rem',
      paddingLeft: '4rem',
    });

    expect(styles.paddingTop).toBe(10);
    expect(styles.paddingRight).toBe(20);
    expect(styles.paddingBottom).toBe(30);
    expect(styles.paddingLeft).toBe(40);
  });

  test('should resolve padding shorthand with rem', () => {
    const styles = resolveStyle({ padding: '2rem' });

    expect(styles).toEqual({
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
    });
  });

  test('should resolve padding horizontal with rem', () => {
    const styles = resolveStyle({ paddingHorizontal: '2rem' });

    expect(styles).toEqual({
      paddingLeft: 20,
      paddingRight: 20,
    });
  });

  test('should resolve padding vertical with rem', () => {
    const styles = resolveStyle({ paddingVertical: '2rem' });

    expect(styles).toEqual({
      paddingTop: 20,
      paddingBottom: 20,
    });
  });

  test('should resolve padding shorthand with three values', () => {
    const styles = resolveStyle({ padding: '10 20 30' });

    expect(styles).toEqual({
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 30,
      paddingLeft: 20,
    });
  });

  test('should resolve numeric individual paddings', () => {
    const styles = resolveStyle({
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 30,
      paddingLeft: 40,
    });

    expect(styles).toEqual({
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 30,
      paddingLeft: 40,
    });
  });

  test('should resolve individual padding with percentage', () => {
    const styles = resolveStyle({
      paddingTop: '10%',
      paddingRight: '20%',
      paddingBottom: '30%',
      paddingLeft: '40%',
    });

    expect(styles).toEqual({
      paddingTop: '10%',
      paddingRight: '20%',
      paddingBottom: '30%',
      paddingLeft: '40%',
    });
  });
});

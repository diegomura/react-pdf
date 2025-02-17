import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet margins', () => {
  test('should ignore invalid values', () => {
    const margins = [
      { margin: '"string"' },
      { margin: 'url("link.com")' },
      { margin: 'auto 2 black 4' },
      { margin: 'calc(100% - 10px)' },
      { margin: 'rgba(1 1 1 / 0.3)' },
      { margin: '1, 2, 3' },
      { marginLeft: 'yellow' },
      { marginTop: '12lelkek' },
      { marginBottom: '1 2 3' },
      { marginHorizontal: '1 2 3' },
      { margin: '1 2 3 4 5' },
      { margin: () => {} },
    ];
    const expanded = {};

    margins.forEach((style) => {
      expect(resolveStyle(style as any)).toEqual(expanded);
    });
  });

  test('should resolve margin shorthand', () => {
    const styles = resolveStyle({ margin: '2in' });

    expect(styles).toEqual({
      marginLeft: 144,
      marginRight: 144,
      marginTop: 144,
      marginBottom: 144,
    });
  });

  test('should resolve margin axis shorthand', () => {
    const styles = resolveStyle({ margin: '10px 1in' });

    expect(styles).toEqual({
      marginTop: 10,
      marginLeft: 72,
      marginRight: 72,
      marginBottom: 10,
    });
  });

  test('should resolve margin edges shorthand', () => {
    const styles = resolveStyle({ margin: '10 20 30 40' });

    expect(styles).toEqual({
      marginTop: 10,
      marginLeft: 40,
      marginRight: 20,
      marginBottom: 30,
    });
  });

  test('should resolve margin edges shorthand units', () => {
    const styles = resolveStyle({ margin: '10cm 20in 30mm 40pt' });

    expect(styles).toEqual({
      marginLeft: 40,
      marginRight: 1440,
      marginTop: 283.46456692913387,
      marginBottom: 85.03937007874015,
    });
  });

  test('should resolve margin edges shorthand negative values', () => {
    const styles = resolveStyle({ margin: '-10 -20in -30mm -40%' });

    expect(styles).toEqual({
      marginTop: -10,
      marginLeft: '-40%',
      marginRight: -1440,
      marginBottom: -85.03937007874015,
    });
  });

  test('should resolve margin shorthand with auto', () => {
    const margins = [
      { margin: 'auto 2 3 4' },
      { margin: '1 auto 3 4' },
      { margin: '1 2 auto 4' },
      { margin: '1 2 3 auto' },
    ];

    const expandedMargins = [
      {
        marginTop: 'auto',
        marginRight: 2,
        marginBottom: 3,
        marginLeft: 4,
      },
      {
        marginTop: 1,
        marginRight: 'auto',
        marginBottom: 3,
        marginLeft: 4,
      },
      {
        marginTop: 1,
        marginRight: 2,
        marginBottom: 'auto',
        marginLeft: 4,
      },
      {
        marginTop: 1,
        marginRight: 2,
        marginBottom: 3,
        marginLeft: 'auto',
      },
    ];

    margins.forEach((style, index) => {
      expect(resolveStyle(style)).toEqual(expandedMargins[index]);
    });
  });

  test('should resolve margin edges shorthand units with decimals', () => {
    const styles = resolveStyle({
      margin: '10.5cm 20.005in 30.10mm 40.0000005pt',
    });

    expect(styles).toEqual({
      marginRight: 1440.36,
      marginLeft: 40.0000005,
      marginTop: 297.6377952755905,
      marginBottom: 85.32283464566929,
    });
  });

  test('should resolve margin auto shorthand', () => {
    const styles = resolveStyle({ margin: 'auto' });

    expect(styles).toEqual({
      marginRight: 'auto',
      marginLeft: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
    });
  });

  test('should resolve margin horizontal shorthand', () => {
    const styles = resolveStyle({ marginHorizontal: 4 });

    expect(styles).toEqual({
      marginLeft: 4,
      marginRight: 4,
    });
  });

  test('should resolve margin horizontal edges shorthand', () => {
    const styles = resolveStyle({ marginHorizontal: '1 2' });

    expect(styles).toEqual({
      marginRight: 1,
      marginLeft: 2,
    });
  });

  test('should resolve margin horizontal auto shorthand', () => {
    const styles = resolveStyle({ marginHorizontal: 'auto' });

    expect(styles).toEqual({
      marginRight: 'auto',
      marginLeft: 'auto',
    });
  });

  test('should resolve margin vertical shorthand', () => {
    const styles = resolveStyle({ marginVertical: '4' });

    expect(styles).toEqual({
      marginTop: 4,
      marginBottom: 4,
    });
  });

  test('should resolve margin vertical edges shorthand', () => {
    const styles = resolveStyle({ marginVertical: '2 4' });

    expect(styles).toEqual({
      marginTop: 2,
      marginBottom: 4,
    });
  });

  test('should resolve margin vertical auth shorthand', () => {
    const styles = resolveStyle({ marginVertical: 'auto' });

    expect(styles).toEqual({
      marginTop: 'auto',
      marginBottom: 'auto',
    });
  });

  test('should resolve margin units correctly', () => {
    const styles = resolveStyle({
      marginTop: '10cm',
      marginRight: '20in',
      marginBottom: '30mm',
      marginLeft: '40pt',
    });

    expect(styles).toEqual({
      marginLeft: 40,
      marginRight: 1440,
      marginTop: 283.46456692913387,
      marginBottom: 85.03937007874015,
    });
  });

  test('should resolve margin vw dimensions', () => {
    const styles = resolveStyle({
      marginTop: '10vw',
      marginRight: '20vw',
      marginBottom: '30vw',
      marginLeft: '40vw',
    });

    expect(styles.marginTop).toBe(20);
    expect(styles.marginRight).toBe(40);
    expect(styles.marginBottom).toBe(60);
    expect(styles.marginLeft).toBe(80);
  });

  test('should resolve margin vh dimensions', () => {
    const styles = resolveStyle({
      marginTop: '10vh',
      marginRight: '20vh',
      marginBottom: '30vh',
      marginLeft: '40vh',
    });

    expect(styles.marginTop).toBe(40);
    expect(styles.marginRight).toBe(80);
    expect(styles.marginBottom).toBe(120);
    expect(styles.marginLeft).toBe(160);
  });

  test('should resolve expanded margin mm dimensions', () => {
    const styles = resolveStyle({
      marginTop: '1mm',
      marginRight: '2mm',
      marginBottom: '3mm',
      marginLeft: '4mm',
    });

    expect(styles.marginTop).toBeCloseTo(2.83, 1);
    expect(styles.marginRight).toBeCloseTo(2.83 * 2, 1);
    expect(styles.marginBottom).toBeCloseTo(2.83 * 3, 1);
    expect(styles.marginLeft).toBeCloseTo(2.83 * 4, 1);
  });

  test('should resolve expanded margin cm dimensions', () => {
    const styles = resolveStyle({
      marginTop: '1cm',
      marginRight: '2cm',
      marginBottom: '3cm',
      marginLeft: '4cm',
    });

    expect(styles.marginTop).toBeCloseTo(28.346, 1);
    expect(styles.marginRight).toBeCloseTo(28.346 * 2, 1);
    expect(styles.marginBottom).toBeCloseTo(28.346 * 3, 1);
    expect(styles.marginLeft).toBeCloseTo(28.346 * 4, 1);
  });

  test('should resolve values with improper formatting', () => {
    const styles = resolveStyle({ margin: '  1 ' });

    expect(styles).toEqual({
      marginTop: 1,
      marginRight: 1,
      marginBottom: 1,
      marginLeft: 1,
    });
  });
});

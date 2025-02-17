import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet layout', () => {
  test('should resolve positions in in dimensions', () => {
    const styles = resolveStyle({
      top: '1in',
      right: '2in',
      bottom: '3in',
      left: '4in',
    });

    expect(styles.top).toBe(72);
    expect(styles.right).toBe(72 * 2);
    expect(styles.bottom).toBe(72 * 3);
    expect(styles.left).toBe(72 * 4);
  });

  test('should resolve positions in mm dimensions', () => {
    const styles = resolveStyle({
      top: '1mm',
      right: '2mm',
      bottom: '3mm',
      left: '4mm',
    });

    expect(styles.top).toBeCloseTo(2.83, 1);
    expect(styles.right).toBeCloseTo(2.83 * 2, 1);
    expect(styles.bottom).toBeCloseTo(2.83 * 3, 1);
    expect(styles.left).toBeCloseTo(2.83 * 4, 1);
  });

  test('should resolve positions in cm dimensions', () => {
    const styles = resolveStyle({
      top: '1cm',
      right: '2cm',
      bottom: '3cm',
      left: '4cm',
    });

    expect(styles.top).toBeCloseTo(28.346, 1);
    expect(styles.right).toBeCloseTo(28.346 * 2, 1);
    expect(styles.bottom).toBeCloseTo(28.346 * 3, 1);
    expect(styles.left).toBeCloseTo(28.346 * 4, 1);
  });

  test('should resolve aspect ratio', () => {
    const styles = resolveStyle({ aspectRatio: '2' });

    expect(styles).toEqual({ aspectRatio: 2 });
  });

  test('should resolve display', () => {
    const styles = resolveStyle({ display: 'flex' });

    expect(styles).toEqual({ display: 'flex' });
  });

  test('should resolve position', () => {
    const styles = resolveStyle({ position: 'absolute' });

    expect(styles).toEqual({ position: 'absolute' });
  });

  test('should resolve overflow', () => {
    const styles = resolveStyle({ overflow: 'hidden' });

    expect(styles).toEqual({ overflow: 'hidden' });
  });

  test('should resolve z index', () => {
    const styles = resolveStyle({ zIndex: '2' });

    expect(styles).toEqual({ zIndex: 2 });
  });
});

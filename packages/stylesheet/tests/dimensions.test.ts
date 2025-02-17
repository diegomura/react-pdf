import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet dimensions', () => {
  test('should resolve width dimensions', () => {
    const styles = resolveStyle({ width: '1in' });

    expect(styles.width).toBe(72);
  });

  test('should resolve width px dimensions', () => {
    const styles = resolveStyle({ width: '1px' });

    expect(styles.width).toBe(1);
  });

  test('should resolve width mm dimensions', () => {
    const styles = resolveStyle({ width: '1mm' });

    expect(styles.width).toBeCloseTo(2.83, 1);
  });

  test('should resolve width cm dimensions', () => {
    const styles = resolveStyle({ width: '1cm' });

    expect(styles.width).toBeCloseTo(28.346, 1);
  });

  test('should resolve width vw dimensions', () => {
    const styles = resolveStyle({ width: '50vw' });

    expect(styles.width).toBe(100);
  });

  test('should resolve width vh dimensions', () => {
    const styles = resolveStyle({ width: '50vh' });

    expect(styles.width).toBe(200);
  });

  test('should resolve min/max width in dimensions', () => {
    const styles = resolveStyle({ minWidth: '1in', maxWidth: '2in' });

    expect(styles.minWidth).toBe(72);
    expect(styles.maxWidth).toBe(72 * 2);
  });

  test('should resolve min/max width mm dimensions', () => {
    const styles = resolveStyle({ minWidth: '1mm', maxWidth: '2mm' });

    expect(styles.minWidth).toBeCloseTo(2.83, 1);
    expect(styles.maxWidth).toBeCloseTo(2.83 * 2, 1);
  });

  test('should resolve min/max width cm dimensions', () => {
    const styles = resolveStyle({ minWidth: '1cm', maxWidth: '2cm' });

    expect(styles.minWidth).toBeCloseTo(28.346, 1);
    expect(styles.maxWidth).toBeCloseTo(28.346 * 2, 1);
  });

  test('should resolve min/max width vw dimensions', () => {
    const styles = resolveStyle({ minWidth: '50vw', maxWidth: '20vw' });

    expect(styles.minWidth).toBe(100);
    expect(styles.maxWidth).toBe(40);
  });

  test('should resolve min/max width vh dimensions', () => {
    const styles = resolveStyle({ minWidth: '50vh', maxWidth: '20vh' });

    expect(styles.minWidth).toBe(200);
    expect(styles.maxWidth).toBe(80);
  });

  test('should resolve height dimensions', () => {
    const styles = resolveStyle({ height: '1in' });

    expect(styles.height).toBe(72);
  });

  test('should resolve height px dimensions', () => {
    const styles = resolveStyle({ height: '1px' });

    expect(styles.height).toBe(1);
  });

  test('should resolve height mm dimensions', () => {
    const styles = resolveStyle({ height: '1mm' });

    expect(styles.height).toBeCloseTo(2.83, 1);
  });

  test('should resolve height cm dimensions', () => {
    const styles = resolveStyle({ height: '1cm' });

    expect(styles.height).toBeCloseTo(28.346, 1);
  });

  test('should resolve height vw dimensions', () => {
    const styles = resolveStyle({ height: '50vw' });

    expect(styles.height).toBe(100);
  });

  test('should resolve height vh dimensions', () => {
    const styles = resolveStyle({ height: '50vh' });

    expect(styles.height).toBe(200);
  });

  test('should resolve min/max height in dimensions', () => {
    const styles = resolveStyle({ minWidth: '1in', maxWidth: '2in' });

    expect(styles.minWidth).toBe(72);
    expect(styles.maxWidth).toBe(72 * 2);
  });

  test('should resolve min/max height mm dimensions', () => {
    const styles = resolveStyle({ minHeight: '1mm', maxHeight: '2mm' });

    expect(styles.minHeight).toBeCloseTo(2.83, 1);
    expect(styles.maxHeight).toBeCloseTo(2.83 * 2, 1);
  });

  test('should resolve min/max height cm dimensions', () => {
    const styles = resolveStyle({ minHeight: '1cm', maxHeight: '2cm' });

    expect(styles.minHeight).toBeCloseTo(28.346, 1);
    expect(styles.maxHeight).toBeCloseTo(28.346 * 2, 1);
  });

  test('should resolve min/max height vw dimensions', () => {
    const styles = resolveStyle({ minHeight: '50vw', maxHeight: '20vw' });

    expect(styles.minHeight).toBe(100);
    expect(styles.maxHeight).toBe(40);
  });

  test('should resolve min/max height vh dimensions', () => {
    const styles = resolveStyle({ minHeight: '50vh', maxHeight: '20vh' });

    expect(styles.minHeight).toBe(200);
    expect(styles.maxHeight).toBe(80);
  });
});

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

  test('should resolve width percentage dimensions', () => {
    const styles = resolveStyle({ width: '50%' });

    expect(styles.width).toBe('50%');
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

  test('should resolve min/max width percent dimensions', () => {
    const styles = resolveStyle({ minWidth: '50%', maxWidth: '20%' });

    expect(styles.minWidth).toBe('50%');
    expect(styles.maxWidth).toBe('20%');
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

  test('should resolve height percentage dimensions', () => {
    const styles = resolveStyle({ height: '50%' });

    expect(styles.height).toBe('50%');
  });

  test('should resolve min/max height in dimensions', () => {
    const styles = resolveStyle({ minHeight: '1in', maxHeight: '2in' });

    expect(styles.minHeight).toBe(72);
    expect(styles.maxHeight).toBe(72 * 2);
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

  test('should resolve min/max height percentage dimensions', () => {
    const styles = resolveStyle({ minHeight: '50%', maxHeight: '20%' });

    expect(styles.minHeight).toBe('50%');
    expect(styles.maxHeight).toBe('20%');
  });

  test('should resolve width pt dimensions', () => {
    const styles = resolveStyle({ width: '100pt' });

    expect(styles.width).toBe(100);
  });

  test('should resolve height pt dimensions', () => {
    const styles = resolveStyle({ height: '100pt' });

    expect(styles.height).toBe(100);
  });

  test('should resolve width rem dimensions', () => {
    const styles = resolveStyle({ width: '2rem' });

    expect(styles.width).toBe(20);
  });

  test('should resolve height rem dimensions', () => {
    const styles = resolveStyle({ height: '2rem' });

    expect(styles.height).toBe(20);
  });

  test('should resolve min/max width rem dimensions', () => {
    const styles = resolveStyle({ minWidth: '1rem', maxWidth: '3rem' });

    expect(styles.minWidth).toBe(10);
    expect(styles.maxWidth).toBe(30);
  });

  test('should resolve min/max height rem dimensions', () => {
    const styles = resolveStyle({ minHeight: '1rem', maxHeight: '3rem' });

    expect(styles.minHeight).toBe(10);
    expect(styles.maxHeight).toBe(30);
  });

  test('should resolve numeric width value', () => {
    const styles = resolveStyle({ width: 100 });

    expect(styles.width).toBe(100);
  });

  test('should resolve numeric height value', () => {
    const styles = resolveStyle({ height: 100 });

    expect(styles.height).toBe(100);
  });

  test('should resolve string number width as pt', () => {
    const styles = resolveStyle({ width: '100' });

    expect(styles.width).toBe(100);
  });

  test('should resolve negative width dimensions', () => {
    const styles = resolveStyle({ width: '-10pt' });

    expect(styles.width).toBe(-10);
  });

  test('should resolve zero width dimensions', () => {
    const styles = resolveStyle({ width: '0' });

    expect(styles.width).toBe(0);
  });
});

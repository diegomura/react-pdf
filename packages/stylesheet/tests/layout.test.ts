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

  test('should resolve numeric z index', () => {
    const styles = resolveStyle({ zIndex: 5 });

    expect(styles).toEqual({ zIndex: 5 });
  });

  test('should resolve numeric aspect ratio', () => {
    const styles = resolveStyle({ aspectRatio: 1.5 });

    expect(styles).toEqual({ aspectRatio: 1.5 });
  });

  test('should resolve positions in px dimensions', () => {
    const styles = resolveStyle({
      top: '10px',
      right: '20px',
      bottom: '30px',
      left: '40px',
    });

    expect(styles.top).toBe(10);
    expect(styles.right).toBe(20);
    expect(styles.bottom).toBe(30);
    expect(styles.left).toBe(40);
  });

  test('should resolve positions in pt dimensions', () => {
    const styles = resolveStyle({
      top: '10pt',
      right: '20pt',
      bottom: '30pt',
      left: '40pt',
    });

    expect(styles.top).toBe(10);
    expect(styles.right).toBe(20);
    expect(styles.bottom).toBe(30);
    expect(styles.left).toBe(40);
  });

  test('should resolve positions in rem dimensions', () => {
    const styles = resolveStyle({
      top: '1rem',
      right: '2rem',
      bottom: '3rem',
      left: '4rem',
    });

    expect(styles.top).toBe(10);
    expect(styles.right).toBe(20);
    expect(styles.bottom).toBe(30);
    expect(styles.left).toBe(40);
  });

  test('should resolve positions in vw dimensions', () => {
    const styles = resolveStyle({
      top: '10vw',
      right: '20vw',
      bottom: '30vw',
      left: '40vw',
    });

    expect(styles.top).toBe(20);
    expect(styles.right).toBe(40);
    expect(styles.bottom).toBe(60);
    expect(styles.left).toBe(80);
  });

  test('should resolve positions in vh dimensions', () => {
    const styles = resolveStyle({
      top: '10vh',
      right: '20vh',
      bottom: '30vh',
      left: '40vh',
    });

    expect(styles.top).toBe(40);
    expect(styles.right).toBe(80);
    expect(styles.bottom).toBe(120);
    expect(styles.left).toBe(160);
  });

  test('should resolve positions in percentage dimensions', () => {
    const styles = resolveStyle({
      top: '10%',
      right: '20%',
      bottom: '30%',
      left: '40%',
    });

    expect(styles.top).toBe('10%');
    expect(styles.right).toBe('20%');
    expect(styles.bottom).toBe('30%');
    expect(styles.left).toBe('40%');
  });

  test('should resolve numeric positions', () => {
    const styles = resolveStyle({
      top: 10,
      right: 20,
      bottom: 30,
      left: 40,
    });

    expect(styles.top).toBe(10);
    expect(styles.right).toBe(20);
    expect(styles.bottom).toBe(30);
    expect(styles.left).toBe(40);
  });

  test('should resolve negative positions', () => {
    const styles = resolveStyle({
      top: '-10pt',
      right: '-20pt',
      bottom: '-30pt',
      left: '-40pt',
    });

    expect(styles.top).toBe(-10);
    expect(styles.right).toBe(-20);
    expect(styles.bottom).toBe(-30);
    expect(styles.left).toBe(-40);
  });
});

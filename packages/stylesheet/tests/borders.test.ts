import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet borders', () => {
  test('should resolve border shorthand', () => {
    const styles = resolveStyle({ border: '1in solid rgb(255, 0, 255)' });

    expect(styles).toEqual({
      borderTopStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderTopColor: '#FF00FF',
      borderLeftColor: '#FF00FF',
      borderRightColor: '#FF00FF',
      borderBottomColor: '#FF00FF',
      borderTopWidth: 72,
      borderLeftWidth: 72,
      borderRightWidth: 72,
      borderBottomWidth: 72,
    });
  });

  test('should resolve border shorthand with decimal units', () => {
    const styles = resolveStyle({ border: '1.5in solid rgb(255, 0, 255)' });

    expect(styles).toEqual({
      borderTopStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderTopColor: '#FF00FF',
      borderLeftColor: '#FF00FF',
      borderRightColor: '#FF00FF',
      borderBottomColor: '#FF00FF',
      borderTopWidth: 108,
      borderLeftWidth: 108,
      borderRightWidth: 108,
      borderBottomWidth: 108,
    });
  });

  test('should resolve border top shorthand', () => {
    const styles = resolveStyle({ borderTop: '3px dashed hsl(0, 100%, 50%)' });

    expect(styles).toEqual({
      borderTopWidth: 3,
      borderTopStyle: 'dashed',
      borderTopColor: '#FF0000',
    });
  });

  test('should resolve border right shorthand', () => {
    const styles = resolveStyle({ borderRight: '1 solid red' });

    expect(resolveStyle(styles)).toEqual({
      borderRightColor: 'red',
      borderRightStyle: 'solid',
      borderRightWidth: 1,
    });
  });

  test('should resolve border bottom shorthand', () => {
    const styles = resolveStyle({ borderBottom: '1px dashed #000' });

    expect(resolveStyle(styles)).toEqual({
      borderBottomColor: '#000',
      borderBottomStyle: 'dashed',
      borderBottomWidth: 1,
    });
  });

  test('should resolve border left shorthand', () => {
    const styles = resolveStyle({ borderLeft: '1in solid rgb(1, 0, 0)' });

    expect(resolveStyle(styles)).toEqual({
      borderLeftColor: '#010000',
      borderLeftStyle: 'solid',
      borderLeftWidth: 72,
    });
  });

  test('should resolve border color shorthand', () => {
    const styles = resolveStyle({ borderColor: 'red' });

    expect(styles).toEqual({
      borderTopColor: 'red',
      borderRightColor: 'red',
      borderBottomColor: 'red',
      borderLeftColor: 'red',
    });
  });

  test('should resolve border radius shorthand', () => {
    const styles = resolveStyle({ borderRadius: '5px' });

    expect(styles).toEqual({
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
    });
  });

  test('should resolve border style shorthand', () => {
    const styles = resolveStyle({ borderStyle: 'solid' });

    expect(styles).toEqual({
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
    });
  });

  test('should resolve border width shorthand', () => {
    const styles = resolveStyle({ borderWidth: 5 });

    expect(styles).toEqual({
      borderTopWidth: 5,
      borderRightWidth: 5,
      borderBottomWidth: 5,
      borderLeftWidth: 5,
    });
  });

  test('should resolve borders in in', () => {
    const styles = resolveStyle({
      borderTopWidth: '1in',
      borderRightWidth: '2in',
      borderBottomWidth: '3in',
      borderLeftWidth: '4in',
    });

    expect(styles.borderTopWidth).toBe(72);
    expect(styles.borderRightWidth).toBe(72 * 2);
    expect(styles.borderBottomWidth).toBe(72 * 3);
    expect(styles.borderLeftWidth).toBe(72 * 4);
  });

  test('should resolve borders in vw', () => {
    const styles = resolveStyle({
      borderTopWidth: '10vw',
      borderRightWidth: '20vw',
      borderBottomWidth: '30vw',
      borderLeftWidth: '40vw',
    });

    expect(styles.borderTopWidth).toBe(20);
    expect(styles.borderRightWidth).toBe(40);
    expect(styles.borderBottomWidth).toBe(60);
    expect(styles.borderLeftWidth).toBe(80);
  });

  test('should resolve borders in vh', () => {
    const styles = resolveStyle({
      borderTopWidth: '10vh',
      borderRightWidth: '20vh',
      borderBottomWidth: '30vh',
      borderLeftWidth: '40vh',
    });

    expect(styles.borderTopWidth).toBe(40);
    expect(styles.borderRightWidth).toBe(80);
    expect(styles.borderBottomWidth).toBe(120);
    expect(styles.borderLeftWidth).toBe(160);
  });

  test('should resolve borders in mm', () => {
    const styles = resolveStyle({
      borderTopWidth: '1mm',
      borderRightWidth: '2mm',
      borderBottomWidth: '3mm',
      borderLeftWidth: '4mm',
    });

    expect(styles.borderTopWidth).toBeCloseTo(2.83, 1);
    expect(styles.borderRightWidth).toBeCloseTo(2.83 * 2, 1);
    expect(styles.borderBottomWidth).toBeCloseTo(2.83 * 3, 1);
    expect(styles.borderLeftWidth).toBeCloseTo(2.83 * 4, 1);
  });

  test('should resolve borders in cm', () => {
    const styles = resolveStyle({
      borderTopWidth: '1cm',
      borderRightWidth: '2cm',
      borderBottomWidth: '3cm',
      borderLeftWidth: '4cm',
    });

    expect(styles.borderTopWidth).toBeCloseTo(28.346, 1);
    expect(styles.borderRightWidth).toBeCloseTo(28.346 * 2, 1);
    expect(styles.borderBottomWidth).toBeCloseTo(28.346 * 3, 1);
    expect(styles.borderLeftWidth).toBeCloseTo(28.346 * 4, 1);
  });
});

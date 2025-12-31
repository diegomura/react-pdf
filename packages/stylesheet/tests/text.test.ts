import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet text', () => {
  test('should resolve numeric font weight value', () => {
    const styles = resolveStyle({ fontWeight: 800 });

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should resolve string font weight value', () => {
    const styles = resolveStyle({ fontWeight: '800' });

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should resolve thin font weight', () => {
    const styles = resolveStyle({ fontWeight: 'thin' });

    expect(styles).toEqual({ fontWeight: 100 });
  });

  test('should resolve hairline font weight', () => {
    const styles = resolveStyle({ fontWeight: 'hairline' });

    expect(styles).toEqual({ fontWeight: 100 });
  });

  test('should resolve ultralight font weight', () => {
    const styles = resolveStyle({ fontWeight: 'ultralight' });

    expect(styles).toEqual({ fontWeight: 200 });
  });

  test('should resolve extralight font weight', () => {
    const styles = resolveStyle({ fontWeight: 'extralight' });

    expect(styles).toEqual({ fontWeight: 200 });
  });

  test('should resolve light font weight', () => {
    const styles = resolveStyle({ fontWeight: 'light' });

    expect(styles).toEqual({ fontWeight: 300 });
  });

  test('should resolve normal font weight', () => {
    const styles = resolveStyle({ fontWeight: 'normal' });

    expect(styles).toEqual({ fontWeight: 400 });
  });

  test('should resolve medium font weight', () => {
    const styles = resolveStyle({ fontWeight: 'medium' });

    expect(styles).toEqual({ fontWeight: 500 });
  });

  test('should resolve semibold font weight', () => {
    const styles = resolveStyle({ fontWeight: 'semibold' });

    expect(styles).toEqual({ fontWeight: 600 });
  });

  test('should resolve demibold font weight', () => {
    const styles = resolveStyle({ fontWeight: 'demibold' });

    expect(styles).toEqual({ fontWeight: 600 });
  });

  test('should resolve bold font weight', () => {
    const styles = resolveStyle({ fontWeight: 'bold' });

    expect(styles).toEqual({ fontWeight: 700 });
  });

  test('should resolve ultrabold font weight', () => {
    const styles = resolveStyle({ fontWeight: 'ultrabold' });

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should resolve extrabold font weight', () => {
    const styles = resolveStyle({ fontWeight: 'extrabold' });

    expect(styles).toEqual({ fontWeight: 800 });
  });

  test('should resolve heavy font weight', () => {
    const styles = resolveStyle({ fontWeight: 'heavy' });

    expect(styles).toEqual({ fontWeight: 900 });
  });

  test('should resolve black font weight', () => {
    const styles = resolveStyle({ fontWeight: 'black' });

    expect(styles).toEqual({ fontWeight: 900 });
  });

  test('should resolve font size', () => {
    const styles = resolveStyle({ fontSize: 12 });

    expect(styles).toEqual({ fontSize: 12 });
  });

  test('should resolve in font size', () => {
    const styles = resolveStyle({ fontSize: '1in' });

    expect(styles).toEqual({ fontSize: 72 });
  });

  test('should resolve font size rem units', () => {
    const styles = resolveStyle({ fontSize: '2rem' });

    expect(styles).toEqual({ fontSize: 20 });
  });

  test('should resolve font size rem units when base not specificed', () => {
    const styles = resolve({ width: 100, height: 100 })({ fontSize: '2rem' });

    expect(styles).toEqual({ fontSize: 36 });
  });

  test('should resolve line height number', () => {
    const styles = resolveStyle({ lineHeight: 2 });

    expect(styles.lineHeight).toBe(18 * 2);
  });

  test('should resolve number line height with font size', () => {
    const styles = resolveStyle({ lineHeight: 2, fontSize: 10 });

    expect(styles.lineHeight).toBe(10 * 2);
  });

  test('should resolve string line height', () => {
    const styles = resolveStyle({ lineHeight: '2' });

    expect(styles.lineHeight).toBe(18 * 2);
  });

  test('should resolve string line height  with font-size', () => {
    const styles = resolveStyle({ lineHeight: '2', fontSize: 10 });

    expect(styles.lineHeight).toBe(10 * 2);
  });

  test('should resolve percentage line height', () => {
    const styles = resolveStyle({ lineHeight: '200%' });

    expect(styles.lineHeight).toBe(18 * 2);
  });

  test('should resolve percentage line height with font-size', () => {
    const styles = resolveStyle({ lineHeight: '200%', fontSize: 10 });

    expect(styles.lineHeight).toBe(10 * 2);
  });

  test('should resolve px line height', () => {
    const styles = resolveStyle({ lineHeight: '20px' });

    expect(styles.lineHeight).toBe(20);
  });

  test('should resolve mm line height', () => {
    const styles = resolveStyle({ lineHeight: '20mm' });

    expect(styles.lineHeight).toBeCloseTo(56.69, 1);
  });

  test('should resolve font family', () => {
    const styles = resolveStyle({ fontFamily: 'Helvetica' });

    expect(styles).toEqual({ fontFamily: 'Helvetica' });
  });

  test('should resolve font families', () => {
    const styles = resolveStyle({ fontFamily: ['Helvetica', 'Courier'] });

    expect(styles).toEqual({ fontFamily: ['Helvetica', 'Courier'] });
  });

  test('should resolve font style', () => {
    const styles = resolveStyle({ fontStyle: 'normal' });

    expect(styles).toEqual({ fontStyle: 'normal' });
  });

  test('should resolve letter spacing', () => {
    const styles = resolveStyle({ letterSpacing: 12 });

    expect(styles).toEqual({ letterSpacing: 12 });
  });

  test('should resolve in line spacing', () => {
    const styles = resolveStyle({ letterSpacing: '1in' });

    expect(styles).toEqual({ letterSpacing: 72 });
  });

  test('should resolve max lines', () => {
    const styles = resolveStyle({ maxLines: 1 });

    expect(styles).toEqual({ maxLines: 1 });
  });

  test('should resolve text align', () => {
    const styles = resolveStyle({ textAlign: 'center' });

    expect(styles).toEqual({ textAlign: 'center' });
  });

  test('should resolve text decoration', () => {
    const styles = resolveStyle({ textDecoration: 'underline' });

    expect(styles).toEqual({ textDecoration: 'underline' });
  });

  test('should resolve text style', () => {
    const styles = resolveStyle({ textDecorationStyle: 'dashed' });

    expect(styles).toEqual({ textDecorationStyle: 'dashed' });
  });

  test('should resolve text overflow', () => {
    const styles = resolveStyle({ textOverflow: 'ellipsis' });

    expect(styles).toEqual({ textOverflow: 'ellipsis' });
  });

  test('should resolve text transform', () => {
    const styles = resolveStyle({ textTransform: 'capitalize' });

    expect(styles).toEqual({ textTransform: 'capitalize' });
  });

  test('should resolve text vertical align', () => {
    const styles = resolveStyle({ verticalAlign: 'sub' });

    expect(styles).toEqual({ verticalAlign: 'sub' });
  });

  test('should resolve direction ltr', () => {
    const styles = resolveStyle({ direction: 'ltr' });

    expect(styles).toEqual({ direction: 'ltr' });
  });

  test('should resolve direction rtl', () => {
    const styles = resolveStyle({ direction: 'rtl' });

    expect(styles).toEqual({ direction: 'rtl' });
  });

  test('should resolve text decoration color', () => {
    const styles = resolveStyle({ textDecorationColor: 'red' });

    expect(styles).toEqual({ textDecorationColor: 'red' });
  });

  test('should resolve text decoration color hex', () => {
    const styles = resolveStyle({ textDecorationColor: '#ff0000' });

    expect(styles).toEqual({ textDecorationColor: '#ff0000' });
  });

  test('should resolve text decoration color rgb', () => {
    const styles = resolveStyle({ textDecorationColor: 'rgb(255, 0, 0)' });

    expect(styles).toEqual({ textDecorationColor: '#FF0000' });
  });

  test('should resolve text indent', () => {
    const styles = resolveStyle({ textIndent: 20 });

    expect(styles).toEqual({ textIndent: 20 });
  });

  test('should resolve font size vw units', () => {
    const styles = resolveStyle({ fontSize: '10vw' });

    expect(styles).toEqual({ fontSize: 20 });
  });

  test('should resolve font size vh units', () => {
    const styles = resolveStyle({ fontSize: '10vh' });

    expect(styles).toEqual({ fontSize: 40 });
  });

  test('should resolve font size pt units', () => {
    const styles = resolveStyle({ fontSize: '12pt' });

    expect(styles).toEqual({ fontSize: 12 });
  });

  test('should resolve font size mm units', () => {
    const styles = resolveStyle({ fontSize: '10mm' });

    expect(styles.fontSize).toBeCloseTo(28.35, 1);
  });

  test('should resolve font size cm units', () => {
    const styles = resolveStyle({ fontSize: '1cm' });

    expect(styles.fontSize).toBeCloseTo(28.35, 1);
  });

  test('should resolve letter spacing rem units', () => {
    const styles = resolveStyle({ letterSpacing: '0.5rem' });

    expect(styles).toEqual({ letterSpacing: 5 });
  });

  test('should resolve letter spacing vw units', () => {
    const styles = resolveStyle({ letterSpacing: '1vw' });

    expect(styles).toEqual({ letterSpacing: 2 });
  });

  test('should resolve line height rem units', () => {
    const styles = resolveStyle({ lineHeight: '2rem' });

    expect(styles).toEqual({ lineHeight: 20 });
  });

  test('should resolve line height in units', () => {
    const styles = resolveStyle({ lineHeight: '0.5in' });

    expect(styles).toEqual({ lineHeight: 36 });
  });

  test('should resolve string max lines', () => {
    const styles = resolveStyle({ maxLines: '3' });

    expect(styles).toEqual({ maxLines: 3 });
  });

  test('should resolve font style italic', () => {
    const styles = resolveStyle({ fontStyle: 'italic' });

    expect(styles).toEqual({ fontStyle: 'italic' });
  });

  test('should resolve font style oblique', () => {
    const styles = resolveStyle({ fontStyle: 'oblique' });

    expect(styles).toEqual({ fontStyle: 'oblique' });
  });

  test('should resolve text align left', () => {
    const styles = resolveStyle({ textAlign: 'left' });

    expect(styles).toEqual({ textAlign: 'left' });
  });

  test('should resolve text align right', () => {
    const styles = resolveStyle({ textAlign: 'right' });

    expect(styles).toEqual({ textAlign: 'right' });
  });

  test('should resolve text align justify', () => {
    const styles = resolveStyle({ textAlign: 'justify' });

    expect(styles).toEqual({ textAlign: 'justify' });
  });

  test('should resolve text decoration line-through', () => {
    const styles = resolveStyle({ textDecoration: 'line-through' });

    expect(styles).toEqual({ textDecoration: 'line-through' });
  });

  test('should resolve text decoration style solid', () => {
    const styles = resolveStyle({ textDecorationStyle: 'solid' });

    expect(styles).toEqual({ textDecorationStyle: 'solid' });
  });

  test('should resolve text decoration style dotted', () => {
    const styles = resolveStyle({ textDecorationStyle: 'dotted' });

    expect(styles).toEqual({ textDecorationStyle: 'dotted' });
  });

  test('should resolve text transform uppercase', () => {
    const styles = resolveStyle({ textTransform: 'uppercase' });

    expect(styles).toEqual({ textTransform: 'uppercase' });
  });

  test('should resolve text transform lowercase', () => {
    const styles = resolveStyle({ textTransform: 'lowercase' });

    expect(styles).toEqual({ textTransform: 'lowercase' });
  });

  test('should resolve vertical align super', () => {
    const styles = resolveStyle({ verticalAlign: 'super' });

    expect(styles).toEqual({ verticalAlign: 'super' });
  });
});

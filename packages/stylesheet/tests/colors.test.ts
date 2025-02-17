import { describe, expect, test } from 'vitest';

import resolve from '../src/resolve';

const container = { width: 200, height: 400, remBase: 10 };

const resolveStyle = resolve(container);

describe('resolve stylesheet colors', () => {
  test('should keep hex colors as they are', () => {
    const styles = resolveStyle({
      color: '#0000FF',
      backgroundColor: '#FF0000',
      textDecorationColor: '#00FF00',
    });

    expect(styles.color).toBe('#0000FF');
    expect(styles.backgroundColor).toBe('#FF0000');
    expect(styles.textDecorationColor).toBe('#00FF00');
  });

  test('should resolve rgb colors to hexa', () => {
    const styles = resolveStyle({
      color: 'rgb(255, 0, 0)',
      backgroundColor: 'rgb(0, 0, 255)',
      textDecorationColor: 'rgb(0, 255, 0)',
    });

    expect(styles.color).toBe('#FF0000');
    expect(styles.backgroundColor).toBe('#0000FF');
    expect(styles.textDecorationColor).toBe('#00FF00');
  });

  test('should resolve rgba colors to hexa', () => {
    const styles = resolveStyle({
      color: 'rgba(0, 255, 0, 0.5)',
      backgroundColor: 'rgba(255, 255, 0, 0.1)',
      textDecorationColor: 'rgba(0, 0, 255, 0.75)',
    });

    expect(styles.color).toBe('#00FF0080');
    expect(styles.backgroundColor).toBe('#FFFF001A');
    expect(styles.textDecorationColor).toBe('#0000FFBF');
  });

  test('should resolve hsl colors to hexa', () => {
    const styles = resolveStyle({
      color: 'hsl(0, 100%, 50%)',
      backgroundColor: 'hsl(204, 100%, 50%)',
      textDecorationColor: 'hsl(120, 100%, 50%)',
    });

    expect(styles.color).toBe('#FF0000');
    expect(styles.backgroundColor).toBe('#0099FF');
    expect(styles.textDecorationColor).toBe('#00FF00');
  });

  test('should resolve hsla colors to hexa', () => {
    const styles = resolveStyle({
      color: 'hsla(0, 100%, 50%, 0.5)',
      backgroundColor: 'hsla(204, 100%, 50%, 1)',
      textDecorationColor: 'hsla(120, 100%, 50%, 0.75)',
    });

    expect(styles.color).toBe('#FF0000');
    expect(styles.backgroundColor).toBe('#0099FF');
    expect(styles.textDecorationColor).toBe('#00FF00');
  });
});

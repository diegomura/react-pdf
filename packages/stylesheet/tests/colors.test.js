import transformColors from '../src/colors';

describe('colors conversion', () => {
  test('Should keep hex values as they are', () => {
    const styles = transformColors({ color: '#0000FF' });

    expect(styles.color).toBe('#0000FF');
  });

  test('Should transform rgb to hexa', () => {
    const styles = transformColors({ color: 'rgb(255, 0, 0)' });

    expect(styles.color).toBe('#FF0000');
  });

  test('Should transform rgba to hexa', () => {
    const styles = transformColors({ color: 'rgba(0, 255, 0, 0.5)' });

    expect(styles.color).toBe('#00FF0080');
  });

  test('Should transform hsl to hexa', () => {
    const styles = transformColors({ color: 'hsl(0, 100%, 50%)' });

    expect(styles.color).toBe('#FF0000');
  });

  test('Should transform hsla to hexa', () => {
    const styles = transformColors({ color: 'hsla(0, 100%, 50%, 0.5)' });

    expect(styles.color).toBe('#FF0000');
  });

  test('Should any matching style attribute', () => {
    const styles = transformColors({ backgroundColor: 'rgb(255, 0, 0)' });

    expect(styles.backgroundColor).toBe('#FF0000');
  });
});

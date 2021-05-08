import processBorder from '../src/borders';

describe('stylesheet borders transform', () => {
  test('should process border shorthand', () => {
    const styles = processBorder('border', '1in solid rgb(255, 0, 255)');

    expect(styles).toEqual({
      borderTopStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderTopColor: 'rgb(255, 0, 255)',
      borderLeftColor: 'rgb(255, 0, 255)',
      borderRightColor: 'rgb(255, 0, 255)',
      borderBottomColor: 'rgb(255, 0, 255)',
      borderTopWidth: '1in',
      borderLeftWidth: '1in',
      borderRightWidth: '1in',
      borderBottomWidth: '1in',
    });
  });

  test('should process border shorthand with decimal units', () => {
    const styles = processBorder('border', '1.5in solid rgb(255, 0, 255)');

    expect(styles).toEqual({
      borderTopStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderTopColor: 'rgb(255, 0, 255)',
      borderLeftColor: 'rgb(255, 0, 255)',
      borderRightColor: 'rgb(255, 0, 255)',
      borderBottomColor: 'rgb(255, 0, 255)',
      borderTopWidth: '1.5in',
      borderLeftWidth: '1.5in',
      borderRightWidth: '1.5in',
      borderBottomWidth: '1.5in',
    });
  });

  test('should process specific border shorthand', () => {
    const top = processBorder('borderTop', '1 solid blue');
    const right = processBorder('borderRight', '1 solid blue');
    const bottom = processBorder('borderBottom', '1 solid blue');
    const left = processBorder('borderLeft', '1 solid blue');

    expect(top.borderTopWidth).toBe(1);
    expect(top.borderTopColor).toBe('blue');
    expect(top.borderTopStyle).toBe('solid');

    expect(right.borderRightWidth).toBe(1);
    expect(right.borderRightColor).toBe('blue');
    expect(right.borderRightStyle).toBe('solid');

    expect(bottom.borderBottomWidth).toBe(1);
    expect(bottom.borderBottomColor).toBe('blue');
    expect(bottom.borderBottomStyle).toBe('solid');

    expect(left.borderLeftWidth).toBe(1);
    expect(left.borderLeftColor).toBe('blue');
    expect(left.borderLeftStyle).toBe('solid');
  });

  test('should process borderWidth shorthand', () => {
    const style = processBorder('borderWidth', '1');

    expect(style.borderTopWidth).toBe(1);
    expect(style.borderRightWidth).toBe(1);
    expect(style.borderBottomWidth).toBe(1);
    expect(style.borderLeftWidth).toBe(1);
  });

  test('should process borderStyle shorthand', () => {
    const style = processBorder('borderStyle', 'dashed');

    expect(style.borderTopStyle).toBe('dashed');
    expect(style.borderRightStyle).toBe('dashed');
    expect(style.borderBottomStyle).toBe('dashed');
    expect(style.borderLeftStyle).toBe('dashed');
  });

  test('should process borderColor shorthand', () => {
    const style = processBorder('borderColor', 'green');

    expect(style.borderTopColor).toBe('green');
    expect(style.borderRightColor).toBe('green');
    expect(style.borderBottomColor).toBe('green');
    expect(style.borderLeftColor).toBe('green');
  });

  test('should keep specific borderWidth as it is', () => {
    const top = processBorder('borderTopWidth', '1');
    const right = processBorder('borderRightWidth', '2');
    const bottom = processBorder('borderBottomWidth', '3');
    const left = processBorder('borderLeftWidth', '4');

    expect(top.borderTopWidth).toBe(1);
    expect(right.borderRightWidth).toBe(2);
    expect(bottom.borderBottomWidth).toBe(3);
    expect(left.borderLeftWidth).toBe(4);
  });

  test('should keep borderStyle as it is', () => {
    const top = processBorder('borderTopStyle', 'solid');
    const right = processBorder('borderRightStyle', 'dashed');
    const bottom = processBorder('borderBottomStyle', 'solid');
    const left = processBorder('borderLeftStyle', 'dashed');

    expect(top.borderTopStyle).toBe('solid');
    expect(right.borderRightStyle).toBe('dashed');
    expect(bottom.borderBottomStyle).toBe('solid');
    expect(left.borderLeftStyle).toBe('dashed');
  });

  test('should keep borderColor as it is', () => {
    const top = processBorder('borderTopColor', 'blue');
    const right = processBorder('borderRightColor', 'green');
    const bottom = processBorder('borderBottomColor', 'red');
    const left = processBorder('borderLeftColor', 'yellow');

    expect(top.borderTopColor).toBe('blue');
    expect(right.borderRightColor).toBe('green');
    expect(bottom.borderBottomColor).toBe('red');
    expect(left.borderLeftColor).toBe('yellow');
  });
});

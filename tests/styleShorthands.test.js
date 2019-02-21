import { StyleSheet } from '../src';

describe('shorthands', () => {
  test('should process margin shorthand', () => {
    const stylesheet = StyleSheet.resolve({ margin: '1 2 3 4' });

    expect(stylesheet.marginTop).toBe(1);
    expect(stylesheet.marginRight).toBe(2);
    expect(stylesheet.marginBottom).toBe(3);
    expect(stylesheet.marginLeft).toBe(4);
  });

  test('should process margin shorthand with percentages', () => {
    const stylesheet = StyleSheet.resolve({ margin: '1% 2% 3% 4%' });

    expect(stylesheet.marginTop).toBe('1%');
    expect(stylesheet.marginRight).toBe('2%');
    expect(stylesheet.marginBottom).toBe('3%');
    expect(stylesheet.marginLeft).toBe('4%');
  });

  test('should process margin axis shorthand', () => {
    const stylesheet = StyleSheet.resolve({ margin: '1 2' });

    expect(stylesheet.marginTop).toBe(1);
    expect(stylesheet.marginRight).toBe(2);
    expect(stylesheet.marginBottom).toBe(1);
    expect(stylesheet.marginLeft).toBe(2);
  });

  test('should process padding shorthand', () => {
    const stylesheet = StyleSheet.resolve({ padding: '1 2 3 4' });

    expect(stylesheet.paddingTop).toBe(1);
    expect(stylesheet.paddingRight).toBe(2);
    expect(stylesheet.paddingBottom).toBe(3);
    expect(stylesheet.paddingLeft).toBe(4);
  });

  test('should process padding shorthand with percentages', () => {
    const stylesheet = StyleSheet.resolve({ padding: '1% 2% 3% 4%' });

    expect(stylesheet.paddingTop).toBe('1%');
    expect(stylesheet.paddingRight).toBe('2%');
    expect(stylesheet.paddingBottom).toBe('3%');
    expect(stylesheet.paddingLeft).toBe('4%');
  });

  test('should process padding axis shorthand', () => {
    const stylesheet = StyleSheet.resolve({ padding: '1 2' });

    expect(stylesheet.paddingTop).toBe(1);
    expect(stylesheet.paddingRight).toBe(2);
    expect(stylesheet.paddingBottom).toBe(1);
    expect(stylesheet.paddingLeft).toBe(2);
  });

  test('should process border shorthand', () => {
    const stylesheet = StyleSheet.resolve({ border: '1 solid blue' });

    expect(stylesheet.borderTopWidth).toBe(1);
    expect(stylesheet.borderTopStyle).toBe('solid');
    expect(stylesheet.borderTopColor).toBe('blue');
    expect(stylesheet.borderRightWidth).toBe(1);
    expect(stylesheet.borderRightStyle).toBe('solid');
    expect(stylesheet.borderRightColor).toBe('blue');
    expect(stylesheet.borderBottomWidth).toBe(1);
    expect(stylesheet.borderBottomStyle).toBe('solid');
    expect(stylesheet.borderBottomColor).toBe('blue');
    expect(stylesheet.borderLeftWidth).toBe(1);
    expect(stylesheet.borderLeftStyle).toBe('solid');
    expect(stylesheet.borderLeftColor).toBe('blue');
  });

  test('should process borderTop shorthand', () => {
    const stylesheet = StyleSheet.resolve({ borderTop: '1 solid blue' });

    expect(stylesheet.borderTopWidth).toBe(1);
    expect(stylesheet.borderTopStyle).toBe('solid');
    expect(stylesheet.borderTopColor).toBe('blue');
  });

  test('should process borderRight shorthand', () => {
    const stylesheet = StyleSheet.resolve({ borderRight: '1 solid blue' });

    expect(stylesheet.borderRightWidth).toBe(1);
    expect(stylesheet.borderRightStyle).toBe('solid');
    expect(stylesheet.borderRightColor).toBe('blue');
  });

  test('should process borderBottom shorthand', () => {
    const stylesheet = StyleSheet.resolve({ borderBottom: '1 solid blue' });

    expect(stylesheet.borderBottomWidth).toBe(1);
    expect(stylesheet.borderBottomStyle).toBe('solid');
    expect(stylesheet.borderBottomColor).toBe('blue');
  });

  test('should process borderLeft shorthand', () => {
    const stylesheet = StyleSheet.resolve({ borderLeft: '1 solid blue' });

    expect(stylesheet.borderLeftWidth).toBe(1);
    expect(stylesheet.borderLeftStyle).toBe('solid');
    expect(stylesheet.borderLeftColor).toBe('blue');
  });

  test('should process objectPosition shorthand', () => {
    const stylesheet = StyleSheet.resolve({ objectPosition: '20 30' });

    expect(stylesheet.objectPositionX).toBe(20);
    expect(stylesheet.objectPositionY).toBe(30);
  });

  test('should process objectPosition shorthand percentages', () => {
    const stylesheet = StyleSheet.resolve({ objectPosition: '20% 30%' });

    expect(stylesheet.objectPositionX).toBe('20%');
    expect(stylesheet.objectPositionY).toBe('30%');
  });

  test('should process single value transformOrigin shorthand', () => {
    const stylesheet = StyleSheet.resolve({ transformOrigin: '20' });

    expect(stylesheet.transformOriginX).toBe(20);
    expect(stylesheet.transformOriginY).toBe(20);
  });

  test('should process transformOrigin shorthand', () => {
    const stylesheet = StyleSheet.resolve({ transformOrigin: '20 30' });

    expect(stylesheet.transformOriginX).toBe(20);
    expect(stylesheet.transformOriginY).toBe(30);
  });

  test('should process transformOrigin shorthand percentages', () => {
    const stylesheet = StyleSheet.resolve({ transformOrigin: '20% 30%' });

    expect(stylesheet.transformOriginX).toBe('20%');
    expect(stylesheet.transformOriginY).toBe('30%');
  });

  test('should process transformOrigin zero offset shorthand', () => {
    const stylesheet = StyleSheet.resolve({ transformOrigin: 'left top' });

    expect(stylesheet.transformOriginX).toBe('0%');
    expect(stylesheet.transformOriginY).toBe('0%');
  });

  test('should process transformOrigin full offset shorthand', () => {
    const stylesheet = StyleSheet.resolve({ transformOrigin: 'right bottom' });

    expect(stylesheet.transformOriginX).toBe('100%');
    expect(stylesheet.transformOriginY).toBe('100%');
  });

  test('should process transformOrigin center offset shorthand', () => {
    const stylesheet = StyleSheet.resolve({ transformOrigin: 'center' });

    expect(stylesheet.transformOriginX).toBe('50%');
    expect(stylesheet.transformOriginY).toBe('50%');
  });
});

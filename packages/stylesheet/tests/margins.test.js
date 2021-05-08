import processPadding from '../src/paddings';

describe('stylesheet padding transform', () => {
  test('should process padding shorthands', () => {
    const style = processPadding('padding', '1 2 3 4');

    expect(style.paddingTop).toBe(1);
    expect(style.paddingRight).toBe(2);
    expect(style.paddingBottom).toBe(3);
    expect(style.paddingLeft).toBe(4);
  });

  test('should process padding shorthand with percentages', () => {
    const style = processPadding('padding', '1% 2% 3% 4%');

    expect(style.paddingTop).toBe('1%');
    expect(style.paddingRight).toBe('2%');
    expect(style.paddingBottom).toBe('3%');
    expect(style.paddingLeft).toBe('4%');
  });

  test('should process padding shorthand with negative values', () => {
    const style = processPadding('padding', '-1% -2 -3in -4cm');

    expect(style.paddingTop).toBe('-1%');
    expect(style.paddingRight).toBe(-2);
    expect(style.paddingBottom).toBe('-3in');
    expect(style.paddingLeft).toBe('-4cm');
  });

  test('should process padding axis shorthand', () => {
    const style = processPadding('padding', '1 2');

    expect(style.paddingTop).toBe(1);
    expect(style.paddingRight).toBe(2);
    expect(style.paddingBottom).toBe(1);
    expect(style.paddingLeft).toBe(2);
  });

  test('should process padding auto shorthand', () => {
    const style = processPadding('padding', 'auto');

    expect(style.paddingTop).toBe('auto');
    expect(style.paddingRight).toBe('auto');
    expect(style.paddingBottom).toBe('auto');
    expect(style.paddingLeft).toBe('auto');
  });

  test('should process padding vertical shorthand', () => {
    const style = processPadding('paddingVertical', '3');

    expect(style.paddingTop).toBe(3);
    expect(style.paddingBottom).toBe(3);
    expect(style.paddingRight).toBe(undefined);
    expect(style.paddingLeft).toBe(undefined);
  });

  test('should process padding horizontal shorthand', () => {
    const style = processPadding('paddingHorizontal', '3');

    expect(style.paddingLeft).toBe(3);
    expect(style.paddingRight).toBe(3);
    expect(style.paddingTop).toBe(undefined);
    expect(style.paddingBottom).toBe(undefined);
  });

  test('should process padding axis values', () => {
    const top = processPadding('paddingTop', '1');
    const right = processPadding('paddingRight', '2');
    const bottom = processPadding('paddingBottom', '3');
    const left = processPadding('paddingLeft', '4');

    expect(top.paddingTop).toBe(1);
    expect(right.paddingRight).toBe(2);
    expect(bottom.paddingBottom).toBe(3);
    expect(left.paddingLeft).toBe(4);
  });

  test('should process auto axis paddings', () => {
    const top = processPadding('paddingTop', 'auto');
    const right = processPadding('paddingRight', 'auto');
    const bottom = processPadding('paddingBottom', 'auto');
    const left = processPadding('paddingLeft', 'auto');

    expect(top.paddingTop).toBe('auto');
    expect(right.paddingRight).toBe('auto');
    expect(bottom.paddingBottom).toBe('auto');
    expect(left.paddingLeft).toBe('auto');
  });
});

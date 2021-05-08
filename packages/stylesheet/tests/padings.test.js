import processMargin from '../src/margins';

describe('stylesheet margin transform', () => {
  test('should process margin shorthands', () => {
    const style = processMargin('margin', '1 2 3 4');

    expect(style.marginTop).toBe(1);
    expect(style.marginRight).toBe(2);
    expect(style.marginBottom).toBe(3);
    expect(style.marginLeft).toBe(4);
  });

  test('should process margin shorthand with percentages', () => {
    const style = processMargin('margin', '1% 2% 3% 4%');

    expect(style.marginTop).toBe('1%');
    expect(style.marginRight).toBe('2%');
    expect(style.marginBottom).toBe('3%');
    expect(style.marginLeft).toBe('4%');
  });

  test('should process margin shorthand with negative values', () => {
    const style = processMargin('margin', '-1% -2 -3in -4cm');

    expect(style.marginTop).toBe('-1%');
    expect(style.marginRight).toBe(-2);
    expect(style.marginBottom).toBe('-3in');
    expect(style.marginLeft).toBe('-4cm');
  });

  test('should process margin axis shorthand', () => {
    const style = processMargin('margin', '1 2');

    expect(style.marginTop).toBe(1);
    expect(style.marginRight).toBe(2);
    expect(style.marginBottom).toBe(1);
    expect(style.marginLeft).toBe(2);
  });

  test('should process margin auto shorthand', () => {
    const style = processMargin('margin', 'auto');

    expect(style.marginTop).toBe('auto');
    expect(style.marginRight).toBe('auto');
    expect(style.marginBottom).toBe('auto');
    expect(style.marginLeft).toBe('auto');
  });

  test('should process margin vertical shorthand', () => {
    const style = processMargin('marginVertical', '3');

    expect(style.marginTop).toBe(3);
    expect(style.marginBottom).toBe(3);
    expect(style.marginRight).toBe(undefined);
    expect(style.marginLeft).toBe(undefined);
  });

  test('should process margin horizontal shorthand', () => {
    const style = processMargin('marginHorizontal', '3');

    expect(style.marginLeft).toBe(3);
    expect(style.marginRight).toBe(3);
    expect(style.marginTop).toBe(undefined);
    expect(style.marginBottom).toBe(undefined);
  });

  test('should process margin axis values', () => {
    const top = processMargin('marginTop', '1');
    const right = processMargin('marginRight', '2');
    const bottom = processMargin('marginBottom', '3');
    const left = processMargin('marginLeft', '4');

    expect(top.marginTop).toBe(1);
    expect(right.marginRight).toBe(2);
    expect(bottom.marginBottom).toBe(3);
    expect(left.marginLeft).toBe(4);
  });

  test('should process auto axis margins', () => {
    const top = processMargin('marginTop', 'auto');
    const right = processMargin('marginRight', 'auto');
    const bottom = processMargin('marginBottom', 'auto');
    const left = processMargin('marginLeft', 'auto');

    expect(top.marginTop).toBe('auto');
    expect(right.marginRight).toBe('auto');
    expect(bottom.marginBottom).toBe('auto');
    expect(left.marginLeft).toBe('auto');
  });
});

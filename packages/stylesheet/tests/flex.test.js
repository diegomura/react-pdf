import processFlex from '../src/flex';

describe('stylesheet flex transform', () => {
  test('should process flex shorthand', () => {
    const styles = processFlex('flex', '4 3 auto');

    expect(styles).toEqual({
      flexGrow: 4,
      flexShrink: 3,
      flexBasis: 'auto',
    });
  });

  test('should process flex shorthand with one digit', () => {
    const styles = processFlex('flex', 1);

    expect(styles).toEqual({
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    });
  });

  test("should process flex '1'", () => {
    const styles = processFlex('flex', '1');

    expect(styles).toEqual({
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    });
  });

  test('should process flex shorthand with two digits', () => {
    const styles = processFlex('flex', '1 0');

    expect(styles).toEqual({
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 0,
    });
  });
});

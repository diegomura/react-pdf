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
});

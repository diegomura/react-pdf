import resolveMediaQueries from '../src/mediaQueries';

describe('media queries', () => {
  test('should resolve max-height media queries on narrow container', () => {
    const styles = resolveMediaQueries(
      { height: 300 },
      {
        '@media max-height: 500': {
          color: 'red',
        },
      },
    );

    expect(styles.color).toBe('red');
  });

  test('should resolve max-height media queries on wider container', () => {
    const styles = resolveMediaQueries(
      { height: 600 },
      {
        '@media max-height: 500': {
          color: 'red',
        },
      },
    );

    expect(styles.color).toBe(undefined);
  });

  test('should resolve max-width media queries on narrow container', () => {
    const styles = resolveMediaQueries(
      { width: 300 },
      {
        '@media max-width: 500': {
          color: 'red',
        },
      },
    );

    expect(styles.color).toBe('red');
  });

  test('should resolve max-width media queries on wider container', () => {
    const styles = resolveMediaQueries(
      { width: 600 },
      {
        '@media max-width: 500': {
          color: 'red',
        },
      },
    );

    expect(styles.color).toBe(undefined);
  });

  test('should resolve portrait media queries on portrait container', () => {
    const styles = resolveMediaQueries(
      { orientation: 'portrait' },
      {
        '@media orientation: portrait': {
          color: 'red',
        },
      },
    );

    expect(styles.color).toBe('red');
  });

  test('should resolve portrait media queries on landscape container', () => {
    const styles = resolveMediaQueries(
      { orientation: 'landscape' },
      {
        '@media orientation: portrait': {
          color: 'red',
        },
      },
    );

    expect(styles.color).toBe(undefined);
  });

  test('should resolve landscape media queries on landscape container', () => {
    const styles = resolveMediaQueries(
      { orientation: 'landscape' },
      {
        '@media orientation: landscape': {
          color: 'red',
        },
      },
    );

    expect(styles.color).toBe('red');
  });

  test('should resolve landscape media queries on portrait container', () => {
    const styles = resolveMediaQueries(
      { orientation: 'portrait' },
      {
        '@media orientation: landscape': {
          color: 'red',
        },
      },
    );

    expect(styles.color).toBe(undefined);
  });
});

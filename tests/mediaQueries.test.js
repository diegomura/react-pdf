import { StyleSheet } from '../src';

describe('media queries', () => {
  test('should resolve max-height media queries on narrow container', () => {
    const styles = StyleSheet.resolve(
      {
        '@media max-height: 500': {
          color: 'red',
        },
      },
      { height: 300 },
    );

    expect(styles.color).toBe('red');
  });

  test('should resolve max-height media queries on wider container', () => {
    const styles = StyleSheet.resolve(
      {
        '@media max-height: 500': {
          color: 'red',
        },
      },
      { height: 600 },
    );

    expect(styles.color).toBe(undefined);
  });

  test('should resolve max-width media queries on narrow container', () => {
    const styles = StyleSheet.resolve(
      {
        '@media max-width: 500': {
          color: 'red',
        },
      },
      { width: 300 },
    );

    expect(styles.color).toBe('red');
  });

  test('should resolve max-width media queries on wider container', () => {
    const styles = StyleSheet.resolve(
      {
        '@media max-width: 500': {
          color: 'red',
        },
      },
      { width: 600 },
    );

    expect(styles.color).toBe(undefined);
  });

  test('should resolve portrait media queries on portrait container', () => {
    const styles = StyleSheet.resolve(
      {
        '@media orientation: portrait': {
          color: 'red',
        },
      },
      { orientation: 'portrait' },
    );

    expect(styles.color).toBe('red');
  });

  test('should resolve portrait media queries on landscape container', () => {
    const styles = StyleSheet.resolve(
      {
        '@media orientation: portrait': {
          color: 'red',
        },
      },
      { orientation: 'landscape' },
    );

    expect(styles.color).toBe(undefined);
  });

  test('should resolve landscape media queries on landscape container', () => {
    const styles = StyleSheet.resolve(
      {
        '@media orientation: landscape': {
          color: 'red',
        },
      },
      { orientation: 'landscape' },
    );

    expect(styles.color).toBe('red');
  });

  test('should resolve landscape media queries on portrait container', () => {
    const styles = StyleSheet.resolve(
      {
        '@media orientation: landscape': {
          color: 'red',
        },
      },
      { orientation: 'portrait' },
    );

    expect(styles.color).toBe(undefined);
  });
});

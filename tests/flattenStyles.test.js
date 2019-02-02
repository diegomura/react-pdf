import { StyleSheet } from '../src';

describe('flatten styles', () => {
  test('should return object from an object', () => {
    const styles = { color: 'red' };
    const flatten = StyleSheet.flatten(styles);

    return expect(flatten).toEqual(styles);
  });

  test('should return object of merged values from array', () => {
    const styles = [{ fontSize: 16, color: 'white' }, { color: 'green' }];
    const flatten = StyleSheet.flatten(styles);

    return expect(flatten).toEqual({ fontSize: 16, color: 'green' });
  });

  test('should ignore null array values', () => {
    const styles = [{ fontSize: 16, color: 'white' }, null];
    const flatten = StyleSheet.flatten(styles);

    return expect(flatten).toEqual({ fontSize: 16, color: 'white' });
  });

  test('should ignore null attribute values', () => {
    const styles = [{ fontSize: 16, color: 'white' }, { color: null }];
    const flatten = StyleSheet.flatten(styles);

    return expect(flatten).toEqual({ fontSize: 16, color: 'white' });
  });
});

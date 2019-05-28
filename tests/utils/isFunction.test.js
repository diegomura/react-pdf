import isFunction from '../../src/utils/isFunction';

describe('isFunction', () => {
  test('should return false for undefined', () => {
    expect(isFunction(undefined)).toBeFalsy();
  });

  test('should return false for null', () => {
    expect(isFunction(null)).toBeFalsy();
  });

  test('should return false for string', () => {
    expect(isFunction('boo')).toBeFalsy();
  });

  test('should return false for object', () => {
    expect(isFunction({})).toBeFalsy();
  });

  test('should return false for true', () => {
    expect(isFunction(true)).toBeFalsy();
  });

  test('should return false for false', () => {
    expect(isFunction(false)).toBeFalsy();
  });

  test('should return false for number', () => {
    expect(isFunction(42)).toBeFalsy();
  });

  test('should return true for function', () => {
    expect(isFunction(() => {})).toBeTruthy();
  });
});

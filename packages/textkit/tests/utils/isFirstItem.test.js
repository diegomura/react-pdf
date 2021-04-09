import isFirstItem from '../../src/utils/isFirstItem';

describe('utils isFirstItem operator', () => {
  test('should return true for first item', () => {
    const list = [2, 3, 4];

    expect(isFirstItem(list, list[0])).toBeTruthy();
  });

  test('should return false for intermediate item', () => {
    const list = [2, 3, 4];

    expect(isFirstItem(list, list[1])).toBeFalsy();
  });

  test('should return false for last item', () => {
    const list = [2, 3, 4];

    expect(isFirstItem(list, list[2])).toBeFalsy();
  });
});

import isLastItem from '../../src/utils/isLastItem';

describe('utils isLastItem operator', () => {
  test('should return false for first item', () => {
    const list = [2, 3, 4];

    expect(isLastItem(list, list[0])).toBeFalsy();
  });

  test('should return false for intermediate item', () => {
    const list = [2, 3, 4];

    expect(isLastItem(list, list[1])).toBeFalsy();
  });

  test('should return true for last item', () => {
    const list = [2, 3, 4];

    expect(isLastItem(list, list[2])).toBeTruthy();
  });
});

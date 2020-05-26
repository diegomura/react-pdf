import isHeightAuto from '../../src/page/isHeightAuto';

describe('page isHeightAuto', () => {
  test('Should return false if height present', () => {
    const page = { box: { height: 10 } };
    expect(isHeightAuto(page)).toBeFalsy();
  });

  test('Should return false if height is zero', () => {
    const page = { box: { height: 0 } };
    expect(isHeightAuto(page)).toBeFalsy();
  });

  test('Should return false if height not present', () => {
    const page = { box: {} };
    expect(isHeightAuto(page)).toBeTruthy();
  });

  test('Should return false if height is null', () => {
    const page = { box: { height: null } };
    expect(isHeightAuto(page)).toBeTruthy();
  });

  test('Should return false if height is undefined', () => {
    const page = { box: { height: undefined } };
    expect(isHeightAuto(page)).toBeTruthy();
  });
});

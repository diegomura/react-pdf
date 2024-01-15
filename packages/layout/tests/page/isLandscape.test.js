import { describe, expect, test } from '@jest/globals';

import isLandscape from '../../src/page/isLandscape';

describe('page isLandscape', () => {
  test('Should return false if no orientation provided', () => {
    const page = { props: {} };

    expect(isLandscape(page)).toBeFalsy();
  });

  test('Should return true if landscape', () => {
    const page = { props: { orientation: 'landscape' } };

    expect(isLandscape(page)).toBeTruthy();
  });

  test('Should return false if portait', () => {
    const page = { props: { orientation: 'portrait' } };

    expect(isLandscape(page)).toBeFalsy();
  });
});

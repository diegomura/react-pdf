import { describe, expect, test } from 'vitest';

import isPortrait from '../../src/page/isPortrait';

describe('page isPortrait', () => {
  test('Should return true if no orientation provided', () => {
    const page = { props: {} };

    expect(isPortrait(page)).toBeTruthy();
  });

  test('Should return false if landscape', () => {
    const page = { props: { orientation: 'landscape' } };

    expect(isPortrait(page)).toBeFalsy();
  });

  test('Should return true if portait', () => {
    const page = { props: { orientation: 'portrait' } };

    expect(isPortrait(page)).toBeTruthy();
  });
});

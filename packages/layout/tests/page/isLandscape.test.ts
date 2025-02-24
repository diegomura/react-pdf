import { describe, expect, test } from 'vitest';

import isLandscape from '../../src/page/isLandscape';

describe('page isLandscape', () => {
  test('Should return false if no orientation provided', () => {
    const result = isLandscape({ type: 'PAGE', props: {} });

    expect(result).toBeFalsy();
  });

  test('Should return true if landscape', () => {
    const result = isLandscape({
      type: 'PAGE',
      props: { orientation: 'landscape' },
    });

    expect(result).toBeTruthy();
  });

  test('Should return false if portait', () => {
    const result = isLandscape({
      type: 'PAGE',
      props: { orientation: 'portrait' },
    });

    expect(result).toBeFalsy();
  });
});

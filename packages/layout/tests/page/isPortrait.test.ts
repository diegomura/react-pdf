import { describe, expect, test } from 'vitest';

import isPortrait from '../../src/page/isPortrait';

describe('page isPortrait', () => {
  test('Should return true if no orientation provided', () => {
    const result = isPortrait({ type: 'PAGE', props: {} });

    expect(result).toBeTruthy();
  });

  test('Should return false if landscape', () => {
    const result = isPortrait({
      type: 'PAGE',
      props: { orientation: 'landscape' },
    });

    expect(result).toBeFalsy();
  });

  test('Should return true if portait', () => {
    const result = isPortrait({
      type: 'PAGE',
      props: { orientation: 'portrait' },
    });

    expect(result).toBeTruthy();
  });
});

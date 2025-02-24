import { describe, expect, test } from 'vitest';

import getOrientation from '../../src/page/getOrientation';

describe('page getOrientation', () => {
  test('Should return portrait if no orientation provided', () => {
    const orientation = getOrientation({ type: 'PAGE', props: {} });

    expect(orientation).toBe('portrait');
  });

  test('Should return landscape if landscape', () => {
    const orientation = getOrientation({
      type: 'PAGE',
      props: { orientation: 'landscape' },
    });

    expect(orientation).toBe('landscape');
  });

  test('Should return portrait if portait', () => {
    const orientation = getOrientation({
      type: 'PAGE',
      props: { orientation: 'portrait' },
    });

    expect(orientation).toBe('portrait');
  });

  test('Should return portrait if anything else', () => {
    const orientation = getOrientation({
      type: 'PAGE',
      props: { orientation: 'boo' as any },
    });

    expect(orientation).toBe('portrait');
  });
});

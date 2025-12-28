import { describe, expect, it } from 'vitest';

import StandardFont from '../../src/font.js';

describe('standard fonts', () => {
  it('should resolve advanceWidth of soft hyphen to be zero', () => {
    const SOFT_HYPHEN = '\u00AD';
    const font = StandardFont.open({}, 'Helvetica', 'Helvetica', 'foobar');

    expect(font.encode(SOFT_HYPHEN)[1][0].advanceWidth).toBe(0);
  });
});

import { describe, expect, it } from 'vitest';

import PDFFontFactory from '../../src/font_factory.js';

describe('standard fonts', () => {
  it('should resolve advanceWidth of soft hyphen to be zero', () => {
    const SOFT_HYPHEN = '\u00AD';
    const font = PDFFontFactory.open({}, 'Helvetica', 'Helvetica', 'foobar');

    expect(font.encode(SOFT_HYPHEN)[1][0].advanceWidth).toBe(0);
  });
});

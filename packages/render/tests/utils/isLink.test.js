import * as P from '@react-pdf/primitives';
import isLink from '../../src/utils/isLink';

const ASSERTED_TYPE = P.LINK;
const PRIMITIVES = Object.keys(P.default);

describe('is link util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isLink({ type })).toBe(isAssertedType);
    });
  });
});

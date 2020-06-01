import * as P from '@react-pdf/primitives';
import isTextInstance from '../../src/utils/isTextInstance';

const ASSERTED_TYPE = P.TextInstance;
const PRIMITIVES = Object.keys(P.default);

describe('is text instance util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isTextInstance({ type })).toBe(isAssertedType);
    });
  });
});

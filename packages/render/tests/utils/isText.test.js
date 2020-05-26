import * as P from '@react-pdf/primitives';
import isText from '../../src/utils/isText';

const ASSERTED_TYPE = P.TEXT;
const PRIMITIVES = Object.keys(P.default);

describe('is text util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isText({ type })).toBe(isAssertedType);
    });
  });
});

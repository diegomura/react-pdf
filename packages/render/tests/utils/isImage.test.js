import * as P from '@react-pdf/primitives';
import isImage from '../../src/utils/isImage';

const ASSERTED_TYPE = P.IMAGE;
const PRIMITIVES = Object.keys(P.default);

describe('is image util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isImage({ type })).toBe(isAssertedType);
    });
  });
});

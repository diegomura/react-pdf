import * as P from '@react-pdf/primitives';
import isPage from '../../src/utils/isPage';

const ASSERTED_TYPE = P.Page;
const PRIMITIVES = Object.keys(P.default);

describe('is page util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isPage({ type })).toBe(isAssertedType);
    });
  });
});

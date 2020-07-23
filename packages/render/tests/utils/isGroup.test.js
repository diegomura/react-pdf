import * as P from '@react-pdf/primitives';
import isGroup from '../../src/utils/isGroup';

const ASSERTED_TYPE = P.G;
const PRIMITIVES = Object.keys(P.default);

describe('is group util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isGroup({ type })).toBe(isAssertedType);
    });
  });
});

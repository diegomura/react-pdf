import * as P from '@govind-react-pdf/primitives';
import isCircle from '../../src/utils/isCircle';

const ASSERTED_TYPE = P.Circle;
const PRIMITIVES = Object.keys(P.default);

describe('is circle util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isCircle({ type })).toBe(isAssertedType);
    });
  });
});

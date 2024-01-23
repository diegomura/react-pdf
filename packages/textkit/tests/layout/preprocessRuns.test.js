import { beforeEach, describe, expect, test } from 'vitest';
import empty from '../../src/attributedString/empty';
import preprocessRuns from '../../src/layout/preprocessRuns';
import scriptItemizer, { scriptItemizerImpl } from '../internal/scriptItemizer';
import fontSubstitution, {
  fontSubstitutionImpl,
} from '../internal/fontSubstitutionEngine';

const preprocessor = preprocessRuns({ scriptItemizer, fontSubstitution });

describe('preprocessRuns', () => {
  beforeEach(() => {
    scriptItemizerImpl.mockClear();
    fontSubstitutionImpl.mockClear();
  });

  test('should call both engines with attributed string', () => {
    const param = empty();

    preprocessor(param);

    expect(scriptItemizerImpl.mock.calls).toHaveLength(1);
    expect(scriptItemizerImpl.mock.calls[0][0]).toBe(param);
    expect(fontSubstitutionImpl.mock.calls).toHaveLength(1);
    expect(fontSubstitutionImpl.mock.calls[0][0]).toBe(param);
  });

  test('should return empty value for null param', () => {
    const string = preprocessor(null);

    expect(string).toHaveProperty('string', '');
    expect(string).toHaveProperty('runs', []);
  });

  test('should return empty value for empty attributed string', () => {
    const string = preprocessor(empty());

    expect(string).toHaveProperty('string', '');
    expect(string).toHaveProperty('runs', []);
  });

  test('should return flatten runs', () => {
    const string = preprocessor({
      string: 'Lorem',
      runs: [{ start: 0, end: 5, attributes: { color: 'red' } }],
    });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(3);

    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 2);
    expect(string.runs[0].attributes).toHaveProperty('color', 'red');
    expect(string.runs[0].attributes).toHaveProperty('script', 'Latin');
    expect(string.runs[0].attributes).toHaveProperty('font', 'Courier');

    expect(string.runs[1]).toHaveProperty('start', 2);
    expect(string.runs[1]).toHaveProperty('end', 3);
    expect(string.runs[1].attributes).toHaveProperty('color', 'red');
    expect(string.runs[1].attributes).toHaveProperty('script', 'Latin');
    expect(string.runs[1].attributes).toHaveProperty('font', 'Helvetica');

    expect(string.runs[2]).toHaveProperty('start', 3);
    expect(string.runs[2]).toHaveProperty('end', 5);
    expect(string.runs[2].attributes).toHaveProperty('color', 'red');
    expect(string.runs[2].attributes).toHaveProperty('script', 'Non-latin');
    expect(string.runs[2].attributes).toHaveProperty('font', 'Helvetica');
  });
});

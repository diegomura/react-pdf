import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import fontSubstitution from '../../src/engines/fontSubstitution';

const instance = fontSubstitution();

describe('FontSubstitution', () => {
  test('should return empty array if no runs passed', () => {
    const string = instance(empty());

    expect(string).toHaveProperty('runs', []);
    expect(string).toHaveProperty('string', '');
  });

  test('should return empty array for empty string', () => {
    const run = { start: 0, end: 0, attributes: {} };
    const string = instance({ string: '', runs: [run] });

    expect(string).toHaveProperty('runs', []);
    expect(string).toHaveProperty('string', '');
  });

  test('should merge consecutive runs with same font', () => {
    const font = { ascent: 10, unitsPerEm: 2 };
    const run1 = { start: 0, end: 3, attributes: { font } };
    const run2 = { start: 3, end: 5, attributes: { font } };
    const string = instance({ string: 'Lorem', runs: [run1, run2] });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(1);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 5);
  });

  test('should substitute many runs', () => {
    const font1 = { ascent: 10, unitsPerEm: 2 };
    const font2 = { ascent: 8, unitsPerEm: 3 };
    const run1 = { start: 0, end: 3, attributes: { font: font1 } };
    const run2 = { start: 3, end: 5, attributes: { font: font2 } };
    const string = instance({ string: 'Lorem', runs: [run1, run2] });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(2);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 3);
    expect(string.runs[1]).toHaveProperty('start', 3);
    expect(string.runs[1]).toHaveProperty('end', 5);
  });
});

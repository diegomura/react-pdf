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
    const run1 = { start: 0, end: 3, attributes: { font: 'Helvetica' } };
    const run2 = { start: 3, end: 5, attributes: { font: 'Helvetica' } };
    const string = instance({ string: 'Lorem', runs: [run1, run2] });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(1);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 5);
  });

  test('should substitute many runs', () => {
    const run1 = { start: 0, end: 3, attributes: { font: 'Courier' } };
    const run2 = { start: 3, end: 5, attributes: { font: 'Helvetica' } };
    const string = instance({ string: 'Lorem', runs: [run1, run2] });

    expect(string).toHaveProperty('string', 'Lorem');
    expect(string.runs).toHaveLength(2);
    expect(string.runs[0]).toHaveProperty('start', 0);
    expect(string.runs[0]).toHaveProperty('end', 3);
    expect(string.runs[1]).toHaveProperty('start', 3);
    expect(string.runs[1]).toHaveProperty('end', 5);
  });
});

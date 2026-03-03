import { describe, expect, test } from 'vitest';

import matchPercent from '../src/matchPercent';

describe('match percent', () => {
  test('should return null for null input', () => {
    expect(matchPercent(null)).toBeNull();
  });

  test('should return null for numeric inputs', () => {
    expect(matchPercent(40)).toBeNull();
  });

  test('should return null for wrong string inputs', () => {
    expect(matchPercent('hey%')).toBeNull();
  });

  test('should return value for positive integer percents', () => {
    const match = matchPercent('35%');

    expect(match?.value).toBe(35);
    expect(match?.percent).toBe(0.35);
  });

  test('should return value for positive real percents', () => {
    const match = matchPercent('35.5%');

    expect(match?.value).toBe(35.5);
    expect(match?.percent).toBe(0.355);
  });

  test('should return value for negative integer percents', () => {
    const match = matchPercent('-35%');

    expect(match?.value).toBe(-35);
    expect(match?.percent).toBe(-0.35);
  });

  test('should return value for negative real percents', () => {
    const match = matchPercent('-35.5%');

    expect(match?.value).toBe(-35.5);
    expect(match?.percent).toBe(-0.355);
  });

  test('should return value for zero percent', () => {
    const match = matchPercent('0%');

    expect(match?.value).toBe(0);
    expect(match?.percent).toBe(0);
  });

  test('should return value for 100 percent', () => {
    const match = matchPercent('100%');

    expect(match?.value).toBe(100);
    expect(match?.percent).toBe(1);
  });

  test('should return value for percentages over 100', () => {
    const match = matchPercent('150%');

    expect(match?.value).toBe(150);
    expect(match?.percent).toBe(1.5);
  });

  test('should return null for empty string', () => {
    expect(matchPercent('')).toBeNull();
  });

  test('should match percent in longer string', () => {
    const match = matchPercent('width: 50%');

    expect(match?.value).toBe(50);
    expect(match?.percent).toBe(0.5);
  });
});

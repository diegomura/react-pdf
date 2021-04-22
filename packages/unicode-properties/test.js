/* eslint-disable import/no-named-as-default-member */

import unicode from './index';

describe('unicode-properties', () => {
  test('getCategory', () => {
    expect(unicode.getCategory('2'.charCodeAt())).toBe('Nd');
    return expect(unicode.getCategory('x'.charCodeAt())).toBe('Ll');
  });

  test('getCombiningClass', () => {
    expect(unicode.getCombiningClass('x'.charCodeAt())).toBe('Not_Reordered');
    expect(unicode.getCombiningClass('́'.charCodeAt())).toBe('Above');
    expect(unicode.getCombiningClass('ٕ'.charCodeAt())).toBe('Below');
    expect(unicode.getCombiningClass('ٔ'.charCodeAt())).toBe('Above');
  });

  test('getScript', () => {
    expect(unicode.getScript('x'.charCodeAt())).toBe('Latin');
    expect(unicode.getScript('غ'.charCodeAt())).toBe('Arabic');
  });

  test('getEastAsianWidth', () => {
    expect(unicode.getEastAsianWidth('x'.charCodeAt())).toBe('Na');
    expect(unicode.getEastAsianWidth('杜'.charCodeAt())).toBe('W');
    expect(unicode.getEastAsianWidth('Æ'.charCodeAt())).toBe('A');
  });

  test('getNumericValue', () => {
    expect(unicode.getNumericValue('2'.charCodeAt())).toBe(2);
    return expect(unicode.getNumericValue('x'.charCodeAt())).toBe(null);
  });

  test('isAlphabetic', () => {
    expect(unicode.isAlphabetic('x'.charCodeAt())).toBe(true);
    expect(unicode.isAlphabetic('2'.charCodeAt())).toBe(false);
  });

  test('isDigit', () => {
    expect(unicode.isDigit('x'.charCodeAt())).toBe(false);
    expect(unicode.isDigit('2'.charCodeAt())).toBe(true);
  });

  test('isPunctuation', () => {
    expect(unicode.isPunctuation('x'.charCodeAt())).toBe(false);
    expect(unicode.isPunctuation('.'.charCodeAt())).toBe(true);
  });

  test('isLowerCase', () => {
    expect(unicode.isLowerCase('X'.charCodeAt())).toBe(false);
    expect(unicode.isLowerCase('2'.charCodeAt())).toBe(false);
    expect(unicode.isLowerCase('x'.charCodeAt())).toBe(true);
  });

  test('isUpperCase', () => {
    expect(unicode.isUpperCase('X'.charCodeAt())).toBe(true);
    expect(unicode.isUpperCase('2'.charCodeAt())).toBe(false);
    expect(unicode.isUpperCase('x'.charCodeAt())).toBe(false);
  });

  test('isTitleCase', () => {
    expect(unicode.isTitleCase('ǲ'.charCodeAt())).toBe(true);
    expect(unicode.isTitleCase('2'.charCodeAt())).toBe(false);
    expect(unicode.isTitleCase('x'.charCodeAt())).toBe(false);
  });

  test('isWhiteSpace', () => {
    expect(unicode.isWhiteSpace(' '.charCodeAt())).toBe(true);
    expect(unicode.isWhiteSpace('2'.charCodeAt())).toBe(false);
    expect(unicode.isWhiteSpace('x'.charCodeAt())).toBe(false);
  });

  test('isBaseForm', () => {
    expect(unicode.isBaseForm('2'.charCodeAt())).toBe(true);
    expect(unicode.isBaseForm('x'.charCodeAt())).toBe(true);
    expect(unicode.isBaseForm('́'.charCodeAt())).toBe(false);
  });

  test('isMark', () => {
    expect(unicode.isMark('2'.charCodeAt())).toBe(false);
    expect(unicode.isMark('x'.charCodeAt())).toBe(false);
    expect(unicode.isMark('́'.charCodeAt())).toBe(true);
  });
});

/* eslint-disable import/no-named-as-default-member */
import { describe, expect, test } from '@jest/globals';

import ReactPDF from '../src/dom';

describe('dom', () => {
  test('should export font store', () => {
    expect(ReactPDF.Font).toBeTruthy();
  });

  test('should export styleSheet', () => {
    expect(ReactPDF.StyleSheet).toBeTruthy();
  });

  test('should export version info', () => {
    expect(ReactPDF.version).toBeTruthy();
  });

  test('should throw error when trying to use renderToString', () => {
    expect(() => ReactPDF.renderToString()).toThrow();
  });

  test('should throw error when trying to use renderToStream', () => {
    expect(() => ReactPDF.renderToStream()).toThrow();
  });

  test('should throw error when trying to use renderToFile', () => {
    expect(() => ReactPDF.renderToFile()).toThrow();
  });
});

import { describe, expect, test } from 'vitest';

import ReactPDF from '@react-pdf/renderer';

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
    // @ts-expect-error - intentionally invalid call
    expect(() => ReactPDF.renderToString()).toThrow();
  });

  test('should throw error when trying to use renderToStream', () => {
    // @ts-expect-error - intentionally invalid call
    expect(() => ReactPDF.renderToStream()).toThrow();
  });

  test('should throw error when trying to use renderToFile', () => {
    // @ts-expect-error - intentionally invalid call
    expect(() => ReactPDF.renderToFile()).toThrow();
  });
});

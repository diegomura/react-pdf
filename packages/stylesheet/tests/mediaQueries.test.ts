import { describe, expect, test } from 'vitest';

import resolveMediaQueries from '../src/mediaQueries';

describe('media queries', () => {
  describe('max-height', () => {
    test('should match when container height is less than max-height', () => {
      const styles = resolveMediaQueries(
        { width: 100, height: 300 },
        {
          '@media max-height: 500': {
            color: 'red',
          },
        },
      );

      expect(styles.color).toBe('red');
    });

    test('should not match when container height exceeds max-height', () => {
      const styles = resolveMediaQueries(
        { width: 100, height: 600 },
        {
          '@media max-height: 500': {
            color: 'red',
          },
        },
      );

      expect(styles.color).toBe(undefined);
    });
  });

  describe('min-height', () => {
    test('should match when container height exceeds min-height', () => {
      const styles = resolveMediaQueries(
        { width: 100, height: 600 },
        {
          '@media min-height: 500': {
            color: 'blue',
          },
        },
      );

      expect(styles.color).toBe('blue');
    });

    test('should not match when container height is less than min-height', () => {
      const styles = resolveMediaQueries(
        { width: 100, height: 300 },
        {
          '@media min-height: 500': {
            color: 'blue',
          },
        },
      );

      expect(styles.color).toBe(undefined);
    });
  });

  describe('max-width', () => {
    test('should match when container width is less than max-width', () => {
      const styles = resolveMediaQueries(
        { width: 300, height: 100 },
        {
          '@media max-width: 500': {
            color: 'red',
          },
        },
      );

      expect(styles.color).toBe('red');
    });

    test('should not match when container width exceeds max-width', () => {
      const styles = resolveMediaQueries(
        { width: 600, height: 100 },
        {
          '@media max-width: 500': {
            color: 'red',
          },
        },
      );

      expect(styles.color).toBe(undefined);
    });
  });

  describe('min-width', () => {
    test('should match when container width exceeds min-width', () => {
      const styles = resolveMediaQueries(
        { width: 600, height: 100 },
        {
          '@media min-width: 500': {
            color: 'green',
          },
        },
      );

      expect(styles.color).toBe('green');
    });

    test('should not match when container width is less than min-width', () => {
      const styles = resolveMediaQueries(
        { width: 300, height: 100 },
        {
          '@media min-width: 500': {
            color: 'green',
          },
        },
      );

      expect(styles.color).toBe(undefined);
    });
  });

  describe('orientation', () => {
    test('should match portrait on portrait container', () => {
      const styles = resolveMediaQueries(
        { width: 10, height: 10, orientation: 'portrait' },
        {
          '@media orientation: portrait': {
            color: 'red',
          },
        },
      );

      expect(styles.color).toBe('red');
    });

    test('should not match portrait on landscape container', () => {
      const styles = resolveMediaQueries(
        { width: 10, height: 10, orientation: 'landscape' },
        {
          '@media orientation: portrait': {
            color: 'red',
          },
        },
      );

      expect(styles.color).toBe(undefined);
    });

    test('should match landscape on landscape container', () => {
      const styles = resolveMediaQueries(
        { width: 10, height: 10, orientation: 'landscape' },
        {
          '@media orientation: landscape': {
            color: 'red',
          },
        },
      );

      expect(styles.color).toBe('red');
    });

    test('should not match landscape on portrait container', () => {
      const styles = resolveMediaQueries(
        { width: 10, height: 10, orientation: 'portrait' },
        {
          '@media orientation: landscape': {
            color: 'red',
          },
        },
      );

      expect(styles.color).toBe(undefined);
    });
  });

  describe('combined queries', () => {
    test('should match when both conditions are met with "and" operator', () => {
      const styles = resolveMediaQueries(
        { width: 400, height: 600 },
        {
          '@media min-width: 300 and max-width: 500': {
            color: 'purple',
          },
        },
      );

      expect(styles.color).toBe('purple');
    });

    test('should not match when one condition fails with "and" operator', () => {
      const styles = resolveMediaQueries(
        { width: 600, height: 600 },
        {
          '@media min-width: 300 and max-width: 500': {
            color: 'purple',
          },
        },
      );

      expect(styles.color).toBe(undefined);
    });

    test('should match when first condition is met with "or" operator (comma)', () => {
      const styles = resolveMediaQueries(
        { width: 200, height: 100, orientation: 'landscape' },
        {
          '@media max-width: 300, orientation: portrait': {
            color: 'orange',
          },
        },
      );

      expect(styles.color).toBe('orange');
    });

    test('should match when second condition is met with "or" operator (comma)', () => {
      const styles = resolveMediaQueries(
        { width: 600, height: 100, orientation: 'portrait' },
        {
          '@media max-width: 300, orientation: portrait': {
            color: 'orange',
          },
        },
      );

      expect(styles.color).toBe('orange');
    });

    test('should not match when no conditions are met with "or" operator', () => {
      const styles = resolveMediaQueries(
        { width: 600, height: 100, orientation: 'landscape' },
        {
          '@media max-width: 300, orientation: portrait': {
            color: 'orange',
          },
        },
      );

      expect(styles.color).toBe(undefined);
    });
  });

  describe('style preservation', () => {
    test('should preserve non-media-query styles', () => {
      const styles = resolveMediaQueries(
        { width: 100, height: 100 },
        {
          fontSize: 12,
          backgroundColor: 'white',
          '@media max-width: 500': {
            color: 'red',
          },
        },
      );

      expect(styles.fontSize).toBe(12);
      expect(styles.backgroundColor).toBe('white');
      expect(styles.color).toBe('red');
    });

    test('should not include unmatched media query styles', () => {
      const styles = resolveMediaQueries(
        { width: 600, height: 100 },
        {
          fontSize: 12,
          '@media max-width: 500': {
            color: 'red',
          },
        },
      );

      expect(styles.fontSize).toBe(12);
      expect(styles.color).toBe(undefined);
    });

    test('should handle empty style object', () => {
      const styles = resolveMediaQueries({ width: 100, height: 100 }, {});

      expect(styles).toEqual({});
    });

    test('should handle style with only non-media-query properties', () => {
      const styles = resolveMediaQueries(
        { width: 100, height: 100 },
        {
          fontSize: 14,
          color: 'black',
        },
      );

      expect(styles.fontSize).toBe(14);
      expect(styles.color).toBe('black');
    });
  });

  describe('multiple media queries', () => {
    test('should apply all matching media queries', () => {
      const styles = resolveMediaQueries(
        { width: 400, height: 300 },
        {
          '@media max-width: 500': {
            color: 'red',
          },
          '@media max-height: 400': {
            backgroundColor: 'blue',
          },
        },
      );

      expect(styles.color).toBe('red');
      expect(styles.backgroundColor).toBe('blue');
    });

    test('should only apply matching media queries when multiple exist', () => {
      const styles = resolveMediaQueries(
        { width: 400, height: 500 },
        {
          '@media max-width: 500': {
            color: 'red',
          },
          '@media max-height: 400': {
            backgroundColor: 'blue',
          },
        },
      );

      expect(styles.color).toBe('red');
      expect(styles.backgroundColor).toBe(undefined);
    });

    test('should let later matching media queries override earlier ones', () => {
      const styles = resolveMediaQueries(
        { width: 400, height: 300 },
        {
          '@media max-width: 500': {
            color: 'red',
          },
          '@media max-height: 400': {
            color: 'blue',
          },
        },
      );

      expect(styles.color).toBe('blue');
    });
  });
});

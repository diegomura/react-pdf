import { describe, expect, test } from 'vitest';

import getSource from '../../src/image/getSource';

const node = (props: Record<string, any>) =>
  ({ type: 'IMAGE', style: {}, props }) as any;

const PAGE_WIDTH = 600;

describe('getSource', () => {
  describe('src / source fallback', () => {
    test('should get src', () => {
      expect(getSource(node({ src: 'a.jpg' }), PAGE_WIDTH)).toBe('a.jpg');
    });

    test('should get source', () => {
      expect(getSource(node({ source: 'b.jpg' }), PAGE_WIDTH)).toBe('b.jpg');
    });

    test('should return undefined if neither present', () => {
      expect(getSource(node({}), PAGE_WIDTH)).toBeUndefined();
    });
  });

  describe('srcSet parsing', () => {
    test('should parse width descriptors', () => {
      const n = node({ srcSet: 'small.jpg 300w, large.jpg 600w' });

      expect(getSource(n, 400)).toBe('large.jpg');
    });

    test('should ignore density descriptors', () => {
      const n = node({
        src: 'fallback.jpg',
        srcSet: 'low.jpg 1x, high.jpg 2x',
      });

      expect(getSource(n, PAGE_WIDTH)).toBe('fallback.jpg');
    });

    test('should ignore entries without descriptors', () => {
      const n = node({ src: 'fallback.jpg', srcSet: 'only.jpg' });

      expect(getSource(n, PAGE_WIDTH)).toBe('fallback.jpg');
    });

    test('should handle extra whitespace', () => {
      const n = node({ srcSet: '  small.jpg   300w ,  large.jpg   600w  ' });

      expect(getSource(n, 200)).toBe('small.jpg');
    });

    test('should handle single entry', () => {
      const n = node({ srcSet: 'image.jpg 500w' });

      expect(getSource(n, 300)).toBe('image.jpg');
    });

    test('should handle URLs with paths', () => {
      const n = node({
        srcSet:
          'https://example.com/small.jpg 300w, https://example.com/large.jpg 600w',
      });

      expect(getSource(n, 400)).toBe('https://example.com/large.jpg');
    });
  });

  describe('source selection', () => {
    const srcSet = 'small.jpg 300w, medium.jpg 600w, large.jpg 900w';

    test('should select smallest source >= target width', () => {
      expect(getSource(node({ srcSet }), 400)).toBe('medium.jpg');
    });

    test('should select exact match', () => {
      expect(getSource(node({ srcSet }), 300)).toBe('small.jpg');
    });

    test('should select smallest source for small target', () => {
      expect(getSource(node({ srcSet, sizes: 100 }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should select largest source when target exceeds all', () => {
      expect(getSource(node({ srcSet, sizes: 1200 }), PAGE_WIDTH)).toBe(
        'large.jpg',
      );
    });

    test('should use pageWidth as target when no sizes', () => {
      expect(getSource(node({ srcSet }), 600)).toBe('medium.jpg');
    });
  });

  describe('sizes parsing', () => {
    const srcSet = 'small.jpg 300w, medium.jpg 600w, large.jpg 900w';

    test('should use numeric sizes directly as points', () => {
      expect(getSource(node({ srcSet, sizes: 300 }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should parse bare number string as points', () => {
      expect(getSource(node({ srcSet, sizes: '300' }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should parse pt unit', () => {
      expect(getSource(node({ srcSet, sizes: '300pt' }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should parse px unit', () => {
      expect(getSource(node({ srcSet, sizes: '400px' }), PAGE_WIDTH)).toBe(
        'medium.jpg',
      );
    });

    test('should parse in unit', () => {
      // 1in = 72pt
      expect(getSource(node({ srcSet, sizes: '1in' }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should parse mm unit', () => {
      // 25.4mm = 72pt
      expect(getSource(node({ srcSet, sizes: '25.4mm' }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should parse cm unit', () => {
      // 2.54cm = 72pt
      expect(getSource(node({ srcSet, sizes: '2.54cm' }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should parse vw unit', () => {
      // 50vw of 600 = 300
      expect(getSource(node({ srcSet, sizes: '50vw' }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should parse % unit', () => {
      // 50% of 600 = 300
      expect(getSource(node({ srcSet, sizes: '50%' }), PAGE_WIDTH)).toBe(
        'small.jpg',
      );
    });

    test('should fall back to pageWidth for invalid sizes string', () => {
      expect(getSource(node({ srcSet, sizes: 'abc' }), 600)).toBe('medium.jpg');
    });
  });

  describe('sizes media conditions', () => {
    const srcSet = 'small.jpg 300w, medium.jpg 600w, large.jpg 900w';

    test('should match min-width when container is wide enough', () => {
      // 600 >= 500, so target = 800 → large.jpg (900w)
      const n = node({ srcSet, sizes: '(min-width: 500) 800, 300' });

      expect(getSource(n, PAGE_WIDTH)).toBe('large.jpg');
    });

    test('should fall through min-width when container is too narrow', () => {
      // 600 < 700, so target = 300 → small.jpg
      const n = node({ srcSet, sizes: '(min-width: 700) 800, 300' });

      expect(getSource(n, PAGE_WIDTH)).toBe('small.jpg');
    });

    test('should match max-width when container is narrow enough', () => {
      // 600 <= 700, so target = 300 → small.jpg
      const n = node({ srcSet, sizes: '(max-width: 700) 300, 800' });

      expect(getSource(n, PAGE_WIDTH)).toBe('small.jpg');
    });

    test('should fall through max-width when container is too wide', () => {
      // 600 > 500, so target = 800 → large.jpg
      const n = node({ srcSet, sizes: '(max-width: 500) 300, 800' });

      expect(getSource(n, PAGE_WIDTH)).toBe('large.jpg');
    });

    test('should evaluate multiple conditions and pick first match', () => {
      // 600 < 900, skip first; 600 >= 500, target = 500 → medium.jpg
      const n = node({
        srcSet,
        sizes: '(min-width: 900) 800, (min-width: 500) 500, 300',
      });

      expect(getSource(n, PAGE_WIDTH)).toBe('medium.jpg');
    });

    test('should fall back to default when no conditions match', () => {
      const n = node({
        srcSet,
        sizes: '(min-width: 900) 800, (min-width: 700) 500, 300',
      });

      expect(getSource(n, PAGE_WIDTH)).toBe('small.jpg');
    });

    test('should handle units in conditions', () => {
      // 400px = 400pt, 600 >= 400 → target = 500 → medium.jpg
      const n = node({ srcSet, sizes: '(min-width: 400px) 500, 300' });

      expect(getSource(n, PAGE_WIDTH)).toBe('medium.jpg');
    });

    test('should handle relative units in length values', () => {
      // 600 >= 500 → target = 50vw = 300 → small.jpg
      const n = node({ srcSet, sizes: '(min-width: 500) 50vw, 800' });

      expect(getSource(n, PAGE_WIDTH)).toBe('small.jpg');
    });

    test('should fall back to pageWidth when all conditions fail and no default', () => {
      const n = node({ srcSet, sizes: '(min-width: 900) 800' });

      expect(getSource(n, 600)).toBe('medium.jpg');
    });
  });
});

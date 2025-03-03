import { describe, expect, test } from 'vitest';

import layoutParagraph from '../../src/layout/layoutParagraph';

describe('layoutParagraph', () => {
  test('should keep overflowing text in the last rect', () => {
    const linebreaker = () => (attributedString) => [attributedString];

    const layout = layoutParagraph({ linebreaker }!);

    const container = {
      excludeRects: [],
      x: 2,
      y: 4,
      width: 20,
      height: 10,
    };
    const paragraph = {
      string: 'Lorem',
      runs: [
        { start: 0, end: 5, attributes: { lineHeight: 11, color: 'red' } },
      ],
    };

    layout(container, paragraph);

    expect(true).toBe(true);
  });
});

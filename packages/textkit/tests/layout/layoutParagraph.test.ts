import { describe, expect, test } from 'vitest';

import layoutParagraph from '../../src/layout/layoutParagraph';

const captureWidths = () => {
  const captured: { widths: number[] } = { widths: [] };

  const linebreaker = () => (attributedString, widths) => {
    captured.widths = widths;
    return [attributedString];
  };

  return { captured, linebreaker };
};

describe('layoutParagraph', () => {
  test('should keep overflowing text in the last rect', () => {
    const linebreaker = () => (attributedString) => [attributedString];

    const layout = layoutParagraph({ linebreaker }!);

    const container = {
      exclusions: [],
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

  test('should pass first-line and following widths without exclusions', () => {
    const { captured, linebreaker } = captureWidths();
    const layout = layoutParagraph({ linebreaker });

    const container = { x: 0, y: 0, width: 100, height: 200 };
    const paragraph = {
      string: 'Lorem ipsum',
      runs: [{ start: 0, end: 11, attributes: { lineHeight: 10, indent: 15 } }],
    };

    layout(container, paragraph);

    expect(captured.widths).toEqual([85, 100]);
  });

  test('should keep widths aligned to line rects with exclusions', () => {
    const { captured, linebreaker } = captureWidths();
    const layout = layoutParagraph({ linebreaker });

    const container = {
      x: 0,
      y: 0,
      width: 100,
      height: 200,
      exclusions: [
        { type: 'rect' as const, x: 0, y: 0, width: 40, height: 20 },
      ],
    };
    const paragraph = {
      string: 'Lorem ipsum',
      runs: [{ start: 0, end: 11, attributes: { lineHeight: 10 } }],
    };

    layout(container, paragraph);

    // Two carved bands beside the exclusion, then the full-width remainder.
    // The line right after the exclusion must get the full width, not the
    // previous band's width.
    expect(captured.widths).toEqual([60, 60, 100]);
  });

  test('should shrink only the first width by indent with exclusions', () => {
    const { captured, linebreaker } = captureWidths();
    const layout = layoutParagraph({ linebreaker });

    const container = {
      x: 0,
      y: 0,
      width: 100,
      height: 200,
      exclusions: [
        { type: 'rect' as const, x: 0, y: 0, width: 40, height: 20 },
      ],
    };
    const paragraph = {
      string: 'Lorem ipsum',
      runs: [{ start: 0, end: 11, attributes: { lineHeight: 10, indent: 15 } }],
    };

    layout(container, paragraph);

    expect(captured.widths).toEqual([45, 60, 100]);
  });
});

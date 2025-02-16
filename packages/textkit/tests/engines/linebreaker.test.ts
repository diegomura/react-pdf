import { describe, expect, test } from 'vitest';

import applyBestFit from '../../src/engines/linebreaker/bestFit';
import applyKnuthPlass from '../../src/engines/linebreaker/knuthPlass';

const width = 50;

describe('bestFit', () => {
  test('should return at least one breakpoint', () => {
    const node = [
      {
        type: 'box' as const,
        width: 25,
        start: 0,
        end: 5,
      },
      {
        type: 'glue' as const,
        width: 0,
        stretch: 10000,
        shrink: 0,
        start: 5,
        end: 6,
      },
      {
        type: 'penalty' as const,
        width: 0,
        penalty: -10000,
      },
    ];

    const breakpoints = applyBestFit(node, [width]);
    expect(breakpoints.length).toBe(1);
  });

  test('should break lines when the subnode is bigger than the given widths', () => {
    const node = [
      {
        type: 'box' as const,
        width: 55,
        start: 0,
        end: 5,
      },
      {
        type: 'glue' as const,
        width: 5,
        stretch: 1,
        shrink: 1,
        start: 5,
        end: 6,
      },
      {
        type: 'box' as const,
        width: 55,
        start: 6,
        end: 11,
      },
      {
        type: 'glue' as const,
        width: 5,
        stretch: 1,
        shrink: 1,
        start: 11,
        end: 12,
      },
      {
        type: 'box' as const,
        width: 25,
        start: 12,
        end: 17,
      },
      {
        type: 'glue' as const,
        width: 0,
        stretch: 10000,
        shrink: 0,
        start: 17,
        end: 18,
      },
      {
        type: 'penalty' as const,
        width: 0,
        penalty: -10000,
      },
    ];

    const breakpoints = applyBestFit(node, [width]);

    expect(breakpoints.length).toBe(3);
  });
});

describe('knuthPlass', () => {
  test('should return at least one breakpoint', () => {
    const node = [
      {
        type: 'box' as const,
        width: 8,
        start: 0,
        end: 3,
      }, // Lo
      {
        type: 'penalty' as const,
        width: 2,
        penalty: 100,
      }, // -
      {
        type: 'box' as const,
        width: 12,
        start: 3,
        end: 6,
      }, // rem
      {
        type: 'glue' as const,
        width: 4,
        stretch: 10000,
        shrink: 0,
        start: 6,
        end: 7,
      }, // <space>
      {
        type: 'box' as const,
        width: 8,
        start: 7,
        end: 9,
      }, // ip
      {
        type: 'penalty' as const,
        width: 2,
        penalty: 100,
      }, // -
      {
        type: 'box' as const,
        width: 12,
        start: 9,
        end: 12,
      }, // sum
      {
        type: 'glue' as const,
        width: 4,
        stretch: 10000,
        shrink: 0,
        start: 12,
        end: 13,
      }, // <space>
      {
        type: 'box' as const,
        width: 8,
        start: 13,
        end: 15,
      }, // do
      {
        type: 'penalty' as const,
        width: 2,
        penalty: 100,
      }, // -
      {
        type: 'box' as const,
        width: 12,
        start: 15,
        end: 18,
      }, // lor
      {
        type: 'glue' as const,
        width: 0,
        stretch: 10000,
        shrink: 0,
        start: 18,
        end: 18,
      }, // KP mandatory end
      {
        type: 'penalty' as const,
        width: 0,
        penalty: -10000,
      }, // KP mandatory end
    ];

    const breakpoints = applyKnuthPlass(node, [width]);
    expect(breakpoints.length).toBe(3);
    expect(breakpoints).toEqual([0, 7, 12]);
  });
});

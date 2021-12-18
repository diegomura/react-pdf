import applyBestFit from '../../../src/engines/linebreaker/bestFit';

const width = 50;

describe('bestFit', () => {
  test('should return at least one breakpoint', () => {
    const node = [
      {
        type: 'box',
        width: 25,
      },
      {
        type: 'glue',
        width: 0,
        stretch: 10000,
        shrink: 0,
      },
      {
        type: 'penalty',
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
        type: 'box',
        width: 55,
      },
      {
        type: 'glue',
        width: 5,
        stretch: 1,
        shrink: 1,
      },
      {
        type: 'box',
        width: 55,
      },
      {
        type: 'glue',
        width: 5,
        stretch: 1,
        shrink: 1,
      },
      {
        type: 'box',
        width: 25,
      },
      {
        type: 'glue',
        width: 0,
        stretch: 10000,
        shrink: 0,
      },
      {
        type: 'penalty',
        width: 0,
        penalty: -10000,
      },
    ];

    const breakpoints = applyBestFit(node, [width]);

    expect(breakpoints.length).toBe(3);
  });
});

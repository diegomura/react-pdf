import applyBestFit from '../../../src/engines/linebreaker/bestFit';

// Sentence: "1234567891011"
const node1 = [
  {
    type: 'box',
    width: 84.81599999999999,
    value: {
      start: 0,
      end: 12,
    },
    hyphenated: true,
  },
  {
    type: 'glue',
    value: null,
    width: 0,
    stretch: 10000,
    shrink: 0,
  },
  {
    type: 'penalty',
    width: 0,
    penalty: -10000,
    flagged: 1,
  },
];

// Sentence: "123 1234567891011"
const node2 = [
  {
    type: 'box',
    width: 21.204,
    value: {
      start: 0,
      end: 3,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 3,
      end: 4,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 91.88399999999999,
    value: {
      start: 4,
      end: 17,
    },
    hyphenated: true,
  },
  {
    type: 'glue',
    value: null,
    width: 0,
    stretch: 10000,
    shrink: 0,
  },
  {
    type: 'penalty',
    width: 0,
    penalty: -10000,
    flagged: 1,
  },
];

// Setence: "123 1234567891011 123"
const node3 = [
  {
    type: 'box',
    width: 21.204,
    value: {
      start: 0,
      end: 3,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 3,
      end: 4,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 91.88399999999999,
    value: {
      start: 4,
      end: 17,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 17,
      end: 18,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 21.204,
    value: {
      start: 18,
      end: 21,
    },
    hyphenated: true,
  },
  {
    type: 'glue',
    value: null,
    width: 0,
    stretch: 10000,
    shrink: 0,
  },
  {
    type: 'penalty',
    width: 0,
    penalty: -10000,
    flagged: 1,
  },
];

// Sentence: "123 1234567891011 123 1234567891011"
const node4 = [
  {
    type: 'box',
    width: 21.204,
    value: {
      start: 0,
      end: 3,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 3,
      end: 4,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 91.88399999999999,
    value: {
      start: 4,
      end: 17,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 17,
      end: 18,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 21.204,
    value: {
      start: 18,
      end: 21,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 21,
      end: 22,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 91.88399999999999,
    value: {
      start: 22,
      end: 35,
    },
    hyphenated: true,
  },
  {
    type: 'glue',
    value: null,
    width: 0,
    stretch: 10000,
    shrink: 0,
  },
  {
    type: 'penalty',
    width: 0,
    penalty: -10000,
    flagged: 1,
  },
];

// Sentence: "123 1234567891011 1234567891011 1234567891011"
const node5 = [
  {
    type: 'box',
    width: 21.204,
    value: {
      start: 0,
      end: 3,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 3,
      end: 4,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 91.88399999999999,
    value: {
      start: 4,
      end: 17,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 17,
      end: 18,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 91.88399999999999,
    value: {
      start: 18,
      end: 31,
    },
    hyphenated: false,
  },
  {
    type: 'glue',
    value: {
      start: 31,
      end: 32,
    },
    width: 2.724,
    stretch: 1.362,
    shrink: 0.908,
  },
  {
    type: 'box',
    width: 91.88399999999999,
    value: {
      start: 32,
      end: 45,
    },
    hyphenated: true,
  },
  {
    type: 'glue',
    value: null,
    width: 0,
    stretch: 10000,
    shrink: 0,
  },
  {
    type: 'penalty',
    width: 0,
    penalty: -10000,
    flagged: 1,
  },
];

const widths = [78, 78];

describe('bestFit', () => {
  test('should return at least one breakpoint', () => {
    const nodeArr = [node1, node2, node3, node4, node5];
    nodeArr.forEach(nodes => {
      const breakpoints = applyBestFit(nodes, widths);
      expect(breakpoints.length).toBeGreaterThan(0);
    });
  });

  test('should break lines when the sum of widths is bigger than the given widths', () => {
    const nodeArr = [node1, node2, node3, node4, node5];
    nodeArr.forEach(nodes => {
      const breakpoints = applyBestFit(nodes, widths);
      let count = 0;

      for (let i = 0; i < nodes.length; i += 1) {
        if (nodes[i].width > widths[0]) {
          count += 1;
        }
      }

      expect(breakpoints.length).toBeGreaterThanOrEqual(count);
    });
  });
});

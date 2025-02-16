import sort from './sort';
import isEmpty from './isEmpty';
import { Attributes, Run } from '../types';

type Point = ['start' | 'end', number, Attributes, number];

/**
 * Sort points in ascending order
 * @param a - First point
 * @param b - Second point
 * @returns Sort order
 */
const sortPoints = (a: Point, b: Point) => {
  return a[1] - b[1] || a[3] - b[3];
};

/**
 * @param runs
 * @returns Points
 */
const generatePoints = (runs: Run[]) => {
  const result: Point[] = runs.reduce((acc, run, i) => {
    return acc.concat([
      ['start', run.start, run.attributes, i],
      ['end', run.end, run.attributes, i],
    ]);
  }, []);

  return result.sort(sortPoints);
};

/**
 * @param runs
 * @returns Merged runs
 */
const mergeRuns = (runs: Run[]): Run => {
  return runs.reduce((acc: any, run) => {
    const attributes = Object.assign({}, acc.attributes, run.attributes);
    return Object.assign({}, run, { attributes });
  }, {});
};

/**
 * @param runs
 * @returns Grouped runs
 */
const groupEmptyRuns = (runs: Run[]): Run[][] => {
  const groups = runs.reduce((acc, run) => {
    if (!acc[run.start]) acc[run.start] = [];
    acc[run.start].push(run);
    return acc;
  }, []);

  return Object.values(groups);
};

/**
 * @param runs
 * @returns Flattened runs
 */
const flattenEmptyRuns = (runs: Run[]) => {
  return groupEmptyRuns(runs).map(mergeRuns);
};

/**
 * @param runs
 * @returns Flattened runs
 */
const flattenRegularRuns = (runs: Run[]) => {
  const res: Run[] = [];
  const points = generatePoints(runs);

  let start = -1;
  let attrs = {};
  const stack = [];

  for (let i = 0; i < points.length; i += 1) {
    const [type, offset, attributes] = points[i];

    if (start !== -1 && start < offset) {
      res.push({
        start,
        end: offset,
        attributes: attrs,
        glyphIndices: [],
        glyphs: [],
        positions: [],
      });
    }

    if (type === 'start') {
      stack.push(attributes);
      attrs = Object.assign({}, attrs, attributes);
    } else {
      attrs = {};

      for (let j = 0; j < stack.length; j += 1) {
        if (stack[j] === attributes) {
          stack.splice(j--, 1);
        } else {
          attrs = Object.assign({}, attrs, stack[j]);
        }
      }
    }

    start = offset;
  }

  return res;
};

/**
 * Flatten many runs
 *
 * @param runs
 * @returns Flattened runs
 */
const flatten = (runs: Run[] = []) => {
  const emptyRuns = flattenEmptyRuns(runs.filter((run) => isEmpty(run)));
  const regularRuns = flattenRegularRuns(runs.filter((run) => !isEmpty(run)));

  return sort(emptyRuns.concat(regularRuns));
};

export default flatten;

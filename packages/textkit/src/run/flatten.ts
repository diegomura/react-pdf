import sort from './sort';
import isEmpty from './isEmpty';
import { Attributes, Run } from '../types';

type Point = ['start' | 'end', number, number];

/**
 * Sort points in ascending order
 * @param a - First point
 * @param b - Second point
 * @returns Sort order
 */
const sortPoints = (a: Point, b: Point) => {
  return a[1] - b[1] || a[2] - b[2];
};

/**
 * @param runs
 * @returns Points
 */
const generatePoints = (runs: Run[]) => {
  const result: Point[] = [];

  for (let i = 0; i < runs.length; i += 1) {
    const run = runs[i];
    result.push(['start', run.start, i], ['end', run.end, i]);
  }

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
  // Indices of the active runs, kept in input order so that later runs
  // override earlier ones no matter where each of them starts.
  const stack: number[] = [];

  for (let i = 0; i < points.length; i += 1) {
    const [type, offset, index] = points[i];

    // Merging the active attributes only when a segment is emitted avoids
    // rebuilding them on every point, most wastefully when several runs
    // end at the same offset and no segment follows.
    if (start !== -1 && start < offset) {
      const attributes: Attributes = {};

      for (let j = 0; j < stack.length; j += 1) {
        Object.assign(attributes, runs[stack[j]].attributes);
      }

      res.push({
        start,
        end: offset,
        attributes,
        stringIndices: [],
        glyphIndices: [],
        glyphs: [],
        positions: [],
      });
    }

    if (type === 'start') {
      let j = stack.length;
      while (j > 0 && stack[j - 1] > index) j -= 1;
      stack.splice(j, 0, index);
    } else {
      stack.splice(stack.indexOf(index), 1);
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

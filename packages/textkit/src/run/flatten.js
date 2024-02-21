import sort from './sort';
import isEmpty from './isEmpty';

/**
 * @typedef {import('../types.js').Point} Point
 * @typedef {import('../types.js').Run} Run
 */

/**
 * Sort points in ascending order
 * @param {Point} a first point
 * @param {Point} b second point
 * @returns {number} sort order
 */
const sortPoints = (a, b) => {
  return a[1] - b[1] || a[3] - b[3];
};

/**
 * @param {Run[]} runs
 * @returns {Point[]} points
 */
const generatePoints = (runs) => {
  const result = runs.reduce((acc, run, i) => {
    return acc.concat([
      ['start', run.start, run.attributes, i],
      ['end', run.end, run.attributes, i],
    ]);
  }, []);

  return result.sort(sortPoints);
};

/**
 * @param {Run[]} runs
 * @returns {Run} merged runs
 */
const mergeRuns = (runs) => {
  return runs.reduce((acc, run) => {
    const attributes = Object.assign({}, acc.attributes, run.attributes);
    return Object.assign({}, run, { attributes });
  }, {});
};

/**
 * @param {Run[]} runs
 * @returns {Run[][]} grouped runs
 */
const groupEmptyRuns = (runs) => {
  const groups = runs.reduce((acc, run) => {
    if (!acc[run.start]) acc[run.start] = [];
    acc[run.start].push(run);
    return acc;
  }, []);

  return Object.values(groups);
};

/**
 * @param {Run[]} runs
 * @returns {Run[]} flattened runs
 */
const flattenEmptyRuns = (runs) => {
  return groupEmptyRuns(runs).map(mergeRuns);
};

/**
 * @param {Run[]} runs
 * @returns {Run[]} flattened runs
 */
const flattenRegularRuns = (runs) => {
  const res = [];
  const points = generatePoints(runs);

  let start = -1;
  let attrs = {};
  const stack = [];

  for (let i = 0; i < points.length; i += 1) {
    const [type, offset, attributes] = points[i];

    if (start !== -1 && start < offset) {
      res.push({ start, end: offset, attributes: attrs });
    }

    if (type === 'start') {
      stack.push(attributes);
      attrs = Object.assign({}, attrs, attributes);
    } else {
      attrs = {};

      for (let j = 0; j < stack.length; j += 1) {
        if (stack[j] === attributes) {
          // eslint-disable-next-line no-plusplus
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
 * @param {Run[]} runs
 * @returns {Run[]} flattened runs
 */
const flatten = (runs = []) => {
  const emptyRuns = flattenEmptyRuns(runs.filter((run) => isEmpty(run)));
  const regularRuns = flattenRegularRuns(runs.filter((run) => !isEmpty(run)));

  return sort(emptyRuns.concat(regularRuns));
};

export default flatten;

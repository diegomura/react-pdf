import sort from './sort';
import isEmpty from './isEmpty';

const sortPoints = (a, b) => a[1] - b[1] || a[3] - b[3];

const generatePoints = (runs) => {
  const result = runs.reduce((acc, run, i) => {
    return acc.concat([
      ['start', run.start, run.attributes, i],
      ['end', run.end, run.attributes, i],
    ]);
  }, []);

  return result.sort(sortPoints);
};

const mergeRuns = (runs) =>
  runs.reduce((acc, run) => {
    const attributes = Object.assign({}, acc.attributes, run.attributes);
    return Object.assign({}, run, { attributes });
  }, {});

const groupEmptyRuns = (runs) => {
  const groups = runs.reduce((acc, run) => {
    if (!acc[run.start]) acc[run.start] = [];
    acc[run.start].push(run);
    return acc;
  }, {});

  return Object.values(groups);
};

const flattenEmptyRuns = (runs) => {
  return groupEmptyRuns(runs).map(mergeRuns);
};

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
 * @param {Object[]} runs
 * @returns {Object[]} flatten runs
 */
const flatten = (runs = []) => {
  const emptyRuns = flattenEmptyRuns(runs.filter((run) => isEmpty(run)));
  const regularRuns = flattenRegularRuns(runs.filter((run) => !isEmpty(run)));

  return sort(emptyRuns.concat(regularRuns));
};

export default flatten;

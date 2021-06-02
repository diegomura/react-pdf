import * as R from 'ramda';

import sort from './sort';
import isEmpty from './isEmpty';

const sortPoints = (a, b) => a[1] - b[1] || a[3] - b[3];

const mergeAttributes = (key, left, right) =>
  key === 'attributes' ? R.merge(left, right) : right;

const generatePoints = runs => {
  const points = runs.reduce((acc, run, i) => {
    const end = ['end', run.end, run.attributes, i]
    const start = ['start', run.start, run.attributes, i]
    return [...acc, start, end];
  }, []);

  return points.sort(sortPoints);
};

const flattenEmptyRuns = R.compose(
  R.map(R.reduce(R.mergeDeepWithKey(mergeAttributes), {})),
  R.groupWith(R.eqProps('start')),
);

const flattenRegularRuns = runs => {
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
      attrs = R.merge(attrs, attributes);
    } else {
      attrs = {};

      for (let j = 0; j < stack.length; j += 1) {
        if (stack[j] === attributes) {
          // eslint-disable-next-line no-plusplus
          stack.splice(j--, 1);
        } else {
          attrs = R.merge(attrs, stack[j]);
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
 * @param  {Array}  runs
 * @return {Array} flatten runs
 */
const flatten = (runs = []) => {
  const [emptyRuns, regularRuns] = R.partition(isEmpty, runs);
  const flattenEmpty = flattenEmptyRuns(emptyRuns);
  const flattenRegular = flattenRegularRuns(regularRuns);
  return sort([...flattenEmpty, ...flattenRegular]);
};

export default flatten;

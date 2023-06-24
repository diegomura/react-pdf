import sort from './sort';
import isEmpty from './isEmpty';

const sortPoints = (a, b) => a[1] - b[1] || a[3] - b[3];

const generatePoints = runs => {
  const result = runs.reduce((acc, run, i) => {
    return acc.concat([
      ['start', run.start, run.attributes, i],
      ['end', run.end, run.attributes, i],
    ]);
  }, []);

  return result.sort(sortPoints);
};

const mergeRuns = runs =>
  runs.reduce((acc, run) => {
    const attributes = Object.assign({}, acc.attributes, run.attributes);
    return Object.assign({}, run, { attributes });
  }, {});

const groupEmptyRuns = runs => {
  const groups = runs.reduce((acc, run) => {
    if (!acc[run.start]) acc[run.start] = [];
    acc[run.start].push(run);
    return acc;
  }, {});

  return Object.values(groups);
};

const flattenEmptyRuns = runs => {
  return groupEmptyRuns(runs).map(mergeRuns);
};

const EMPTY_ATTRS = {};
const EMPTY_RES = [];

const flattenRegularRuns = runs => {
  if (runs.length == 0) return EMPTY_RES;
  const res = [];
  let place = runs[0].start; // how far we've flattened out to so far

  for (let i = 0; i < runs.length; ++i) {
    let currentRun = runs[i];
    let start = currentRun.start;
    let end = place;
    let attributes = currentRun.attributes;

    if (start > place) {
      // there is an empty gap between runs
      res.push({"start": place, "end": start, "attributes": EMPTY_ATTRS});
      place = start;
    }

    for (let j = i+1; end < currentRun.end && j < runs.length; ++j) {
        // 0 10
        // 5 15
        // 9 20
      let next = runs[j];
      if (currentRun.end > next.start) {
        // we have overlap
        throw new Error("TODO handle overlap");
      }
    }
    place = currentRun.end;
    res.push({"start": start, "end": end, "attributes": attributes});
  }
  return res;
};

const flattenRegularRunsOrig = runs => {
  console.log("RUNS: " + JSON.stringify(runs));
  const res = [];
  const points = generatePoints(runs);

  let start = -1;
  let attrs = {};
  const stack = [];

  console.log("POINTS: " + JSON.stringify(points));
  for (let i = 0; i < points.length; i += 1) {
    const [type, offset, attributes] = points[i];

    if (start !== -1 && start < offset) {
      res.push({ start, end: offset, attributes: attrs });
    }

    if (type === 'start') {
      stack.push(attributes);
      // console.log("filling {} <-- " + JSON.stringify(attrs) + " <-- " + JSON.stringify(attributes));
      // Object.assign(attrs, attributes);
      attrs = Object.assign({}, attrs, attributes);
      // console.log("filled: " + JSON.stringify(attrs));
    } else {
      attrs = {};
      // for (let prop in attrs) {
      //   if (attrs.hasOwnProperty(prop)) {
      //     delete attrs[prop];
      //   }
      // }


      for (let j = 0; j < stack.length; j += 1) {
        if (stack[j] === attributes) {
          // eslint-disable-next-line no-plusplus
          stack.splice(j--, 1);
        } else {
          // Object.assign(attrs, stack[j]);
          attrs = Object.assign({}, attrs, stack[j]);
        }
      }
    }

    start = offset;
  }

  console.log("RES: " + JSON.stringify(res));
  return res;
};

/**
 * Flatten many runs
 *
 * @param  {Array}  runs
 * @return {Array} flatten runs
 */
const flatten = (runs = []) => {
  const emptyRuns = flattenEmptyRuns(runs.filter(run => isEmpty(run)));
  const regularRuns = flattenRegularRuns(runs.filter(run => !isEmpty(run)));

  return sort(emptyRuns.concat(regularRuns));
};

export default flatten;

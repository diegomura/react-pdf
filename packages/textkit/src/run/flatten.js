import sort from './sort';
import isEmpty from './isEmpty';

const EMPTY_ATTRS = {};
const EMPTY_RES = [];

/**
 * Flatten many runs
  return emptyRuns.concat(regularRuns);
 *
 * @param  {Array}  runs
 * @return {Array} flatten runs
 */
const flatten = (runs = []) => {
  // NOTE: profiling has revealted flatten to be a hot spot when doing large batches of pdf renders.
  // Refactored this method to perform fewer memory allocations and iterations over input data.
  if (runs.length === 0) {
    return EMPTY_RES;
  }
  {
    // sanity check input array and sort if needed
    let needsSorting = false;
    for (let i = 0; i < runs.length; i += 1) {
      const run = runs[i];
      for (let j = i + 1; j < runs.length; j += 1) {
        const next = runs[j];
        if (run.start < next.start) {
          continue;
        } else if (
          run.start > next.start ||
          (run.start === next.start && run.end > next.end)
        ) {
          needsSorting = true;
          break;
        }
      }
    }
    if (needsSorting) {
      sort(runs); // mutates in-place
    }
  }

  const res = [];
  // how far we've flattened so far
  let place = runs[0].start;
  for (let i = 0; i < runs.length; i += 1) {
    const currentRun = runs[i];
    let attributes = currentRun.attributes;

    if (isEmpty(currentRun)) {
      // Empty runs are strange. They only merge with other empty runs. This seems incorrect, but cargo-culting from the main branch
      for (let j = i + 1; j < runs.length; j += 1) {
        const next = runs[j];
        if (currentRun.end < next.end) {
          break;
        }
        if (isEmpty(next) && currentRun.start === next.start) {
          // merging empty runs means we skip the next empty
          i += 1;
          attributes = { ...attributes, ...next.attributes };
        }
      }
      res.push({
        start: currentRun.start,
        end: currentRun.end,
        attributes,
      });
      place = currentRun.end;
      continue;
    }

    if (currentRun.start > place) {
      // there is an empty gap between runs
      res.push({
        start: place,
        end: currentRun.start,
        attributes: EMPTY_ATTRS,
      });
      place = currentRun.start;
    }

    for (let j = i + 1; j < runs.length; j += 1) {
      const next = runs[j];
      if (currentRun.end <= next.start) {
        break;
      }
      if (place < next.start) {
        // there's overlap and we haven't seen this section before
        res.push({ start: place, end: next.start, attributes });
        place = next.start;
      }
      attributes = { ...attributes, ...next.attributes };
    }
    if (place !== currentRun.end) {
      res.push({ start: place, end: currentRun.end, attributes });
    }
    place = currentRun.end;
  }
  return res;
};

export default flatten;

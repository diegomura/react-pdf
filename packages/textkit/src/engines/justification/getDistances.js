/* eslint-disable no-multi-assign */
const KASHIDA_PRIORITY = 0;
const NULL_PRIORITY = 3;

const getDistances = (gap, factors) => {
  let total = 0;
  const priorities = [];
  const unconstrained = [];

  for (
    let priority = KASHIDA_PRIORITY;
    priority <= NULL_PRIORITY;
    priority += 1
  ) {
    priorities[priority] = unconstrained[priority] = 0;
  }

  // sum the factors at each priority
  for (let j = 0; j < factors.length; j += 1) {
    const f = factors[j];
    const sum = f.before + f.after;
    total += sum;
    priorities[f.priority] += sum;
    if (f.unconstrained) {
      unconstrained[f.priority] += sum;
    }
  }

  // choose the priorities that need to be applied
  let highestPriority = -1;
  let highestPrioritySum = 0;
  let remainingGap = gap;
  let priority;
  for (priority = KASHIDA_PRIORITY; priority <= NULL_PRIORITY; priority += 1) {
    const prioritySum = priorities[priority];
    if (prioritySum !== 0) {
      if (highestPriority === -1) {
        highestPriority = priority;
        highestPrioritySum = prioritySum;
      }

      // if this priority covers the remaining gap, we're done
      if (Math.abs(remainingGap) <= Math.abs(prioritySum)) {
        priorities[priority] = remainingGap / prioritySum;
        unconstrained[priority] = 0;
        remainingGap = 0;
        break;
      }

      // mark that we need to use 100% of the adjustment from
      // this priority, and subtract the space that it consumes
      priorities[priority] = 1;
      remainingGap -= prioritySum;

      // if this priority has unconstrained glyphs, let them consume the remaining space
      if (unconstrained[priority] !== 0) {
        unconstrained[priority] = remainingGap / unconstrained[priority];
        remainingGap = 0;
        break;
      }
    }
  }

  // zero out remaining priorities (if any)
  for (let p = priority + 1; p <= NULL_PRIORITY; p += 1) {
    priorities[p] = 0;
    unconstrained[p] = 0;
  }

  // if there is still space left over, assign it to the highest priority that we saw.
  // this violates their factors, but it only happens in extreme cases
  if (remainingGap > 0 && highestPriority > -1) {
    priorities[highestPriority] =
      (highestPrioritySum + (gap - total)) / highestPrioritySum;
  }

  // create and return an array of distances to add to each glyph's advance
  const distances = [];
  for (let index = 0; index < factors.length; index += 1) {
    // the distance to add to this glyph is the sum of the space to add
    // after this glyph, and the space to add before the next glyph
    const f = factors[index];
    const next = factors[index + 1];
    let dist = f.after * priorities[f.priority];

    if (next) {
      dist += next.before * priorities[next.priority];
    }

    // if this glyph is unconstrained, add the unconstrained distance as well
    if (f.unconstrained) {
      dist += f.after * unconstrained[f.priority];
      if (next) {
        dist += next.before * unconstrained[next.priority];
      }
    }

    distances.push(dist);
  }

  return distances;
};

export default getDistances;

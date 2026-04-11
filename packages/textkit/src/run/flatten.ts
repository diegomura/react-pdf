import sort from './sort';
import { Attributes, Run } from '../types';

type PointType = 0 | 1; // (0 = start), (1 = end);
type Point = [PointType, number, Attributes, number]; // [type , offset, attrs, index]

/**
 * @param runs
 * @returns Points sorted by offset then index
 */
const generatePoints = (runs: Run[]) => {
  const len = runs.length;
  const result: Point[] = new Array(len * 2);

  for (let i = 0; i < len; i++) {
    const run = runs[i];
    result[i * 2] = [0, run.start, run.attributes, i];
    result[i * 2 + 1] = [1, run.end, run.attributes, i];
  }

  result.sort((a, b) => a[1] - b[1] || a[3] - b[3]);
  return result;
};

/**
 * Rebuild attributes from stack without allocating per-item
 */
const rebuildAttrs = (stack: Attributes[]): Attributes => {
  const result = {};

  const len = stack.length;
  for (let i = 0; i < len; i++) {
    Object.assign(result, stack[i]);
  }

  return result;
};

/**
 * @param runs
 * @returns Flattened runs
 */
const flattenRegularRuns = (runs: Run[]) => {
  const res: Run[] = [];
  const points = generatePoints(runs);

  let start = -1;
  let attrs: Attributes = {};
  const stack: Attributes[] = [];

  const len = points.length;
  for (let i = 0; i < len; i += 1) {
    const [type, offset, attributes] = points[i];

    if (start !== -1 && start < offset) {
      res.push({
        start,
        end: offset,
        attributes: attrs,
        stringIndices: [],
        glyphIndices: [],
        glyphs: [],
        positions: [],
      });
    }

    if (type === 0) {
      stack.push(attributes);
      attrs = Object.assign({}, attrs, attributes);
    } else {
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j] === attributes) {
          stack.splice(j, 1);
          break;
        }
      }
      attrs = rebuildAttrs(stack);
    }

    start = offset;
  }

  return res;
};

/**
 * @param runs
 * @returns Flattened empty runs (merged by start position)
 */
const flattenEmptyRuns = (runs: Run[]) => {
  if (runs.length === 0) return runs;

  const groups: Map<number, Attributes> = new Map();

  const len = runs.length;
  for (let i = 0; i < len; i++) {
    const run = runs[i];
    const existing = groups.get(run.start);

    if (existing) {
      Object.assign(existing, run.attributes);
    } else {
      groups.set(run.start, Object.assign({}, run.attributes));
    }
  }

  const result: Run[] = [];

  for (const [startPos, attributes] of groups) {
    result.push({
      start: startPos,
      end: startPos,
      attributes,
      stringIndices: [],
      glyphIndices: [],
      glyphs: [],
      positions: [],
    });
  }

  return result;
};

/**
 * Flatten many runs
 *
 * @param runs
 * @returns Flattened runs
 */
const flatten = (runs: Run[] = []) => {
  const emptyRuns: Run[] = [];
  const regularRuns: Run[] = [];

  const len = runs.length;
  for (let i = 0; i < len; i++) {
    if (runs[i].start === runs[i].end) {
      emptyRuns.push(runs[i]);
    } else {
      regularRuns.push(runs[i]);
    }
  }

  const flatEmpty = flattenEmptyRuns(emptyRuns);
  const flatRegular = flattenRegularRuns(regularRuns);

  return sort(flatEmpty.concat(flatRegular));
};

export default flatten;

/* eslint-disable no-plusplus */
const INFINITY = 10000;

const getNextBreakpoint = (subnodes, widths, lineNumber) => {
  let position = null;
  let minimumBadness = Infinity;

  const sum = { width: 0, stretch: 0, shrink: 0 };
  const lineLength = widths[Math.min(lineNumber, widths.length - 1)];

  const calculateRatio = node => {
    if (sum.width < lineLength) {
      return sum.stretch - node.stretch > 0
        ? (lineLength - sum.width) / sum.stretch
        : INFINITY;
    }

    if (sum.width > lineLength) {
      return sum.shrink - node.shrink > 0
        ? (lineLength - sum.width) / sum.shrink
        : INFINITY;
    }

    return 0;
  };

  for (let i = 0; i < subnodes.length; i += 1) {
    const node = subnodes[i];

    if (node.type === 'box') {
      sum.width += node.width;
    } else if (node.type === 'glue') {
      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;
    }

    if (sum.width - sum.shrink > lineLength) {
      if (i > 0) {
        position = i - 1;
      } else {
        position = i;
      }
      break;
    }

    if (node.type === 'penalty' || node.type === 'glue') {
      const ratio = calculateRatio(node);
      const penalty = node.type === 'penalty' ? node.penalty : 0;
      const badness = 100 * Math.abs(ratio) ** 3 + penalty;

      if (minimumBadness >= badness) {
        position = i;
        minimumBadness = badness;
      }
    }
  }

  return sum.width - sum.shrink > lineLength ? position : null;
};

const applyBestFit = (nodes, widths) => {
  let count = 0;
  let lineNumber = 0;
  let subnodes = nodes;
  const breakpoints = [{ position: 0 }];

  while (subnodes.length > 0) {
    const breakpoint = getNextBreakpoint(subnodes, widths, lineNumber);

    if (breakpoint !== null) {
      count += breakpoint;
      breakpoints.push({ position: count });
      subnodes = subnodes.slice(breakpoint + 1, subnodes.length);
      count++;
      lineNumber++;
    } else {
      subnodes = [];
    }
  }

  return breakpoints;
};

export default applyBestFit;

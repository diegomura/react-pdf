import { Node } from './types';

const INFINITY = 10000;

const skipPastGlueAndPenalty = (nodes: Node[], start: number): Node => {
  let j = start + 1;
  for (; j < nodes.length; j++) {
    if (nodes[j].type !== 'glue' && nodes[j].type !== 'penalty') {
      break;
    }
  }
  return nodes[j - 1];
};

const getNextBreakpoint = (
  subnodes: Node[],
  widths: number[],
  lineNumber: number,
) => {
  let position: number | null = null;
  let minimumBadness = Infinity;

  const sum = { width: 0, stretch: 0, shrink: 0 };
  const lineLength = widths[Math.min(lineNumber, widths.length - 1)];

  const calculateRatio = (node: Node) => {
    const stretch = 'stretch' in node ? node.stretch : null;

    if (sum.width < lineLength) {
      if (!stretch) return INFINITY;

      return sum.stretch - stretch > 0
        ? (lineLength - sum.width) / sum.stretch
        : INFINITY;
    }

    const shrink = 'shrink' in node ? node.shrink : null;

    if (sum.width > lineLength) {
      if (!shrink) return INFINITY;

      return sum.shrink - shrink > 0
        ? (lineLength - sum.width) / sum.shrink
        : INFINITY;
    }

    return 0;
  };

  let hyphenWidth = 0;

  for (let i = 0; i < subnodes.length; i += 1) {
    const node = subnodes[i];

    if (node.type === 'box') {
      sum.width += node.width;
    }

    if (node.type === 'glue') {
      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;
    }

    const potentialEndOfLine = skipPastGlueAndPenalty(subnodes, i);
    hyphenWidth =
      potentialEndOfLine.type === 'penalty' ? potentialEndOfLine.width : 0;

    if (sum.width - sum.shrink + hyphenWidth > lineLength) {
      if (position === null) {
        let j = i === 0 ? i + 1 : i;

        while (
          j < subnodes.length &&
          (subnodes[j].type === 'glue' || subnodes[j].type === 'penalty')
        ) {
          j++;
        }

        position = j - 1;
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

  return sum.width - sum.shrink + hyphenWidth > lineLength ? position : null;
};

const applyBestFit = (nodes: Node[], widths: number[]): number[] => {
  let count = 0;
  let lineNumber = 0;
  let subnodes = nodes;
  const breakpoints = [0];

  while (subnodes.length > 0) {
    const breakpoint = getNextBreakpoint(subnodes, widths, lineNumber);

    if (breakpoint !== null) {
      count += breakpoint;
      breakpoints.push(count);
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

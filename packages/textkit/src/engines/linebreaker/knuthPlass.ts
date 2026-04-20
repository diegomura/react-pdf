/**
 * Licensed under the new BSD License.
 * Copyright 2009-2010, Bram Stein
 * All rights reserved.
 */

import LinkedList from './linkedList';
import { BoxNode, GlueNode, Node, PenaltyNode } from './types';

type Sum = {
  width: number;
  stretch: number;
  shrink: number;
};

function breakpoint(
  position: number,
  demerits: number,
  line: number,
  fitnessClass: number,
  totals: unknown,
  previous: unknown,
): any {
  return {
    position,
    demerits,
    line,
    fitnessClass,
    totals: totals || {
      width: 0,
      stretch: 0,
      shrink: 0,
    },
    previous,
  };
}

function computeCost(
  nodes: Node[],
  lineLengths: number[],
  sum: Sum,
  end: number,
  active,
  currentLine: number,
) {
  let width = sum.width - active.totals.width;
  let stretch = 0;
  let shrink = 0;

  // If the current line index is within the list of linelengths, use it, otherwise use
  // the last line length of the list.
  const lineLength =
    currentLine < lineLengths.length
      ? lineLengths[currentLine - 1]
      : lineLengths[lineLengths.length - 1];

  if (nodes[end].type === 'penalty') {
    width += nodes[end].width;
  }

  // Calculate the stretch ratio
  if (width < lineLength) {
    stretch = sum.stretch - active.totals.stretch;

    if (stretch > 0) {
      return (lineLength - width) / stretch;
    }

    return linebreak.infinity;
  }

  // Calculate the shrink ratio
  if (width > lineLength) {
    shrink = sum.shrink - active.totals.shrink;

    if (shrink > 0) {
      return (lineLength - width) / shrink;
    }

    return linebreak.infinity;
  }

  // perfect match
  return 0;
}

// Add width, stretch and shrink values from the current
// break point up to the next box or forced penalty.
function computeSum(nodes: Node[], sum: Sum, breakPointIndex: number) {
  const result = {
    width: sum.width,
    stretch: sum.stretch,
    shrink: sum.shrink,
  };

  for (let i = breakPointIndex; i < nodes.length; i += 1) {
    const node = nodes[i];

    if (node.type === 'glue') {
      result.width += node.width;
      result.stretch += node.stretch;
      result.shrink += node.shrink;
    } else if (
      node.type === 'box' ||
      (node.type === 'penalty' &&
        node.penalty === -linebreak.infinity &&
        i > breakPointIndex)
    ) {
      break;
    }
  }

  return result;
}

function findBestBreakpoints(activeNodes) {
  const breakpoints: number[] = [];

  if (activeNodes.size() === 0) return [];

  let tmp: any = { data: { demerits: Infinity } };

  // Find the best active node (the one with the least total demerits.)
  activeNodes.forEach((node) => {
    if (node.data.demerits < tmp.data.demerits) {
      tmp = node;
    }
  });

  while (tmp !== null) {
    breakpoints.push(tmp.data.position);
    tmp = tmp.data.previous;
  }

  return breakpoints.reverse();
}

/**
 * @param nodes
 * @param availableWidths
 * @param tolerance
 * @preserve Knuth and Plass line breaking algorithm in JavaScript
 */
const linebreak = (
  nodes: Node[],
  availableWidths: number[],
  tolerance?: number,
): number[] => {
  // Demerits are used as a way to penalize bad line breaks
  //  - line: applied to each line, depending on how much spaces need to stretch or shrink
  //  - flagged: applied when consecutive lines end in hyphenation
  //  - fitness: algorithm groups lines into fitness classes based on how loose or tight the spacing is.
  //             if a paragraph has consecutive lines from different fitness classes,
  //             a fitness demerit is applied to maintain visual consistency.
  const options = {
    demerits: { line: 10, flagged: 100, fitness: 3000 },
    tolerance: tolerance || 3,
  };

  const activeNodes = new LinkedList();
  const sum = { width: 0, stretch: 0, shrink: 0 };
  const lineLengths = availableWidths;

  // Add an active node for the start of the paragraph.
  activeNodes.push(
    new LinkedList.Node(breakpoint(0, 0, 0, 0, undefined, null)),
  );

  // The main loop of the algorithm
  function mainLoop(node: Node, index: number, nodes: Node[]) {
    let active = activeNodes.first();

    // The inner loop iterates through all the active nodes with line < currentLine and then
    // breaks out to insert the new active node candidates before looking at the next active
    // nodes for the next lines. The result of this is that the active node list is always
    // sorted by line number.
    while (active !== null) {
      let currentLine = 0;

      // Candidates fo each fitness class
      const candidates = [
        { active: undefined, demerits: Infinity },
        { active: undefined, demerits: Infinity },
        { active: undefined, demerits: Infinity },
        { active: undefined, demerits: Infinity },
      ];

      // Iterate through the linked list of active nodes to find new potential active nodes and deactivate current active nodes.
      while (active !== null) {
        currentLine = active.data.line + 1;

        const ratio = computeCost(
          nodes,
          lineLengths,
          sum,
          index,
          active.data,
          currentLine,
        );

        // Deactive nodes when the distance between the current active node and the
        // current node becomes too large (i.e. it exceeds the stretch limit and the stretch
        // ratio becomes negative) or when the current node is a forced break (i.e. the end
        // of the paragraph when we want to remove all active nodes, but possibly have a final
        // candidate active node---if the paragraph can be set using the given tolerance value.)
        if (
          ratio < -1 ||
          (node.type === 'penalty' && node.penalty === -linebreak.infinity)
        ) {
          activeNodes.remove(active);
        }

        // If the ratio is within the valid range of -1 <= ratio <= tolerance calculate the
        // total demerits and record a candidate active node.
        if (ratio >= -1 && ratio <= options.tolerance) {
          const badness = 100 * Math.pow(Math.abs(ratio), 3);

          let demerits = 0;

          // Positive penalty
          if (node.type === 'penalty' && node.penalty >= 0) {
            demerits =
              Math.pow(options.demerits.line + badness, 2) +
              Math.pow(node.penalty, 2);
            // Negative penalty but not a forced break
          } else if (
            node.type === 'penalty' &&
            node.penalty !== -linebreak.infinity
          ) {
            demerits =
              Math.pow(options.demerits.line + badness, 2) -
              Math.pow(node.penalty, 2);
            // All other cases
          } else {
            demerits = Math.pow(options.demerits.line + badness, 2);
          }

          if (
            node.type === 'penalty' &&
            nodes[active.data.position].type === 'penalty'
          ) {
            demerits +=
              options.demerits.flagged *
              node.flagged *
              // @ts-expect-error node is penalty here
              nodes[active.data.position].flagged;
          }

          // Calculate the fitness class for this candidate active node.
          let currentClass;
          if (ratio < -0.5) {
            currentClass = 0;
          } else if (ratio <= 0.5) {
            currentClass = 1;
          } else if (ratio <= 1) {
            currentClass = 2;
          } else {
            currentClass = 3;
          }

          // Add a fitness penalty to the demerits if the fitness classes of two adjacent lines differ too much.
          if (Math.abs(currentClass - active.data.fitnessClass) > 1) {
            demerits += options.demerits.fitness;
          }

          // Add the total demerits of the active node to get the total demerits of this candidate node.
          demerits += active.data.demerits;

          // Only store the best candidate for each fitness class
          if (demerits < candidates[currentClass].demerits) {
            candidates[currentClass] = { active, demerits };
          }
        }

        active = active.next;

        // Stop iterating through active nodes to insert new candidate active nodes in the active list
        // before moving on to the active nodes for the next line.
        // TODO: The Knuth and Plass paper suggests a conditional for currentLine < j0. This means paragraphs
        // with identical line lengths will not be sorted by line number. Find out if that is a desirable outcome.
        // For now I left this out, as it only adds minimal overhead to the algorithm and keeping the active node
        // list sorted has a higher priority.
        if (active !== null && active.data.line >= currentLine) {
          break;
        }
      }

      const tmpSum = computeSum(nodes, sum, index);

      for (
        let fitnessClass = 0;
        fitnessClass < candidates.length;
        fitnessClass += 1
      ) {
        const candidate = candidates[fitnessClass];

        if (candidate.demerits === Infinity) continue;

        const newNode = new LinkedList.Node(
          breakpoint(
            index,
            candidate.demerits,
            candidate.active.data.line + 1,
            fitnessClass,
            tmpSum,
            candidate.active,
          ),
        );
        if (active !== null) {
          activeNodes.insertBefore(active, newNode);
        } else {
          activeNodes.push(newNode);
        }
      }
    }
  }

  nodes.forEach((node, index, nodes) => {
    if (node.type === 'box') {
      sum.width += node.width;
      return;
    }

    if (node.type === 'glue') {
      const precedesBox = index > 0 && nodes[index - 1].type === 'box';
      if (precedesBox) mainLoop(node, index, nodes);

      sum.width += node.width;
      sum.stretch += node.stretch;
      sum.shrink += node.shrink;

      return;
    }

    if (node.type === 'penalty' && node.penalty !== linebreak.infinity) {
      mainLoop(node, index, nodes);
    }
  });

  return findBestBreakpoints(activeNodes);
};

linebreak.infinity = 10000;

linebreak.glue = (
  width: number,
  start: number,
  end: number,
  stretch: number,
  shrink: number,
): GlueNode => ({
  type: 'glue',
  start,
  end,
  width,
  stretch,
  shrink,
});

linebreak.box = (
  width: number,
  start: number,
  end: number,
  hyphenated = false,
): BoxNode => ({
  type: 'box',
  width,
  start,
  end,
  hyphenated,
});

linebreak.penalty = (
  width: number,
  penalty: number,
  flagged: number,
  hyphen?: '-',
): PenaltyNode => ({
  type: 'penalty',
  width,
  penalty,
  flagged,
  hyphen,
});

export default linebreak;

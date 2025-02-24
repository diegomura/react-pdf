import { evolve, matchPercent } from '@react-pdf/fns';
import { Box, SafeNode } from '../types';

const resolveRadius = (box: Box) => (value: number | `${string}%`) => {
  if (!value) return undefined;

  const match = matchPercent(value);

  return match ? match.percent * Math.min(box.width, box.height) : value;
};

/**
 * Transforms percent border radius into fixed values
 *
 * @param node
 * @returns Node
 */
const resolvePercentRadius = (node: SafeNode): SafeNode => {
  const style = evolve(
    {
      borderTopLeftRadius: resolveRadius(node.box),
      borderTopRightRadius: resolveRadius(node.box),
      borderBottomRightRadius: resolveRadius(node.box),
      borderBottomLeftRadius: resolveRadius(node.box),
    },
    node.style || {},
  );

  const newNode = Object.assign({}, node, { style });

  if (!node.children) return newNode;

  const children = node.children.map(resolvePercentRadius);

  return Object.assign({}, newNode, { children });
};

export default resolvePercentRadius;

import { SafeNode } from '../types';
import {
  ZERO_BOTTOM_BOX,
  ZERO_BOTTOM_STYLE,
  ZERO_TOP_BOX,
  ZERO_TOP_STYLE,
} from './splitEdges';

// Cut a childless box `height` into its content, yielding the part above the
// cut and the remainder. Heights are pinned in style as well as box so the
// page relayout keeps the cut instead of restoring the unsplit size.
const splitBox = (node: SafeNode, height: number): [SafeNode, SafeNode] => {
  const nextHeight = (node.box?.height || 0) - height;

  const current = {
    ...node,
    box: { ...node.box, height, ...ZERO_BOTTOM_BOX },
    style: { ...node.style, height, ...ZERO_BOTTOM_STYLE },
    wasSplit: true,
  } as SafeNode;

  const next = {
    ...node,
    box: { ...node.box, top: 0, height: nextHeight, ...ZERO_TOP_BOX },
    style: { ...node.style, height: nextHeight, ...ZERO_TOP_STYLE },
    wasSplit: true,
  } as SafeNode;

  return [current, next];
};

export default splitBox;

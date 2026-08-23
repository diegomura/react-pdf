import * as P from '@react-pdf/primitives';
import { Clear } from '@react-pdf/stylesheet';

import { SafeNode, SafeTextNode, Exclusion } from '../types';

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

const getNumericMargin = (value: number | string | undefined): number => {
  return typeof value === 'number' ? value : 0;
};

const isFloated = (node: SafeNode): boolean => {
  const float = node.style?.float;
  return float === 'left' || float === 'right';
};

/**
 * Calculate the minimum Y position that clears the specified float elements
 */
const getClearY = (floats: Exclusion[], clearType: Clear): number => {
  if (clearType === 'none' || floats.length === 0) return 0;

  let maxY = 0;

  for (const float of floats) {
    if (clearType === 'both' || clearType === float.float) {
      maxY = Math.max(maxY, float.y + float.height);
    }
  }

  return maxY;
};

/**
 * Calculate the Y offset adjustment needed to clear float siblings
 */
const applyClear = (node: SafeNode, floats: Exclusion[]): number => {
  const clearType = node.style?.clear;

  if (!clearType || clearType === 'none') return 0;

  const currentY = node.box?.top ?? 0;
  const clearY = getClearY(floats, clearType);

  return Math.max(0, clearY - currentY);
};

/**
 * Calculate left position for float element based on float direction
 */
const getFloatLeft = (node: SafeNode, parentWidth: number): number => {
  const float = node.style?.float;
  const marginLeft = getNumericMargin(node.style?.marginLeft);
  const marginRight = getNumericMargin(node.style?.marginRight);

  if (float === 'left') {
    return marginLeft;
  }

  if (float === 'right') {
    return parentWidth - (node.box?.width ?? 0) - marginRight;
  }

  return node.box?.left ?? 0;
};

/**
 * Position float element to the left or right edge of parent.
 * Note: Yoga already applies marginTop to box.top for absolute positioned elements.
 * Callers guarantee node.box — resolveFloats skips boxless children.
 */
const positionFloatElement = <T extends SafeNode>(
  node: T,
  parentWidth: number,
): T => {
  const newLeft = getFloatLeft(node, parentWidth);
  const newBox = Object.assign({}, node.box!, { left: newLeft });

  return Object.assign({}, node, { box: newBox }) as T;
};

/**
 * Create Exclusion from a positioned node.
 * Note: box.top already includes marginTop adjustment from positionFloatElement.
 * Margins are folded into the rect: the text-facing side margin widens it and
 * marginBottom extends it, so exclusion and clear read the geometry directly.
 */
const createExclusion = (node: SafeNode): Exclusion => {
  const { box, style } = node;
  const float = style?.float as 'left' | 'right';
  const marginRight = getNumericMargin(style?.marginRight);
  const marginLeft = getNumericMargin(style?.marginLeft);

  return {
    float,
    type: 'rect',
    x: box!.left - (float === 'right' ? marginLeft : 0),
    y: box!.top,
    width: box!.width + (float === 'left' ? marginRight : marginLeft),
    height: box!.height + getNumericMargin(style?.marginBottom),
  };
};

/**
 * Apply clear offset to a node's vertical position
 */
const applyClearOffset = (node: SafeNode, offset: number): SafeNode => {
  if (offset <= 0 || !node.box) return node;

  const newBox = Object.assign({}, node.box, { top: node.box.top + offset });
  return Object.assign({}, node, { box: newBox }) as SafeNode;
};

/**
 * Attach exclusion geometry to a text node for text wrapping.
 * Skip if no floats or if text was split during pagination.
 */
const attachExclusions = (
  node: SafeTextNode,
  floats: Exclusion[],
): SafeTextNode => {
  if (floats.length === 0 || node.wasSplit) return node;

  return Object.assign({}, node, { exclusions: floats });
};

/**
 * Resolve floats recursively for any node (document, page, view, etc.).
 * Runs on the document after resolveDimensions, and per page in relayoutPage.
 */
const resolveFloats = <T extends SafeNode>(node: T): T => {
  if (!node.children || node.children.length === 0) return node;

  const nodeChildren = node.children as SafeNode[];
  const parentWidth = node.box?.width ?? 0;
  const processedFloats: Exclusion[] = [];
  const children: SafeNode[] = [];

  let clearOffset = 0;

  for (const child of nodeChildren) {
    if (!child.box) {
      children.push(resolveFloats(child));
      continue;
    }

    if (isFloated(child)) {
      const positioned = positionFloatElement(child, parentWidth);
      processedFloats.push(createExclusion(positioned));
      children.push(resolveFloats(positioned));
      continue;
    }

    let processedChild = applyClearOffset(child, clearOffset);

    const additionalOffset = applyClear(processedChild, processedFloats);

    if (additionalOffset > 0) {
      clearOffset += additionalOffset;
      processedChild = applyClearOffset(processedChild, additionalOffset);
    }

    if (isText(processedChild)) {
      processedChild = attachExclusions(processedChild, processedFloats);
    }

    children.push(resolveFloats(processedChild));
  }

  // Clearance moved in-flow children down after yoga ran; grow the container
  // to keep containing them, like CSS clearance does.
  const box =
    clearOffset > 0 && node.box
      ? Object.assign({}, node.box, { height: node.box.height + clearOffset })
      : node.box;

  return Object.assign({}, node, { box, children }) as T;
};

export default resolveFloats;

import * as P from '@react-pdf/primitives';
import {
  Clear,
  ShapeOutside,
  ShapeRadius,
  ShapeScalar,
} from '@react-pdf/stylesheet';
import { ExclusionShape } from '@react-pdf/textkit';

import { SafeNode, SafeTextNode } from '../types';

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

const getNumericMargin = (value: number | string | undefined): number => {
  return typeof value === 'number' ? value : 0;
};

const isFloated = (node: SafeNode): boolean => {
  const float = node.style?.float;
  return float === 'left' || float === 'right';
};

/** Clear reacts to the float's margin box, not its shape-outside geometry,
 * so its edges are tracked apart from the exclusions text wraps around. */
type FloatEdge = { float: 'left' | 'right'; bottom: number };

/**
 * Calculate the minimum Y position that clears the specified float elements
 */
const getClearY = (floats: FloatEdge[], clearType: Clear): number => {
  if (clearType === 'none' || floats.length === 0) return 0;

  let maxY = 0;

  for (const float of floats) {
    if (clearType === 'both' || clearType === float.float) {
      maxY = Math.max(maxY, float.bottom);
    }
  }

  return maxY;
};

/**
 * Calculate the Y offset adjustment needed to clear float siblings
 */
const applyClear = (node: SafeNode, floats: FloatEdge[]): number => {
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

const resolveScalar = (value: ShapeScalar, reference: number): number =>
  typeof value === 'number' ? value : (parseFloat(value) / 100) * reference;

const axisRadius = (radius: ShapeRadius, center: number, size: number) => {
  if (radius === 'closest-side') return Math.min(center, size - center);
  if (radius === 'farthest-side') return Math.max(center, size - center);
  return resolveScalar(radius, size);
};

/**
 * Resolve a parsed shape-outside against the float's box into an exclusion
 * shape in box-local coordinates (origin at the float's top-left corner).
 */
const resolveShapeOutside = (
  shape: ShapeOutside,
  box: { width: number; height: number },
): ExclusionShape => {
  if (shape.type === 'circle') {
    const cx = resolveScalar(shape.cx, box.width);
    const cy = resolveScalar(shape.cy, box.height);
    const sides = [cx, cy, box.width - cx, box.height - cy];

    let r: number;
    if (shape.r === 'closest-side') {
      r = Math.min(...sides);
    } else if (shape.r === 'farthest-side') {
      r = Math.max(...sides);
    } else {
      // Percentage circle radii resolve against sqrt(w²+h²)/√2 per css-shapes-1
      r = resolveScalar(
        shape.r,
        Math.hypot(box.width, box.height) / Math.SQRT2,
      );
    }

    return { type: 'ellipse', cx, cy, rx: r, ry: r };
  }

  if (shape.type === 'ellipse') {
    const cx = resolveScalar(shape.cx, box.width);
    const cy = resolveScalar(shape.cy, box.height);

    return {
      type: 'ellipse',
      cx,
      cy,
      rx: axisRadius(shape.rx, cx, box.width),
      ry: axisRadius(shape.ry, cy, box.height),
    };
  }

  if (shape.type === 'polygon') {
    return {
      type: 'polygon',
      points: shape.points.map((point) => ({
        x: resolveScalar(point.x, box.width),
        y: resolveScalar(point.y, box.height),
      })),
    };
  }

  const top = resolveScalar(shape.top, box.height);
  const right = resolveScalar(shape.right, box.width);
  const bottom = resolveScalar(shape.bottom, box.height);
  const left = resolveScalar(shape.left, box.width);

  return {
    type: 'rect',
    x: left,
    y: top,
    width: box.width - left - right,
    height: box.height - top - bottom,
  };
};

const translateShape = (
  shape: ExclusionShape,
  dx: number,
  dy: number,
): ExclusionShape => {
  if (shape.type === 'ellipse') {
    return { ...shape, cx: shape.cx + dx, cy: shape.cy + dy };
  }

  if (shape.type === 'polygon') {
    return {
      ...shape,
      points: shape.points.map((p) => ({ x: p.x + dx, y: p.y + dy })),
    };
  }

  return { ...shape, x: shape.x + dx, y: shape.y + dy };
};

/**
 * Create Exclusion from a positioned node.
 * Note: box.top already includes marginTop adjustment from positionFloatElement.
 * Margins are folded into the rect: the text-facing side margin widens it and
 * marginBottom extends it, so exclusion and clear read the geometry directly.
 */
const createExclusion = (node: SafeNode): ExclusionShape => {
  const { box, style } = node;
  const float = style?.float as 'left' | 'right';
  const marginRight = getNumericMargin(style?.marginRight);
  const marginLeft = getNumericMargin(style?.marginLeft);

  const shape = style?.shapeOutside
    ? resolveShapeOutside(style.shapeOutside, box!)
    : null;

  if (shape) {
    // extend keeps text out of the gap between the shape and the page
    // edge on the float's own side, mirroring CSS float flow
    return { ...translateShape(shape, box!.left, box!.top), extend: float };
  }

  return {
    type: 'rect',
    x: box!.left - (float === 'right' ? marginLeft : 0),
    y: box!.top,
    width: box!.width + (float === 'left' ? marginRight : marginLeft),
    height: box!.height + getNumericMargin(style?.marginBottom),
  };
};

const createFloatEdge = (node: SafeNode): FloatEdge => ({
  float: node.style?.float as 'left' | 'right',
  bottom:
    node.box!.top +
    node.box!.height +
    getNumericMargin(node.style?.marginBottom),
});

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
  floats: ExclusionShape[],
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
  const processedFloats: ExclusionShape[] = [];
  const floatEdges: FloatEdge[] = [];
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
      floatEdges.push(createFloatEdge(positioned));
      children.push(resolveFloats(positioned));
      continue;
    }

    let processedChild = applyClearOffset(child, clearOffset);

    const additionalOffset = applyClear(processedChild, floatEdges);

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

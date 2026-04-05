import React from 'react';
import {
  Svg,
  G,
  Path,
  Rect,
  Line,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
} from '@react-pdf/renderer';

import type { SvgNode } from './parseSvg';

export interface MathSvgOptions {
  width?: number | string;
  height?: number | string;
  color?: string;
  debug?: boolean;
}

const DEFAULT_HEIGHT = 22;

/**
 * Resolve SVG width and height from the provided options and the viewBox aspect ratio.
 * - If both are provided, use them as-is.
 * - If only one is provided, compute the other from the viewBox aspect ratio.
 * - If neither is provided, use a default height and derive width from the aspect ratio.
 */
function resolveDimensions(
  attributes: Record<string, string>,
  width?: number | string,
  height?: number | string,
): { width: number; height: number } {
  const viewBox = attributes.viewBox;
  const parts = viewBox?.split(/[\s,]+/).map(Number);
  const vbWidth = parts?.[2] || 1;
  const vbHeight = parts?.[3] || 1;
  const aspectRatio = vbWidth / vbHeight;

  if (width !== undefined && height !== undefined) {
    return { width: Number(width), height: Number(height) };
  }

  if (height !== undefined) {
    return { width: Number(height) * aspectRatio, height: Number(height) };
  }

  if (width !== undefined) {
    return { width: Number(width), height: Number(width) / aspectRatio };
  }

  return { width: DEFAULT_HEIGHT * aspectRatio, height: DEFAULT_HEIGHT };
}

/**
 * Convert kebab-case SVG attribute names to camelCase for react-pdf.
 * e.g. "stroke-width" -> "strokeWidth", "fill-opacity" -> "fillOpacity"
 */
function camelCase(name: string): string {
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Attributes that should remain as-is (not camelCased)
 */
const PASS_THROUGH_ATTRS = new Set(['d', 'x', 'y', 'x1', 'y1', 'x2', 'y2']);

/**
 * Attributes to skip (not relevant for react-pdf)
 */
const SKIP_ATTRS = new Set([
  'xmlns',
  'xmlns:xlink',
  'xlink:href',
  'class',
  'style',
  'role',
  'focusable',
  'aria-hidden',
  'data-mml-node',
  'data-c',
]);

function mapAttributes(
  attributes: Record<string, string>,
  color: string,
): Record<string, string | number> {
  const mapped: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(attributes)) {
    if (SKIP_ATTRS.has(key) || key.startsWith('data-')) continue;

    const propName = PASS_THROUGH_ATTRS.has(key) ? key : camelCase(key);

    // Resolve currentColor to the provided color
    const resolved = value === 'currentColor' ? color : value;

    // Convert numeric strings to numbers for dimensional attributes
    const numValue = Number(resolved);
    mapped[propName] =
      !isNaN(numValue) && resolved !== '' ? numValue : resolved;
  }

  return mapped;
}

/**
 * Recursively maps an SVG node tree to react-pdf SVG components.
 * For the root `<svg>` element, width/height from MathJax (in `ex` units) are
 * replaced with the user-provided size overrides.
 */
export function mapSvgNode(
  node: SvgNode,
  key: string | number = 0,
  options?: MathSvgOptions,
): React.ReactElement | null {
  const { tagName, attributes, children } = node;
  const color = options?.color || 'black';
  const childElements = children
    .map((child, i) => mapSvgNode(child, i, { width: 0, height: 0, color }))
    .filter(Boolean);

  const props = mapAttributes(attributes, color);

  switch (tagName) {
    case 'svg': {
      const svgProps: Record<string, any> = { ...props };
      const dims = resolveDimensions(
        attributes,
        options?.width,
        options?.height,
      );

      svgProps.width = dims.width;
      svgProps.height = dims.height;

      return (
        <Svg key={key} {...svgProps} debug={options?.debug}>
          {childElements}
        </Svg>
      );
    }
    case 'g':
      return (
        <G key={key} {...(props as any)}>
          {childElements}
        </G>
      );
    case 'path':
      return <Path key={key} {...(props as any)} />;
    case 'rect':
      return <Rect key={key} {...(props as any)} />;
    case 'line':
      return <Line key={key} {...(props as any)} />;
    case 'circle':
      return <Circle key={key} {...(props as any)} />;
    case 'ellipse':
      return <Ellipse key={key} {...(props as any)} />;
    case 'polygon':
      return <Polygon key={key} {...(props as any)} />;
    case 'polyline':
      return <Polyline key={key} {...(props as any)} />;
    default:
      // For unsupported tags, wrap children in a G element
      if (childElements.length > 0) {
        return <G key={key}>{childElements}</G>;
      }
      return null;
  }
}

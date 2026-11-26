import React from 'react';
import * as P from '@react-pdf/primitives';
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

import type { SvgNode } from '@react-pdf/svg';

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
  props: Record<string, unknown>,
  width?: number | string,
  height?: number | string,
): { width: number; height: number } {
  const viewBox = props.viewBox as string | undefined;
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
 * Attributes to skip (not relevant for react-pdf)
 */
const SKIP_ATTRS = new Set([
  'xmlns',
  'xmlnsXlink',
  'xlinkHref',
  'class',
  'style',
  'role',
  'focusable',
  'ariaHidden',
]);

function mapAttributes(
  props: Record<string, unknown>,
  color: string,
): Record<string, unknown> {
  const mapped: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (SKIP_ATTRS.has(key) || key.startsWith('data')) continue;

    // Resolve currentColor to the provided color
    const resolved = value === 'currentColor' ? color : value;

    // Convert numeric strings to numbers for dimensional attributes
    if (typeof resolved === 'string') {
      const numValue = Number(resolved);
      mapped[key] = !isNaN(numValue) && resolved !== '' ? numValue : resolved;
    } else {
      mapped[key] = resolved;
    }
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
  const { type, props, children } = node;
  const color = options?.color || 'black';
  const childElements = (children || [])
    .map((child, i) => mapSvgNode(child, i, { width: 0, height: 0, color }))
    .filter(Boolean);

  const mappedProps = mapAttributes(props, color);

  switch (type) {
    case P.Svg: {
      const svgProps: Record<string, any> = { ...mappedProps };
      const dims = resolveDimensions(props, options?.width, options?.height);

      svgProps.width = dims.width;
      svgProps.height = dims.height;

      return (
        <Svg key={key} {...svgProps} debug={options?.debug}>
          {childElements}
        </Svg>
      );
    }
    case P.G:
      return (
        <G key={key} {...(mappedProps as any)}>
          {childElements}
        </G>
      );
    case P.Path:
      return <Path key={key} {...(mappedProps as any)} />;
    case P.Rect:
      return <Rect key={key} {...(mappedProps as any)} />;
    case P.Line:
      return <Line key={key} {...(mappedProps as any)} />;
    case P.Circle:
      return <Circle key={key} {...(mappedProps as any)} />;
    case P.Ellipse:
      return <Ellipse key={key} {...(mappedProps as any)} />;
    case P.Polygon:
      return <Polygon key={key} {...(mappedProps as any)} />;
    case P.Polyline:
      return <Polyline key={key} {...(mappedProps as any)} />;
    default:
      // For unsupported tags, wrap children in a G element
      if (childElements.length > 0) {
        return <G key={key}>{childElements}</G>;
      }
      return null;
  }
}

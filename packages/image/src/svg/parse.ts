import { SvgNode, Viewbox } from '../types';

declare const BROWSER: boolean;

const CrossPlatformDomParser: typeof DOMParser = (() => {
  if (typeof DOMParser !== 'undefined') {
    return DOMParser;
  }

  // In Node.js, use linkedom (only import when needed)
  // Use BROWSER constant to ensure this code is dead-code eliminated in browser build
  if (!BROWSER) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const linkedom = require('linkedom');
    const { DOMParser: LinkedomDOMParser } = linkedom.parseHTML('');
    return LinkedomDOMParser as unknown as typeof DOMParser;
  }

  throw new Error('DOMParser not available in this environment');
})();

// Map SVG tag names to react-pdf primitive types
const TAG_NAME_MAP: Record<string, string> = {
  svg: 'SVG',
  g: 'G',
  path: 'PATH',
  rect: 'RECT',
  circle: 'CIRCLE',
  ellipse: 'ELLIPSE',
  line: 'LINE',
  polyline: 'POLYLINE',
  polygon: 'POLYGON',
  text: 'TEXT',
  tspan: 'TSPAN',
  defs: 'DEFS',
  clippath: 'CLIP_PATH',
  lineargradient: 'LINEAR_GRADIENT',
  radialgradient: 'RADIAL_GRADIENT',
  stop: 'STOP',
  image: 'IMAGE',
};

// SVG elements that should be skipped (security or unsupported)
const SKIP_ELEMENTS = new Set([
  'script',
  'foreignobject',
  'filter',
  'mask',
  'pattern',
  'use',
  'symbol',
  'marker',
  'animate',
  'animatetransform',
  'animatemotion',
  'set',
]);

/**
 * Convert kebab-case or colon-separated names to camelCase
 * e.g., stroke-width -> strokeWidth, xlink:href -> xlinkHref
 */
function toCamelCase(str: string): string {
  return str.replace(/[-:]([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Parse viewBox string to Viewbox object
 */
function parseViewBox(viewBox: string | null): Viewbox | undefined {
  if (!viewBox) return undefined;

  const parts = viewBox
    .trim()
    .split(/[\s,]+/)
    .map(Number);

  if (parts.length !== 4 || parts.some(isNaN)) return undefined;

  return {
    minX: parts[0],
    minY: parts[1],
    maxX: parts[2],
    maxY: parts[3],
  };
}

// Unit to point conversion factors (PDF: 72pt/in, CSS: 96px/in)
const UNIT_TO_PT: Record<string, number> = {
  px: 72 / 96,
  pt: 1,
  in: 72,
  cm: 72 / 2.54,
  mm: 72 / 25.4,
};

/**
 * Parse numeric value from string (handles units like px, pt, etc.)
 */
function parseNumericValue(value: string | null): number | undefined {
  if (!value) return undefined;

  const match = value.match(/^(-?\d*\.?\d+)(px|pt|in|cm|mm)?$/);
  if (!match) return undefined;

  const num = parseFloat(match[1]);
  const unit = match[2]; // undefined for unitless values

  // Unitless values are user units (1:1 with pt in PDF)
  if (!unit) return num;

  return num * (UNIT_TO_PT[unit] ?? 1);
}

/**
 * Parse CSS style attribute string into individual properties
 * e.g., "stop-color:#ff6b6b;stop-opacity:1" -> { stopColor: "#ff6b6b", stopOpacity: "1" }
 */
function parseStyleAttribute(styleString: string): Record<string, string> {
  if (!styleString) return {};

  const result: Record<string, string> = {};

  for (const declaration of styleString.split(';')) {
    const colonIndex = declaration.indexOf(':');
    if (colonIndex === -1) continue;

    const property = declaration.slice(0, colonIndex).trim();
    const value = declaration.slice(colonIndex + 1).trim();

    if (property && value) {
      result[toCamelCase(property)] = value;
    }
  }

  return result;
}

/**
 * Convert DOM Element to SvgNode
 */
function elementToNode(element: Element): SvgNode | null {
  const tagName = element.tagName.toLowerCase();

  if (SKIP_ELEMENTS.has(tagName)) {
    console.warn(`Unsupported SVG element: <${tagName}> will be skipped`);
    return null;
  }

  const mappedType = TAG_NAME_MAP[tagName];

  if (!mappedType) return null;

  const props: Record<string, unknown> = {};

  for (const attr of Array.from(element.attributes)) {
    if (attr.name === 'style') {
      Object.assign(props, parseStyleAttribute(attr.value));
    } else {
      props[toCamelCase(attr.name)] = attr.value;
    }
  }

  const children: SvgNode[] = [];

  for (const child of Array.from(element.childNodes)) {
    if (child.nodeType === 1) {
      const childNode = elementToNode(child as Element);
      if (childNode) children.push(childNode);
    } else if (child.nodeType === 3) {
      const text = child.textContent?.trim();
      if (text && (mappedType === 'TEXT' || mappedType === 'TSPAN')) {
        children.push({
          type: 'TEXT_INSTANCE',
          props: {},
          value: text,
        } as SvgNode);
      }
    }
  }

  return { type: mappedType, props, children };
}

interface ParsedSvg {
  width: number;
  height: number;
  viewBox?: Viewbox;
  children: SvgNode[];
}

const EMPTY_RESULT: ParsedSvg = { width: 0, height: 0, children: [] };

/**
 * Parse SVG string into SvgNode tree using DOMParser
 */
function parseSvg(svgString: string): ParsedSvg {
  const parser = new CrossPlatformDomParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    console.warn('SVG parse error:', parseError.textContent);
    return EMPTY_RESULT;
  }

  const svgElement = doc.documentElement;

  if (svgElement.tagName.toLowerCase() !== 'svg') {
    console.warn('Invalid SVG: root element is not <svg>');
    return EMPTY_RESULT;
  }

  const viewBox = parseViewBox(svgElement.getAttribute('viewBox'));

  const width =
    parseNumericValue(svgElement.getAttribute('width')) || viewBox?.maxX || 0;
  const height =
    parseNumericValue(svgElement.getAttribute('height')) || viewBox?.maxY || 0;

  const children = Array.from(svgElement.children)
    .map(elementToNode)
    .filter((elm): elm is SvgNode => elm !== null);

  return { width, height, viewBox, children };
}

export default parseSvg;

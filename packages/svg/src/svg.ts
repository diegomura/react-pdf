import * as P from '@react-pdf/primitives';

import tokenize from './tokenize';
import { Token, SvgNode } from './types';

const CAMEL_CASE_REGEX = /[-:]([a-z])/g;

const TAG_NAME_MAP: Record<string, string> = {
  svg: P.Svg,
  g: P.G,
  path: P.Path,
  rect: P.Rect,
  circle: P.Circle,
  ellipse: P.Ellipse,
  line: P.Line,
  polyline: P.Polyline,
  polygon: P.Polygon,
  text: P.Text,
  tspan: P.Tspan,
  defs: P.Defs,
  clippath: P.ClipPath,
  lineargradient: P.LinearGradient,
  radialgradient: P.RadialGradient,
  stop: P.Stop,
  image: P.Image,
};

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

const TEXT_TYPES = new Set([P.Text, P.Tspan]);

function toCamelCase(str: string): string {
  return str.replace(CAMEL_CASE_REGEX, (_, letter) => letter.toUpperCase());
}

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

function convertAttributes(
  attributes: Record<string, string>,
): Record<string, unknown> {
  const props: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(attributes)) {
    if (name === 'style') {
      Object.assign(props, parseStyleAttribute(value));
    } else {
      props[toCamelCase(name)] = value;
    }
  }

  return props;
}

function buildTree(tokens: Token[]): SvgNode | null {
  const stack: SvgNode[] = [];
  const tagNames: string[] = [];
  let root: SvgNode | null = null;
  let skipDepth = 0;

  for (const token of tokens) {
    if (token.type === 'text') {
      if (skipDepth || stack.length === 0) continue;

      const parent = stack[stack.length - 1];
      if (!TEXT_TYPES.has(parent.type)) continue;

      const text = token.text.trim();
      if (text) {
        parent.children!.push({
          type: P.TextInstance,
          props: {},
          value: text,
        } as SvgNode);
      }
      continue;
    }

    if (token.type === 'close') {
      if (skipDepth) {
        skipDepth--;
      } else if (stack.length > 1) {
        if (tagNames[tagNames.length - 1] === token.tagName) {
          tagNames.pop();
          stack.pop();
        }
      }
      continue;
    }

    // open or self-close
    if (skipDepth) {
      if (token.type === 'open') skipDepth++;
      continue;
    }

    const lowerTag = token.tagName.toLowerCase();

    if (SKIP_ELEMENTS.has(lowerTag)) {
      console.warn(`Unsupported SVG element: <${lowerTag}> will be skipped`);
      if (token.type === 'open') skipDepth = 1;
      continue;
    }

    const mappedType = TAG_NAME_MAP[lowerTag];

    if (!mappedType) {
      if (token.type === 'open') skipDepth = 1;
      continue;
    }

    const node: SvgNode = {
      type: mappedType,
      props: convertAttributes(token.attributes),
      children: [],
    };

    if (stack.length > 0) {
      stack[stack.length - 1].children!.push(node);
    }

    if (!root) root = node;

    if (token.type === 'open') {
      tagNames.push(token.tagName);
      stack.push(node);
    }
  }

  return root;
}

const EMPTY_SVG: SvgNode = { type: P.Svg, props: {}, children: [] };

export function parseSvg(svgString: string): SvgNode {
  const tokens = tokenize(svgString);
  const root = buildTree(tokens);

  if (!root) {
    console.warn('SVG parse error: failed to parse XML');
    return EMPTY_SVG;
  }

  return root;
}

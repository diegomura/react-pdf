import * as P from '@react-pdf/primitives';

import { SvgNode, XmlElement } from './types';
import parseXml from './xml';

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

function elementToNode(element: XmlElement): SvgNode | null {
  const tagName = element.tagName.toLowerCase();

  if (SKIP_ELEMENTS.has(tagName)) {
    console.warn(`Unsupported SVG element: <${tagName}> will be skipped`);
    return null;
  }

  const mappedType = TAG_NAME_MAP[tagName];
  if (!mappedType) return null;

  const props: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(element.attributes)) {
    if (name === 'style') {
      Object.assign(props, parseStyleAttribute(value));
    } else {
      props[toCamelCase(name)] = value;
    }
  }

  const children: SvgNode[] = [];

  for (const child of element.children) {
    if ('tagName' in child) {
      const childNode = elementToNode(child);
      if (childNode) children.push(childNode);
    } else if (child.text) {
      const text = child.text.trim();

      if (text && (mappedType === P.Text || mappedType === P.Tspan)) {
        children.push({
          type: P.TextInstance,
          props: {},
          value: text,
        } as SvgNode);
      }
    }
  }

  return { type: mappedType, props, children };
}

const EMPTY_SVG: SvgNode = { type: P.Svg, props: {}, children: [] };

export function parseSvg(svgString: string): SvgNode {
  const parsed = parseXml(svgString);

  if (!parsed) {
    console.warn('SVG parse error: failed to parse XML');
    return EMPTY_SVG;
  }

  return elementToNode(parsed) ?? EMPTY_SVG;
}

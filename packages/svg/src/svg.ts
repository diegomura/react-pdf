import * as P from '@react-pdf/primitives';

import { SvgNode } from './types';

const ATTR_REGEX = /([a-zA-Z][a-zA-Z0-9_:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;

const CAMEL_CASE_REGEX = /[-:]([a-z])/g;

const XML_ENTITY_MAP: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
};

const ENTITY_REGEX = /&(amp|lt|gt|quot|apos);/g;

function decodeXmlEntities(str: string): string {
  return str.replace(ENTITY_REGEX, (_, key) => XML_ENTITY_MAP[key]);
}

function parseXmlAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  ATTR_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = ATTR_REGEX.exec(attrString)) !== null) {
    attrs[match[1]] = decodeXmlEntities(match[2] ?? match[3]);
  }

  return attrs;
}

interface XmlElement {
  tagName: string;
  attributes: Record<string, string>;
  children: (XmlElement | XmlText)[];
}

interface XmlText {
  text: string;
}

function parseXml(xmlString: string): XmlElement | null {
  const str = xmlString.replace(
    /<\?xml[^?]*\?>|<!DOCTYPE[^>]*>|<!--[\s\S]*?-->/gi,
    '',
  );

  const stack: XmlElement[] = [];
  let root: XmlElement | null = null;
  let pos = 0;

  while (pos < str.length) {
    const nextTag = str.indexOf('<', pos);
    if (nextTag === -1) break;

    if (nextTag > pos) {
      const raw = str.slice(pos, nextTag);
      if (/\S/.test(raw) && stack.length > 0) {
        stack[stack.length - 1].children.push({
          text: decodeXmlEntities(raw),
        });
      }
    }

    if (str.startsWith('<![CDATA[', nextTag)) {
      const cdataEnd = str.indexOf(']]>', nextTag + 9);
      if (cdataEnd === -1) break;
      const text = str.slice(nextTag + 9, cdataEnd);
      if (text && stack.length > 0) {
        stack[stack.length - 1].children.push({ text });
      }
      pos = cdataEnd + 3;
      continue;
    }

    const tagEnd = str.indexOf('>', nextTag);
    if (tagEnd === -1) break;

    const tagContent = str.slice(nextTag + 1, tagEnd);

    if (tagContent.startsWith('/')) {
      const closeTagName = tagContent.slice(1).trim();
      if (stack.length > 1) {
        const top = stack[stack.length - 1];
        if (top.tagName === closeTagName) {
          stack.pop();
        }
      }
      pos = tagEnd + 1;
      continue;
    }

    const isSelfClosing = tagContent.endsWith('/');
    const rawTag = isSelfClosing ? tagContent.slice(0, -1) : tagContent;

    const spaceIndex = rawTag.search(/[\s/]/);
    const tagName =
      spaceIndex === -1 ? rawTag.trim() : rawTag.slice(0, spaceIndex).trim();
    const attrString = spaceIndex === -1 ? '' : rawTag.slice(spaceIndex);

    const element: XmlElement = {
      tagName,
      attributes: parseXmlAttributes(attrString),
      children: [],
    };

    if (stack.length > 0) {
      stack[stack.length - 1].children.push(element);
    }

    if (!root) root = element;

    if (!isSelfClosing) {
      stack.push(element);
    }

    pos = tagEnd + 1;
  }

  return root;
}

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

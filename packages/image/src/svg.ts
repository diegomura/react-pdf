import { SvgImage, SvgNode, Viewbox } from './types';

declare const BROWSER: boolean;

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

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

interface MiniAttr {
  readonly name: string;
  readonly value: string;
}

interface MiniNode {
  readonly nodeType: number;
  readonly textContent: string | null;
}

interface MiniElement extends MiniNode {
  readonly tagName: string;
  readonly attributes: MiniAttr[];
  readonly children: MiniElement[];
  readonly childNodes: MiniNode[];
  getAttribute(name: string): string | null;
}

interface MiniDocument {
  readonly documentElement: MiniElement;
  querySelector(selector: string): MiniElement | null;
}

function wrapXmlElement(xml: XmlElement): MiniElement {
  const attrs = Object.entries(xml.attributes).map(([name, value]) => ({
    name,
    value,
  }));

  const childNodes: MiniNode[] = xml.children.map((child) =>
    'tagName' in child
      ? wrapXmlElement(child)
      : { nodeType: TEXT_NODE, textContent: child.text },
  );

  const children = childNodes.filter(
    (c): c is MiniElement => c.nodeType === ELEMENT_NODE,
  );

  return {
    nodeType: ELEMENT_NODE,
    tagName: xml.tagName,
    attributes: attrs,
    children,
    childNodes,
    textContent: null,
    getAttribute(name: string) {
      return xml.attributes[name] ?? null;
    },
  };
}

const EMPTY_XML: XmlElement = Object.freeze({
  tagName: '',
  attributes: Object.freeze({}),
  children: Object.freeze([]) as unknown as XmlElement['children'],
});

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

function createNodeDOMParser() {
  return {
    parseFromString(str: string): MiniDocument {
      const parsed = parseXml(str);
      if (!parsed) {
        console.warn('SVG parse error: failed to parse XML');
      }
      const root = parsed ?? EMPTY_XML;
      return {
        documentElement: wrapXmlElement(root),
        querySelector: () => null,
      };
    },
  };
}

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

const UNIT_TO_PT: Record<string, number> = {
  px: 72 / 96,
  pt: 1,
  in: 72,
  cm: 72 / 2.54,
  mm: 72 / 25.4,
};

function parseNumericValue(value: string | null): number | undefined {
  if (!value) return undefined;

  const match = value.match(/^(-?\d*\.?\d+)(px|pt|in|cm|mm)?$/);
  if (!match) return undefined;

  const num = parseFloat(match[1]);
  const unit = match[2];

  if (!unit) return num;

  return num * (UNIT_TO_PT[unit] ?? 1);
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

interface ParsedSvg {
  width: number;
  height: number;
  viewBox?: Viewbox;
  children: SvgNode[];
}

function emptyResult(): ParsedSvg {
  return { width: 0, height: 0, children: [] };
}

type AnyElement = Element | MiniElement;
type AnyDocument = Document | MiniDocument;

function elementToNode(element: AnyElement): SvgNode | null {
  const tagName = element.tagName.toLowerCase();

  if (SKIP_ELEMENTS.has(tagName)) {
    console.warn(`Unsupported SVG element: <${tagName}> will be skipped`);
    return null;
  }

  const mappedType = TAG_NAME_MAP[tagName];
  if (!mappedType) return null;

  const props: Record<string, unknown> = {};
  const attrs = element.attributes;

  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if (attr.name === 'style') {
      Object.assign(props, parseStyleAttribute(attr.value));
    } else {
      props[toCamelCase(attr.name)] = attr.value;
    }
  }

  const children: SvgNode[] = [];

  for (const child of Array.from(element.childNodes)) {
    if (child.nodeType === ELEMENT_NODE) {
      const childNode = elementToNode(child as AnyElement);
      if (childNode) children.push(childNode);
    } else if (child.nodeType === TEXT_NODE) {
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

function parseSvg(svgString: string): ParsedSvg {
  const parser: { parseFromString(s: string, t?: string): AnyDocument } =
    BROWSER ? new DOMParser() : createNodeDOMParser();

  const doc = parser.parseFromString(svgString, 'image/svg+xml');

  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    console.warn('SVG parse error:', parseError.textContent);
    return emptyResult();
  }

  const svgElement = doc.documentElement;

  if (svgElement.tagName.toLowerCase() !== 'svg') {
    console.warn('Invalid SVG: root element is not <svg>');
    return emptyResult();
  }

  const viewBox = parseViewBox(svgElement.getAttribute('viewBox'));
  const width =
    parseNumericValue(svgElement.getAttribute('width')) ?? viewBox?.maxX ?? 0;
  const height =
    parseNumericValue(svgElement.getAttribute('height')) ?? viewBox?.maxY ?? 0;

  const elChildren = svgElement.children;
  const children: SvgNode[] = [];

  for (let i = 0; i < elChildren.length; i++) {
    const node = elementToNode(elChildren[i]);
    if (node) children.push(node);
  }

  return { width, height, viewBox, children };
}

class SVG implements SvgImage {
  data: string;
  width: number;
  height: number;
  format: 'svg';
  viewBox?: Viewbox;
  children: SvgImage['children'];

  constructor(data: Buffer) {
    const svgString = data.toString('utf-8');
    const parsed = parseSvg(svgString);

    this.data = svgString;
    this.format = 'svg';
    this.width = parsed.width;
    this.height = parsed.height;
    this.viewBox = parsed.viewBox;
    this.children = parsed.children;
  }

  static isValid(data: unknown): boolean {
    if (!Buffer.isBuffer(data)) return false;

    const str = data.toString('utf-8').trimStart();
    return str.startsWith('<?xml') || str.startsWith('<svg');
  }
}

export default SVG;

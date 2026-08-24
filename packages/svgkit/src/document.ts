import {
  SVGElementNode,
  appendChild,
  createElement,
  fmt,
  setAttribute,
} from './element';
import serialize from './serialize';

export type SVGDocumentOptions = {
  /** Prepended to generated ids so multiple documents can coexist in one DOM */
  idPrefix?: string;
};

type Style = {
  fillColor: string;
  strokeColor: string;
  fillOpacity: number;
  strokeOpacity: number;
  opacity: number;
  lineWidth: number;
  lineCap: string | null;
  lineJoin: string | null;
  miterLimit: number | null;
  dashArray: string | null;
  dashPhase: number | null;
};

const defaultStyle = (): Style => ({
  fillColor: 'black',
  strokeColor: 'black',
  fillOpacity: 1,
  strokeOpacity: 1,
  opacity: 1,
  lineWidth: 1,
  lineCap: null,
  lineJoin: null,
  miterLimit: null,
  dashArray: null,
  dashPhase: null,
});

type PageInfo = {
  width: number;
  height: number;
  annotations: unknown[];
  fonts: Record<string, unknown>;
};

// pdfkit exposes a document outline API; render never populates it for SVG
// output but may call it, so it needs to be a harmless no-op chain.
const makeOutline = (): { addItem: () => unknown } => {
  const outline = {
    addItem: () => outline,
  };
  return outline;
};

class SVGDocument {
  pages: string[] = [];
  page: PageInfo = { width: 0, height: 0, annotations: [], fonts: {} };
  info: Record<string, unknown> = {};
  outline = makeOutline();
  // render checks ctx._root.data.AcroForm before drawing form fields
  _root = { data: {} as Record<string, unknown> };
  _imageRegistry: Record<string, unknown> = {};
  _font: unknown = null;
  _fontSize = 12;

  protected idPrefix: string;
  protected idCounter = 0;
  protected roots: SVGElementNode[] = [];
  protected container!: SVGElementNode;
  protected defs!: SVGElementNode;
  protected style: Style = defaultStyle();
  protected stack: { container: SVGElementNode; style: Style }[] = [];
  protected currentPath = '';

  constructor(options: SVGDocumentOptions = {}) {
    this.idPrefix = options.idPrefix ?? '';
  }

  addPage(options: { size?: number[] } = {}) {
    const [width, height] = options.size ?? [612, 792];

    const svg = createElement('svg');
    setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    setAttribute(svg, 'viewBox', `0 0 ${fmt(width)} ${fmt(height)}`);
    setAttribute(svg, 'width', fmt(width));
    setAttribute(svg, 'height', fmt(height));

    this.defs = createElement('defs');
    appendChild(svg, this.defs);

    this.roots.push(svg);
    this.container = svg;
    this.stack = [];
    this.style = defaultStyle();
    this.currentPath = '';
    this.page = { width, height, annotations: [], fonts: {} };

    return this;
  }

  end() {
    this.pages = this.roots.map(serialize);
    return this;
  }

  save() {
    this.stack.push({ container: this.container, style: { ...this.style } });
    return this;
  }

  restore() {
    const entry = this.stack.pop();
    if (entry) {
      this.container = entry.container;
      this.style = entry.style;
    }
    return this;
  }

  protected openGroup(attributes: Record<string, string | number>) {
    const group = createElement('g');
    Object.entries(attributes).forEach(([name, value]) =>
      setAttribute(group, name, value),
    );
    appendChild(this.container, group);
    this.container = group;
    return this;
  }

  protected nextId(kind: string) {
    this.idCounter += 1;
    return `${this.idPrefix}${kind}-${this.idCounter}`;
  }

  transform(a: number, b: number, c: number, d: number, e: number, f: number) {
    if (a === 1 && b === 0 && c === 0 && d === 1 && e === 0 && f === 0) {
      return this;
    }
    return this.openGroup({
      transform: `matrix(${fmt(a)} ${fmt(b)} ${fmt(c)} ${fmt(d)} ${fmt(e)} ${fmt(f)})`,
    });
  }

  translate(x: number, y: number) {
    if (x === 0 && y === 0) return this;
    return this.openGroup({ transform: `translate(${fmt(x)} ${fmt(y)})` });
  }

  rotate(angle: number, options: { origin?: number[] } = {}) {
    if (angle === 0) return this;
    const origin = options.origin
      ? ` ${fmt(options.origin[0])} ${fmt(options.origin[1])}`
      : '';
    return this.openGroup({ transform: `rotate(${fmt(angle)}${origin})` });
  }

  scale(
    xFactor: number,
    yFactorOrOptions?: number | { origin?: number[] },
    options: { origin?: number[] } = {},
  ) {
    const hasYFactor = typeof yFactorOrOptions === 'number';
    const yFactor = hasYFactor ? yFactorOrOptions : xFactor;
    const opts = hasYFactor
      ? options
      : (yFactorOrOptions as { origin?: number[] } | undefined) ?? {};

    if (xFactor === 1 && yFactor === 1) return this;

    const scale = `scale(${fmt(xFactor)} ${fmt(yFactor)})`;
    const transform = opts.origin
      ? `translate(${fmt(opts.origin[0])} ${fmt(opts.origin[1])}) ${scale} translate(${fmt(-opts.origin[0])} ${fmt(-opts.origin[1])})`
      : scale;

    return this.openGroup({ transform });
  }
}

export default SVGDocument;

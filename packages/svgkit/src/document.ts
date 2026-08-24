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

  moveTo(x: number, y: number) {
    this.currentPath += `M${fmt(x)} ${fmt(y)}`;
    return this;
  }

  lineTo(x: number, y: number) {
    this.currentPath += `L${fmt(x)} ${fmt(y)}`;
    return this;
  }

  bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number,
  ) {
    this.currentPath += `C${fmt(cp1x)} ${fmt(cp1y)} ${fmt(cp2x)} ${fmt(cp2y)} ${fmt(x)} ${fmt(y)}`;
    return this;
  }

  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
    this.currentPath += `Q${fmt(cpx)} ${fmt(cpy)} ${fmt(x)} ${fmt(y)}`;
    return this;
  }

  closePath() {
    this.currentPath += 'Z';
    return this;
  }

  rect(x: number, y: number, width: number, height: number) {
    this.currentPath += `M${fmt(x)} ${fmt(y)}H${fmt(x + width)}V${fmt(y + height)}H${fmt(x)}Z`;
    return this;
  }

  roundedRect(x: number, y: number, width: number, height: number, r = 0) {
    const radius = Math.min(r, width / 2, height / 2);
    this.currentPath +=
      `M${fmt(x + radius)} ${fmt(y)}` +
      `H${fmt(x + width - radius)}` +
      `A${fmt(radius)} ${fmt(radius)} 0 0 1 ${fmt(x + width)} ${fmt(y + radius)}` +
      `V${fmt(y + height - radius)}` +
      `A${fmt(radius)} ${fmt(radius)} 0 0 1 ${fmt(x + width - radius)} ${fmt(y + height)}` +
      `H${fmt(x + radius)}` +
      `A${fmt(radius)} ${fmt(radius)} 0 0 1 ${fmt(x)} ${fmt(y + height - radius)}` +
      `V${fmt(y + radius)}` +
      `A${fmt(radius)} ${fmt(radius)} 0 0 1 ${fmt(x + radius)} ${fmt(y)}Z`;
    return this;
  }

  ellipse(x: number, y: number, rx: number, ry = rx) {
    this.currentPath +=
      `M${fmt(x - rx)} ${fmt(y)}` +
      `A${fmt(rx)} ${fmt(ry)} 0 1 0 ${fmt(x + rx)} ${fmt(y)}` +
      `A${fmt(rx)} ${fmt(ry)} 0 1 0 ${fmt(x - rx)} ${fmt(y)}Z`;
    return this;
  }

  circle(x: number, y: number, radius: number) {
    return this.ellipse(x, y, radius);
  }

  polygon(...points: number[][]) {
    points.forEach(([x, y], index) => {
      this.currentPath += `${index === 0 ? 'M' : 'L'}${fmt(x)} ${fmt(y)}`;
    });
    this.currentPath += 'Z';
    return this;
  }

  path(d: string) {
    this.currentPath += d;
    return this;
  }

  fillColor(color: string) {
    if (color != null) this.style.fillColor = String(color);
    return this;
  }

  strokeColor(color: string) {
    if (color != null) this.style.strokeColor = String(color);
    return this;
  }

  fillOpacity(opacity: number) {
    this.style.fillOpacity = opacity;
    return this;
  }

  strokeOpacity(opacity: number) {
    this.style.strokeOpacity = opacity;
    return this;
  }

  opacity(opacity: number) {
    this.style.opacity = opacity;
    return this;
  }

  lineWidth(width: number) {
    this.style.lineWidth = width;
    return this;
  }

  lineCap(cap: string) {
    this.style.lineCap = cap;
    return this;
  }

  lineJoin(join: string) {
    this.style.lineJoin = join;
    return this;
  }

  miterLimit(limit: number) {
    this.style.miterLimit = limit;
    return this;
  }

  dash(
    length: number | number[],
    options: { space?: number; phase?: number } = {},
  ) {
    this.style.dashArray = Array.isArray(length)
      ? length.map(fmt).join(' ')
      : `${fmt(length)} ${fmt(options.space ?? length)}`;
    this.style.dashPhase = options.phase ?? null;
    return this;
  }

  undash() {
    this.style.dashArray = null;
    this.style.dashPhase = null;
    return this;
  }

  protected takePath() {
    const d = this.currentPath;
    this.currentPath = '';
    return d;
  }

  protected applyStrokeStyle(el: SVGElementNode) {
    setAttribute(el, 'stroke', this.style.strokeColor);
    const strokeOpacity = this.style.strokeOpacity * this.style.opacity;
    if (strokeOpacity !== 1)
      setAttribute(el, 'stroke-opacity', fmt(strokeOpacity));
    setAttribute(el, 'stroke-width', fmt(this.style.lineWidth));
    if (this.style.lineCap)
      setAttribute(el, 'stroke-linecap', this.style.lineCap);
    if (this.style.lineJoin)
      setAttribute(el, 'stroke-linejoin', this.style.lineJoin);
    if (this.style.miterLimit != null)
      setAttribute(el, 'stroke-miterlimit', fmt(this.style.miterLimit));
    if (this.style.dashArray)
      setAttribute(el, 'stroke-dasharray', this.style.dashArray);
    if (this.style.dashPhase)
      setAttribute(el, 'stroke-dashoffset', fmt(this.style.dashPhase));
  }

  protected applyFillStyle(el: SVGElementNode) {
    setAttribute(el, 'fill', this.resolvePaint(this.style.fillColor));
    const fillOpacity = this.style.fillOpacity * this.style.opacity;
    if (fillOpacity !== 1) setAttribute(el, 'fill-opacity', fmt(fillOpacity));
  }

  // Extended in Task 5 to resolve gradients into defs
  protected resolvePaint(paint: string): string {
    return String(paint);
  }

  protected isWindingRule(value: unknown): value is string {
    return (
      value === 'even-odd' ||
      value === 'evenodd' ||
      value === 'non-zero' ||
      value === 'nonzero'
    );
  }

  protected normalizeRule(rule: string) {
    return rule.replace('-', '');
  }

  protected flushPath(
    mode: 'fill' | 'stroke' | 'fillAndStroke',
    arg?: unknown,
  ) {
    let rule: string | null = null;

    if (this.isWindingRule(arg)) rule = this.normalizeRule(arg);
    else if (arg != null && mode !== 'stroke') this.fillColor(arg as string);
    else if (arg != null) this.strokeColor(arg as string);

    const d = this.takePath();
    if (!d) return this;

    const el = createElement('path');
    setAttribute(el, 'd', d);

    if (mode === 'stroke') setAttribute(el, 'fill', 'none');
    else {
      this.applyFillStyle(el);
      if (rule) setAttribute(el, 'fill-rule', rule);
    }
    if (mode !== 'fill') this.applyStrokeStyle(el);

    appendChild(this.container, el);
    return this;
  }

  fill(arg?: unknown) {
    return this.flushPath('fill', arg);
  }

  stroke(arg?: unknown) {
    return this.flushPath('stroke', arg);
  }

  fillAndStroke(arg?: unknown) {
    return this.flushPath('fillAndStroke', arg);
  }

  clip(rule?: string) {
    const d = this.takePath();
    const id = this.nextId('clip');
    const clipPath = createElement('clipPath');
    setAttribute(clipPath, 'id', id);
    const pathEl = createElement('path');
    setAttribute(pathEl, 'd', d);
    if (rule && this.isWindingRule(rule))
      setAttribute(pathEl, 'clip-rule', this.normalizeRule(rule));
    appendChild(clipPath, pathEl);
    appendChild(this.defs, clipPath);
    return this.openGroup({ 'clip-path': `url(#${id})` });
  }
}

export default SVGDocument;

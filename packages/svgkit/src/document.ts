import {
  SVGElementNode,
  appendChild,
  createElement,
  fmt,
  setAttribute,
} from './element';
import SVGGradient from './gradient';
import { imageDimensions, toHref } from './image';
import serialize from './serialize';
import {
  SVGGlyph,
  SVGGlyphPosition,
  resolveFontFace,
  unitsPerEmOf,
} from './text';

export type SVGDocumentOptions = {
  /** Prepended to generated ids so multiple documents can coexist in one DOM */
  idPrefix?: string;
  /** pdfkit-style document info (Title, Author, Subject, Keywords, ...) */
  info?: Record<string, unknown>;
};

type Style = {
  fillColor: string | SVGGradient;
  strokeColor: string | SVGGradient;
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

type EmbeddedImage = {
  width: number;
  height: number;
  src: unknown;
  obj: unknown;
  embed: (ctx: SVGDocument) => void;
};

type ImageOptions = {
  width?: number;
  height?: number;
  fit?: number[];
  align?: string;
  valign?: string;
};

type OutlineItemOptions = {
  pageNumber?: number;
  expanded?: boolean;
  top?: number;
  left?: number;
  zoom?: number;
  fit?: boolean;
};

type OutlineEntry = {
  title: string;
  pageNumber: number;
  expanded: boolean;
  href: string;
  children: OutlineEntry[];
};

type OutlineHandle = {
  addItem: (title: string, options?: OutlineItemOptions) => OutlineHandle;
};

class SVGDocument {
  pages: string[] = [];
  page: PageInfo = { width: 0, height: 0, annotations: [], fonts: {} };
  info: Record<string, unknown> = {};
  outline: OutlineHandle = {
    addItem: (title, options = {}) =>
      this.addOutlineItem(this.outlineRoot, title, options),
  };
  // render checks ctx._root.data.AcroForm before drawing form fields
  _root = { data: {} as Record<string, unknown> };
  _imageRegistry: Record<string, unknown> = {};
  // parseFormOptions reads/writes ctx._acroform.fonts.ZaDi unconditionally for Checkbox nodes
  _acroform: { fonts: Record<string, unknown> } = { fonts: {} };
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
  protected outlineRoot: OutlineEntry[] = [];

  constructor(options: SVGDocumentOptions = {}) {
    this.idPrefix = options.idPrefix ?? '';
    if (options.info) Object.assign(this.info, options.info);
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
    this.roots.forEach((root, pageNumber) =>
      this.prependPageMetadata(root, pageNumber),
    );
    this.pages = this.roots.map(serialize);
    return this;
  }

  protected addOutlineItem(
    siblings: OutlineEntry[],
    title: string,
    options: OutlineItemOptions,
  ): OutlineHandle {
    const href = this.nextId('bookmark');
    const entry: OutlineEntry = {
      title,
      pageNumber: options.pageNumber ?? 0,
      expanded: !!options.expanded,
      href,
      children: [],
    };
    siblings.push(entry);
    this.placeBookmarkMarker(
      href,
      entry.pageNumber,
      options.left ?? 0,
      options.top ?? 0,
    );

    return {
      addItem: (childTitle, childOptions = {}) =>
        this.addOutlineItem(entry.children, childTitle, childOptions),
    };
  }

  protected placeBookmarkMarker(
    id: string,
    pageNumber: number,
    left: number,
    top: number,
  ) {
    const root = this.roots[pageNumber];
    if (!root) return;

    const marker = createElement('g');
    setAttribute(marker, 'id', id);
    if (left !== 0 || top !== 0)
      setAttribute(marker, 'transform', `translate(${fmt(left)} ${fmt(top)})`);
    appendChild(root, marker);
  }

  protected buildOutlineItemElement(entry: OutlineEntry): SVGElementNode {
    const item = createElement('rpdf:item');
    setAttribute(item, 'title', entry.title);
    setAttribute(item, 'page', entry.pageNumber);
    setAttribute(item, 'href', `#${entry.href}`);
    if (entry.expanded) setAttribute(item, 'expanded', 'true');
    entry.children.forEach((child) =>
      appendChild(item, this.buildOutlineItemElement(child)),
    );
    return item;
  }

  protected buildOutlineMetadata(): SVGElementNode | null {
    if (this.outlineRoot.length === 0) return null;

    const outline = createElement('rpdf:outline');
    setAttribute(outline, 'xmlns:rpdf', 'https://react-pdf.org/ns');
    this.outlineRoot.forEach((entry) =>
      appendChild(outline, this.buildOutlineItemElement(entry)),
    );

    const metadata = createElement('metadata');
    appendChild(metadata, outline);
    return metadata;
  }

  protected formatInfoDate(value: unknown): string | null {
    if (value instanceof Date) return value.toISOString();
    if (typeof value === 'string' && value) return value;
    return null;
  }

  protected buildDublinCoreMetadata(): SVGElementNode | null {
    const terms: [string, string | null][] = [
      ['dc:title', this.infoString('Title')],
      ['dc:creator', this.infoString('Author')],
      ['dc:subject', this.infoString('Keywords')],
      ['dc:description', this.infoString('Subject')],
      ['dc:date', this.formatInfoDate(this.info.CreationDate)],
    ];
    const present = terms.filter(
      (entry): entry is [string, string] => entry[1] != null,
    );
    if (present.length === 0) return null;

    const description = createElement('rdf:Description');
    present.forEach(([name, value]) => {
      const el = createElement(name);
      appendChild(el, value);
      appendChild(description, el);
    });

    const rdf = createElement('rdf:RDF');
    setAttribute(
      rdf,
      'xmlns:rdf',
      'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    );
    setAttribute(rdf, 'xmlns:dc', 'http://purl.org/dc/elements/1.1/');
    appendChild(rdf, description);

    const metadata = createElement('metadata');
    appendChild(metadata, rdf);
    return metadata;
  }

  protected infoString(key: string): string | null {
    const value = this.info[key];
    return typeof value === 'string' && value ? value : null;
  }

  protected prependPageMetadata(root: SVGElementNode, pageNumber: number) {
    const prefix: SVGElementNode[] = [];

    const title = this.infoString('Title');
    if (title) {
      const el = createElement('title');
      appendChild(el, title);
      prefix.push(el);
    }

    const subject = this.infoString('Subject');
    if (subject) {
      const el = createElement('desc');
      appendChild(el, subject);
      prefix.push(el);
    }

    const dcMetadata = this.buildDublinCoreMetadata();
    if (dcMetadata) prefix.push(dcMetadata);

    if (pageNumber === 0) {
      const outlineMetadata = this.buildOutlineMetadata();
      if (outlineMetadata) prefix.push(outlineMetadata);
    }

    if (prefix.length > 0) root.children.unshift(...prefix);
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

  linearGradient(x1: number, y1: number, x2: number, y2: number) {
    return new SVGGradient(this.nextId('grad'), 'linearGradient', {
      x1,
      y1,
      x2,
      y2,
    });
  }

  radialGradient(
    fx: number,
    fy: number,
    _r1: number,
    cx: number,
    cy: number,
    r: number,
  ) {
    return new SVGGradient(this.nextId('grad'), 'radialGradient', {
      fx,
      fy,
      cx,
      cy,
      r,
    });
  }

  // `obj: null` + a no-op `embed` satisfy drawImage.ts's pdfkit embedding
  // protocol (it calls `.embed(ctx)` when `.obj` is falsy) without doing any
  // work here — the actual SVG <image> element is only built in `image()`.
  openImage(src: unknown): EmbeddedImage {
    const { width = 0, height = 0 } = imageDimensions(src) ?? {};
    return { width, height, src, obj: null, embed: () => {} };
  }

  image(src: unknown, x: number, y: number, options: ImageOptions = {}) {
    const source = this.resolveImageSource(src);
    const intrinsic =
      source.width && source.height
        ? { width: source.width, height: source.height }
        : imageDimensions(source.data);

    let width = options.width ?? intrinsic?.width ?? 0;
    let height = options.height ?? intrinsic?.height ?? 0;
    let posX = x;
    let posY = y;

    if (
      options.fit &&
      intrinsic &&
      intrinsic.width > 0 &&
      intrinsic.height > 0
    ) {
      const scale = Math.min(
        options.fit[0] / intrinsic.width,
        options.fit[1] / intrinsic.height,
      );
      width = intrinsic.width * scale;
      height = intrinsic.height * scale;
      if (options.align === 'center') posX += (options.fit[0] - width) / 2;
      else if (options.align === 'right') posX += options.fit[0] - width;
      if (options.valign === 'center') posY += (options.fit[1] - height) / 2;
      else if (options.valign === 'bottom') posY += options.fit[1] - height;
    }

    const el = createElement('image');
    setAttribute(el, 'x', fmt(posX));
    setAttribute(el, 'y', fmt(posY));
    setAttribute(el, 'width', fmt(width));
    setAttribute(el, 'height', fmt(height));
    setAttribute(el, 'preserveAspectRatio', 'none');
    setAttribute(el, 'href', toHref(source.data));
    const imageOpacity = this.style.fillOpacity * this.style.opacity;
    if (imageOpacity !== 1) setAttribute(el, 'opacity', fmt(imageOpacity));
    appendChild(this.container, el);
    return this;
  }

  protected resolveImageSource(src: unknown): {
    data: unknown;
    width: number;
    height: number;
  } {
    if (src != null && typeof src === 'object') {
      if ('src' in src) {
        const wrapped = src as EmbeddedImage;
        return {
          data: wrapped.src,
          width: wrapped.width,
          height: wrapped.height,
        };
      }
      if ('data' in src) {
        const image = src as { data: unknown; width?: number; height?: number };
        return {
          data: image.data,
          width: image.width ?? 0,
          height: image.height ?? 0,
        };
      }
    }
    return { data: src, width: 0, height: 0 };
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

  fillColor(color: string | SVGGradient) {
    if (color != null)
      this.style.fillColor =
        color instanceof SVGGradient ? color : String(color);
    return this;
  }

  strokeColor(color: string | SVGGradient) {
    if (color != null)
      this.style.strokeColor =
        color instanceof SVGGradient ? color : String(color);
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
    setAttribute(el, 'stroke', this.resolvePaint(this.style.strokeColor));
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

  protected resolvePaint(paint: string | SVGGradient): string {
    if (paint instanceof SVGGradient) {
      if (!paint.emitted) {
        appendChild(this.defs, paint.toElement());
        paint.emitted = true;
      }
      return `url(#${paint.id})`;
    }
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
    else if (arg != null && mode === 'fillAndStroke') {
      this.fillColor(arg as string | SVGGradient);
      this.strokeColor(arg as string | SVGGradient);
    } else if (arg != null && mode !== 'stroke')
      this.fillColor(arg as string | SVGGradient);
    else if (arg != null) this.strokeColor(arg as string | SVGGradient);

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

  font(src: unknown, size?: number) {
    this._font = src;
    if (typeof size === 'number') this._fontSize = size;
    return this;
  }

  fontSize(size: number) {
    this._fontSize = size;
    return this;
  }

  protected applyTextFont(el: SVGElementNode) {
    const face = resolveFontFace(this._font);
    setAttribute(el, 'font-family', face.family);
    setAttribute(el, 'font-size', fmt(this._fontSize));
    if (face.bold) setAttribute(el, 'font-weight', 'bold');
    if (face.italic) setAttribute(el, 'font-style', 'italic');
  }

  glyphs(
    glyphs: SVGGlyph[],
    positions: SVGGlyphPosition[],
    x: number,
    y: number,
  ) {
    if (glyphs.length === 0) return this;

    const fontSize = this._fontSize;
    // Matches the offset scaling renderGlyphs.ts applies on the PDF side
    // (a quirk of that path, kept here so SVG output lines up with PDF output).
    const offsetScale = fontSize / 1000;

    if (!glyphs[0].path)
      return this.glyphsAsText(glyphs, positions, x, y, offsetScale);

    const scale = fontSize / unitsPerEmOf(this._font);
    const group = createElement('g');
    this.applyFillStyle(group);

    let pen = x;
    for (let i = 0; i < glyphs.length; i += 1) {
      const pos = positions[i];
      const d = glyphs[i].path?.toSVG();
      if (d) {
        const gx = pen + (pos.xOffset || 0) * offsetScale;
        const gy = y - (pos.yOffset || 0) * offsetScale;
        const el = createElement('path');
        setAttribute(el, 'd', d);
        setAttribute(
          el,
          'transform',
          `translate(${fmt(gx)} ${fmt(gy)}) scale(${fmt(scale)} ${fmt(-scale)})`,
        );
        appendChild(group, el);
      }
      pen += pos.xAdvance || 0;
    }

    appendChild(this.container, group);
    // Outline paths are unselectable vector art, so a transparent <text> run
    // rides on top (pdf.js-style) purely for selection/search/a11y.
    this.appendSelectableOverlay(glyphs, positions, x, y, offsetScale);
    return this;
  }

  protected buildGlyphRun(
    glyphs: SVGGlyph[],
    positions: SVGGlyphPosition[],
    x: number,
    offsetScale: number,
  ) {
    const xs: (string | number)[] = [];
    let text = '';
    let pen = x;

    for (let i = 0; i < glyphs.length; i += 1) {
      const codePoints = glyphs[i].codePoints ?? [];
      // Multi-codepoint glyphs share one x; only matters past the standard 14.
      text += String.fromCodePoint(...codePoints);
      const gx = pen + (positions[i].xOffset || 0) * offsetScale;
      codePoints.forEach(() => xs.push(fmt(gx)));
      pen += positions[i].xAdvance || 0;
    }

    return { xs, text };
  }

  protected glyphsAsText(
    glyphs: SVGGlyph[],
    positions: SVGGlyphPosition[],
    x: number,
    y: number,
    offsetScale: number,
  ) {
    const { xs, text } = this.buildGlyphRun(glyphs, positions, x, offsetScale);

    const el = createElement('text');
    setAttribute(el, 'x', xs.join(' '));
    setAttribute(el, 'y', fmt(y));
    this.applyTextFont(el);
    this.applyFillStyle(el);
    setAttribute(el, 'xml:space', 'preserve');
    appendChild(el, text);
    appendChild(this.container, el);
    return this;
  }

  // fill-opacity="0" (not fill="none"/visibility/display) keeps the run
  // hit-testable and selectable while contributing zero visible pixels.
  protected appendSelectableOverlay(
    glyphs: SVGGlyph[],
    positions: SVGGlyphPosition[],
    x: number,
    y: number,
    offsetScale: number,
  ) {
    const { xs, text } = this.buildGlyphRun(glyphs, positions, x, offsetScale);

    const el = createElement('text');
    setAttribute(el, 'x', xs.join(' '));
    setAttribute(el, 'y', fmt(y));
    this.applyTextFont(el);
    setAttribute(el, 'fill-opacity', 0);
    setAttribute(el, 'xml:space', 'preserve');
    appendChild(el, text);
    appendChild(this.container, el);
  }

  text(value: string, x = 0, y = 0) {
    const el = createElement('text');
    setAttribute(el, 'x', fmt(x));
    setAttribute(el, 'y', fmt(y));
    this.applyTextFont(el);
    this.applyFillStyle(el);
    setAttribute(el, 'xml:space', 'preserve');
    appendChild(el, value);
    appendChild(this.container, el);
    return this;
  }

  // Inert: paints nothing and never intercepts pointer events or text
  // selection. Hosts read its geometry and data-rpdf-link to implement their
  // own link behaviour (see README).
  protected linkAnnotation(
    x: number,
    y: number,
    width: number,
    height: number,
    href: string,
  ) {
    const rect = createElement('rect');
    setAttribute(rect, 'x', fmt(x));
    setAttribute(rect, 'y', fmt(y));
    setAttribute(rect, 'width', fmt(width));
    setAttribute(rect, 'height', fmt(height));
    setAttribute(rect, 'fill', 'none');
    setAttribute(rect, 'pointer-events', 'none');
    setAttribute(rect, 'data-rpdf-link', href);
    return rect;
  }

  link(x: number, y: number, width: number, height: number, url: string) {
    appendChild(this.container, this.linkAnnotation(x, y, width, height, url));
    return this;
  }

  goTo(x: number, y: number, width: number, height: number, name: string) {
    appendChild(
      this.container,
      this.linkAnnotation(x, y, width, height, `#${this.idPrefix}dest-${name}`),
    );
    return this;
  }

  addNamedDestination(name: string, _fit?: string, x = 0, y = 0) {
    const marker = createElement('g');
    setAttribute(marker, 'id', `${this.idPrefix}dest-${name}`);
    setAttribute(marker, 'data-rpdf-dest', name);
    if (x !== 0 || y !== 0)
      setAttribute(marker, 'transform', `translate(${fmt(x)} ${fmt(y)})`);
    appendChild(this.container, marker);
    return this;
  }

  // Silent no-ops: PDF-only features with no SVG equivalent, the parity
  // exception with pdf output.
  registerFont() {
    return this;
  }

  addContent() {
    return this;
  }

  initForm() {
    return this;
  }

  formField() {
    return {};
  }

  formText() {
    return this;
  }

  // renderSelect/renderList call formCombo/formList directly (not
  // addFormAnnotation → annotate), but options carry the same
  // value/select shape as a text-valued field, so the same drawing rules
  // apply: value wins, falling back to select[0], no password handling.
  formCombo(
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    options: Record<string, any> = {},
  ) {
    this.drawFieldValue(x, y, width, height, options);
    this.appendFieldAnnotation(x, y, width, height, 'combo', name, options);
    return this;
  }

  // ponytail: for a List whose value isn't the first option, poppler
  // renders the first option (a known poppler quirk); we render the
  // selected value instead, which matches full-featured viewers and is
  // more useful in a preview.
  formList(
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    options: Record<string, any> = {},
  ) {
    this.drawFieldValue(x, y, width, height, options);
    this.appendFieldAnnotation(x, y, width, height, 'list', name, options);
    return this;
  }

  textInput() {
    return this;
  }

  ref() {
    // parseFormOptions calls .write(...)/.end(...) on ctx.ref(...) unconditionally
    return { write: () => {}, end: () => {} };
  }

  // addFormAnnotation builds the field dict via ctx._fieldDict(name, type, options)
  // and then mutates the result (Subtype/F/AP/AS/MaxLen), so this must return
  // a fresh, plain, writable object rather than a fixed stub. name/type are
  // included so annotate() can read them back for its own annotation.
  _fieldDict(name: string, type: string, options: Record<string, any>) {
    return { ...options, name, type };
  }

  // addFormAnnotation calls ctx._addToParent(ctx.page.annotations.at(-1)) unconditionally
  _addToParent() {
    return this;
  }

  // Static, non-interactive approximation of what a PDF viewer shows for a
  // form widget: a checkbox's check mark, or a text/select field's value.
  // dict.AP is only ever set by parseCheckboxOptions, so its presence is the
  // signal that this is a checkbox rather than a text-valued field.
  annotate(
    x: number,
    y: number,
    width: number,
    height: number,
    dict: Record<string, any> = {},
  ) {
    if (dict.AP) this.drawCheckboxMark(x, y, width, height, dict);
    else this.drawFieldValue(x, y, width, height, dict);

    const type = dict.AP ? 'checkbox' : dict.type || 'text';
    this.appendFieldAnnotation(x, y, width, height, type, dict.name, dict);
    return this;
  }

  protected isCheckboxChecked(dict: Record<string, any>) {
    return dict.AS === Object.keys(dict.AP?.N ?? {})[0];
  }

  protected drawCheckboxMark(
    x: number,
    y: number,
    width: number,
    height: number,
    dict: Record<string, any>,
  ) {
    if (!this.isCheckboxChecked(dict)) return;

    // The mark keeps square proportions and centers in the box, the way a
    // viewer draws the ZapfDingbats glyph, so a wide field can't stretch it.
    const size = Math.min(width, height);
    const left = x + (width - size) / 2;
    const top = y + (height - size) / 2;
    const pad = size * 0.2;

    const el = createElement('path');
    setAttribute(
      el,
      'd',
      `M${fmt(left + pad)} ${fmt(top + size * 0.55)}` +
        `L${fmt(left + size * 0.42)} ${fmt(top + size - pad)}` +
        `L${fmt(left + size - pad)} ${fmt(top + pad)}`,
    );
    setAttribute(el, 'fill', 'none');
    setAttribute(el, 'stroke', this.resolvePaint(this.style.strokeColor));
    setAttribute(el, 'stroke-width', fmt(size / 8));
    setAttribute(el, 'stroke-linecap', 'round');
    setAttribute(el, 'stroke-linejoin', 'round');
    appendChild(this.container, el);
  }

  protected resolveFieldValue(dict: Record<string, any>) {
    let value = dict.value;
    if (!value && Array.isArray(dict.select) && dict.select.length > 0) {
      [value] = dict.select;
    }
    return value;
  }

  // Masking happens here (not just in the drawn glyphs) so a password
  // field's annotation carries the same masked value it renders, rather
  // than leaking the real value into a data attribute.
  protected displayFieldValue(dict: Record<string, any>) {
    let value = this.resolveFieldValue(dict);
    if (value && dict.password) value = '*'.repeat(String(value).length);
    return value;
  }

  // One inert rect per field, appended after the visible drawing (see
  // linkAnnotation for the same pattern). Attributes with no value are
  // omitted so simple fields stay compact.
  protected appendFieldAnnotation(
    x: number,
    y: number,
    width: number,
    height: number,
    type: string,
    name: string | undefined,
    dict: Record<string, any>,
  ) {
    const attrs: Record<string, string | undefined> = {
      'data-rpdf-field': type,
      'data-rpdf-field-name': name || undefined,
    };

    if (type === 'checkbox') {
      attrs['data-rpdf-field-checked'] = String(this.isCheckboxChecked(dict));
    } else {
      const value = this.displayFieldValue(dict);
      if (value) attrs['data-rpdf-field-value'] = String(value);
    }

    if (type === 'text' && dict.multiline) {
      attrs['data-rpdf-field-multiline'] = 'true';
    }
    if (type === 'text' && dict.password) {
      attrs['data-rpdf-field-password'] = 'true';
    }
    if ((type === 'combo' || type === 'list') && Array.isArray(dict.select)) {
      attrs['data-rpdf-field-options'] = JSON.stringify(dict.select);
    }
    if (dict.readOnly) attrs['data-rpdf-field-readonly'] = 'true';

    appendChild(
      this.container,
      this.fieldAnnotation(x, y, width, height, attrs),
    );
  }

  protected fieldAnnotation(
    x: number,
    y: number,
    width: number,
    height: number,
    attrs: Record<string, string | undefined>,
  ) {
    const rect = createElement('rect');
    setAttribute(rect, 'x', fmt(x));
    setAttribute(rect, 'y', fmt(y));
    setAttribute(rect, 'width', fmt(width));
    setAttribute(rect, 'height', fmt(height));
    setAttribute(rect, 'fill', 'none');
    setAttribute(rect, 'pointer-events', 'none');
    Object.entries(attrs).forEach(([name, value]) => {
      if (value !== undefined) setAttribute(rect, name, value);
    });
    return rect;
  }

  protected drawFieldValue(
    x: number,
    y: number,
    width: number,
    height: number,
    dict: Record<string, any>,
  ) {
    const value = this.displayFieldValue(dict);
    if (!value) return;

    // ponytail: svgkit has no font metrics to shrink-to-fit like a PDF
    // viewer does, so long values are clipped to the box instead. Upgrade
    // to real fit-to-width sizing if that approximation proves too coarse.
    //
    // Single-line fields auto-size to the box the way viewers do; multiline
    // fields hold a flowing size instead, since scaling those to the box
    // would turn a tall textarea into one giant line. Viewers disagree on the
    // exact auto size here (poppler lands near 20pt), so we take the 12pt
    // convention.
    const size = dict.fontSize || (dict.multiline ? 12 : height * 0.8);

    let textX = x + 2;
    let anchor: string | null = null;
    if (dict.align === 'center') {
      textX = x + width / 2;
      anchor = 'middle';
    } else if (dict.align === 'right') {
      textX = x + width - 2;
      anchor = 'end';
    }
    const textY = dict.multiline
      ? y + 2 + size * 0.7
      : y + (height + size * 0.7) / 2;

    this.save();
    this.rect(x, y, width, height);
    this.clip();

    const el = createElement('text');
    setAttribute(el, 'x', fmt(textX));
    setAttribute(el, 'y', fmt(textY));
    if (anchor) setAttribute(el, 'text-anchor', anchor);
    this.applyTextFont(el);
    setAttribute(el, 'font-size', fmt(size));
    this.applyFillStyle(el);
    setAttribute(el, 'xml:space', 'preserve');
    appendChild(el, String(value));
    appendChild(this.container, el);

    this.restore();
  }

  // Fixed-size comment-bubble icon: notes have a zero-size box (render always
  // calls note(x, y, 0, 0, ...)), so width/height carry no useful size here.
  note(
    x: number,
    y: number,
    _width: number,
    _height: number,
    contents: string,
    options: { color?: string } = {},
  ) {
    const size = 20;
    const group = createElement('g');
    setAttribute(group, 'data-rpdf-note', contents);

    const bg = createElement('rect');
    setAttribute(bg, 'x', fmt(x));
    setAttribute(bg, 'y', fmt(y));
    setAttribute(bg, 'width', size);
    setAttribute(bg, 'height', size);
    setAttribute(bg, 'rx', 4);
    setAttribute(bg, 'fill', this.resolvePaint(options.color ?? '#ffcc00'));
    appendChild(group, bg);

    const bubble = createElement('path');
    setAttribute(
      bubble,
      'd',
      `M${fmt(x + 4)} ${fmt(y + 4)}` +
        `H${fmt(x + size - 4)}` +
        `V${fmt(y + size - 8)}` +
        `H${fmt(x + 10)}` +
        `L${fmt(x + 6)} ${fmt(y + size - 3)}` +
        `V${fmt(y + size - 8)}` +
        `H${fmt(x + 4)}Z`,
    );
    setAttribute(bubble, 'fill', '#ffffff');
    appendChild(group, bubble);

    const title = createElement('title');
    appendChild(title, contents);
    appendChild(group, title);

    appendChild(this.container, group);
    return this;
  }
}

export default SVGDocument;

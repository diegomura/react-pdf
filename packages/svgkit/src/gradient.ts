import {
  SVGElementNode,
  appendChild,
  createElement,
  fmt,
  setAttribute,
} from './element';

type Stop = { offset: number; color: string; opacity: number };

const IDENTITY = [1, 0, 0, 1, 0, 0];

class SVGGradient {
  id: string;
  // Safe to track per-instance because render always constructs a fresh
  // gradient per fill; reusing one across pages would dangle, since each
  // page's <defs> is rebuilt from scratch.
  emitted = false;

  private kind: 'linearGradient' | 'radialGradient';
  private attributes: Record<string, number>;
  private stops: Stop[] = [];
  private matrix: [number, number, number, number, number, number] | null =
    null;

  constructor(
    id: string,
    kind: 'linearGradient' | 'radialGradient',
    attributes: Record<string, number>,
  ) {
    this.id = id;
    this.kind = kind;
    this.attributes = attributes;
  }

  stop(offset: number, color: string, opacity = 1) {
    this.stops.push({ offset, color: String(color), opacity });
    return this;
  }

  setTransform(
    m11: number,
    m12: number,
    m21: number,
    m22: number,
    dx: number,
    dy: number,
  ) {
    this.matrix = [m11, m12, m21, m22, dx, dy];
    return this;
  }

  toElement(): SVGElementNode {
    const el = createElement(this.kind);
    setAttribute(el, 'id', this.id);
    setAttribute(el, 'gradientUnits', 'userSpaceOnUse');
    if (this.matrix && this.matrix.some((v, i) => v !== IDENTITY[i])) {
      setAttribute(
        el,
        'gradientTransform',
        `matrix(${this.matrix.map(fmt).join(' ')})`,
      );
    }
    Object.entries(this.attributes).forEach(([name, value]) =>
      setAttribute(el, name, fmt(value)),
    );

    this.stops.forEach(({ offset, color, opacity }) => {
      const stop = createElement('stop');
      setAttribute(stop, 'offset', fmt(offset));
      setAttribute(stop, 'stop-color', color);
      if (opacity !== 1) setAttribute(stop, 'stop-opacity', fmt(opacity));
      appendChild(el, stop);
    });

    return el;
  }
}

export default SVGGradient;

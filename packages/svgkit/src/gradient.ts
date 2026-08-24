import {
  SVGElementNode,
  appendChild,
  createElement,
  fmt,
  setAttribute,
} from './element';

type Stop = { offset: number; color: string; opacity: number };

class SVGGradient {
  id: string;
  emitted = false;

  private kind: 'linearGradient' | 'radialGradient';
  private attributes: Record<string, number>;
  private stops: Stop[] = [];

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

  toElement(): SVGElementNode {
    const el = createElement(this.kind);
    setAttribute(el, 'id', this.id);
    setAttribute(el, 'gradientUnits', 'userSpaceOnUse');
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

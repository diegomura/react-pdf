/* eslint-disable prefer-destructuring */
/* eslint-disable max-classes-per-file */

import uuid from '../utils/uuid';

export class Gradient {
  constructor(x1, y1, x2, y2) {
    this.id = uuid();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.stops = [];
    this.added = false;
  }

  stop(offset, color, opacity) {
    const stop = { offset };

    if (color.indexOf('rgba') !== -1) {
      // Separate alpha value, since webkit can't handle it
      const regex =
        /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi;
      const matches = regex.exec(color);

      stop.color = `rgb(${matches[1]},{${matches[2]}},${matches[3]})`;
      stop.opacity = matches[4];
    } else {
      stop.color = color;
      stop.opacity = opacity;
    }

    this.stops.push(stop);
    return this;
  }
}

/* eslint-disable prefer-destructuring */
export class LinearGradient extends Gradient {
  constructor(x1, y1, x2, y2) {
    super(x1, y1, x2, y2);

    this.type = 'linearGradient';
  }

  get attributes() {
    return {
      id: this.id,
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      gradientUnits: 'userSpaceOnUse',
    };
  }
}

export class RadialGradient extends Gradient {
  constructor(x1, y1, r1, x2, y2, r2) {
    super(x1, y1, x2, y2);

    this.r1 = r1;
    this.r2 = r2;

    this.type = 'radialGradient';
  }

  get attributes() {
    return {
      id: this.id,
      cx: this.x2,
      cy: this.y2,
      r: this.r2,
      fx: this.x1,
      fy: this.y1,
      gradientUnits: 'userSpaceOnUse',
    };
  }
}

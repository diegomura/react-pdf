export class Point2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  lerp(that, t) {
    const omt = 1.0 - t;

    return new this.constructor(
      this.x * omt + that.x * t,
      this.y * omt + that.y * t,
    );
  }
}

class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static fromPoints(p1, p2) {
    return new Vector2D(p2.x - p1.x, p2.y - p1.y);
  }

  subtract(that) {
    return new this.constructor(this.x - that.x, this.y - that.y);
  }

  dot(that) {
    return this.x * that.x + this.y * that.y;
  }
}

export const intersectEllipseLine = (c, rx, ry, a1, a2) => {
  const origin = new Vector2D(a1.x, a1.y);
  const dir = Vector2D.fromPoints(a1, a2);
  const center = new Vector2D(c.x, c.y);
  const diff = origin.subtract(center);
  const mDir = new Vector2D(dir.x / (rx * rx), dir.y / (ry * ry));
  const mDiff = new Vector2D(diff.x / (rx * rx), diff.y / (ry * ry));

  const a = dir.dot(mDir);
  const b = dir.dot(mDiff);
  const c0 = diff.dot(mDiff) - 1.0;
  const d = b * b - a * c0;

  if (d > 0) {
    const root = Math.sqrt(d);
    const t_a = (-b - root) / a;
    const t_b = (-b + root) / a;

    if (t_a >= 0 && t_a <= 1) {
      return a1.lerp(a2, t_a);
    }
    if (t_b >= 0 && t_b <= 1) {
      return a1.lerp(a2, t_b);
    }
  } else {
    const t = -b / a;

    if (t >= 0 && t <= 1) {
      return a1.lerp(a2, t);
    }
  }

  return null;
};

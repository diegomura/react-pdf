/**
 * Represents a glyph bounding box
 */
export default class BBox {
  constructor(minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity) {
    /**
     * The minimum X position in the bounding box
     * @type {number}
     */
    this.minX = minX;

    /**
     * The minimum Y position in the bounding box
     * @type {number}
     */
    this.minY = minY;

    /**
     * The maxmimum X position in the bounding box
     * @type {number}
     */
    this.maxX = maxX;

    /**
     * The maxmimum Y position in the bounding box
     * @type {number}
     */
    this.maxY = maxY;
  }

  /**
   * The width of the bounding box
   * @type {number}
   */
  get width() {
    return this.maxX - this.minX;
  }

  /**
   * The height of the bounding box
   * @type {number}
   */
  get height() {
    return this.maxY - this.minY;
  }

  addPoint(x, y) {
    if (Math.abs(x) !== Infinity) {
      if (x < this.minX) {
        this.minX = x;
      }

      if (x > this.maxX) {
        this.maxX = x;
      }
    }

    if (Math.abs(y) !== Infinity) {
      if (y < this.minY) {
        this.minY = y;
      }

      if (y > this.maxY) {
        this.maxY = y;
      }
    }
  }

  copy() {
    return new BBox(this.minX, this.minY, this.maxX, this.maxY);
  }
}

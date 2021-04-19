import Glyph from './Glyph';
import Path from './Path';
import BBox from './BBox';
import r from 'restructure';

// The header for both simple and composite glyphs
let GlyfHeader = new r.Struct({
  numberOfContours: r.int16, // if negative, this is a composite glyph
  xMin:             r.int16,
  yMin:             r.int16,
  xMax:             r.int16,
  yMax:             r.int16
});

// Flags for simple glyphs
const ON_CURVE        = 1 << 0;
const X_SHORT_VECTOR  = 1 << 1;
const Y_SHORT_VECTOR  = 1 << 2;
const REPEAT          = 1 << 3;
const SAME_X          = 1 << 4;
const SAME_Y          = 1 << 5;

// Flags for composite glyphs
const ARG_1_AND_2_ARE_WORDS     = 1 << 0;
const ARGS_ARE_XY_VALUES        = 1 << 1;
const ROUND_XY_TO_GRID          = 1 << 2;
const WE_HAVE_A_SCALE           = 1 << 3;
const MORE_COMPONENTS           = 1 << 5;
const WE_HAVE_AN_X_AND_Y_SCALE  = 1 << 6;
const WE_HAVE_A_TWO_BY_TWO      = 1 << 7;
const WE_HAVE_INSTRUCTIONS      = 1 << 8;
const USE_MY_METRICS            = 1 << 9;
const OVERLAP_COMPOUND          = 1 << 10;
const SCALED_COMPONENT_OFFSET   = 1 << 11;
const UNSCALED_COMPONENT_OFFSET = 1 << 12;

// Represents a point in a simple glyph
export class Point {
  constructor(onCurve, endContour, x = 0, y = 0) {
    this.onCurve = onCurve;
    this.endContour = endContour;
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Point(this.onCurve, this.endContour, this.x, this.y);
  }
}

// Represents a component in a composite glyph
class Component {
  constructor(glyphID, dx, dy) {
    this.glyphID = glyphID;
    this.dx = dx;
    this.dy = dy;
    this.pos = 0;
    this.scaleX = this.scaleY = 1;
    this.scale01 = this.scale10 = 0;
  }
}

/**
 * Represents a TrueType glyph.
 */
export default class TTFGlyph extends Glyph {
  // Parses just the glyph header and returns the bounding box
  _getCBox(internal) {
    // We need to decode the glyph if variation processing is requested,
    // so it's easier just to recompute the path's cbox after decoding.
    if (this._font._variationProcessor && !internal) {
      return this.path.cbox;
    }

    let stream = this._font._getTableStream('glyf');
    stream.pos += this._font.loca.offsets[this.id];
    let glyph = GlyfHeader.decode(stream);

    let cbox = new BBox(glyph.xMin, glyph.yMin, glyph.xMax, glyph.yMax);
    return Object.freeze(cbox);
  }

  // Parses a single glyph coordinate
  _parseGlyphCoord(stream, prev, short, same) {
    if (short) {
      var val = stream.readUInt8();
      if (!same) {
        val = -val;
      }

      val += prev;
    } else {
      if (same) {
        var val = prev;
      } else {
        var val = prev + stream.readInt16BE();
      }
    }

    return val;
  }

  // Decodes the glyph data into points for simple glyphs,
  // or components for composite glyphs
  _decode() {
    let glyfPos = this._font.loca.offsets[this.id];
    let nextPos = this._font.loca.offsets[this.id + 1];

    // Nothing to do if there is no data for this glyph
    if (glyfPos === nextPos) { return null; }

    let stream = this._font._getTableStream('glyf');
    stream.pos += glyfPos;
    let startPos = stream.pos;

    let glyph = GlyfHeader.decode(stream);

    if (glyph.numberOfContours > 0) {
      this._decodeSimple(glyph, stream);

    } else if (glyph.numberOfContours < 0) {
      this._decodeComposite(glyph, stream, startPos);
    }

    return glyph;
  }

  _decodeSimple(glyph, stream) {
    // this is a simple glyph
    glyph.points = [];

    let endPtsOfContours = new r.Array(r.uint16, glyph.numberOfContours).decode(stream);
    glyph.instructions = new r.Array(r.uint8, r.uint16).decode(stream);

    let flags = [];
    let numCoords = endPtsOfContours[endPtsOfContours.length - 1] + 1;

    while (flags.length < numCoords) {
      var flag = stream.readUInt8();
      flags.push(flag);

      // check for repeat flag
      if (flag & REPEAT) {
        let count = stream.readUInt8();
        for (let j = 0; j < count; j++) {
          flags.push(flag);
        }
      }
    }

    for (var i = 0; i < flags.length; i++) {
      var flag = flags[i];
      let point = new Point(!!(flag & ON_CURVE), endPtsOfContours.indexOf(i) >= 0, 0, 0);
      glyph.points.push(point);
    }

    let px = 0;
    for (var i = 0; i < flags.length; i++) {
      var flag = flags[i];
      glyph.points[i].x = px = this._parseGlyphCoord(stream, px, flag & X_SHORT_VECTOR, flag & SAME_X);
    }

    let py = 0;
    for (var i = 0; i < flags.length; i++) {
      var flag = flags[i];
      glyph.points[i].y = py = this._parseGlyphCoord(stream, py, flag & Y_SHORT_VECTOR, flag & SAME_Y);
    }

    if (this._font._variationProcessor) {
      let points = glyph.points.slice();
      points.push(...this._getPhantomPoints(glyph));

      this._font._variationProcessor.transformPoints(this.id, points);
      glyph.phantomPoints = points.slice(-4);
    }

    return;
  }

  _decodeComposite(glyph, stream, offset = 0) {
    // this is a composite glyph
    glyph.components = [];
    let haveInstructions = false;
    let flags = MORE_COMPONENTS;

    while (flags & MORE_COMPONENTS) {
      flags = stream.readUInt16BE();
      let gPos = stream.pos - offset;
      let glyphID = stream.readUInt16BE();
      if (!haveInstructions) {
        haveInstructions = (flags & WE_HAVE_INSTRUCTIONS) !== 0;
      }

      if (flags & ARG_1_AND_2_ARE_WORDS) {
        var dx = stream.readInt16BE();
        var dy = stream.readInt16BE();
      } else {
        var dx = stream.readInt8();
        var dy = stream.readInt8();
      }

      var component = new Component(glyphID, dx, dy);
      component.pos = gPos;

      if (flags & WE_HAVE_A_SCALE) {
        // fixed number with 14 bits of fraction
        component.scaleX =
        component.scaleY = ((stream.readUInt8() << 24) | (stream.readUInt8() << 16)) / 1073741824;

      } else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
        component.scaleX = ((stream.readUInt8() << 24) | (stream.readUInt8() << 16)) / 1073741824;
        component.scaleY = ((stream.readUInt8() << 24) | (stream.readUInt8() << 16)) / 1073741824;

      } else if (flags & WE_HAVE_A_TWO_BY_TWO) {
        component.scaleX  = ((stream.readUInt8() << 24) | (stream.readUInt8() << 16)) / 1073741824;
        component.scale01 = ((stream.readUInt8() << 24) | (stream.readUInt8() << 16)) / 1073741824;
        component.scale10 = ((stream.readUInt8() << 24) | (stream.readUInt8() << 16)) / 1073741824;
        component.scaleY  = ((stream.readUInt8() << 24) | (stream.readUInt8() << 16)) / 1073741824;
      }

      glyph.components.push(component);
    }

    if (this._font._variationProcessor) {
      let points = [];
      for (let j = 0; j < glyph.components.length; j++) {
        var component = glyph.components[j];
        points.push(new Point(true, true, component.dx, component.dy));
      }

      points.push(...this._getPhantomPoints(glyph));

      this._font._variationProcessor.transformPoints(this.id, points);
      glyph.phantomPoints = points.splice(-4, 4);

      for (let i = 0; i < points.length; i++) {
        let point = points[i];
        glyph.components[i].dx = point.x;
        glyph.components[i].dy = point.y;
      }
    }

    return haveInstructions;
  }

  _getPhantomPoints(glyph) {
    let cbox = this._getCBox(true);
    if (this._metrics == null) {
      this._metrics = Glyph.prototype._getMetrics.call(this, cbox);
    }

    let { advanceWidth, advanceHeight, leftBearing, topBearing } = this._metrics;

    return [
      new Point(false, true, glyph.xMin - leftBearing, 0),
      new Point(false, true, glyph.xMin - leftBearing + advanceWidth, 0),
      new Point(false, true, 0, glyph.yMax + topBearing),
      new Point(false, true, 0, glyph.yMax + topBearing + advanceHeight)
    ];
  }

  // Decodes font data, resolves composite glyphs, and returns an array of contours
  _getContours() {
    let glyph = this._decode();
    if (!glyph) {
      return [];
    }

    let points = [];

    if (glyph.numberOfContours < 0) {
      // resolve composite glyphs
      for (let component of glyph.components) {
        let contours = this._font.getGlyph(component.glyphID)._getContours();
        for (let i = 0; i < contours.length; i++) {
          let contour = contours[i];
          for (let j = 0; j < contour.length; j++) {
            let point = contour[j];
            let x = point.x * component.scaleX + point.y * component.scale01 + component.dx;
            let y = point.y * component.scaleY + point.x * component.scale10 + component.dy;
            points.push(new Point(point.onCurve, point.endContour, x, y));
          }
        }
      }
    } else {
      points = glyph.points || [];
    }

    // Recompute and cache metrics if we performed variation processing, and don't have an HVAR table
    if (glyph.phantomPoints && !this._font.directory.tables.HVAR) {
      this._metrics.advanceWidth  = glyph.phantomPoints[1].x - glyph.phantomPoints[0].x;
      this._metrics.advanceHeight = glyph.phantomPoints[3].y - glyph.phantomPoints[2].y;
      this._metrics.leftBearing   = glyph.xMin - glyph.phantomPoints[0].x;
      this._metrics.topBearing    = glyph.phantomPoints[2].y - glyph.yMax;
    }

    let contours = [];
    let cur = [];
    for (let k = 0; k < points.length; k++) {
      var point = points[k];
      cur.push(point);
      if (point.endContour) {
        contours.push(cur);
        cur = [];
      }
    }

    return contours;
  }

  _getMetrics() {
    if (this._metrics) {
      return this._metrics;
    }

    let cbox = this._getCBox(true);
    super._getMetrics(cbox);

    if (this._font._variationProcessor && !this._font.HVAR) {
      // No HVAR table, decode the glyph. This triggers recomputation of metrics.
      this.path;
    }

    return this._metrics;
  }

  // Converts contours to a Path object that can be rendered
  _getPath() {
    let contours = this._getContours();
    let path = new Path;

    for (let i = 0; i < contours.length; i++) {
      let contour = contours[i];
      let firstPt = contour[0];
      let lastPt = contour[contour.length - 1];
      let start = 0;

      if (firstPt.onCurve) {
        // The first point will be consumed by the moveTo command, so skip in the loop
        var curvePt = null;
        start = 1;
      } else {
        if (lastPt.onCurve) {
          // Start at the last point if the first point is off curve and the last point is on curve
          firstPt = lastPt;
        } else {
          // Start at the middle if both the first and last points are off curve
          firstPt = new Point(false, false, (firstPt.x + lastPt.x) / 2, (firstPt.y + lastPt.y) / 2);
        }

        var curvePt = firstPt;
      }

      path.moveTo(firstPt.x, firstPt.y);

      for (let j = start; j < contour.length; j++) {
        let pt = contour[j];
        let prevPt = j === 0 ? firstPt : contour[j - 1];

        if (prevPt.onCurve && pt.onCurve) {
          path.lineTo(pt.x, pt.y);

        } else if (prevPt.onCurve && !pt.onCurve) {
          var curvePt = pt;

        } else if (!prevPt.onCurve && !pt.onCurve) {
          let midX = (prevPt.x + pt.x) / 2;
          let midY = (prevPt.y + pt.y) / 2;
          path.quadraticCurveTo(prevPt.x, prevPt.y, midX, midY);
          var curvePt = pt;

        } else if (!prevPt.onCurve && pt.onCurve) {
          path.quadraticCurveTo(curvePt.x, curvePt.y, pt.x, pt.y);
          var curvePt = null;

        } else {
          throw new Error("Unknown TTF path state");
        }
      }

      // Connect the first and last points
      if (curvePt) {
        path.quadraticCurveTo(curvePt.x, curvePt.y, firstPt.x, firstPt.y);
      }

      path.closePath();
    }

    return path;
  }
}

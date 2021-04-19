import r from 'restructure';

// Flags for simple glyphs
const ON_CURVE        = 1 << 0;
const X_SHORT_VECTOR  = 1 << 1;
const Y_SHORT_VECTOR  = 1 << 2;
const REPEAT          = 1 << 3;
const SAME_X          = 1 << 4;
const SAME_Y          = 1 << 5;

class Point {
  static size(val) {
    return val >= 0 && val <= 255 ? 1 : 2;
  }
  
  static encode(stream, value) {
    if (value >= 0 && value <= 255) {
      stream.writeUInt8(value);
    } else {
      stream.writeInt16BE(value);
    }
  }
}

let Glyf = new r.Struct({
  numberOfContours: r.int16, // if negative, this is a composite glyph
  xMin: r.int16,
  yMin: r.int16,
  xMax: r.int16,
  yMax: r.int16,
  endPtsOfContours: new r.Array(r.uint16, 'numberOfContours'),
  instructions: new r.Array(r.uint8, r.uint16),
  flags: new r.Array(r.uint8, 0),
  xPoints: new r.Array(Point, 0),
  yPoints: new r.Array(Point, 0)
});

/**
 * Encodes TrueType glyph outlines
 */
export default class TTFGlyphEncoder {
  encodeSimple(path, instructions = []) {
    let endPtsOfContours = [];
    let xPoints = [];
    let yPoints = [];
    let flags = [];
    let same = 0;
    let lastX = 0, lastY = 0, lastFlag = 0;
    let pointCount = 0;
    
    for (let i = 0; i < path.commands.length; i++) {
      let c = path.commands[i];
      
      for (let j = 0; j < c.args.length; j += 2) {
        let x = c.args[j];
        let y = c.args[j + 1];
        let flag = 0;
        
        // If the ending point of a quadratic curve is the midpoint
        // between the control point and the control point of the next
        // quadratic curve, we can omit the ending point.
        if (c.command === 'quadraticCurveTo' && j === 2) {
          let next = path.commands[i + 1];
          if (next && next.command === 'quadraticCurveTo') {
            let midX = (lastX + next.args[0]) / 2;
            let midY = (lastY + next.args[1]) / 2;
            
            if (x === midX && y === midY) {
              continue;
            }
          }
        }
        
        // All points except control points are on curve.
        if (!(c.command === 'quadraticCurveTo' && j === 0)) {
          flag |= ON_CURVE;
        }
        
        flag = this._encodePoint(x, lastX, xPoints, flag, X_SHORT_VECTOR, SAME_X);
        flag = this._encodePoint(y, lastY, yPoints, flag, Y_SHORT_VECTOR, SAME_Y);
        
        if (flag === lastFlag && same < 255) {
          flags[flags.length - 1] |= REPEAT;
          same++;
        } else {
          if (same > 0) {
            flags.push(same);
            same = 0;
          }
      
          flags.push(flag);
          lastFlag = flag;
        }
        
        lastX = x;
        lastY = y;
        pointCount++;
      }
  
      if (c.command === 'closePath') {
        endPtsOfContours.push(pointCount - 1);
      }
    }

    // Close the path if the last command didn't already
    if (path.commands.length > 1 && path.commands[path.commands.length - 1].command !== 'closePath') {
      endPtsOfContours.push(pointCount - 1);
    }
    
    let bbox = path.bbox;
    let glyf = {
      numberOfContours: endPtsOfContours.length,
      xMin: bbox.minX,
      yMin: bbox.minY,
      xMax: bbox.maxX,
      yMax: bbox.maxY,
      endPtsOfContours: endPtsOfContours,
      instructions: instructions,
      flags: flags,
      xPoints: xPoints,
      yPoints: yPoints
    };
    
    let size = Glyf.size(glyf);
    let tail = 4 - (size % 4);
    
    let stream = new r.EncodeStream(size + tail);
    Glyf.encode(stream, glyf);
    
    // Align to 4-byte length
    if (tail !== 0) {
      stream.fill(0, tail);
    }
    
    return stream.buffer;
  }
  
  _encodePoint(value, last, points, flag, shortFlag, sameFlag) {
    let diff = value - last;
    
    if (value === last) {
      flag |= sameFlag;
    } else {
      if (-255 <= diff && diff <= 255) {
        flag |= shortFlag;
        if (diff < 0) {
          diff = -diff;
        } else {
          flag |= sameFlag;
        }
      }
      
      points.push(diff);
    }
    
    return flag;
  }
}

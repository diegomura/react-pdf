import Glyph from './Glyph';
import Path from './Path';

/**
 * Represents an OpenType PostScript glyph, in the Compact Font Format.
 */
export default class CFFGlyph extends Glyph {
  _getName() {
    if (this._font.CFF2) {
      return super._getName();
    }

    return this._font['CFF '].getGlyphName(this.id);
  }

  bias(s) {
    if (s.length < 1240) {
      return 107;
    } else if (s.length < 33900) {
      return 1131;
    } else {
      return 32768;
    }
  }

  _getPath() {
    let { stream } = this._font;
    let { pos } = stream;

    let cff = this._font.CFF2 || this._font['CFF '];
    let str = cff.topDict.CharStrings[this.id];
    let end = str.offset + str.length;
    stream.pos = str.offset;

    let path = new Path;
    let stack = [];
    let trans = [];

    let width = null;
    let nStems = 0;
    let x = 0, y = 0;
    let usedGsubrs;
    let usedSubrs;
    let open = false;

    this._usedGsubrs = usedGsubrs = {};
    this._usedSubrs = usedSubrs = {};

    let gsubrs = cff.globalSubrIndex || [];
    let gsubrsBias = this.bias(gsubrs);

    let privateDict = cff.privateDictForGlyph(this.id);
    let subrs = privateDict.Subrs || [];
    let subrsBias = this.bias(subrs);

    let vstore = cff.topDict.vstore && cff.topDict.vstore.itemVariationStore;
    let vsindex = privateDict.vsindex;
    let variationProcessor = this._font._variationProcessor;

    function checkWidth() {
      if (width == null) {
        width = stack.shift() + privateDict.nominalWidthX;
      }
    }

    function parseStems() {
      if (stack.length % 2 !== 0) {
        checkWidth();
      }

      nStems += stack.length >> 1;
      return stack.length = 0;
    }

    function moveTo(x, y) {
      if (open) {
        path.closePath();
      }

      path.moveTo(x, y);
      open = true;
    }

    let parse = function() {
      while (stream.pos < end) {
        let op = stream.readUInt8();
        if (op < 32) {
          switch (op) {
            case 1:  // hstem
            case 3:  // vstem
            case 18: // hstemhm
            case 23: // vstemhm
              parseStems();
              break;

            case 4: // vmoveto
              if (stack.length > 1) {
                checkWidth();
              }

              y += stack.shift();
              moveTo(x, y);
              break;

            case 5: // rlineto
              while (stack.length >= 2) {
                x += stack.shift();
                y += stack.shift();
                path.lineTo(x, y);
              }
              break;

            case 6: // hlineto
            case 7: // vlineto
              let phase = op === 6;
              while (stack.length >= 1) {
                if (phase) {
                  x += stack.shift();
                } else {
                  y += stack.shift();
                }

                path.lineTo(x, y);
                phase = !phase;
              }
              break;

            case 8: // rrcurveto
              while (stack.length > 0) {
                var c1x = x + stack.shift();
                var c1y = y + stack.shift();
                var c2x = c1x + stack.shift();
                var c2y = c1y + stack.shift();
                x = c2x + stack.shift();
                y = c2y + stack.shift();
                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
              }
              break;

            case 10: // callsubr
              let index = stack.pop() + subrsBias;
              let subr = subrs[index];
              if (subr) {
                usedSubrs[index] = true;
                var p = stream.pos;
                var e = end;
                stream.pos = subr.offset;
                end = subr.offset + subr.length;
                parse();
                stream.pos = p;
                end = e;
              }
              break;

            case 11: // return
              if (cff.version >= 2) {
                break;
              }
              return;

            case 14: // endchar
              if (cff.version >= 2) {
                break;
              }

              if (stack.length > 0) {
                checkWidth();
              }

              if (open) {
                path.closePath();
                open = false;
              }
              break;

            case 15: { // vsindex
              if (cff.version < 2) {
                throw new Error('vsindex operator not supported in CFF v1');
              }

              vsindex = stack.pop();
              break;
            }

            case 16: { // blend
              if (cff.version < 2) {
                throw new Error('blend operator not supported in CFF v1');
              }

              if (!variationProcessor) {
                throw new Error('blend operator in non-variation font');
              }

              let blendVector = variationProcessor.getBlendVector(vstore, vsindex);
              let numBlends = stack.pop();
              let numOperands = numBlends * blendVector.length;
              let delta = stack.length - numOperands;
              let base = delta - numBlends;

              for (let i = 0; i < numBlends; i++) {
                let sum = stack[base + i];
                for (let j = 0; j < blendVector.length; j++) {
                  sum += blendVector[j] * stack[delta++];
                }

                stack[base + i] = sum;
              }

              while (numOperands--) {
                stack.pop();
              }

              break;
            }

            case 19: // hintmask
            case 20: // cntrmask
              parseStems();
              stream.pos += (nStems + 7) >> 3;
              break;

            case 21: // rmoveto
              if (stack.length > 2) {
                checkWidth();
              }

              x += stack.shift();
              y += stack.shift();
              moveTo(x, y);
              break;

            case 22: // hmoveto
              if (stack.length > 1) {
                checkWidth();
              }

              x += stack.shift();
              moveTo(x, y);
              break;

            case 24: // rcurveline
              while (stack.length >= 8) {
                var c1x = x + stack.shift();
                var c1y = y + stack.shift();
                var c2x = c1x + stack.shift();
                var c2y = c1y + stack.shift();
                x = c2x + stack.shift();
                y = c2y + stack.shift();
                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
              }

              x += stack.shift();
              y += stack.shift();
              path.lineTo(x, y);
              break;

            case 25: // rlinecurve
              while (stack.length >= 8) {
                x += stack.shift();
                y += stack.shift();
                path.lineTo(x, y);
              }

              var c1x = x + stack.shift();
              var c1y = y + stack.shift();
              var c2x = c1x + stack.shift();
              var c2y = c1y + stack.shift();
              x = c2x + stack.shift();
              y = c2y + stack.shift();
              path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
              break;

            case 26: // vvcurveto
              if (stack.length % 2) {
                x += stack.shift();
              }

              while (stack.length >= 4) {
                c1x = x;
                c1y = y + stack.shift();
                c2x = c1x + stack.shift();
                c2y = c1y + stack.shift();
                x = c2x;
                y = c2y + stack.shift();
                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
              }
              break;

            case 27: // hhcurveto
              if (stack.length % 2) {
                y += stack.shift();
              }

              while (stack.length >= 4) {
                c1x = x + stack.shift();
                c1y = y;
                c2x = c1x + stack.shift();
                c2y = c1y + stack.shift();
                x = c2x + stack.shift();
                y = c2y;
                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
              }
              break;

            case 28: // shortint
              stack.push(stream.readInt16BE());
              break;

            case 29: // callgsubr
              index = stack.pop() + gsubrsBias;
              subr = gsubrs[index];
              if (subr) {
                usedGsubrs[index] = true;
                var p = stream.pos;
                var e = end;
                stream.pos = subr.offset;
                end = subr.offset + subr.length;
                parse();
                stream.pos = p;
                end = e;
              }
              break;

            case 30: // vhcurveto
            case 31: // hvcurveto
              phase = op === 31;
              while (stack.length >= 4) {
                if (phase) {
                  c1x = x + stack.shift();
                  c1y = y;
                  c2x = c1x + stack.shift();
                  c2y = c1y + stack.shift();
                  y = c2y + stack.shift();
                  x = c2x + (stack.length === 1 ? stack.shift() : 0);
                } else {
                  c1x = x;
                  c1y = y + stack.shift();
                  c2x = c1x + stack.shift();
                  c2y = c1y + stack.shift();
                  x = c2x + stack.shift();
                  y = c2y + (stack.length === 1 ? stack.shift() : 0);
                }

                path.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
                phase = !phase;
              }
              break;

            case 12:
              op = stream.readUInt8();
              switch (op) {
                case 3: // and
                  let a = stack.pop();
                  let b = stack.pop();
                  stack.push(a && b ? 1 : 0);
                  break;

                case 4: // or
                  a = stack.pop();
                  b = stack.pop();
                  stack.push(a || b ? 1 : 0);
                  break;

                case 5: // not
                  a = stack.pop();
                  stack.push(a ? 0 : 1);
                  break;

                case 9: // abs
                  a = stack.pop();
                  stack.push(Math.abs(a));
                  break;

                case 10: // add
                  a = stack.pop();
                  b = stack.pop();
                  stack.push(a + b);
                  break;

                case 11: // sub
                  a = stack.pop();
                  b = stack.pop();
                  stack.push(a - b);
                  break;

                case 12: // div
                  a = stack.pop();
                  b = stack.pop();
                  stack.push(a / b);
                  break;

                case 14: // neg
                  a = stack.pop();
                  stack.push(-a);
                  break;

                case 15: // eq
                  a = stack.pop();
                  b = stack.pop();
                  stack.push(a === b ? 1 : 0);
                  break;

                case 18: // drop
                  stack.pop();
                  break;

                case 20: // put
                  let val = stack.pop();
                  let idx = stack.pop();
                  trans[idx] = val;
                  break;

                case 21: // get
                  idx = stack.pop();
                  stack.push(trans[idx] || 0);
                  break;

                case 22: // ifelse
                  let s1 = stack.pop();
                  let s2 = stack.pop();
                  let v1 = stack.pop();
                  let v2 = stack.pop();
                  stack.push(v1 <= v2 ? s1 : s2);
                  break;

                case 23: // random
                  stack.push(Math.random());
                  break;

                case 24: // mul
                  a = stack.pop();
                  b = stack.pop();
                  stack.push(a * b);
                  break;

                case 26: // sqrt
                  a = stack.pop();
                  stack.push(Math.sqrt(a));
                  break;

                case 27: // dup
                  a = stack.pop();
                  stack.push(a, a);
                  break;

                case 28: // exch
                  a = stack.pop();
                  b = stack.pop();
                  stack.push(b, a);
                  break;

                case 29: // index
                  idx = stack.pop();
                  if (idx < 0) {
                    idx = 0;
                  } else if (idx > stack.length - 1) {
                    idx = stack.length - 1;
                  }

                  stack.push(stack[idx]);
                  break;

                case 30: // roll
                  let n = stack.pop();
                  let j = stack.pop();

                  if (j >= 0) {
                    while (j > 0) {
                      var t = stack[n - 1];
                      for (let i = n - 2; i >= 0; i--) {
                        stack[i + 1] = stack[i];
                      }

                      stack[0] = t;
                      j--;
                    }
                  } else {
                    while (j < 0) {
                      var t = stack[0];
                      for (let i = 0; i <= n; i++) {
                        stack[i] = stack[i + 1];
                      }

                      stack[n - 1] = t;
                      j++;
                    }
                  }
                  break;

                case 34: // hflex
                  c1x = x + stack.shift();
                  c1y = y;
                  c2x = c1x + stack.shift();
                  c2y = c1y + stack.shift();
                  let c3x = c2x + stack.shift();
                  let c3y = c2y;
                  let c4x = c3x + stack.shift();
                  let c4y = c3y;
                  let c5x = c4x + stack.shift();
                  let c5y = c4y;
                  let c6x = c5x + stack.shift();
                  let c6y = c5y;
                  x = c6x;
                  y = c6y;

                  path.bezierCurveTo(c1x, c1y, c2x, c2y, c3x, c3y);
                  path.bezierCurveTo(c4x, c4y, c5x, c5y, c6x, c6y);
                  break;

                case 35: // flex
                  let pts = [];

                  for (let i = 0; i <= 5; i++) {
                    x += stack.shift();
                    y += stack.shift();
                    pts.push(x, y);
                  }

                  path.bezierCurveTo(...pts.slice(0, 6));
                  path.bezierCurveTo(...pts.slice(6));
                  stack.shift(); // fd
                  break;

                case 36: // hflex1
                  c1x = x + stack.shift();
                  c1y = y + stack.shift();
                  c2x = c1x + stack.shift();
                  c2y = c1y + stack.shift();
                  c3x = c2x + stack.shift();
                  c3y = c2y;
                  c4x = c3x + stack.shift();
                  c4y = c3y;
                  c5x = c4x + stack.shift();
                  c5y = c4y + stack.shift();
                  c6x = c5x + stack.shift();
                  c6y = c5y;
                  x = c6x;
                  y = c6y;

                  path.bezierCurveTo(c1x, c1y, c2x, c2y, c3x, c3y);
                  path.bezierCurveTo(c4x, c4y, c5x, c5y, c6x, c6y);
                  break;

                case 37: // flex1
                  let startx = x;
                  let starty = y;

                  pts = [];
                  for (let i = 0; i <= 4; i++) {
                    x += stack.shift();
                    y += stack.shift();
                    pts.push(x, y);
                  }

                  if (Math.abs(x - startx) > Math.abs(y - starty)) { // horizontal
                    x += stack.shift();
                    y = starty;
                  } else {
                    x = startx;
                    y += stack.shift();
                  }

                  pts.push(x, y);
                  path.bezierCurveTo(...pts.slice(0, 6));
                  path.bezierCurveTo(...pts.slice(6));
                  break;

                default:
                  throw new Error(`Unknown op: 12 ${op}`);
              }
              break;

            default:
              throw new Error(`Unknown op: ${op}`);
          }

        } else if (op < 247) {
          stack.push(op - 139);
        } else if (op < 251) {
          var b1 = stream.readUInt8();
          stack.push((op - 247) * 256 + b1 + 108);
        } else if (op < 255) {
          var b1 = stream.readUInt8();
          stack.push(-(op - 251) * 256 - b1 - 108);
        } else {
          stack.push(stream.readInt32BE() / 65536);
        }
      }
    };

    parse();

    if (open) {
      path.closePath();
    }

    return path;
  }
}

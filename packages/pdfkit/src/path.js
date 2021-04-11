var SVGPath = (function() {
  let parameters = undefined;
  let parse = undefined;
  let cx = undefined;
  let apply = undefined;
  let runners = undefined;
  let solveArc = undefined;
  let arcToSegments = undefined;
  let segmentToBezier = undefined;
  SVGPath = class SVGPath {
    static initClass() {
      let cy, px, py, sx, sy;
      parameters = {
        A: 7,
        a: 7,
        C: 6,
        c: 6,
        H: 1,
        h: 1,
        L: 2,
        l: 2,
        M: 2,
        m: 2,
        Q: 4,
        q: 4,
        S: 4,
        s: 4,
        T: 2,
        t: 2,
        V: 1,
        v: 1,
        Z: 0,
        z: 0,
      };

      parse = function(path) {
        let cmd;
        const ret = [];
        let args = [];
        let curArg = '';
        let foundDecimal = false;
        let params = 0;

        for (let c of Array.from(path)) {
          if (parameters[c] != null) {
            params = parameters[c];
            if (cmd) {
              // save existing command
              if (curArg.length > 0) {
                args[args.length] = +curArg;
              }
              ret[ret.length] = { cmd, args };

              args = [];
              curArg = '';
              foundDecimal = false;
            }

            cmd = c;
          } else if (
            [' ', ','].includes(c) ||
            (c === '-' &&
              curArg.length > 0 &&
              curArg[curArg.length - 1] !== 'e') ||
            (c === '.' && foundDecimal)
          ) {
            if (curArg.length === 0) {
              continue;
            }

            if (args.length === params) {
              // handle reused commands
              ret[ret.length] = { cmd, args };
              args = [+curArg];

              // handle assumed commands
              if (cmd === 'M') {
                cmd = 'L';
              }
              if (cmd === 'm') {
                cmd = 'l';
              }
            } else {
              args[args.length] = +curArg;
            }

            foundDecimal = c === '.';

            // fix for negative numbers or repeated decimals with no delimeter between commands
            curArg = ['-', '.'].includes(c) ? c : '';
          } else {
            curArg += c;
            if (c === '.') {
              foundDecimal = true;
            }
          }
        }

        // add the last command
        if (curArg.length > 0) {
          if (args.length === params) {
            // handle reused commands
            ret[ret.length] = { cmd, args };
            args = [+curArg];

            // handle assumed commands
            if (cmd === 'M') {
              cmd = 'L';
            }
            if (cmd === 'm') {
              cmd = 'l';
            }
          } else {
            args[args.length] = +curArg;
          }
        }

        ret[ret.length] = { cmd, args };

        return ret;
      };

      cx = cy = px = py = sx = sy = 0;
      apply = function(commands, doc) {
        // current point, control point, and subpath starting point
        cx = cy = px = py = sx = sy = 0;

        // run the commands
        for (let i = 0; i < commands.length; i++) {
          const c = commands[i];
          if (typeof runners[c.cmd] === 'function') {
            runners[c.cmd](doc, c.args);
          }
        }

        return (cx = cy = px = py = 0);
      };

      runners = {
        M(doc, a) {
          cx = a[0];
          cy = a[1];
          px = py = null;
          sx = cx;
          sy = cy;
          return doc.moveTo(cx, cy);
        },

        m(doc, a) {
          cx += a[0];
          cy += a[1];
          px = py = null;
          sx = cx;
          sy = cy;
          return doc.moveTo(cx, cy);
        },

        C(doc, a) {
          cx = a[4];
          cy = a[5];
          px = a[2];
          py = a[3];
          return doc.bezierCurveTo(...Array.from(a || []));
        },

        c(doc, a) {
          doc.bezierCurveTo(
            a[0] + cx,
            a[1] + cy,
            a[2] + cx,
            a[3] + cy,
            a[4] + cx,
            a[5] + cy,
          );
          px = cx + a[2];
          py = cy + a[3];
          cx += a[4];
          return (cy += a[5]);
        },

        S(doc, a) {
          if (px === null) {
            px = cx;
            py = cy;
          }

          doc.bezierCurveTo(
            cx - (px - cx),
            cy - (py - cy),
            a[0],
            a[1],
            a[2],
            a[3],
          );
          px = a[0];
          py = a[1];
          cx = a[2];
          return (cy = a[3]);
        },

        s(doc, a) {
          if (px === null) {
            px = cx;
            py = cy;
          }

          doc.bezierCurveTo(
            cx - (px - cx),
            cy - (py - cy),
            cx + a[0],
            cy + a[1],
            cx + a[2],
            cy + a[3],
          );
          px = cx + a[0];
          py = cy + a[1];
          cx += a[2];
          return (cy += a[3]);
        },

        Q(doc, a) {
          px = a[0];
          py = a[1];
          cx = a[2];
          cy = a[3];
          return doc.quadraticCurveTo(a[0], a[1], cx, cy);
        },

        q(doc, a) {
          doc.quadraticCurveTo(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy);
          px = cx + a[0];
          py = cy + a[1];
          cx += a[2];
          return (cy += a[3]);
        },

        T(doc, a) {
          if (px === null) {
            px = cx;
            py = cy;
          } else {
            px = cx - (px - cx);
            py = cy - (py - cy);
          }

          doc.quadraticCurveTo(px, py, a[0], a[1]);
          px = cx - (px - cx);
          py = cy - (py - cy);
          cx = a[0];
          return (cy = a[1]);
        },

        t(doc, a) {
          if (px === null) {
            px = cx;
            py = cy;
          } else {
            px = cx - (px - cx);
            py = cy - (py - cy);
          }

          doc.quadraticCurveTo(px, py, cx + a[0], cy + a[1]);
          cx += a[0];
          return (cy += a[1]);
        },

        A(doc, a) {
          solveArc(doc, cx, cy, a);
          cx = a[5];
          return (cy = a[6]);
        },

        a(doc, a) {
          a[5] += cx;
          a[6] += cy;
          solveArc(doc, cx, cy, a);
          cx = a[5];
          return (cy = a[6]);
        },

        L(doc, a) {
          cx = a[0];
          cy = a[1];
          px = py = null;
          return doc.lineTo(cx, cy);
        },

        l(doc, a) {
          cx += a[0];
          cy += a[1];
          px = py = null;
          return doc.lineTo(cx, cy);
        },

        H(doc, a) {
          cx = a[0];
          px = py = null;
          return doc.lineTo(cx, cy);
        },

        h(doc, a) {
          cx += a[0];
          px = py = null;
          return doc.lineTo(cx, cy);
        },

        V(doc, a) {
          cy = a[0];
          px = py = null;
          return doc.lineTo(cx, cy);
        },

        v(doc, a) {
          cy += a[0];
          px = py = null;
          return doc.lineTo(cx, cy);
        },

        Z(doc) {
          doc.closePath();
          cx = sx;
          return (cy = sy);
        },

        z(doc) {
          doc.closePath();
          cx = sx;
          return (cy = sy);
        },
      };

      solveArc = function(doc, x, y, coords) {
        const [rx, ry, rot, large, sweep, ex, ey] = Array.from(coords);
        const segs = arcToSegments(ex, ey, rx, ry, large, sweep, rot, x, y);

        return (() => {
          const result = [];
          for (let seg of Array.from(segs)) {
            const bez = segmentToBezier(...Array.from(seg || []));
            result.push(doc.bezierCurveTo(...Array.from(bez || [])));
          }
          return result;
        })();
      };

      // from Inkscape svgtopdf, thanks!
      arcToSegments = function(x, y, rx, ry, large, sweep, rotateX, ox, oy) {
        const th = rotateX * (Math.PI / 180);
        const sin_th = Math.sin(th);
        const cos_th = Math.cos(th);
        rx = Math.abs(rx);
        ry = Math.abs(ry);
        px = cos_th * (ox - x) * 0.5 + sin_th * (oy - y) * 0.5;
        py = cos_th * (oy - y) * 0.5 - sin_th * (ox - x) * 0.5;
        let pl = (px * px) / (rx * rx) + (py * py) / (ry * ry);
        if (pl > 1) {
          pl = Math.sqrt(pl);
          rx *= pl;
          ry *= pl;
        }

        const a00 = cos_th / rx;
        const a01 = sin_th / rx;
        const a10 = -sin_th / ry;
        const a11 = cos_th / ry;
        const x0 = a00 * ox + a01 * oy;
        const y0 = a10 * ox + a11 * oy;
        const x1 = a00 * x + a01 * y;
        const y1 = a10 * x + a11 * y;

        const d = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
        let sfactor_sq = 1 / d - 0.25;
        if (sfactor_sq < 0) {
          sfactor_sq = 0;
        }
        let sfactor = Math.sqrt(sfactor_sq);
        if (sweep === large) {
          sfactor = -sfactor;
        }

        const xc = 0.5 * (x0 + x1) - sfactor * (y1 - y0);
        const yc = 0.5 * (y0 + y1) + sfactor * (x1 - x0);

        const th0 = Math.atan2(y0 - yc, x0 - xc);
        const th1 = Math.atan2(y1 - yc, x1 - xc);

        let th_arc = th1 - th0;
        if (th_arc < 0 && sweep === 1) {
          th_arc += 2 * Math.PI;
        } else if (th_arc > 0 && sweep === 0) {
          th_arc -= 2 * Math.PI;
        }

        const segments = Math.ceil(Math.abs(th_arc / (Math.PI * 0.5 + 0.001)));
        const result = [];

        for (
          let i = 0, end = segments, asc = 0 <= end;
          asc ? i < end : i > end;
          asc ? i++ : i--
        ) {
          const th2 = th0 + (i * th_arc) / segments;
          const th3 = th0 + ((i + 1) * th_arc) / segments;
          result[i] = [xc, yc, th2, th3, rx, ry, sin_th, cos_th];
        }

        return result;
      };

      segmentToBezier = function(cx, cy, th0, th1, rx, ry, sin_th, cos_th) {
        const a00 = cos_th * rx;
        const a01 = -sin_th * ry;
        const a10 = sin_th * rx;
        const a11 = cos_th * ry;

        const th_half = 0.5 * (th1 - th0);
        const t =
          ((8 / 3) * Math.sin(th_half * 0.5) * Math.sin(th_half * 0.5)) /
          Math.sin(th_half);
        const x1 = cx + Math.cos(th0) - t * Math.sin(th0);
        const y1 = cy + Math.sin(th0) + t * Math.cos(th0);
        const x3 = cx + Math.cos(th1);
        const y3 = cy + Math.sin(th1);
        const x2 = x3 + t * Math.sin(th1);
        const y2 = y3 - t * Math.cos(th1);

        return [
          a00 * x1 + a01 * y1,
          a10 * x1 + a11 * y1,
          a00 * x2 + a01 * y2,
          a10 * x2 + a11 * y2,
          a00 * x3 + a01 * y3,
          a10 * x3 + a11 * y3,
        ];
      };
    }
    static apply(doc, path) {
      const commands = parse(path);
      return apply(commands, doc);
    }
  };
  SVGPath.initClass();
  return SVGPath;
})();

export default SVGPath;

// This constant is used to approximate a symmetrical arc using a cubic
// Bezier curve.
const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const Borders = {
  drawBorders() {
    const lw = 2;
    const layout = this.getAbsoluteLayout();
    const top = layout.top + lw / 2;
    const width = layout.width - lw;
    const height = layout.height - lw;
    const left = layout.left + lw / 2;

    const {
      borderTopWidth = 0,
      borderRightWidth = 0,
      borderBottomWidth = 0,
      borderLeftWidth = 0,
    } = this;

    const {
      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomLeftRadius = 0,
      borderTopColor = 'black',
      borderRightColor = 'black',
      borderBottomColor = 'black',
      borderLeftColor = 'black',
      borderTopStyle = 'solid',
      borderRightStyle = 'solid',
      borderBottomStyle = 'solid',
      borderLeftStyle = 'solid',
    } = this.getComputedStyles();

    // Save current graphics stack
    this.root.instance.save();

    const r = Math.min(5, 0.5 * width, 0.5 * height);

    // amount to inset control points from corners (see `ellipse`)
    const c = r * (1.0 - KAPPA);

    // Border top
    this.root.instance.moveTo(left + r, top);
    this.root.instance.lineTo(left + width - r, top);
    this.root.instance.bezierCurveTo(
      left + width - c,
      top,
      left + width,
      top + c,
      left + width,
      top + r,
    );

    // Border right
    this.root.instance.lineTo(left + width, top + height - r);
    this.root.instance.bezierCurveTo(
      left + width,
      top + height - c,
      left + width - c,
      top + height,
      left + width - r,
      top + height,
    );
    this.root.instance.lineTo(left + r, top + height);
    this.root.instance.bezierCurveTo(
      left + c,
      top + height,
      left,
      top + height - c,
      left,
      top + height - r,
    );
    this.root.instance.lineTo(left, top + r);
    this.root.instance.bezierCurveTo(
      left,
      top + c,
      left + c,
      top,
      left + r,
      top,
    );
    this.root.instance.closePath();
    this.root.instance.lineWidth(lw);
    this.root.instance.strokeColor('green');
    this.root.instance.stroke();

    // // border top
    // this.drawHorizontalBorder(
    //   [
    //     left + (borderTopLeftRadius > 0 ? borderTopWidth / 2 : 0),
    //     top + borderTopWidth / 2,
    //   ],
    //   [
    //     left + width - (borderTopRightRadius > 0 ? borderTopWidth / 2 : 0),
    //     top + borderTopWidth / 2,
    //   ],
    //   borderTopLeftRadius,
    //   borderTopRightRadius,
    //   borderTopWidth,
    //   borderTopColor,
    //   borderTopStyle,
    // );

    // // border right
    // this.drawVerticalBorder(
    //   [
    //     left + width - borderRightWidth / 2,
    //     top + (borderTopRightRadius > 0 ? borderRightWidth / 2 : 0),
    //   ],
    //   [
    //     left + width - borderRightWidth / 2,
    //     top + height - (borderBottomRightRadius > 0 ? borderRightWidth / 2 : 0),
    //   ],
    //   -borderTopRightRadius,
    //   -borderBottomRightRadius,
    //   borderRightWidth,
    //   borderRightColor,
    //   borderRightStyle,
    // );

    // // border bottom
    // this.drawHorizontalBorder(
    //   [
    //     left +
    //       width -
    //       (borderBottomRightRadius > 0 ? borderBottomWidth / 2 : 0),
    //     top + height - borderBottomWidth / 2,
    //   ],
    //   [
    //     left + (borderBottomLeftRadius > 0 ? borderBottomWidth / 2 : 0),
    //     top + height - borderBottomWidth / 2,
    //   ],
    //   -borderBottomRightRadius,
    //   -borderBottomLeftRadius,
    //   borderBottomWidth,
    //   borderBottomColor,
    //   borderBottomStyle,
    // );

    // // border left
    // this.drawVerticalBorder(
    //   [
    //     left + borderLeftWidth / 2,
    //     top + height - (borderBottomLeftRadius > 0 ? borderLeftWidth / 2 : 0),
    //   ],
    //   [
    //     left + borderLeftWidth / 2,
    //     top + (borderTopLeftRadius > 0 ? borderLeftWidth / 2 : 0),
    //   ],
    //   borderBottomLeftRadius,
    //   borderTopLeftRadius,
    //   borderLeftWidth,
    //   borderLeftColor,
    //   borderLeftStyle,
    // );

    // Restore graphics stack to avoid side effects
    this.root.instance.restore();
  },
  traceBorder(style, width) {
    switch (style) {
      case 'dashed':
        this.root.instance.dash(width * 2, { space: width * 1.2 }).stroke();
        break;
      case 'dotted':
        this.root.instance.dash(width, { space: width * 1.2 }).stroke();
        break;
      default:
        this.root.instance.stroke();
    }
  },
  drawHorizontalBorder(p1, p2, r1, r2, width, color, style) {
    if (width <= 0) return;

    this.root.instance
      .lineWidth(width)
      .moveTo(p1[0], p1[1] + r1)
      .quadraticCurveTo(p1[0], p1[1], p1[0] + r1, p1[1])
      .lineTo(p2[0] - r2, p2[1])
      .quadraticCurveTo(p2[0], p2[1], p2[0], p2[1] + r2)
      .strokeColor(color);

    this.traceBorder(style, width);
  },
  drawVerticalBorder(p1, p2, r1, r2, width, color, style) {
    if (width <= 0) return;

    this.root.instance
      .lineWidth(width)
      .moveTo(p1[0] + r1, p1[1])
      .quadraticCurveTo(p1[0], p1[1], p1[0], p1[1] - r1)
      .lineTo(p2[0], p2[1] + r2)
      .quadraticCurveTo(p2[0], p2[1], p2[0] + r2, p2[1])
      .strokeColor(color);

    this.traceBorder(style, width);
  },
};

export default Borders;

const Borders = {
  traceBorder(style, width) {
    switch (style) {
      case 'dashed':
        this.root.dash(width * 2, { space: width * 1.2 }).stroke();
        break;
      case 'dotted':
        this.root.dash(width, { space: width * 1.2 }).stroke();
        break;
      default:
        this.root.stroke();
    }
  },
  drawHorizontalBorder(p1, p2, r1, r2, width, color, style) {
    if (width <= 0) return;

    this.root
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

    this.root
      .lineWidth(width)
      .moveTo(p1[0] + r1, p1[1])
      .quadraticCurveTo(p1[0], p1[1], p1[0], p1[1] - r1)
      .lineTo(p2[0], p2[1] + r2)
      .quadraticCurveTo(p2[0], p2[1], p2[0] + r2, p2[1])
      .strokeColor(color);

    this.traceBorder(style, width);
  },
  drawBorders() {
    const { left, top, width, height } = this.getAbsoluteLayout();

    const {
      borderTopWidth = 0,
      borderRightWidth = 0,
      borderBottomWidth = 0,
      borderLeftWidth = 0,
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
    this.root.save();

    // border top
    this.drawHorizontalBorder(
      [
        left + (borderTopLeftRadius > 0 ? borderTopWidth / 2 : 0),
        top + borderTopWidth / 2,
      ],
      [
        left + width - (borderTopRightRadius > 0 ? borderTopWidth / 2 : 0),
        top + borderTopWidth / 2,
      ],
      borderTopLeftRadius,
      borderTopRightRadius,
      borderTopWidth,
      borderTopColor,
      borderTopStyle,
    );

    // border right
    this.drawVerticalBorder(
      [
        left + width - borderRightWidth / 2,
        top + (borderTopRightRadius > 0 ? borderRightWidth / 2 : 0),
      ],
      [
        left + width - borderRightWidth / 2,
        top + height - (borderBottomRightRadius > 0 ? borderRightWidth / 2 : 0),
      ],
      -borderTopRightRadius,
      -borderBottomRightRadius,
      borderRightWidth,
      borderRightColor,
      borderRightStyle,
    );

    // border bottom
    this.drawHorizontalBorder(
      [
        left +
          width -
          (borderBottomRightRadius > 0 ? borderBottomWidth / 2 : 0),
        top + height - borderBottomWidth / 2,
      ],
      [
        left + (borderBottomLeftRadius > 0 ? borderBottomWidth / 2 : 0),
        top + height - borderBottomWidth / 2,
      ],
      -borderBottomRightRadius,
      -borderBottomLeftRadius,
      borderBottomWidth,
      borderBottomColor,
      borderBottomStyle,
    );

    // border left
    this.drawVerticalBorder(
      [
        left + borderLeftWidth / 2,
        top + height - (borderBottomLeftRadius > 0 ? borderLeftWidth / 2 : 0),
      ],
      [
        left + borderLeftWidth / 2,
        top + (borderTopLeftRadius > 0 ? borderLeftWidth / 2 : 0),
      ],
      borderBottomLeftRadius,
      borderTopLeftRadius,
      borderLeftWidth,
      borderLeftColor,
      borderLeftStyle,
    );

    // Restore graphics stack to avoid side effects
    this.root.restore();
  },
};

export default Borders;

// This constant is used to approximate a symmetrical arc using a cubic
// Bezier curve.
const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const Borders = {
  drawBorders() {
    const { top, left, width, height } = this.getAbsoluteLayout();

    const {
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
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

    const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
    const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
    const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
    const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);

    // Save current graphics stack
    this.root.instance.save();

    // Border top
    this.root.instance.save();

    // Coefficients for the 4 ellipses needed for border top
    const c0 = rtr * (1.0 - KAPPA);
    const c1 = (rtr - borderTopWidth) * (1.0 - KAPPA);
    const c2 = (rtr - borderRightWidth) * (1.0 - KAPPA);
    const c3 = rtl * (1.0 - KAPPA);
    const c4 = (rtl - borderTopWidth) * (1.0 - KAPPA);
    const c5 = (rtr - borderLeftWidth) * (1.0 - KAPPA);

    // Clip outer top border edge
    this.root.instance.moveTo(left + rtl, top);
    this.root.instance.lineTo(left + width - rtr, top);

    // Clip outer top right cap
    this.root.instance.bezierCurveTo(
      left + width - c0,
      top,
      left + width,
      top + c0,
      left + width,
      top + rtr,
    );

    // Clip inner top right cap
    if (borderRightWidth < rtr) {
      this.root.instance.lineTo(left + width - borderRightWidth, top + rtr);

      this.root.instance.bezierCurveTo(
        left + width - borderRightWidth,
        top + c1,
        left + width - rtr + c2,
        top + borderTopWidth,
        left + width - rtr,
        top + borderTopWidth,
      );
    } else {
      this.root.instance.lineTo(left + width - rtr, top + rtr);

      this.root.instance.bezierCurveTo(
        left + width - rtr,
        top + c1,
        left + width - rtr + c2,
        top + borderTopWidth,
        left + width - rtr,
        top + borderTopWidth,
      );
    }

    // Clip inner top border edge
    this.root.instance.lineTo(left + rtl, top + borderTopWidth);

    // Clip inner top left cap
    this.root.instance.bezierCurveTo(
      left + borderLeftWidth + c4,
      top + borderTopWidth,
      left + borderLeftWidth,
      top + borderTopWidth + c5,
      left + borderLeftWidth,
      top + rtl,
    );
    this.root.instance.lineTo(left, top + rtl);

    // Clip outer top left cap
    this.root.instance.bezierCurveTo(
      left,
      top + c3,
      left + c3,
      top,
      left + rtl,
      top,
    );

    this.root.instance.closePath();
    this.root.instance.clip();

    // Clip corners
    this.root.instance.moveTo(left + width - rtr, top + rtr);
    this.root.instance.lineTo(left + width, top);
    this.root.instance.lineTo(left, top);
    this.root.instance.lineTo(left, top + height);
    this.root.instance.closePath();
    this.root.instance.clip();

    // Render solid border
    this.root.instance.rect(left, top, width, height);
    this.root.instance.fillColor(borderTopColor);
    this.root.instance.fill();

    // Restore from border top
    this.root.instance.restore();

    // Restore graphics stack to avoid side effects
    this.root.instance.restore();
  },
  // traceBorder(style, width) {
  //   switch (style) {
  //     case 'dashed':
  //       this.root.instance.dash(width * 2, { space: width * 1.2 }).stroke();
  //       break;
  //     case 'dotted':
  //       this.root.instance.dash(width, { space: width * 1.2 }).stroke();
  //       break;
  //     default:
  //       this.root.instance.stroke();
  //   }
  // },
};

export default Borders;

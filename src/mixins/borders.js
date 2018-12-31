// This constant is used to approximate a symmetrical arc using a cubic
// Bezier curve.
const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const Borders = {
  drawBorders() {
    this.root.instance.save();

    this.drawBorderTop();

    this.root.instance.restore();
  },

  drawBorderTop() {
    const { instance } = this.root;
    const { top, left, width, height } = this.getAbsoluteLayout();

    const { borderTopWidth, borderRightWidth, borderLeftWidth } = this;

    const {
      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderTopColor = 'black',
    } = this.getComputedStyles();

    const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
    const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);

    instance.save();

    // Ellipse coefficients outer top right cap
    const c0 = rtr * (1.0 - KAPPA);

    // Clip outer top border edge
    instance.moveTo(left + rtl, top);
    instance.lineTo(left + width - rtr, top);

    // Clip outer top right cap
    instance.bezierCurveTo(
      left + width - c0,
      top,
      left + width,
      top + c0,
      left + width,
      top + rtr,
    );

    // Move down in case the margin with exceedes the radius
    const topRightYCoord = top + Math.max(borderTopWidth, rtr);
    instance.lineTo(left + width, topRightYCoord);

    // Clip inner top right cap
    instance.lineTo(left + width - borderRightWidth, topRightYCoord);

    // Ellipse coefficients inner top right cap
    const innerTopRightRadiusX = Math.max(rtr - borderRightWidth, 0);
    const innerTopRightRadiusY = Math.max(rtr - borderTopWidth, 0);
    const c1 = innerTopRightRadiusX * (1.0 - KAPPA);
    const c2 = innerTopRightRadiusY * (1.0 - KAPPA);

    // Clip inner top right cap
    instance.bezierCurveTo(
      left + width - borderRightWidth,
      top + borderTopWidth + c2,
      left + width - borderRightWidth - c1,
      top + borderTopWidth,
      left + width - borderRightWidth - innerTopRightRadiusX,
      top + borderTopWidth,
    );

    // Clip inner top border edge
    instance.lineTo(left + rtl, top + borderTopWidth);

    // Ellipse coefficients inner top right cap
    const innerTopLeftRadiusX = Math.max(rtl - borderLeftWidth, 0);
    const innerTopLeftRadiusY = Math.max(rtl - borderTopWidth, 0);
    const c3 = innerTopLeftRadiusX * (1.0 - KAPPA);
    const c4 = innerTopLeftRadiusY * (1.0 - KAPPA);
    const topLeftYCoord = top + Math.max(borderTopWidth, rtl);

    // Clip inner top left cap
    instance.bezierCurveTo(
      left + borderLeftWidth + c3,
      top + borderTopWidth,
      left + borderLeftWidth,
      top + borderTopWidth + c4,
      left + borderLeftWidth,
      topLeftYCoord,
    );
    instance.lineTo(left, topLeftYCoord);

    // Ellipse coefficients outer top left cap
    const c5 = rtl * (1.0 - KAPPA);

    // Clip outer top left cap
    instance.bezierCurveTo(left, top + c5, left + c5, top, left + rtl, top);
    instance.closePath();
    instance.clip();

    // Clip top right cap joins
    if (borderRightWidth) {
      const trSlope = -borderTopWidth / borderRightWidth;
      instance.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    } else {
      instance.moveTo(left + width, top + height);
    }

    instance.lineTo(left + width, top);
    instance.lineTo(left, top);

    if (borderLeftWidth) {
      const trSlope = -borderTopWidth / borderLeftWidth;
      instance.lineTo(left + width / 2, trSlope * (-width / 2) + top);
    } else {
      instance.lineTo(left, top + height);
    }
    instance.closePath();
    instance.clip();

    // TODO: Support dotted and dashed styles
    // Render solid border
    instance.rect(left, top, width, height);
    instance.fillColor(borderTopColor);
    instance.fill();

    // Restore from border top
    instance.restore();
  },
};

export default Borders;

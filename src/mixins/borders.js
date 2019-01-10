// Ref: https://www.w3.org/TR/css-backgrounds-3/#borders

// This constant is used to approximate a symmetrical arc using a cubic Bezier curve.
const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const Borders = {
  drawBorders() {
    this.root.instance.save();

    this.drawBorderTop();
    this.drawBorderRight();
    this.drawBorderBottom();
    this.drawBorderLeft();

    this.root.instance.restore();
  },

  drawBorderTop() {
    const { instance } = this.root;
    const layout = this.getAbsoluteLayout();
    const style = this.getComputedStyles();

    const { width, height } = layout;
    const { borderTopWidth, borderRightWidth, borderLeftWidth } = this;
    const {
      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderTopColor = 'black',
      borderTopStyle = 'solid',
    } = style;

    const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
    const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);

    const borderStyles = {
      borderTopWidth,
      borderRightWidth,
      borderLeftWidth,
      borderTopColor,
      borderTopStyle,
      borderTopLeftRadius,
      borderTopRightRadius,
    };

    instance.save();

    clipBorderTop(instance, layout, borderStyles, rtr, rtl);
    fillBorderTop(instance, layout, borderStyles, rtr, rtl);

    instance.restore();
  },

  drawBorderRight() {
    const { instance } = this.root;
    const { borderTopWidth, borderRightWidth, borderBottomWidth } = this;

    if (!borderRightWidth) return;

    const { top, left, width, height } = this.getAbsoluteLayout();
    const {
      borderTopRightRadius = 0,
      borderBottomRightRadius = 0,
      borderRightColor = 'black',
    } = this.getComputedStyles();

    const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
    const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);

    instance.save();

    // Clip outer right border edge
    instance.moveTo(left + width, top + rtr);
    instance.lineTo(left + width, top + height - rbr);

    // Ellipse coefficients outer bottom right cap
    const c0 = rbr * (1.0 - KAPPA);

    // Clip outer top right cap
    instance.bezierCurveTo(
      left + width,
      top + height - c0,
      left + width - c0,
      top + height,
      left + width - rbr,
      top + height,
    );

    // Move left in case the margin exceedes the radius
    const topBottomXCoord = left + width - Math.max(borderRightWidth, rbr);
    instance.lineTo(topBottomXCoord, top + height);

    // Clip inner bottom right cap
    instance.lineTo(topBottomXCoord, top + height - borderBottomWidth);

    // Ellipse coefficients inner bottom right cap
    const innerBottomRightRadiusX = Math.max(rbr - borderRightWidth, 0);
    const innerBottomRightRadiusY = Math.max(rbr - borderBottomWidth, 0);
    const c1 = innerBottomRightRadiusX * (1.0 - KAPPA);
    const c2 = innerBottomRightRadiusY * (1.0 - KAPPA);

    // Clip inner top right cap
    instance.bezierCurveTo(
      left + width - borderRightWidth - c1,
      top + height - borderBottomWidth,
      left + width - borderRightWidth,
      top + height - borderBottomWidth - c2,
      left + width - borderRightWidth,
      top + height - Math.max(rbr, borderBottomWidth),
    );

    // Clip inner right border edge
    instance.lineTo(
      left + width - borderRightWidth,
      top + Math.max(rtr, borderTopWidth),
    );

    // Ellipse coefficients inner top right cap
    const innerTopRightRadiusX = Math.max(rtr - borderRightWidth, 0);
    const innerTopRightRadiusY = Math.max(rtr - borderTopWidth, 0);
    const c3 = innerTopRightRadiusX * (1.0 - KAPPA);
    const c4 = innerTopRightRadiusY * (1.0 - KAPPA);
    const topRightXCoord = left + width - Math.max(rtr, borderRightWidth);

    // Clip inner top left cap
    instance.bezierCurveTo(
      left + width - borderRightWidth,
      top + borderTopWidth + c4,
      left + width - borderRightWidth - c3,
      top + borderTopWidth,
      topRightXCoord,
      top + borderTopWidth,
    );
    instance.lineTo(topRightXCoord, top);

    // Move right in case the margin exceedes the radius
    instance.lineTo(left + width - rtr, top);

    // Ellipse coefficients outer top right cap
    const c5 = rtr * (1.0 - KAPPA);

    // Clip outer top right cap
    instance.bezierCurveTo(
      left + width - c5,
      top,
      left + width,
      top + c5,
      left + width,
      top + rtr,
    );

    instance.closePath();
    instance.clip();

    // Clip border right cap joins
    if (borderTopWidth) {
      const trSlope = -borderTopWidth / borderRightWidth;
      instance.moveTo(left + width / 2, trSlope * (-width / 2) + top);
      instance.lineTo(left + width, top);
      instance.lineTo(left + width, top + height);
      instance.lineTo(left, top + height);
      instance.closePath();
      instance.clip();
    }

    if (borderBottomWidth) {
      const brSlope = borderBottomWidth / borderRightWidth;
      instance.moveTo(left + width / 2, brSlope * (-width / 2) + top + height);
      instance.lineTo(left + width, top + height);
      instance.lineTo(left + width, top);
      instance.lineTo(left, top);
      instance.closePath();
      instance.clip();
    }

    // TODO: Support dotted and dashed styles
    // Render solid border
    instance.rect(left, top, width, height);
    instance.fillColor(borderRightColor);
    instance.fill();

    instance.restore();
  },

  drawBorderBottom() {
    const { instance } = this.root;
    const { borderBottomWidth, borderRightWidth, borderLeftWidth } = this;

    if (!borderBottomWidth) return;

    const { top, left, width, height } = this.getAbsoluteLayout();
    const {
      borderBottomLeftRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomColor = 'black',
    } = this.getComputedStyles();

    const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
    const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);

    instance.save();

    // Clip outer top border edge
    instance.moveTo(left + width - rbr, top + height);
    instance.lineTo(left + rbl, top + height);

    // Ellipse coefficients outer top right cap
    const c0 = rbl * (1.0 - KAPPA);

    // Clip outer top right cap
    instance.bezierCurveTo(
      left + c0,
      top + height,
      left,
      top + height - c0,
      left,
      top + height - rbl,
    );

    // Move up in case the margin exceedes the radius
    const bottomLeftYCoord = top + height - Math.max(borderBottomWidth, rbl);
    instance.lineTo(left, bottomLeftYCoord);

    // Clip inner bottom left cap
    instance.lineTo(left + borderLeftWidth, bottomLeftYCoord);

    // Ellipse coefficients inner top right cap
    const innerBottomLeftRadiusX = Math.max(rbl - borderLeftWidth, 0);
    const innerBottomLeftRadiusY = Math.max(rbl - borderBottomWidth, 0);
    const c1 = innerBottomLeftRadiusX * (1.0 - KAPPA);
    const c2 = innerBottomLeftRadiusY * (1.0 - KAPPA);

    // Clip inner bottom left cap
    instance.bezierCurveTo(
      left + borderLeftWidth,
      top + height - borderBottomWidth - c2,
      left + borderLeftWidth + c1,
      top + height - borderBottomWidth,
      left + borderLeftWidth + innerBottomLeftRadiusX,
      top + height - borderBottomWidth,
    );

    // Clip inner bottom border edge
    instance.lineTo(
      left + width - Math.max(rbr, borderRightWidth),
      top + height - borderBottomWidth,
    );

    // Ellipse coefficients inner top left cap
    const innerBottomRightRadiusX = Math.max(rbr - borderRightWidth, 0);
    const innerBottomRightRadiusY = Math.max(rbr - borderBottomWidth, 0);
    const c3 = innerBottomRightRadiusX * (1.0 - KAPPA);
    const c4 = innerBottomRightRadiusY * (1.0 - KAPPA);
    const bottomRightYCoord = top + height - Math.max(borderBottomWidth, rbr);

    // Clip inner top left cap
    instance.bezierCurveTo(
      left + width - borderRightWidth - c3,
      top + height - borderBottomWidth,
      left + width - borderRightWidth,
      top + height - borderBottomWidth - c4,
      left + width - borderRightWidth,
      bottomRightYCoord,
    );
    instance.lineTo(left + width, bottomRightYCoord);

    // Move down in case the margin exceedes the radius
    instance.lineTo(left + width, top + height - rbr);

    // Ellipse coefficients outer top left cap
    const c5 = rbr * (1.0 - KAPPA);

    // Clip outer top left cap
    instance.bezierCurveTo(
      left + width,
      top + height - c5,
      left + width - c5,
      top + height,
      left + width - rbr,
      top + height,
    );
    instance.closePath();
    instance.clip();

    // Clip border bottom cap joins
    if (borderRightWidth) {
      const brSlope = borderBottomWidth / borderRightWidth;
      instance.moveTo(left + width / 2, brSlope * (-width / 2) + top + height);
      instance.lineTo(left + width, top + height);
      instance.lineTo(left, top + height);
      instance.lineTo(left, top);
      instance.closePath();
      instance.clip();
    }

    if (borderLeftWidth) {
      const trSlope = -borderBottomWidth / borderLeftWidth;
      instance.moveTo(left + width / 2, trSlope * (width / 2) + top + height);
      instance.lineTo(left, top + height);
      instance.lineTo(left + width, top + height);
      instance.lineTo(left + width, top);
      instance.closePath();
      instance.clip();
    }

    // TODO: Support dotted and dashed styles
    // Render solid border
    instance.rect(left, top, width, height);
    instance.fillColor(borderBottomColor);
    instance.fill();

    instance.restore();
  },

  drawBorderLeft() {
    const { instance } = this.root;
    const { borderTopWidth, borderLeftWidth, borderBottomWidth } = this;

    if (!borderLeftWidth) return;

    const { top, left, width, height } = this.getAbsoluteLayout();
    const {
      borderTopLeftRadius = 0,
      borderBottomLeftRadius = 0,
      borderLeftColor = 'black',
    } = this.getComputedStyles();

    const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
    const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);

    instance.save();

    // Clip outer left border edge
    instance.moveTo(left, top + height - rbl);
    instance.lineTo(left, top + rtl);

    // Ellipse coefficients outer top left cap
    const c0 = rtl * (1.0 - KAPPA);

    // Clip outer top left cap
    instance.bezierCurveTo(left, top + c0, left + c0, top, left + rtl, top);

    // Move right in case the margin exceedes the radius
    const topLeftCoordX = left + Math.max(borderLeftWidth, rtl);
    instance.lineTo(topLeftCoordX, top);

    // Clip inner top left cap
    instance.lineTo(topLeftCoordX, top + borderTopWidth);

    // Ellipse coefficients inner top left cap
    const innerTopLeftRadiusX = Math.max(rtl - borderLeftWidth, 0);
    const innerTopLeftRadiusY = Math.max(rtl - borderTopWidth, 0);
    const c1 = innerTopLeftRadiusX * (1.0 - KAPPA);
    const c2 = innerTopLeftRadiusY * (1.0 - KAPPA);

    // Clip inner top right cap
    instance.bezierCurveTo(
      left + borderLeftWidth + c1,
      top + borderTopWidth,
      left + borderLeftWidth,
      top + borderTopWidth + c2,
      left + borderLeftWidth,
      top + Math.max(rtl, borderTopWidth),
    );

    // Clip inner left border edge
    instance.lineTo(
      left + borderLeftWidth,
      top + height - Math.max(rbl, borderBottomWidth),
    );

    // Ellipse coefficients inner bottom left cap
    const innerBottomLeftRadiusX = Math.max(rbl - borderLeftWidth, 0);
    const innerBottomLeftRadiusY = Math.max(rbl - borderBottomWidth, 0);
    const c3 = innerBottomLeftRadiusX * (1.0 - KAPPA);
    const c4 = innerBottomLeftRadiusY * (1.0 - KAPPA);
    const bottomLeftXCoord = left + Math.max(rbl, borderLeftWidth);

    // Clip inner top left cap
    instance.bezierCurveTo(
      left + borderLeftWidth,
      top + height - borderBottomWidth - c4,
      left + borderLeftWidth + c3,
      top + height - borderBottomWidth,
      bottomLeftXCoord,
      top + height - borderBottomWidth,
    );
    instance.lineTo(bottomLeftXCoord, top + height);

    // Move left in case the margin exceedes the radius
    instance.lineTo(left + rbl, top + height);

    // Ellipse coefficients outer top right cap
    const c5 = rbl * (1.0 - KAPPA);

    // Clip outer top right cap
    instance.bezierCurveTo(
      left + c5,
      top + height,
      left,
      top + height - c5,
      left,
      top + height - rbl,
    );

    instance.closePath();
    instance.clip();

    // Clip border right cap joins
    if (borderBottomWidth) {
      const trSlope = -borderBottomWidth / borderLeftWidth;
      instance.moveTo(left + width / 2, trSlope * (width / 2) + top + height);
      instance.lineTo(left, top + height);
      instance.lineTo(left, top);
      instance.lineTo(left + width, top);
      instance.closePath();
      instance.clip();
    }

    if (borderBottomWidth) {
      const trSlope = -borderTopWidth / borderLeftWidth;
      instance.moveTo(left + width / 2, trSlope * (-width / 2) + top);
      instance.lineTo(left, top);
      instance.lineTo(left, top + height);
      instance.lineTo(left + width, top + height);
      instance.closePath();
      instance.clip();
    }

    // TODO: Support dotted and dashed styles
    // Render solid border
    instance.rect(left, top, width, height);
    instance.fillColor(borderLeftColor);
    instance.fill();

    instance.restore();
  },
};

const clipBorderTop = (ctx, layout, style, rtr, rtl) => {
  const { top, left, width, height } = layout;
  const { borderTopWidth, borderRightWidth, borderLeftWidth } = style;

  if (!borderTopWidth) return;

  // Clip outer top border edge
  ctx.moveTo(left + rtl, top);
  ctx.lineTo(left + width - rtr, top);

  // Ellipse coefficients outer top right cap
  const c0 = rtr * (1.0 - KAPPA);

  // Clip outer top right cap
  ctx.bezierCurveTo(
    left + width - c0,
    top,
    left + width,
    top + c0,
    left + width,
    top + rtr,
  );

  // Move down in case the margin exceedes the radius
  const topRightYCoord = top + Math.max(borderTopWidth, rtr);
  ctx.lineTo(left + width, topRightYCoord);

  // Clip inner top right cap
  ctx.lineTo(left + width - borderRightWidth, topRightYCoord);

  // Ellipse coefficients inner top right cap
  const innerTopRightRadiusX = Math.max(rtr - borderRightWidth, 0);
  const innerTopRightRadiusY = Math.max(rtr - borderTopWidth, 0);
  const c1 = innerTopRightRadiusX * (1.0 - KAPPA);
  const c2 = innerTopRightRadiusY * (1.0 - KAPPA);

  // Clip inner top right cap
  ctx.bezierCurveTo(
    left + width - borderRightWidth,
    top + borderTopWidth + c2,
    left + width - borderRightWidth - c1,
    top + borderTopWidth,
    left + width - borderRightWidth - innerTopRightRadiusX,
    top + borderTopWidth,
  );

  // Clip inner top border edge
  ctx.lineTo(left + Math.max(rtl, borderLeftWidth), top + borderTopWidth);

  // Ellipse coefficients inner top left cap
  const innerTopLeftRadiusX = Math.max(rtl - borderLeftWidth, 0);
  const innerTopLeftRadiusY = Math.max(rtl - borderTopWidth, 0);
  const c3 = innerTopLeftRadiusX * (1.0 - KAPPA);
  const c4 = innerTopLeftRadiusY * (1.0 - KAPPA);
  const topLeftYCoord = top + Math.max(borderTopWidth, rtl);

  // Clip inner top left cap
  ctx.bezierCurveTo(
    left + borderLeftWidth + c3,
    top + borderTopWidth,
    left + borderLeftWidth,
    top + borderTopWidth + c4,
    left + borderLeftWidth,
    topLeftYCoord,
  );
  ctx.lineTo(left, topLeftYCoord);

  // Move down in case the margin exceedes the radius
  ctx.lineTo(left, top + rtl);

  // Ellipse coefficients outer top left cap
  const c5 = rtl * (1.0 - KAPPA);

  // Clip outer top left cap
  ctx.bezierCurveTo(left, top + c5, left + c5, top, left + rtl, top);
  ctx.closePath();
  ctx.clip();

  // Clip border top cap joins
  if (borderRightWidth) {
    const trSlope = -borderTopWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left, top);
    ctx.lineTo(left, top + height);
    ctx.closePath();
    ctx.clip();
  }

  if (borderLeftWidth) {
    const trSlope = -borderTopWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left, top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left + width, top + height);
    ctx.closePath();
    ctx.clip();
  }
};

const fillBorderTop = (ctx, layout, style, rtr, rtl) => {
  const { top, left, width } = layout;
  const {
    borderTopColor,
    borderTopStyle,
    borderTopWidth,
    borderRightWidth,
    borderLeftWidth,
  } = style;

  const topLeftRadiusX = Math.max(rtl - borderLeftWidth / 2, 0);
  const topLeftRadiusY = Math.max(rtl - borderTopWidth / 2, 0);
  const topRightRadiusX = Math.max(rtr - borderRightWidth / 2, 0);
  const topRightRadiusY = Math.max(rtr - borderTopWidth / 2, 0);
  const c0 = topLeftRadiusX * (1.0 - KAPPA);
  const c1 = topLeftRadiusY * (1.0 - KAPPA);
  const c2 = topRightRadiusX * (1.0 - KAPPA);
  const c3 = topRightRadiusY * (1.0 - KAPPA);

  ctx.moveTo(left + borderLeftWidth / 2, top + Math.max(rtl, borderTopWidth));
  ctx.lineTo(left + borderLeftWidth / 2, top + rtl);
  ctx.bezierCurveTo(
    left + borderLeftWidth / 2,
    top + borderTopWidth / 2 + c1,
    left + borderLeftWidth / 2 + c0,
    top + borderTopWidth / 2,
    left + rtl,
    top + borderTopWidth / 2,
  );
  ctx.lineTo(left + width - rtr, top + borderTopWidth / 2);
  ctx.bezierCurveTo(
    left + width - borderRightWidth / 2 - c2,
    top + borderTopWidth / 2,
    left + width - borderLeftWidth / 2,
    top + borderTopWidth / 2 + c3,
    left + width - borderRightWidth / 2,
    top + rtr,
  );
  ctx.lineTo(
    left + width - borderRightWidth / 2,
    top + Math.max(rtr, borderTopWidth),
  );

  ctx.strokeColor(borderTopColor);
  ctx.lineWidth(Math.max(borderLeftWidth, borderTopWidth, borderLeftWidth));

  if (borderTopStyle === 'dashed') {
    ctx.dash(borderTopWidth * 2, { space: borderTopWidth * 1.2 });
  } else if (borderTopStyle === 'dotted') {
    ctx.dash(borderTopWidth, { space: borderTopWidth * 1.2 });
  }

  ctx.stroke();
  ctx.undash();
};

export default Borders;

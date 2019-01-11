// Ref: https://www.w3.org/TR/css-backgrounds-3/#borders

// This constant is used to approximate a symmetrical arc using a cubic Bezier curve.
const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

function drawBorders() {
  const { instance } = this.root;
  const layout = this.getAbsoluteLayout();

  const {
    borderTopWidth,
    borderLeftWidth,
    borderRightWidth,
    borderBottomWidth,
  } = this;

  const {
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomLeftRadius = 0,
    borderBottomRightRadius = 0,
    borderTopColor = 'black',
    borderTopStyle = 'solid',
    borderLeftColor = 'black',
    borderLeftStyle = 'solid',
    borderRightColor = 'black',
    borderRightStyle = 'solid',
    borderBottomColor = 'black',
    borderBottomStyle = 'solid',
  } = this.getComputedStyles();

  const style = {
    borderTopColor,
    borderTopWidth,
    borderTopStyle,
    borderLeftColor,
    borderLeftWidth,
    borderLeftStyle,
    borderRightColor,
    borderRightWidth,
    borderRightStyle,
    borderBottomColor,
    borderBottomWidth,
    borderBottomStyle,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  };

  const { width, height } = layout;
  const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);

  instance.save();

  instance.save();
  clipBorderTop(instance, layout, style, rtr, rtl);
  fillBorderTop(instance, layout, style, rtr, rtl);
  instance.restore();

  instance.save();
  clipBorderRight(instance, layout, style, rtr, rbr);
  fillBorderRight(instance, layout, style, rtr, rbr);
  instance.restore();

  instance.save();
  clipBorderBottom(instance, layout, style, rbl, rbr);
  fillBorderBottom(instance, layout, style, rbl, rbr);
  instance.restore();

  instance.save();
  clipBorderLeft(instance, layout, style, rbl, rtl);
  fillBorderLeft(instance, layout, style, rbl, rtl);
  instance.restore();

  instance.restore();
}

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

const clipBorderRight = (ctx, layout, style, rtr, rbr) => {
  const { top, left, width, height } = layout;
  const { borderTopWidth, borderRightWidth, borderBottomWidth } = style;

  if (!borderRightWidth) return;

  // Clip outer right border edge
  ctx.moveTo(left + width, top + rtr);
  ctx.lineTo(left + width, top + height - rbr);

  // Ellipse coefficients outer bottom right cap
  const c0 = rbr * (1.0 - KAPPA);

  // Clip outer top right cap
  ctx.bezierCurveTo(
    left + width,
    top + height - c0,
    left + width - c0,
    top + height,
    left + width - rbr,
    top + height,
  );

  // Move left in case the margin exceedes the radius
  const topBottomXCoord = left + width - Math.max(borderRightWidth, rbr);
  ctx.lineTo(topBottomXCoord, top + height);

  // Clip inner bottom right cap
  ctx.lineTo(topBottomXCoord, top + height - borderBottomWidth);

  // Ellipse coefficients inner bottom right cap
  const innerBottomRightRadiusX = Math.max(rbr - borderRightWidth, 0);
  const innerBottomRightRadiusY = Math.max(rbr - borderBottomWidth, 0);
  const c1 = innerBottomRightRadiusX * (1.0 - KAPPA);
  const c2 = innerBottomRightRadiusY * (1.0 - KAPPA);

  // Clip inner top right cap
  ctx.bezierCurveTo(
    left + width - borderRightWidth - c1,
    top + height - borderBottomWidth,
    left + width - borderRightWidth,
    top + height - borderBottomWidth - c2,
    left + width - borderRightWidth,
    top + height - Math.max(rbr, borderBottomWidth),
  );

  // Clip inner right border edge
  ctx.lineTo(
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
  ctx.bezierCurveTo(
    left + width - borderRightWidth,
    top + borderTopWidth + c4,
    left + width - borderRightWidth - c3,
    top + borderTopWidth,
    topRightXCoord,
    top + borderTopWidth,
  );
  ctx.lineTo(topRightXCoord, top);

  // Move right in case the margin exceedes the radius
  ctx.lineTo(left + width - rtr, top);

  // Ellipse coefficients outer top right cap
  const c5 = rtr * (1.0 - KAPPA);

  // Clip outer top right cap
  ctx.bezierCurveTo(
    left + width - c5,
    top,
    left + width,
    top + c5,
    left + width,
    top + rtr,
  );

  ctx.closePath();
  ctx.clip();

  // Clip border right cap joins
  if (borderTopWidth) {
    const trSlope = -borderTopWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.closePath();
    ctx.clip();
  }

  if (borderBottomWidth) {
    const brSlope = borderBottomWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, brSlope * (-width / 2) + top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left, top);
    ctx.closePath();
    ctx.clip();
  }
};

const fillBorderRight = (ctx, layout, style) => {
  const { top, left, width, height } = layout;
  const { borderRightColor } = style;

  // TODO: Support dotted and dashed styles
  // Render solid border
  ctx.rect(left, top, width, height);
  ctx.fillColor(borderRightColor);
  ctx.fill();
};

const clipBorderBottom = (ctx, layout, style, rbl, rbr) => {
  const { top, left, width, height } = layout;
  const { borderBottomWidth, borderRightWidth, borderLeftWidth } = style;

  if (!borderBottomWidth) return;

  // Clip outer top border edge
  ctx.moveTo(left + width - rbr, top + height);
  ctx.lineTo(left + rbl, top + height);

  // Ellipse coefficients outer top right cap
  const c0 = rbl * (1.0 - KAPPA);

  // Clip outer top right cap
  ctx.bezierCurveTo(
    left + c0,
    top + height,
    left,
    top + height - c0,
    left,
    top + height - rbl,
  );

  // Move up in case the margin exceedes the radius
  const bottomLeftYCoord = top + height - Math.max(borderBottomWidth, rbl);
  ctx.lineTo(left, bottomLeftYCoord);

  // Clip inner bottom left cap
  ctx.lineTo(left + borderLeftWidth, bottomLeftYCoord);

  // Ellipse coefficients inner top right cap
  const innerBottomLeftRadiusX = Math.max(rbl - borderLeftWidth, 0);
  const innerBottomLeftRadiusY = Math.max(rbl - borderBottomWidth, 0);
  const c1 = innerBottomLeftRadiusX * (1.0 - KAPPA);
  const c2 = innerBottomLeftRadiusY * (1.0 - KAPPA);

  // Clip inner bottom left cap
  ctx.bezierCurveTo(
    left + borderLeftWidth,
    top + height - borderBottomWidth - c2,
    left + borderLeftWidth + c1,
    top + height - borderBottomWidth,
    left + borderLeftWidth + innerBottomLeftRadiusX,
    top + height - borderBottomWidth,
  );

  // Clip inner bottom border edge
  ctx.lineTo(
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
  ctx.bezierCurveTo(
    left + width - borderRightWidth - c3,
    top + height - borderBottomWidth,
    left + width - borderRightWidth,
    top + height - borderBottomWidth - c4,
    left + width - borderRightWidth,
    bottomRightYCoord,
  );
  ctx.lineTo(left + width, bottomRightYCoord);

  // Move down in case the margin exceedes the radius
  ctx.lineTo(left + width, top + height - rbr);

  // Ellipse coefficients outer top left cap
  const c5 = rbr * (1.0 - KAPPA);

  // Clip outer top left cap
  ctx.bezierCurveTo(
    left + width,
    top + height - c5,
    left + width - c5,
    top + height,
    left + width - rbr,
    top + height,
  );
  ctx.closePath();
  ctx.clip();

  // Clip border bottom cap joins
  if (borderRightWidth) {
    const brSlope = borderBottomWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, brSlope * (-width / 2) + top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left, top);
    ctx.closePath();
    ctx.clip();
  }

  if (borderLeftWidth) {
    const trSlope = -borderBottomWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (width / 2) + top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left + width, top);
    ctx.closePath();
    ctx.clip();
  }
};

const fillBorderBottom = (ctx, layout, style) => {
  const { top, left, width, height } = layout;
  const { borderBottomColor } = style;

  // TODO: Support dotted and dashed styles
  // Render solid border
  ctx.rect(left, top, width, height);
  ctx.fillColor(borderBottomColor);
  ctx.fill();
};

const clipBorderLeft = (ctx, layout, style, rbl, rtl) => {
  const { top, left, width, height } = layout;
  const { borderTopWidth, borderLeftWidth, borderBottomWidth } = style;

  if (!borderLeftWidth) return;

  // Clip outer left border edge
  ctx.moveTo(left, top + height - rbl);
  ctx.lineTo(left, top + rtl);

  // Ellipse coefficients outer top left cap
  const c0 = rtl * (1.0 - KAPPA);

  // Clip outer top left cap
  ctx.bezierCurveTo(left, top + c0, left + c0, top, left + rtl, top);

  // Move right in case the margin exceedes the radius
  const topLeftCoordX = left + Math.max(borderLeftWidth, rtl);
  ctx.lineTo(topLeftCoordX, top);

  // Clip inner top left cap
  ctx.lineTo(topLeftCoordX, top + borderTopWidth);

  // Ellipse coefficients inner top left cap
  const innerTopLeftRadiusX = Math.max(rtl - borderLeftWidth, 0);
  const innerTopLeftRadiusY = Math.max(rtl - borderTopWidth, 0);
  const c1 = innerTopLeftRadiusX * (1.0 - KAPPA);
  const c2 = innerTopLeftRadiusY * (1.0 - KAPPA);

  // Clip inner top right cap
  ctx.bezierCurveTo(
    left + borderLeftWidth + c1,
    top + borderTopWidth,
    left + borderLeftWidth,
    top + borderTopWidth + c2,
    left + borderLeftWidth,
    top + Math.max(rtl, borderTopWidth),
  );

  // Clip inner left border edge
  ctx.lineTo(
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
  ctx.bezierCurveTo(
    left + borderLeftWidth,
    top + height - borderBottomWidth - c4,
    left + borderLeftWidth + c3,
    top + height - borderBottomWidth,
    bottomLeftXCoord,
    top + height - borderBottomWidth,
  );
  ctx.lineTo(bottomLeftXCoord, top + height);

  // Move left in case the margin exceedes the radius
  ctx.lineTo(left + rbl, top + height);

  // Ellipse coefficients outer top right cap
  const c5 = rbl * (1.0 - KAPPA);

  // Clip outer top right cap
  ctx.bezierCurveTo(
    left + c5,
    top + height,
    left,
    top + height - c5,
    left,
    top + height - rbl,
  );

  ctx.closePath();
  ctx.clip();

  // Clip border right cap joins
  if (borderBottomWidth) {
    const trSlope = -borderBottomWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (width / 2) + top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left, top);
    ctx.lineTo(left + width, top);
    ctx.closePath();
    ctx.clip();
  }

  if (borderBottomWidth) {
    const trSlope = -borderTopWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left, top);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left + width, top + height);
    ctx.closePath();
    ctx.clip();
  }
};

const fillBorderLeft = (ctx, layout, style, rbl, rtl) => {
  const { top, left, width, height } = layout;
  const { borderLeftColor } = style;

  // TODO: Support dotted and dashed styles
  // Render solid border
  ctx.rect(left, top, width, height);
  ctx.fillColor(borderLeftColor);
  ctx.fill();
};

export default { drawBorders };

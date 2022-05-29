// Ref: https://www.w3.org/TR/css-backgrounds-3/#borders

// This constant is used to approximate a symmetrical arc using a cubic Bezier curve.
const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const clipBorderTop = (ctx, layout, style, rtr, rtl) => {
  const { top, left, width, height } = layout;
  const { borderTopWidth, borderRightWidth, borderLeftWidth } = style;

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
    borderTopWidth,
    borderTopStyle,
    borderRightWidth,
    borderLeftWidth,
  } = style;

  const c0 = rtl * (1.0 - KAPPA);
  const c1 = rtr * (1.0 - KAPPA);

  ctx.moveTo(left, top + Math.max(rtl, borderTopWidth));
  ctx.bezierCurveTo(left, top + c0, left + c0, top, left + rtl, top);
  ctx.lineTo(left + width - rtr, top);
  ctx.bezierCurveTo(
    left + width - c1,
    top,
    left + width,
    top + c1,
    left + width,
    top + rtr,
  );

  ctx.strokeColor(borderTopColor);
  ctx.lineWidth(
    Math.max(borderRightWidth, borderTopWidth, borderLeftWidth) * 2,
  );

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

const fillBorderRight = (ctx, layout, style, rtr, rbr) => {
  const { top, left, width, height } = layout;
  const {
    borderRightColor,
    borderRightStyle,
    borderRightWidth,
    borderTopWidth,
    borderBottomWidth,
  } = style;

  const c0 = rbr * (1.0 - KAPPA);
  const c1 = rtr * (1.0 - KAPPA);

  ctx.moveTo(left + width - rtr, top);
  ctx.bezierCurveTo(
    left + width - c1,
    top,
    left + width,
    top + c1,
    left + width,
    top + rtr,
  );
  ctx.lineTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(
    left + width,
    top + height - c0,
    left + width - c0,
    top + height,
    left + width - rbr,
    top + height,
  );

  ctx.strokeColor(borderRightColor);
  ctx.lineWidth(
    Math.max(borderRightWidth, borderTopWidth, borderBottomWidth) * 2,
  );

  if (borderRightStyle === 'dashed') {
    ctx.dash(borderRightWidth * 2, { space: borderRightWidth * 1.2 });
  } else if (borderRightStyle === 'dotted') {
    ctx.dash(borderRightWidth, { space: borderRightWidth * 1.2 });
  }

  ctx.stroke();
  ctx.undash();
};

const clipBorderBottom = (ctx, layout, style, rbl, rbr) => {
  const { top, left, width, height } = layout;
  const { borderBottomWidth, borderRightWidth, borderLeftWidth } = style;

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

const fillBorderBottom = (ctx, layout, style, rbl, rbr) => {
  const { top, left, width, height } = layout;
  const {
    borderBottomColor,
    borderBottomStyle,
    borderBottomWidth,
    borderRightWidth,
    borderLeftWidth,
  } = style;

  const c0 = rbl * (1.0 - KAPPA);
  const c1 = rbr * (1.0 - KAPPA);

  ctx.moveTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(
    left + width,
    top + height - c1,
    left + width - c1,
    top + height,
    left + width - rbr,
    top + height,
  );
  ctx.lineTo(left + rbl, top + height);
  ctx.bezierCurveTo(
    left + c0,
    top + height,
    left,
    top + height - c0,
    left,
    top + height - rbl,
  );

  ctx.strokeColor(borderBottomColor);
  ctx.lineWidth(
    Math.max(borderBottomWidth, borderRightWidth, borderLeftWidth) * 2,
  );

  if (borderBottomStyle === 'dashed') {
    ctx.dash(borderBottomWidth * 2, { space: borderBottomWidth * 1.2 });
  } else if (borderBottomStyle === 'dotted') {
    ctx.dash(borderBottomWidth, { space: borderBottomWidth * 1.2 });
  }

  ctx.stroke();
  ctx.undash();
};

const clipBorderLeft = (ctx, layout, style, rbl, rtl) => {
  const { top, left, width, height } = layout;
  const { borderTopWidth, borderLeftWidth, borderBottomWidth } = style;

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
  const { top, left, height } = layout;
  const {
    borderLeftColor,
    borderLeftStyle,
    borderLeftWidth,
    borderTopWidth,
    borderBottomWidth,
  } = style;

  const c0 = rbl * (1.0 - KAPPA);
  const c1 = rtl * (1.0 - KAPPA);

  ctx.moveTo(left + rbl, top + height);
  ctx.bezierCurveTo(
    left + c0,
    top + height,
    left,
    top + height - c0,
    left,
    top + height - rbl,
  );
  ctx.lineTo(left, top + rtl);
  ctx.bezierCurveTo(left, top + c1, left + c1, top, left + rtl, top);

  ctx.strokeColor(borderLeftColor);
  ctx.lineWidth(
    Math.max(borderLeftWidth, borderTopWidth, borderBottomWidth) * 2,
  );

  if (borderLeftStyle === 'dashed') {
    ctx.dash(borderLeftWidth * 2, { space: borderLeftWidth * 1.2 });
  } else if (borderLeftStyle === 'dotted') {
    ctx.dash(borderLeftWidth, { space: borderLeftWidth * 1.2 });
  }

  ctx.stroke();
  ctx.undash();
};

const shouldRenderBorders = node =>
  node.box &&
  (node.box.borderTopWidth ||
    node.box.borderRightWidth ||
    node.box.borderBottomWidth ||
    node.box.borderLeftWidth);

const renderBorders = (ctx, node) => {
  if (!shouldRenderBorders(node)) return;

  const {
    width,
    height,
    borderTopWidth,
    borderLeftWidth,
    borderRightWidth,
    borderBottomWidth,
  } = node.box;

  const {
    opacity,
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
  } = node.style;

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

  const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);

  ctx.save();
  ctx.strokeOpacity(opacity);

  if (borderTopWidth) {
    ctx.save();
    clipBorderTop(ctx, node.box, style, rtr, rtl);
    fillBorderTop(ctx, node.box, style, rtr, rtl);
    ctx.restore();
  }

  if (borderRightWidth) {
    ctx.save();
    clipBorderRight(ctx, node.box, style, rtr, rbr);
    fillBorderRight(ctx, node.box, style, rtr, rbr);
    ctx.restore();
  }

  if (borderBottomWidth) {
    ctx.save();
    clipBorderBottom(ctx, node.box, style, rbl, rbr);
    fillBorderBottom(ctx, node.box, style, rbl, rbr);
    ctx.restore();
  }

  if (borderLeftWidth) {
    ctx.save();
    clipBorderLeft(ctx, node.box, style, rbl, rtl);
    fillBorderLeft(ctx, node.box, style, rbl, rtl);
    ctx.restore();
  }

  ctx.restore();
};

export default renderBorders;

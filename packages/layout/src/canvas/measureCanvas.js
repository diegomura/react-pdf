/* eslint-disable no-param-reassign */

import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import isHeightAuto from '../page/isHeightAuto';

const SAFETY_HEIGHT = 10;

const getMax = (values) => Math.max(-Infinity, ...values);

/**
 * Helper object to predict canvas size
 * TODO: Implement remaining functions (as close as possible);
 */
const measureCtx = () => {
  const ctx = {};
  const points = [];

  const nil = () => ctx;
  const addPoint = (x, y) => points.push([x, y]);

  const moveTo = (...args) => {
    addPoint(...args);
    return ctx;
  };

  const rect = (x, y, w, h) => {
    addPoint(x, y);
    addPoint(x + w, y);
    addPoint(x, y + h);
    addPoint(x + w, y + h);
    return ctx;
  };

  const ellipse = (x, y, rx, ry) => {
    ry = ry || rx;

    addPoint(x - rx, y - ry);
    addPoint(x + rx, y - ry);
    addPoint(x + rx, y + ry);
    addPoint(x - rx, y + ry);

    return ctx;
  };

  const polygon = (...pts) => {
    points.push(...pts);
    return ctx;
  };

  // Change dimensions
  ctx.rect = rect;
  ctx.moveTo = moveTo;
  ctx.lineTo = moveTo;
  ctx.circle = ellipse;
  ctx.polygon = polygon;
  ctx.ellipse = ellipse;
  ctx.roundedRect = rect;

  // To be implemented
  ctx.text = nil;
  ctx.path = nil;
  ctx.lineWidth = nil;
  ctx.bezierCurveTo = nil;
  ctx.quadraticCurveTo = nil;

  ctx.scale = nil;
  ctx.rotate = nil;
  ctx.translate = nil;

  // These don't change dimensions
  ctx.dash = nil;
  ctx.clip = nil;
  ctx.save = nil;
  ctx.fill = nil;
  ctx.font = nil;
  ctx.stroke = nil;
  ctx.lineCap = nil;
  ctx.opacity = nil;
  ctx.restore = nil;
  ctx.lineJoin = nil;
  ctx.fontSize = nil;
  ctx.fillColor = nil;
  ctx.miterLimit = nil;
  ctx.strokeColor = nil;
  ctx.fillOpacity = nil;
  ctx.strokeOpacity = nil;
  ctx.linearGradient = nil;
  ctx.radialGradient = nil;

  ctx.getWidth = () => getMax(points.map((p) => p[0]));
  ctx.getHeight = () => getMax(points.map((p) => p[1]));

  return ctx;
};

/**
 * @typedef {Function} MeasureCanvas
 * @returns {{ width: number, height: number }} canvas width and height
 */

/**
 * Yoga canvas measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @returns {MeasureCanvas} measure canvas
 */
const measureCanvas = (page, node) => () => {
  const imageMargin = getMargin(node);
  const pagePadding = getPadding(page);
  const pageArea = isHeightAuto(page)
    ? Infinity
    : page.box.height -
      pagePadding.paddingTop -
      pagePadding.paddingBottom -
      imageMargin.marginTop -
      imageMargin.marginBottom -
      SAFETY_HEIGHT;

  const ctx = measureCtx();

  node.props.paint(ctx);

  const width = ctx.getWidth();
  const height = Math.min(pageArea, ctx.getHeight());

  return { width, height };
};

export default measureCanvas;

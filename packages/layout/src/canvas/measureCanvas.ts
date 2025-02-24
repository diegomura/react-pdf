import { MeasureFunction } from 'yoga-layout/load';
import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import isHeightAuto from '../page/isHeightAuto';
import { SafePageNode } from '../types';
import { SafeCanvasNode } from '../types/canvas';

const SAFETY_HEIGHT = 10;

type Point = [number, number];

const getMax = (values: number[]) => Math.max(-Infinity, ...values);

/**
 * Helper object to predict canvas size
 * TODO: Implement remaining functions (as close as possible);
 */
const measureCtx = () => {
  const ctx: any = {};
  const points: Point[] = [];

  const nil = () => ctx;
  const addPoint = (x: number, y: number) => points.push([x, y]);

  const moveTo = (x: number, y: number) => {
    addPoint(x, y);
    return ctx;
  };

  const rect = (x: number, y: number, w: number, h: number) => {
    addPoint(x, y);
    addPoint(x + w, y);
    addPoint(x, y + h);
    addPoint(x + w, y + h);
    return ctx;
  };

  const ellipse = (x: number, y: number, rx: number, ry: number) => {
    ry = ry || rx;

    addPoint(x - rx, y - ry);
    addPoint(x + rx, y - ry);
    addPoint(x + rx, y + ry);
    addPoint(x - rx, y + ry);

    return ctx;
  };

  const polygon = (...pts: Point[]) => {
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
const measureCanvas =
  (page: SafePageNode, node: SafeCanvasNode): MeasureFunction =>
  () => {
    const imageMargin = getMargin(node);
    const pagePadding = getPadding(page);

    // TODO: Check image percentage margins
    const pageArea = isHeightAuto(page)
      ? Infinity
      : (page.box?.height || 0) -
        (pagePadding.paddingTop as number) -
        (pagePadding.paddingBottom as number) -
        (imageMargin.marginTop as number) -
        (imageMargin.marginBottom as number) -
        SAFETY_HEIGHT;

    const ctx = measureCtx();

    node.props.paint(ctx);

    const width = ctx.getWidth();
    const height = Math.min(pageArea, ctx.getHeight());

    return { width, height };
  };

export default measureCanvas;

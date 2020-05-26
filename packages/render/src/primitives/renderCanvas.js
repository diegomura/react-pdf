import * as R from 'ramda';

const availableMethods = [
  'dash',
  'clip',
  'save',
  'path',
  'fill',
  'font',
  'text',
  'rect',
  'scale',
  'moveTo',
  'lineTo',
  'stroke',
  'rotate',
  'circle',
  'lineCap',
  'opacity',
  'ellipse',
  'polygon',
  'restore',
  'lineJoin',
  'fontSize',
  'fillColor',
  'lineWidth',
  'translate',
  'miterLimit',
  'strokeColor',
  'fillOpacity',
  'roundedRect',
  'strokeOpacity',
  'bezierCurveTo',
  'quadraticCurveTo',
  'linearGradient',
  'radialGradient',
];

const painter = function(ctx) {
  const p = availableMethods.reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: (...args) => {
        ctx[prop](...args);
        return p;
      },
    }),
    {},
  );

  return p;
};

const defaultsZero = R.propOr(0);

const renderCanvas = (ctx, node) => {
  const { top, left, width, height } = node.box;

  const paddingTop = defaultsZero('paddingTop', node.box);
  const paddingLeft = defaultsZero('paddingLeft', node.box);
  const paddingRight = defaultsZero('paddingRight', node.box);
  const paddingBottom = defaultsZero('paddingBottom', node.box);

  const availableWidth = width - paddingLeft - paddingRight;
  const availableHeight = height - paddingTop - paddingBottom;

  if (!availableWidth || !availableHeight) {
    console.warn(
      'Canvas element has null width or height. Please provide valid values via the `style` prop in order to correctly render it.',
    );
  }

  ctx.save().translate(left + paddingLeft, top + paddingTop);

  if (node.props.paint) {
    node.props.paint(painter(ctx), availableWidth, availableHeight);
  }

  ctx.restore();

  return node;
};

export default R.curryN(2, renderCanvas);

export const availableMethods = [
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
  'fillAndStroke',
  'bezierCurveTo',
  'quadraticCurveTo',
];

const painter = function(instance) {
  const p = availableMethods.reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: (...args) => {
        instance[prop](...args);
        return p;
      },
    }),
    {},
  );

  p.linearGradient = (...args) => instance.linearGradient(...args);

  p.radialGradient = (...args) => instance.linearGradient(...args);

  return p;
};

export default painter;

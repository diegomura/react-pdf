const availableMethods = [
  'clip',
  'path',
  'fill',
  'font',
  'text',
  'rect',
  'scale',
  'moveTo',
  'lineTo',
  'stroke',
  'circle',
  'fontSize',
  'fillColor',
  'lineWidth',
  'translate',
  'strokeColor',
  'fillOpacity',
  'strokeOpacity',
  'opacity',
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

  return p;
};

export default painter;

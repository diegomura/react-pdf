import * as R from 'ramda';

const SVG_INHERITED_PROPS = [
  'x',
  'y',
  'clipPath',
  'clipRule',
  'opacity',
  'fill',
  'fillOpacity',
  'fillRule',
  'stroke',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeOpacity',
  'strokeWidth',
  'textAnchor',
  'dominantBaseline',
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'opacity',
  'textDecoration',
  'lineHeight',
  'textAlign',
  'visibility',
  'wordSpacing',
];

const getInheritProps = node => {
  const props = node.props || {};
  return R.pick(SVG_INHERITED_PROPS, props);
};

const inheritProps = node => {
  const props = getInheritProps(node);

  return R.evolve({
    children: R.map(
      R.compose(
        inheritProps,
        R.evolve({
          props: R.mergeRight(props),
        }),
      ),
    ),
  })(node);
};

export default inheritProps;

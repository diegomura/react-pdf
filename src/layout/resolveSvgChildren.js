import * as R from 'ramda';

import isSvg from '../node/isSvg';
import getDefs from '../svg/getDefs';
import detachDefs from '../svg/detachDefs';
import parsePoints from '../svg/parsePoints';
import parseViewbox from '../svg/parseViewbox';
import matchPercent from '../utils/matchPercent';
import parseAspectRatio from '../svg/parseAspectRatio';

const STYLE_PROPS = [
  'width',
  'height',
  'color',
  'stroke',
  'strokeWidth',
  'opacity',
  'fillOpacity',
  'strokeOpacity',
  'fill',
  'fillRule',
  'clipPath',
  'transform',
  'strokeLinejoin',
  'strokeLinecap',
  'strokeDasharray',
];

const VERTICAL_PROPS = ['y', 'y1', 'y2', 'height', 'cy', 'ry'];
const HORIZONTAL_PROPS = ['x', 'x1', 'x2', 'width', 'cx', 'rx'];

const transformPercent = container =>
  R.mapObjIndexed((value, key) => {
    const match = matchPercent(value);

    if (match && VERTICAL_PROPS.includes(key)) {
      return match.percent * container.height;
    }

    if (match && HORIZONTAL_PROPS.includes(key)) {
      return match.percent * container.width;
    }

    return value;
  });

const parseProps = container =>
  R.compose(
    R.evolve({
      props: R.o(
        R.evolve({
          x: parseFloat,
          x1: parseFloat,
          x2: parseFloat,
          y: parseFloat,
          y1: parseFloat,
          y2: parseFloat,
          r: parseFloat,
          rx: parseFloat,
          ry: parseFloat,
          cx: parseFloat,
          cy: parseFloat,
          width: parseFloat,
          height: parseFloat,
          points: parsePoints,
        }),
        transformPercent(container),
      ),
    }),
  );

const mergeStyles = node => {
  const style = R.propOr({}, 'style', node);
  return R.evolve({ props: R.merge(style) }, node);
};

const removeNoneValues = R.evolve({
  props: R.map(R.when(R.equals('none'), R.always(null))),
});

const getRootContainer = R.compose(
  R.map(parseFloat),
  R.pick(['width', 'height']),
  R.prop('props'),
);

const pickStyleProps = node => {
  const styleProps = R.o(R.pick(STYLE_PROPS), R.propOr({}, 'props'))(node);
  return R.evolve({ style: R.merge(styleProps) }, node);
};

const parseDefs = defs =>
  R.compose(
    R.prop(R.__, defs),
    R.prop(1),
    R.match(/url\(#(.+)\)/),
  );

const parseNodeDefs = defs => node =>
  R.compose(
    R.evolve({
      props: R.evolve({
        clipPath: parseDefs(defs),
      }),
    }),
    R.evolve({ children: R.map(parseNodeDefs(defs)) }),
  )(node);

const parseSvgDefs = root => {
  const defs = getDefs(root);
  return R.evolve({ children: R.map(parseNodeDefs(defs)) }, root);
};

const parseSvgProps = R.evolve({
  props: R.evolve({
    viewBox: parseViewbox,
    preserveAspectRatio: parseAspectRatio,
  }),
});

const parseSvgChildren = container => node =>
  R.evolve({
    children: R.map(
      R.compose(
        parseSvgChildren(container),
        parseProps(container),
        removeNoneValues,
        mergeStyles,
      ),
    ),
  })(node);

const resolveSvgRoot = node => {
  const container = getRootContainer(node);

  return R.compose(
    detachDefs,
    parseSvgDefs,
    parseSvgProps,
    pickStyleProps,
    parseSvgChildren(container),
  )(node);
};

const resolveSvgChildren = node =>
  R.compose(
    R.evolve({ children: R.map(resolveSvgChildren) }),
    R.when(isSvg, resolveSvgRoot),
  )(node);

export default resolveSvgChildren;

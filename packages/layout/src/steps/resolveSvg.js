import * as R from 'ramda';

import isSvg from '../node/isSvg';
import isText from '../node/isText';

import layoutText from '../svg/layoutText';
import replaceDefs from '../svg/replaceDefs';
import getContainer from '../svg/getContainer';
import parseViewbox from '../svg/parseViewbox';
import inheritProps from '../svg/inheritProps';
import matchPercent from '../utils/matchPercent';
import isTextInstance from '../node/isTextInstance';
import parseAspectRatio from '../svg/parseAspectRatio';
import { transformColor } from '../stylesheet/transformColors';

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
  'offset',
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

const parsePercent = value => {
  const match = matchPercent(value);
  return match ? match.percent : parseFloat(value);
};

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
          offset: parsePercent,
          fill: transformColor,
          opacity: parsePercent,
          stroke: transformColor,
          stopOpacity: parsePercent,
          stopColor: transformColor,
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

const pickStyleProps = node => {
  const styleProps = R.o(R.pick(STYLE_PROPS), R.propOr({}, 'props'))(node);
  return R.evolve({ style: R.merge(styleProps) }, node);
};

const parseSvgProps = R.evolve({
  props: R.evolve({
    width: parseFloat,
    height: parseFloat,
    viewBox: parseViewbox,
    preserveAspectRatio: parseAspectRatio,
  }),
});

const wrapBetweenTspan = node => ({
  type: 'TSPAN',
  props: {},
  children: [node],
});

const addMissingTspan = R.when(
  isText,
  R.evolve({
    children: R.map(R.when(isTextInstance, wrapBetweenTspan)),
  }),
);

const resolveSvgNode = container =>
  R.compose(
    parseProps(container),
    addMissingTspan,
    removeNoneValues,
    mergeStyles,
  );

const resolveChildren = container => node =>
  R.evolve({
    children: R.map(
      R.compose(
        resolveChildren(container),
        resolveSvgNode(container),
      ),
    ),
  })(node);

const parseText = node =>
  R.ifElse(
    isText,
    layoutText,
    R.evolve({
      children: R.map(parseText),
    }),
  )(node);

const resolveSvgRoot = node => {
  const container = getContainer(node);

  return R.compose(
    replaceDefs,
    parseText,
    parseSvgProps,
    pickStyleProps,
    inheritProps,
    resolveChildren(container),
  )(node);
};

const resolveSvg = node =>
  R.compose(
    R.evolve({ children: R.map(resolveSvg) }),
    R.when(isSvg, resolveSvgRoot),
  )(node);

export default resolveSvg;

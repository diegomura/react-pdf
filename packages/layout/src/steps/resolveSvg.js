import * as R from 'ramda';
import * as P from '@react-pdf/primitives';
import { transformColor, processTransform } from '@react-pdf/stylesheet';

import layoutText from '../svg/layoutText';
import replaceDefs from '../svg/replaceDefs';
import getContainer from '../svg/getContainer';
import parseViewbox from '../svg/parseViewbox';
import inheritProps from '../svg/inheritProps';
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
  'offset',
  'transform',
  'strokeLinejoin',
  'strokeLinecap',
  'strokeDasharray',
];

const VERTICAL_PROPS = ['y', 'y1', 'y2', 'height', 'cy', 'ry'];
const HORIZONTAL_PROPS = ['x', 'x1', 'x2', 'width', 'cx', 'rx'];

const isType = R.propEq('type');

const isSvg = isType(P.Svg);

const isText = isType(P.Text);

const isTextInstance = isType(P.TextInstance);

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
          transform: processTransform,
        }),
        transformPercent(container),
      ),
    }),
  );

const mergeStyles = node => {
  const style = node.style || {};
  return R.evolve({ props: R.merge(style) }, node);
};

const removeNoneValues = R.evolve({
  props: R.map(R.when(R.equals('none'), R.always(null))),
});

const pickStyleProps = node => {
  const props = node.props || {};
  const styleProps = R.pick(STYLE_PROPS, props);
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
  type: P.Tspan,
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
      R.compose(resolveChildren(container), resolveSvgNode(container)),
    ),
  })(node);

const parseText = fontStore => node =>
  R.ifElse(
    isText,
    layoutText(fontStore),
    R.evolve({
      children: R.map(parseText(fontStore)),
    }),
  )(node);

const resolveSvgRoot = fontStore => node => {
  const container = getContainer(node);

  return R.compose(
    replaceDefs,
    parseText(fontStore),
    parseSvgProps,
    pickStyleProps,
    inheritProps,
    resolveChildren(container),
  )(node);
};

/**
 * Pre-process SVG nodes so they can be rendered in the next steps
 *
 * @param {Object} root node
 * @param {Object} fontStore font store
 * @returns {Object} root node
 */
const resolveSvg = (node, fontStore) => {
  const mapChild = child => resolveSvg(child, fontStore);

  return R.compose(
    R.evolve({ children: R.map(mapChild) }),
    R.when(isSvg, resolveSvgRoot(fontStore)),
  )(node);
};

export default resolveSvg;

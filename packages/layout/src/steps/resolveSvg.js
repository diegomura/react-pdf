import * as P from '@react-pdf/primitives';
import { transformColor, processTransform } from '@react-pdf/stylesheet';
import { pick, evolve, compose, mapValues, matchPercent } from '@react-pdf/fns';

import layoutText from '../svg/layoutText';
import replaceDefs from '../svg/replaceDefs';
import getContainer from '../svg/getContainer';
import parseViewbox from '../svg/parseViewbox';
import inheritProps from '../svg/inheritProps';
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

const isType = type => node => node.type === type;

const isSvg = isType(P.Svg);

const isText = isType(P.Text);

const isTextInstance = isType(P.TextInstance);

const transformPercent = container => props =>
  mapValues(props, (value, key) => {
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

const parseProps = container => node => {
  let props = transformPercent(container)(node.props);

  props = evolve(
    {
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
    },
    props,
  );

  return Object.assign({}, node, { props });
};

const mergeStyles = node => {
  const style = node.style || {};
  const props = Object.assign({}, style, node.props);

  return Object.assign({}, node, { props });
};

const removeNoneValues = node => {
  const removeNone = value => (value === 'none' ? null : value);
  const props = mapValues(node.props, removeNone);

  return Object.assign({}, node, { props });
};

const pickStyleProps = node => {
  const props = node.props || {};
  const styleProps = pick(STYLE_PROPS, props);
  const style = Object.assign({}, styleProps, node.style || {});

  return Object.assign({}, node, { style });
};

const parseSvgProps = node => {
  const props = evolve(
    {
      width: parseFloat,
      height: parseFloat,
      viewBox: parseViewbox,
      preserveAspectRatio: parseAspectRatio,
    },
    node.props,
  );

  return Object.assign({}, node, { props });
};

const wrapBetweenTspan = node => ({
  type: P.Tspan,
  props: {},
  children: [node],
});

const addMissingTspan = node => {
  if (!isText(node)) return node;
  if (!node.children) return node;

  const resolveChild = child =>
    isTextInstance(child) ? wrapBetweenTspan(child) : child;

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

const parseText = fontStore => node => {
  if (isText(node)) return layoutText(fontStore, node);

  if (!node.children) return node;

  const children = node.children.map(parseText(fontStore));

  return Object.assign({}, node, { children });
};

const resolveSvgNode = container =>
  compose(
    parseProps(container),
    addMissingTspan,
    removeNoneValues,
    mergeStyles,
  );

const resolveChildren = container => node => {
  if (!node.children) return node;

  const resolveChild = compose(
    resolveChildren(container),
    resolveSvgNode(container),
  );

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

const resolveSvgRoot = (node, fontStore) => {
  const container = getContainer(node);

  return compose(
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
  if (!node.children) return node;

  const resolveChild = child => resolveSvg(child, fontStore);
  const root = isSvg(node) ? resolveSvgRoot(node, fontStore) : node;

  const children = root.children.map(resolveChild);

  return Object.assign({}, root, { children });
};

export default resolveSvg;

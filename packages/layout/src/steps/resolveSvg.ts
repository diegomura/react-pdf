import * as P from '@react-pdf/primitives';
import FontStore from '@react-pdf/font';
import resolveStyle, { transformColor } from '@react-pdf/stylesheet';
import {
  pick,
  evolve,
  compose,
  mapValues,
  matchPercent,
  parseFloat,
} from '@react-pdf/fns';

import layoutText from '../svg/layoutText';
import replaceDefs from '../svg/replaceDefs';
import getContainer from '../svg/getContainer';
import parseViewbox from '../svg/parseViewbox';
import inheritProps from '../svg/inheritProps';
import parseAspectRatio from '../svg/parseAspectRatio';
import {
  SafeNode,
  SafeSvgNode,
  SafeTextInstanceNode,
  SafeTextNode,
  SafeTspanNode,
} from '../types';

type Container = { width: number; height: number };

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
  'gradientUnits',
  'gradientTransform',
];

const VERTICAL_PROPS = ['y', 'y1', 'y2', 'height', 'cy', 'ry'];
const HORIZONTAL_PROPS = ['x', 'x1', 'x2', 'width', 'cx', 'rx'];

const isSvg = (node: SafeNode): node is SafeSvgNode => node.type === P.Svg;

const isText = (node: SafeNode): node is SafeTextNode => node.type === P.Text;

const isTextInstance = (node: SafeNode): node is SafeTextInstanceNode =>
  node.type === P.TextInstance;

const transformPercent = (container: Container) => (props) =>
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

const parsePercent = (value) => {
  const match = matchPercent(value);
  return match ? match.percent : parseFloat(value);
};

const parseTransform = (container: Container) => (value) => {
  return resolveStyle(container, { transform: value }).transform;
};

const parseProps =
  (container: Container) =>
  (node: SafeNode): SafeNode => {
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
        transform: parseTransform(container),
        gradientTransform: parseTransform(container),
      },
      props,
    );

    return Object.assign({}, node, { props });
  };

const mergeStyles = (node: SafeNode): SafeNode => {
  const style = node.style || {};
  const props = Object.assign({}, style, node.props);

  return Object.assign({}, node, { props });
};

const removeNoneValues = (node: SafeNode): SafeNode => {
  const removeNone = (value) => (value === 'none' ? null : value);
  const props = mapValues(node.props, removeNone);

  return Object.assign({}, node, { props });
};

const pickStyleProps = (node: SafeNode): SafeNode => {
  const props = node.props || {};
  const styleProps = pick(STYLE_PROPS, props);
  const style = Object.assign({}, styleProps, node.style || {});

  return Object.assign({}, node, { style });
};

const parseSvgProps = (node: SafeSvgNode) => {
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

const wrapBetweenTspan = (node: SafeTextInstanceNode): SafeTspanNode => ({
  type: P.Tspan,
  props: {},
  style: {},
  children: [node],
});

const addMissingTspan = (node: SafeNode): SafeNode => {
  if (!isText(node)) return node;
  if (!node.children) return node;

  const resolveChild = (child) =>
    isTextInstance(child) ? wrapBetweenTspan(child) : child;

  const children = node.children.map(resolveChild);

  return Object.assign({}, node, { children });
};

const parseText =
  (fontStore: FontStore) =>
  (node: SafeNode): SafeNode => {
    if (isText(node)) return layoutText(fontStore, node);

    if (!node.children) return node;

    const children = node.children.map(parseText(fontStore));

    return Object.assign({}, node, { children });
  };

const resolveSvgNode = (container: Container) =>
  compose(
    parseProps(container),
    addMissingTspan,
    removeNoneValues,
    mergeStyles,
  );

const resolveChildren =
  (container: Container) =>
  (node: SafeNode): SafeNode => {
    if (!node.children) return node;

    const resolveChild = compose(
      resolveChildren(container),
      resolveSvgNode(container),
    );

    const children = node.children.map(resolveChild);

    return Object.assign({}, node, { children });
  };

const buildXLinksIndex = (node: SafeSvgNode) => {
  const idIndex: Record<string, SafeNode> = {};
  const listToExplore: SafeNode[] = node.children?.slice(0) || [];

  while (listToExplore.length > 0) {
    const child = listToExplore.shift();

    if (child.props && 'id' in child.props) {
      idIndex[child.props.id] = child;
    }

    if (child.children) listToExplore.push(...child.children);
  }

  return idIndex;
};

const replaceXLinks = (node: SafeNode, idIndex: Record<string, SafeNode>) => {
  if (node.props && 'xlinkHref' in node.props) {
    const linkedNode = idIndex[node.props.xlinkHref.replace(/^#/, '')];

    // No node to extend from
    if (!linkedNode) return node;

    const newProps = Object.assign({}, linkedNode.props, node.props);

    delete newProps.xlinkHref;

    return Object.assign({}, linkedNode, { props: newProps });
  }

  const children = node.children?.map((child) => replaceXLinks(child, idIndex));

  return Object.assign({}, node, { children });
};

export const resolveXLinks = (node: SafeSvgNode): SafeSvgNode => {
  const idIndex = buildXLinksIndex(node);

  return replaceXLinks(node, idIndex);
};

const resolveSvgRoot = (node: SafeSvgNode, fontStore: FontStore) => {
  const container = getContainer(node);

  return compose(
    replaceDefs,
    parseText(fontStore),
    parseSvgProps,
    pickStyleProps,
    inheritProps,
    resolveChildren(container),
    resolveXLinks,
  )(node);
};

/**
 * Pre-process SVG nodes so they can be rendered in the next steps
 *
 * @param node - Root node
 * @param fontStore - Font store
 * @returns Root node
 */
const resolveSvg = (node: SafeNode, fontStore: FontStore) => {
  if (!('children' in node)) return node;

  const resolveChild = (child) => resolveSvg(child, fontStore);
  const root = isSvg(node) ? resolveSvgRoot(node, fontStore) : node;
  const children = root.children?.map(resolveChild);

  return Object.assign({}, root, { children });
};

export default resolveSvg;

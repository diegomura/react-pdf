import * as R from 'ramda';
import { Fragment, Children } from 'react';

import resolveAssets from './resolveAssets';
import resolveStyles from './resolveStyles';
import resolveDimensions from './resolveDimensions';
import resolveTextLayout from './resolveTextLayout';
import resolveInheritance from './resolveInheritance';
import resolveNoteChildren from './resolveNoteChildren';
import resolvePagePaddings from './resolvePagePaddings';
import resolvePercentRadius from './resolvePercentRadius';
import resolvePercentHeight from './resolvePercentHeight';
import resolveLinkSubstitution from './resolveLinkSubstitution';
import evolveWhile from '../utils/evolveWhile';
import asyncCompose from '../utils/asyncCompose';

const isNotNil = R.complement(R.isNil);

const isDynamicNode = R.pathSatisfies(isNotNil, ['props', 'render']);

const hasDynamicNode = node =>
  R.compose(
    R.either(R.any(isDynamicNode), R.any(hasDynamicNode)),
    R.prop('children'),
  )(node);

const convertInstance = element => {
  const isFragment = element.type === Fragment;
  const { children = [], style = {}, ...props } = element.props;
  const nextChildren = R.flatten(
    Children.toArray(children).map(convertInstance),
  );

  if (isFragment) return nextChildren;

  return [
    {
      style,
      props,
      box: {},
      type: element.type,
      children: nextChildren,
    },
  ];
};

const execDynamicNode = node => {
  return R.ifElse(
    isDynamicNode,
    R.evolve({
      props: R.evolve({ render: R.always(null) }),
      children: () =>
        R.compose(
          convertInstance,
          node.props.render,
        )(),
    }),
    R.evolve({
      children: R.map(execDynamicNode),
    }),
  )(node);
};

const wrapInRoot = page => ({ children: [{ children: [page] }] });

const unWrapFromRoot = R.path(['children', 0, 'children', 0]);

const invalidatePageHeight = R.dissocPath(['box', 'height']);

const layoutDynamicPage = page =>
  asyncCompose(
    unWrapFromRoot,
    resolveTextLayout,
    resolvePercentRadius,
    resolveDimensions,
    resolveAssets,
    resolveInheritance,
    resolvePercentHeight,
    resolvePagePaddings,
    resolveStyles,
    resolveNoteChildren,
    resolveLinkSubstitution,
    wrapInRoot,
    invalidatePageHeight,
    execDynamicNode,
  )(page);

const resolvePageDynamicNodes = evolveWhile(hasDynamicNode, layoutDynamicPage);

const resolveDynamicNodes = async root => {
  const pages = R.path(['children', 0, 'children'], root);
  const resolvePromises = pages.map(resolvePageDynamicNodes);
  const resolvedPages = await Promise.all(resolvePromises);

  return {
    type: 'ROOT',
    children: [
      {
        type: 'DOCUMENT',
        children: resolvedPages,
      },
    ],
  };
};

export default resolveDynamicNodes;

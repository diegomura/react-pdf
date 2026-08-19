import * as P from '@react-pdf/primitives';
import { omit } from '@react-pdf/fns';

import createInstances from './createInstances';
import isDynamic from './isDynamic';
import { DynamicPageProps, SafeNode } from '../types';

// Call render props recursively, splicing their output in as children. The
// render prop is dropped from the result so downstream passes treat the
// subtree as static content.
const renderDynamic = (props: DynamicPageProps, node: SafeNode): SafeNode => {
  if (!isDynamic(node)) {
    const children = ((node.children || []) as SafeNode[]).map((child) =>
      renderDynamic(props, child),
    );

    return { ...node, children } as SafeNode;
  }

  const children = createInstances((node.props as any).render(props))
    .filter(Boolean)
    .map((child) => renderDynamic(props, child as SafeNode));

  // Dynamic text remeasures from scratch
  const box = node.type === P.Text ? { ...node.box, height: 0 } : node.box;

  return {
    ...node,
    box,
    lines: null,
    props: omit('render', node.props),
    children,
  } as SafeNode;
};

export default renderDynamic;

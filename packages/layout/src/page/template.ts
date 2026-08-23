import { castArray } from '@react-pdf/fns';

import { DynamicPageProps, SafeNode } from '../types';

const PROBE_PROP = '__probe';
const CONTENT_PROP = '__content';

// Page layouts arrive pre-wrapped by the reconciler host config: the user's
// React component is already reduced to a plain function over instances, so
// like render props it supports no hooks.
export type PageLayout = (
  props: Partial<DynamicPageProps>,
  children: SafeNode[],
) => SafeNode | SafeNode[];

// A grown, stretched stand-in for the content: instantiated in place of
// `children`, its measured box is the flow region for one page.
export const probeElement = (): SafeNode =>
  ({
    type: 'VIEW',
    props: { [PROBE_PROP]: true },
    style: { flexGrow: 1, flexShrink: 1, alignSelf: 'stretch' },
    children: [],
  }) as any;

export const isProbe = (node: SafeNode): boolean =>
  !!node.props && PROBE_PROP in node.props;

export const findProbe = (node: SafeNode): SafeNode | null => {
  if (isProbe(node)) return node;

  for (const child of node.children || []) {
    const found = findProbe(child);
    if (found) return found;
  }

  return null;
};

// Content nodes are tagged so pagination can tell them apart from the
// chrome they sit between once the template has been instantiated.
export const tagContent = (node: SafeNode): SafeNode =>
  ({ ...node, props: { ...node.props, [CONTENT_PROP]: true } }) as SafeNode;

export const isContent = (node: SafeNode): boolean =>
  !!node.props && CONTENT_PROP in node.props;

export const collectContent = (node: SafeNode, out: SafeNode[] = []) => {
  for (const child of node.children || []) {
    if (isContent(child)) out.push(child);
    else collectContent(child, out);
  }

  return out;
};

// A page without a layout gets this one: children are the whole template.
const identityLayout: PageLayout = (_, children) => children;

// The payload rides through as `children`: wherever the layout renders them,
// they land untouched — content on the first pass, a probe when measuring,
// the page's fragments when building.
export const instantiateTemplate = (
  layout: PageLayout = identityLayout,
  props: Partial<DynamicPageProps>,
  payload: SafeNode[],
): SafeNode[] => castArray(layout(props, payload)).filter(Boolean);

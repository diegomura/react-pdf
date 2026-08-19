import React from 'react';

import createInstances, { passthrough } from '../node/createInstances';
import { DynamicPageProps, SafeNode } from '../types';

const PROBE_PROP = '__probe';
const CONTENT_PROP = '__content';

export type PageLayout = (props: {
  children: React.ReactNode;
  pageNumber?: number;
  totalPages?: number;
  subPageNumber?: number;
  subPageTotalPages?: number;
}) => React.ReactNode;

// A page without a layout gets this one: children are the whole template.
export const identityLayout: PageLayout = ({ children }) => children;

// A grown, stretched stand-in for the content: instantiated in place of
// `children`, its measured box is the flow region for one page. Shaped as
// an instance, like every payload node, so it rides the pass-through.
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

  for (const child of (node.children || []) as SafeNode[]) {
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
  for (const child of (node.children || []) as SafeNode[]) {
    if (isContent(child)) out.push(child);
    else collectContent(child, out);
  }

  return out;
};

// Runs the user's layout through the render-prop machinery (createInstances
// executes function components), so like render props it supports no hooks.
// The payload rides through as `children`: whatever the layout renders them
// as, they land untouched — content on the first pass, a probe when
// measuring, the page's fragments when building.
export const instantiateTemplate = (
  layout: PageLayout,
  props: Partial<DynamicPageProps>,
  payload: SafeNode[],
) => {
  const children = payload.map((node) => passthrough(node as any));
  const element = React.createElement(layout as any, { ...props, children });

  return createInstances(element) as unknown as SafeNode[];
};

// The probe doubles as the render-once validator: a layout that drops or
// duplicates its children is caught before any content is entrusted to it.
export const validateTemplate = (layout: PageLayout) => {
  const nodes = instantiateTemplate(layout, { pageNumber: 1 }, [
    probeElement() as any,
  ]);

  const probes = nodes.reduce((acc, node) => acc + countProbes(node), 0);

  if (probes !== 1) {
    throw new Error(
      `[layout] A page layout must render its children exactly once (found ${probes}).`,
    );
  }
};

const countProbes = (node: SafeNode): number =>
  (isProbe(node) ? 1 : 0) +
  ((node.children || []) as SafeNode[]).reduce(
    (acc, child) => acc + countProbes(child),
    0,
  );

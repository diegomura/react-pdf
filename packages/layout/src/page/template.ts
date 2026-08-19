import React from 'react';

import createInstances from '../node/createInstances';
import { DynamicPageProps, SafeNode } from '../types';

const SLOT_PROP = '__slot';

export type PageLayout = (props: {
  children: React.ReactNode;
  pageNumber?: number;
  totalPages?: number;
  subPageNumber?: number;
  subPageTotalPages?: number;
}) => React.ReactNode;

// The slot grows to claim whatever space the chrome leaves. It renders
// empty; the page's content is grafted in later.
const slotElement = () =>
  React.createElement('VIEW' as any, {
    [SLOT_PROP]: true,
    style: { flexGrow: 1, flexShrink: 1, alignSelf: 'stretch' },
  });

export const isSlot = (node: SafeNode): boolean =>
  !!node.props && SLOT_PROP in node.props;

// A page without a layout gets this one: nothing but the slot.
export const identityLayout: PageLayout = ({ children }) => children;

// Page-level absolutes keep their place beside the template so paint order
// survives — a watermark declared before content stays behind it.
const PAGE_ABSOLUTE = '__pageAbsolute';

export const pageAbsolute = (node: SafeNode): SafeNode =>
  ({ ...node, props: { ...node.props, [PAGE_ABSOLUTE]: true } }) as SafeNode;

export const isPageAbsolute = (node: SafeNode): boolean =>
  !!node.props && PAGE_ABSOLUTE in node.props;

// The slot is the flow container, so the page's flow styles move onto it —
// left on the page they'd apply to a single slot child and do nothing.
const FLOW_STYLES = [
  'justifyContent',
  'alignItems',
  'alignContent',
  'gap',
  'rowGap',
  'columnGap',
];

export const forwardFlowStyles = (slot: SafeNode, pageStyle: any = {}) => {
  const forwarded = Object.fromEntries(
    FLOW_STYLES.filter((key) => key in pageStyle).map((key) => [
      key,
      pageStyle[key],
    ]),
  );

  slot.style = { ...slot.style, ...forwarded };
};

// Instance-shaped slot, for pages without a layout component: their chrome
// is synthesized from existing instance nodes, so the slot must be one too.
export const slotInstance = (children: SafeNode[] = []): SafeNode =>
  ({
    type: 'VIEW',
    props: { [SLOT_PROP]: true },
    style: { flexGrow: 1, flexShrink: 1, alignSelf: 'stretch' },
    children,
  }) as any;

export const findSlot = (node: SafeNode): SafeNode | null => {
  if (isSlot(node)) return node;

  for (const child of (node.children || []) as SafeNode[]) {
    const found = findSlot(child);
    if (found) return found;
  }

  return null;
};

const countSlots = (nodes: any[]): number =>
  nodes.reduce(
    (acc, node) =>
      acc +
      (node?.props && SLOT_PROP in node.props ? 1 : 0) +
      countSlots(node?.children || []),
    0,
  );

// Renders the user's layout the same way render props run, so no hooks.
// Called once up front so content measures at slot width, and once per
// page to find that page's flow region.
export const instantiateTemplate = (
  layout: PageLayout,
  props: Partial<DynamicPageProps>,
) => {
  const children = slotElement();
  const element = React.createElement(layout as any, props, children);
  const nodes = createInstances(element);
  const slots = countSlots(nodes);

  if (slots !== 1) {
    throw new Error(
      `[layout] A page layout must render its children exactly once (found ${slots} slots).`,
    );
  }

  return nodes;
};

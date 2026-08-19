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
    style: { flexGrow: 1, flexShrink: 1 },
  });

export const findSlot = (node: SafeNode): SafeNode | null => {
  if (node.props && SLOT_PROP in node.props) return node;

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

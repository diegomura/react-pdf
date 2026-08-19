import React from 'react';

import createInstances from '../node/createInstances';
import { DynamicPageProps, SafeNode } from '../types';

export const SLOT_PROP = '__slot';

export type PageLayout = (props: {
  children: React.ReactNode;
  pageNumber?: number;
  totalPages?: number;
  subPageNumber?: number;
  subPageTotalPages?: number;
}) => React.ReactNode;

// The slot is a plain flex-grown View: it claims leftover space in a column
// and width in a row, so bands and asides both work without users thinking
// about flexbox. It renders empty — the page's existing instance nodes are
// grafted in afterwards, since they already passed through createInstances
// and must not go through it again.
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

// Runs the user's layout through the render-prop machinery (createInstances
// executes function components), so like render props it supports no hooks.
export const instantiateTemplate = (
  layout: PageLayout,
  props: Partial<DynamicPageProps>,
) => {
  const element = React.createElement(layout as any, {
    ...props,
    children: slotElement(),
  });

  const nodes = createInstances(element);
  const slots = countSlots(nodes);

  if (slots !== 1) {
    throw new Error(
      `[layout] A page layout must render its children exactly once (found ${slots} slots).`,
    );
  }

  return nodes;
};

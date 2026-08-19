import type { PenaltyItem } from '@react-pdf/paginate';

import { DynamicPageProps, SafeNode } from '../types';

export const FORCE_BREAK: PenaltyItem = { kind: 'penalty', type: 'force' };

export const FORBID_BREAK: PenaltyItem = { kind: 'penalty', type: 'forbid' };

// How dynamic (render prop) nodes materialize: `props` maps an engine page
// number to the render props for that page, `measure` renders and measures a
// dynamic subtree with those props.
export type DynamicEnv = {
  props: (enginePageNumber: number) => DynamicPageProps;
  measure: (node: SafeNode, props: DynamicPageProps) => SafeNode;
};

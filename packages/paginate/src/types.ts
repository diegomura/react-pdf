export interface LeafItem {
  kind: 'leaf';
  height: number;
  id?: string;
  repeat?: boolean;
  data?: unknown;
  split?: (availHeight: number) => { current: LeafItem; next: LeafItem } | null;
}

// Behaviorally identical to a leaf — the kind exists so consumers can tell
// spacing apart from content, in both the input and the placed output.
export interface SpacerItem {
  kind: 'spacer';
  height: number;
  id?: string;
  data?: unknown;
  split?: (
    availHeight: number,
  ) => { current: SpacerItem; next: SpacerItem } | null;
}

export interface ColumnItem {
  kind: 'column';
  id?: string;
  repeat?: boolean;
  data?: unknown;
  children: Item[];
}

export interface RowItem {
  kind: 'row';
  id?: string;
  repeat?: boolean;
  data?: unknown;
  children: Item[];
}

export interface PenaltyItem {
  kind: 'penalty';
  type: 'forbid' | 'force';
  ahead?: number;
  id?: string;
  data?: unknown;
}

export interface LazyItem {
  kind: 'lazy';
  id?: string;
  repeat?: boolean;
  data?: unknown;
  materialize: (ctx: Ctx) => Item[];
}

export type Item =
  | LeafItem
  | SpacerItem
  | ColumnItem
  | RowItem
  | PenaltyItem
  | LazyItem;

export interface Ctx {
  pageNumber: number;
}

export interface PlacedItem {
  item: Item;
  y: number;
  height: number;
  part: { isFirst: boolean; isLast: boolean };
  children?: PlacedItem[];
}

export type Page = PlacedItem[];

export interface Fragment {
  item: Item;
  isFirst: boolean;
  children: Fragment[];
  origin?: LazyItem;
}

export interface FillResult {
  placed: PlacedItem[];
  remaining: Fragment[];
}

export type SplittableLeaf = (LeafItem | SpacerItem) & {
  split: NonNullable<LeafItem['split']>;
};

export interface BestBreak {
  remainingIndex: number;
  placedCount: number;
}

// A lazy materialization waiting to be confirmed. If `placed.length` has
// grown past `placedAtMaterialize` by overflow time, the lazy committed.
// Otherwise we put the lazy back so the next page can re-materialize
// with a fresh pageNumber.
export interface PendingLazy {
  spliceStart: number;
  fragment: Fragment;
  count: number;
  placedAtMaterialize: number;
}

export interface State {
  fragments: Fragment[];
  placed: PlacedItem[];
  usedHeight: number;
  bestBreak: BestBreak | null;
  pendingLazy: PendingLazy | null;
  pageNumber: number;
  height: number;
  canForce: boolean;
  contentAbove: boolean;
  forbidUntil: number;
}

export type StepResult =
  | { kind: 'continue' }
  | { kind: 'rewind' }
  | { kind: 'done'; result: FillResult }
  | { kind: 'decline' };

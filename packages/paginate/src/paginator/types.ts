// The public schema: a vertical box model. The engine ignores widths — a
// node's horizontal life already happened in whatever laid it out.
export interface Box {
  /** Border-box top, relative to the parent's border box. */
  top: number;
  /** Border-box height. */
  height: number;
  /** Numbers only — resolve 'auto' margins before handing nodes over. */
  marginTop?: number;
  marginBottom?: number;
  /** Top border + padding, summed — the engine never needs them apart. */
  edgeTop?: number;
  edgeBottom?: number;
}

export interface LeafNode {
  box: Box;
  /**
   * Split at `avail` of content height (margins already subtracted by the
   * engine). Return the fragment that fits and the remainder, or null to
   * move the whole leaf to the next page.
   */
  split?: (avail: number) => [LeafNode, LeafNode] | null;
  /** Takes no space and never splits; lands where the flow reaches it. */
  absolute?: boolean;
  repeat?: boolean;
  break?: boolean;
  minPresenceAhead?: number;
  data?: unknown;
  id?: string;
}

export interface ContainerNode {
  box: Box;
  children: FlowNode[];
  direction: 'row' | 'column';
  repeat?: boolean;
  break?: boolean;
  minPresenceAhead?: number;
  data?: unknown;
  id?: string;
}

// Content not knowable until its page is: materialize runs when the engine
// reaches the node. The box is first-pass geometry, used only to derive the
// blank space between the node and its siblings.
export interface LazyNode {
  box: Box;
  materialize: (ctx: { pageNumber: number }) => FlowNode;
  repeat?: boolean;
  break?: boolean;
  minPresenceAhead?: number;
  id?: string;
}

export type FlowNode = LeafNode | ContainerNode | LazyNode;

export interface PlacedNode {
  /**
   * `top` is the node's margin-box y: relative to the page for top-level
   * nodes, to the parent's border box below. `height` is the margin-box
   * height the fragment occupied on this page.
   */
  box: { top: number; height: number };
  part: { isFirst: boolean; isLast: boolean };
  data?: unknown;
  children?: PlacedNode[];
}

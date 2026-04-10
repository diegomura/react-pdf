/* eslint-disable max-classes-per-file */

import {
  TaffyTree,
  Style,
  Display as TaffyDisplay,
  FlexDirection as TaffyFlexDirection,
  FlexWrap as TaffyFlexWrap,
  AlignItems as TaffyAlignItems,
  AlignSelf as TaffyAlignSelf,
  AlignContent as TaffyAlignContent,
  JustifyContent as TaffyJustifyContent,
  Overflow as TaffyOverflow,
  Position as TaffyPosition,
  GridAutoFlow as TaffyGridAutoFlow,
  type GridPlacement as TaffyGridPlacement,
  type TrackSizingFunction,
  type GridTemplateComponent,
  type MeasureFunction as TaffyMeasureFunction,
  type AvailableSpace,
  type Size,
} from 'taffy-layout';

import { initTaffy } from './initTaffy';

import {
  Edge,
  Align,
  FlexDirection,
  Display,
  Justify,
  Overflow,
  PositionType,
  Wrap,
  Gutter,
  MeasureMode,
  type MeasureFunction,
} from './enums';

// --- Taffy enum mappers ---

const FLEX_DIRECTION_MAP: Record<number, TaffyFlexDirection> = {
  [FlexDirection.Column]: TaffyFlexDirection.Column,
  [FlexDirection.ColumnReverse]: TaffyFlexDirection.ColumnReverse,
  [FlexDirection.Row]: TaffyFlexDirection.Row,
  [FlexDirection.RowReverse]: TaffyFlexDirection.RowReverse,
};

const FLEX_WRAP_MAP: Record<number, TaffyFlexWrap> = {
  [Wrap.NoWrap]: TaffyFlexWrap.NoWrap,
  [Wrap.Wrap]: TaffyFlexWrap.Wrap,
  [Wrap.WrapReverse]: TaffyFlexWrap.WrapReverse,
};

const ALIGN_ITEMS_MAP: Record<number, TaffyAlignItems | undefined> = {
  [Align.FlexStart]: TaffyAlignItems.FlexStart,
  [Align.Center]: TaffyAlignItems.Center,
  [Align.FlexEnd]: TaffyAlignItems.FlexEnd,
  [Align.Stretch]: TaffyAlignItems.Stretch,
  [Align.Baseline]: TaffyAlignItems.Baseline,
};

const ALIGN_SELF_MAP: Record<number, TaffyAlignSelf | undefined> = {
  [Align.Auto]: TaffyAlignSelf.Auto,
  [Align.FlexStart]: TaffyAlignSelf.FlexStart,
  [Align.Center]: TaffyAlignSelf.Center,
  [Align.FlexEnd]: TaffyAlignSelf.FlexEnd,
  [Align.Stretch]: TaffyAlignSelf.Stretch,
  [Align.Baseline]: TaffyAlignSelf.Baseline,
};

const ALIGN_CONTENT_MAP: Record<number, TaffyAlignContent | undefined> = {
  [Align.FlexStart]: TaffyAlignContent.FlexStart,
  [Align.Center]: TaffyAlignContent.Center,
  [Align.FlexEnd]: TaffyAlignContent.FlexEnd,
  [Align.Stretch]: TaffyAlignContent.Stretch,
  [Align.SpaceBetween]: TaffyAlignContent.SpaceBetween,
  [Align.SpaceAround]: TaffyAlignContent.SpaceAround,
  [Align.SpaceEvenly]: TaffyAlignContent.SpaceEvenly,
};

const JUSTIFY_MAP: Record<number, TaffyJustifyContent | undefined> = {
  [Justify.FlexStart]: TaffyJustifyContent.FlexStart,
  [Justify.Center]: TaffyJustifyContent.Center,
  [Justify.FlexEnd]: TaffyJustifyContent.FlexEnd,
  [Justify.SpaceBetween]: TaffyJustifyContent.SpaceBetween,
  [Justify.SpaceAround]: TaffyJustifyContent.SpaceAround,
  [Justify.SpaceEvenly]: TaffyJustifyContent.SpaceEvenly,
};

const OVERFLOW_MAP: Record<number, TaffyOverflow> = {
  [Overflow.Visible]: TaffyOverflow.Visible,
  [Overflow.Hidden]: TaffyOverflow.Hidden,
  [Overflow.Scroll]: TaffyOverflow.Scroll,
};

// --- Dimension/edge helpers ---

const toTaffyPercent = (value: number): `${number}%` => `${value}%`;

type EdgeSetter = (style: Style, value: any) => void;

const EDGE_MARGIN_SETTERS: Record<number, EdgeSetter> = {
  [Edge.Top]: (s, v) => {
    s.marginTop = v;
  },
  [Edge.Right]: (s, v) => {
    s.marginRight = v;
  },
  [Edge.Bottom]: (s, v) => {
    s.marginBottom = v;
  },
  [Edge.Left]: (s, v) => {
    s.marginLeft = v;
  },
};

const EDGE_PADDING_SETTERS: Record<number, EdgeSetter> = {
  [Edge.Top]: (s, v) => {
    s.paddingTop = v;
  },
  [Edge.Right]: (s, v) => {
    s.paddingRight = v;
  },
  [Edge.Bottom]: (s, v) => {
    s.paddingBottom = v;
  },
  [Edge.Left]: (s, v) => {
    s.paddingLeft = v;
  },
};

const EDGE_BORDER_SETTERS: Record<number, EdgeSetter> = {
  [Edge.Top]: (s, v) => {
    s.borderTop = v;
  },
  [Edge.Right]: (s, v) => {
    s.borderRight = v;
  },
  [Edge.Bottom]: (s, v) => {
    s.borderBottom = v;
  },
  [Edge.Left]: (s, v) => {
    s.borderLeft = v;
  },
};

const EDGE_POSITION_SETTERS: Record<number, EdgeSetter> = {
  [Edge.Top]: (s, v) => {
    s.top = v;
  },
  [Edge.Right]: (s, v) => {
    s.right = v;
  },
  [Edge.Bottom]: (s, v) => {
    s.bottom = v;
  },
  [Edge.Left]: (s, v) => {
    s.left = v;
  },
};

// --- TaffyNodeAdapter ---

export class TaffyNodeAdapter {
  private ctx: TaffyContext;
  nodeId: bigint;
  style: Style;
  private _measureFunc: MeasureFunction | null = null;

  constructor(ctx: TaffyContext, nodeId: bigint, style: Style) {
    this.ctx = ctx;
    this.nodeId = nodeId;
    this.style = style;
  }

  // --- Dimension setters ---

  setWidth(value: number) {
    this.style.width = value;
  }
  setWidthPercent(value: number) {
    this.style.width = toTaffyPercent(value);
  }
  setWidthAuto() {
    this.style.width = 'auto';
  }

  setHeight(value: number) {
    this.style.height = value;
  }
  setHeightPercent(value: number) {
    this.style.height = toTaffyPercent(value);
  }
  setHeightAuto() {
    this.style.height = 'auto';
  }

  setMinWidth(value: number) {
    this.style.minWidth = value;
  }
  setMinWidthPercent(value: number) {
    this.style.minWidth = toTaffyPercent(value);
  }

  setMaxWidth(value: number) {
    this.style.maxWidth = value;
  }
  setMaxWidthPercent(value: number) {
    this.style.maxWidth = toTaffyPercent(value);
  }

  setMinHeight(value: number) {
    this.style.minHeight = value;
  }
  setMinHeightPercent(value: number) {
    this.style.minHeight = toTaffyPercent(value);
  }

  setMaxHeight(value: number) {
    this.style.maxHeight = value;
  }
  setMaxHeightPercent(value: number) {
    this.style.maxHeight = toTaffyPercent(value);
  }

  // --- Edge-based setters (margin, padding, border, position) ---

  private setEdge(setters: Record<number, EdgeSetter>, edge: Edge, value: any) {
    const setter = setters[edge];
    if (setter) {
      setter(this.style, value);
    }
  }

  setMargin(edge: Edge, value: number) {
    this.setEdge(EDGE_MARGIN_SETTERS, edge, value);
  }
  setMarginPercent(edge: Edge, value: number) {
    this.setEdge(EDGE_MARGIN_SETTERS, edge, toTaffyPercent(value));
  }
  setMarginAuto(edge: Edge) {
    this.setEdge(EDGE_MARGIN_SETTERS, edge, 'auto');
  }

  setPadding(edge: Edge, value: number) {
    this.setEdge(EDGE_PADDING_SETTERS, edge, value);
  }
  setPaddingPercent(edge: Edge, value: number) {
    this.setEdge(EDGE_PADDING_SETTERS, edge, toTaffyPercent(value));
  }

  setBorder(edge: Edge, value: number) {
    this.setEdge(EDGE_BORDER_SETTERS, edge, value);
  }

  setPosition(edge: Edge, value: number) {
    this.setEdge(EDGE_POSITION_SETTERS, edge, value);
  }
  setPositionPercent(edge: Edge, value: number) {
    this.setEdge(EDGE_POSITION_SETTERS, edge, toTaffyPercent(value));
  }

  // --- Gap setters ---

  setGap(gutter: Gutter, value: number) {
    if (gutter === Gutter.Row) this.style.rowGap = value;
    else this.style.columnGap = value;
  }

  setGapPercent(gutter: Gutter, value: number) {
    if (gutter === Gutter.Row) this.style.rowGap = toTaffyPercent(value);
    else this.style.columnGap = toTaffyPercent(value);
  }

  // --- Flex property setters ---

  setFlexDirection(value: FlexDirection) {
    this.style.flexDirection =
      FLEX_DIRECTION_MAP[value] ?? TaffyFlexDirection.Column;
  }

  setFlexWrap(value: Wrap) {
    this.style.flexWrap = FLEX_WRAP_MAP[value] ?? TaffyFlexWrap.NoWrap;
  }

  setFlexGrow(value: number) {
    this.style.flexGrow = value;
  }
  setFlexShrink(value: number) {
    this.style.flexShrink = value;
  }

  setFlexBasis(value: number) {
    this.style.flexBasis = value;
  }
  setFlexBasisPercent(value: number) {
    this.style.flexBasis = toTaffyPercent(value);
  }
  setFlexBasisAuto() {
    this.style.flexBasis = 'auto';
  }

  // --- Alignment setters ---

  setAlignItems(value: Align) {
    this.style.alignItems = ALIGN_ITEMS_MAP[value];
  }

  setAlignSelf(value: Align) {
    this.style.alignSelf = ALIGN_SELF_MAP[value];
  }

  setAlignContent(value: Align) {
    this.style.alignContent = ALIGN_CONTENT_MAP[value];
  }

  setJustifyContent(value: Justify) {
    this.style.justifyContent = JUSTIFY_MAP[value];
  }

  // --- Display / Overflow / Position ---

  setDisplay(value: Display) {
    if (value === Display.None) {
      this.style.display = TaffyDisplay.None;
    } else if (value === Display.Grid) {
      this.style.display = TaffyDisplay.Grid;
    } else {
      this.style.display = TaffyDisplay.Flex;
    }
  }

  setOverflow(value: Overflow) {
    const mapped = OVERFLOW_MAP[value] ?? TaffyOverflow.Visible;
    this.style.overflowX = mapped;
    this.style.overflowY = mapped;
  }

  setPositionType(value: PositionType) {
    if (value === PositionType.Absolute) {
      this.style.position = TaffyPosition.Absolute;
    } else {
      // Static and Relative both map to Relative (Taffy has no Static)
      this.style.position = TaffyPosition.Relative;
    }
  }

  // --- Aspect ratio ---

  setAspectRatio(value: number) {
    this.style.aspectRatio = value;
  }

  // --- Grid properties ---

  setGridTemplateColumns(tracks: GridTemplateComponent[]) {
    this.style.gridTemplateColumns = tracks;
  }

  setGridTemplateRows(tracks: GridTemplateComponent[]) {
    this.style.gridTemplateRows = tracks;
  }

  setGridAutoColumns(tracks: TrackSizingFunction[]) {
    this.style.gridAutoColumns = tracks;
  }

  setGridAutoRows(tracks: TrackSizingFunction[]) {
    this.style.gridAutoRows = tracks;
  }

  setGridAutoFlow(value: TaffyGridAutoFlow) {
    this.style.gridAutoFlow = value;
  }

  setGridColumnStart(value: TaffyGridPlacement) {
    this.style.gridColumnStart = value;
  }

  setGridColumnEnd(value: TaffyGridPlacement) {
    this.style.gridColumnEnd = value;
  }

  setGridRowStart(value: TaffyGridPlacement) {
    this.style.gridRowStart = value;
  }

  setGridRowEnd(value: TaffyGridPlacement) {
    this.style.gridRowEnd = value;
  }

  // --- Measure function ---

  setMeasureFunc(fn: MeasureFunction) {
    this._measureFunc = fn;
    this.ctx.measureFuncs.set(this.nodeId, fn);
  }

  unsetMeasureFunc() {
    this._measureFunc = null;
    this.ctx.measureFuncs.delete(this.nodeId);
  }

  // --- Tree operations ---

  insertChild(child: TaffyNodeAdapter, index: number) {
    this.ctx.tree.insertChildAtIndex(this.nodeId, index, child.nodeId);
  }

  getChildCount(): number {
    return this.ctx.tree.childCount(this.nodeId);
  }

  // --- Layout computation ---

  calculateLayout() {
    // Apply all buffered styles to the tree
    for (const node of this.ctx.nodes) {
      this.ctx.tree.setStyle(node.nodeId, node.style);
    }

    const availableSpace: Size<AvailableSpace> = {
      width: 'max-content',
      height: 'max-content',
    };

    const measureFuncs = this.ctx.measureFuncs;

    if (measureFuncs.size > 0) {
      const measureFn: TaffyMeasureFunction = (
        knownDimensions,
        availableSpace,
        nodeId,
      ) => {
        const fn = measureFuncs.get(nodeId);
        if (!fn) return { width: 0, height: 0 };

        // Translate Taffy measure args to Yoga measure args
        let width: number;
        let widthMode: MeasureMode;
        let height: number;
        let heightMode: MeasureMode;

        if (knownDimensions.width != null) {
          width = knownDimensions.width;
          widthMode = MeasureMode.Exactly;
        } else if (typeof availableSpace.width === 'number') {
          width = availableSpace.width;
          widthMode = MeasureMode.AtMost;
        } else {
          // Taffy sends 'min-content' or 'max-content' strings here.
          // Use a large value instead of 0 because measure functions like
          // measureImage use Math.min(computed, width) even in Undefined mode.
          width = Number.MAX_VALUE;
          widthMode = MeasureMode.Undefined;
        }

        if (knownDimensions.height != null) {
          height = knownDimensions.height;
          heightMode = MeasureMode.Exactly;
        } else if (typeof availableSpace.height === 'number') {
          height = availableSpace.height;
          heightMode = MeasureMode.AtMost;
        } else {
          height = Number.MAX_VALUE;
          heightMode = MeasureMode.Undefined;
        }

        const result = fn(width, widthMode, height, heightMode);

        return {
          width: result?.width ?? knownDimensions.width ?? 0,
          height: result?.height ?? knownDimensions.height ?? 0,
        };
      };

      this.ctx.tree.computeLayoutWithMeasure(
        this.nodeId,
        availableSpace,
        measureFn,
      );
    } else {
      this.ctx.tree.computeLayout(this.nodeId, availableSpace);
    }
  }

  // --- Computed layout getters ---

  private getLayout() {
    return this.ctx.tree.getLayout(this.nodeId);
  }

  getComputedWidth(): number {
    return this.getLayout().width;
  }
  getComputedHeight(): number {
    return this.getLayout().height;
  }
  getComputedTop(): number {
    return this.getLayout().y;
  }
  getComputedLeft(): number {
    return this.getLayout().x;
  }

  // Right and bottom are not directly in Taffy's Layout (only x, y).
  // Return 0 as fallback — the getter chain in getPosition.ts handles this.
  getComputedRight(): number {
    return 0;
  }
  getComputedBottom(): number {
    return 0;
  }

  getComputedMargin(edge: Edge): number {
    const layout = this.getLayout();
    switch (edge) {
      case Edge.Top:
        return layout.marginTop;
      case Edge.Right:
        return layout.marginRight;
      case Edge.Bottom:
        return layout.marginBottom;
      case Edge.Left:
        return layout.marginLeft;
      default:
        return 0;
    }
  }

  getComputedPadding(edge: Edge): number {
    const layout = this.getLayout();
    switch (edge) {
      case Edge.Top:
        return layout.paddingTop;
      case Edge.Right:
        return layout.paddingRight;
      case Edge.Bottom:
        return layout.paddingBottom;
      case Edge.Left:
        return layout.paddingLeft;
      default:
        return 0;
    }
  }

  getComputedBorder(edge: Edge): number {
    const layout = this.getLayout();
    switch (edge) {
      case Edge.Top:
        return layout.borderTop;
      case Edge.Right:
        return layout.borderRight;
      case Edge.Bottom:
        return layout.borderBottom;
      case Edge.Left:
        return layout.borderLeft;
      default:
        return 0;
    }
  }

  // --- Cleanup ---

  freeRecursive() {
    this.ctx.reset();
  }

  free() {
    // Individual node free is a no-op; tree reset handles everything
  }
}

// --- Shared context per loadYoga() call ---

class TaffyContext {
  tree: TaffyTree;
  nodes: TaffyNodeAdapter[] = [];
  measureFuncs: Map<bigint, MeasureFunction> = new Map();

  constructor() {
    this.tree = new TaffyTree();
    this.tree.disableRounding();
  }

  createNode(): TaffyNodeAdapter {
    const style = new Style();
    style.display = TaffyDisplay.Flex; // Match Yoga's default (Taffy defaults to Block)
    const nodeId = this.tree.newLeaf(style);
    const adapter = new TaffyNodeAdapter(this, nodeId, style);
    this.nodes.push(adapter);
    return adapter;
  }

  reset() {
    // Clear all nodes for reuse (pagination relayouts).
    // Use clear() instead of free() to avoid Rust ownership issues
    // with outstanding Layout/Style references.
    this.tree.clear();
    this.nodes = [];
    this.measureFuncs.clear();
  }
}

// --- Public API (same shape as before) ---

export const loadYoga = async () => {
  await initTaffy();

  const ctx = new TaffyContext();
  const node = { create: () => ctx.createNode() };

  return { node };
};

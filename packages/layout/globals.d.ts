declare module 'yoga-layout/load' {
  export enum Align {
    Auto = 0,
    FlexStart = 1,
    Center = 2,
    FlexEnd = 3,
    Stretch = 4,
    Baseline = 5,
    SpaceBetween = 6,
    SpaceAround = 7,
    SpaceEvenly = 8,
  }

  export enum BoxSizing {
    BorderBox = 0,
    ContentBox = 1,
  }

  export enum Dimension {
    Width = 0,
    Height = 1,
  }

  export enum Direction {
    Inherit = 0,
    LTR = 1,
    RTL = 2,
  }

  export enum Display {
    Flex = 0,
    None = 1,
    Contents = 2,
  }

  export enum Edge {
    Left = 0,
    Top = 1,
    Right = 2,
    Bottom = 3,
    Start = 4,
    End = 5,
    Horizontal = 6,
    Vertical = 7,
    All = 8,
  }

  export enum Errata {
    None = 0,
    StretchFlexBasis = 1,
    AbsolutePositionWithoutInsetsExcludesPadding = 2,
    AbsolutePercentAgainstInnerSize = 4,
    All = 2147483647,
    Classic = 2147483646,
  }

  export enum ExperimentalFeature {
    WebFlexBasis = 0,
  }

  export enum FlexDirection {
    Column = 0,
    ColumnReverse = 1,
    Row = 2,
    RowReverse = 3,
  }

  export enum Gutter {
    Column = 0,
    Row = 1,
    All = 2,
  }

  export enum Justify {
    FlexStart = 0,
    Center = 1,
    FlexEnd = 2,
    SpaceBetween = 3,
    SpaceAround = 4,
    SpaceEvenly = 5,
  }

  export enum LogLevel {
    Error = 0,
    Warn = 1,
    Info = 2,
    Debug = 3,
    Verbose = 4,
    Fatal = 5,
  }

  export enum MeasureMode {
    Undefined = 0,
    Exactly = 1,
    AtMost = 2,
  }

  export enum NodeType {
    Default = 0,
    Text = 1,
  }

  export enum Overflow {
    Visible = 0,
    Hidden = 1,
    Scroll = 2,
  }

  export enum PositionType {
    Static = 0,
    Relative = 1,
    Absolute = 2,
  }

  export enum Unit {
    Undefined = 0,
    Point = 1,
    Percent = 2,
    Auto = 3,
  }

  export enum Wrap {
    NoWrap = 0,
    Wrap = 1,
    WrapReverse = 2,
  }

  export type MeasureFunction = (
    width: number,
    widthMeasureMode: MeasureMode,
    height: number,
    heightMeasureMode: MeasureMode,
  ) => {
    width?: number | undefined;
    height?: number | undefined;
  } | null;

  export interface YogaNode {
    calculateLayout(
      width?: number,
      height?: number,
      direction?: Direction,
    ): void;
    copyStyle(node: YogaNode): void;
    free(): void;
    freeRecursive(): void;
    getAlignContent(): Align;
    getAlignItems(): Align;
    getAlignSelf(): Align;
    getAspectRatio(): number;
    getBorder(edge: Edge): number;
    getChild(index: number): YogaNode;
    getChildCount(): number;
    getComputedBorder(edge: Edge): number;
    getComputedBottom(): number;
    getComputedHeight(): number;
    // getComputedLayout(): Layout;
    getComputedLeft(): number;
    getComputedMargin(edge: Edge): number;
    getComputedPadding(edge: Edge): number;
    getComputedRight(): number;
    getComputedTop(): number;
    getComputedWidth(): number;
    getDisplay(): Display;
    getFlexBasis(): number;
    getFlexDirection(): FlexDirection;
    getFlexGrow(): number;
    getFlexShrink(): number;
    getFlexWrap(): Wrap;
    getHeight(): Value;
    getJustifyContent(): Justify;
    getOverflow(): Overflow;
    getParent(): YogaNode | null;
    getPositionType(): PositionType;
    insertChild(child: YogaNode, index: number): void;
    isDirty(): boolean;
    markDirty(): void;
    removeChild(child: YogaNode): void;
    reset(): void;
    setAlignContent(alignContent: Align): void;
    setAlignItems(alignItems: Align): void;
    setAlignSelf(alignSelf: Align): void;
    setAspectRatio(aspectRatio: number): void;
    setBorder(edge: Edge, borderWidth: number): void;
    setDisplay(display: Display): void;
    setFlex(flex: number): void;
    setFlexBasis(flexBasis: number | string): void;
    setFlexBasisPercent(flexBasis: number): void;
    setFlexDirection(flexDirection: Direction): void;
    setFlexGrow(flexGrow: number): void;
    setFlexShrink(flexShrink: number): void;
    setFlexWrap(flexWrap: Wrap): void;
    setHeight(height: number | string): void;
    setHeightAuto(): void;
    setHeightPercent(height: number): void;
    setJustifyContent(justifyContent: Justify): void;
    setMargin(edge: Edge, margin: number | string): void;
    setMarginAuto(edge: Edge): void;
    setMarginPercent(edge: Edge, margin: number): void;
    setMaxHeight(maxHeight: number | string): void;
    setMaxHeightPercent(maxHeight: number): void;
    setMaxWidth(maxWidth: number | string): void;
    setMaxWidthPercent(maxWidth: number): void;
    setGap(gap: Gutter, value: number): void;
    setGapPercent(gap: Gutter, value: number): void;
    setMeasureFunc(measureFunction: MeasureFunction): void;
    setMinHeight(minHeight: number | string): void;
    setMinHeightPercent(minHeight: number): void;
    setMinWidth(minWidth: number | string): void;
    setMinWidthPercent(minWidth: number): void;
    setOverflow(overflow: Overflow): void;
    setPadding(edge: Edge, padding: number | string): void;
    setPaddingPercent(edge: Edge, padding: number): void;
    setPosition(edge: Edge, position: number | string): void;
    setPositionPercent(edge: Edge, position: number): void;
    setPositionType(positionType: PositionType): void;
    setWidth(width: number | string): void;
    setWidthAuto(): void;
    setWidthPercent(width: number): void;
    unsetMeasureFunc(): void;
  }

  interface YogaConfig {
    setPointScaleFactor(factor: number): void;
  }

  interface ConfigStatic {
    create(): YogaConfig;
    destroy(config: YogaConfig): any;
  }

  interface NodeStatic {
    create(): YogaNode;
    createDefault(): YogaNode;
    createWithConfig(config: YogaConfig): YogaNode;
    destroy(node: YogaNode): any;
  }

  export interface Yoga {
    Node: NodeStatic;
    Config: ConfigStatic;
    getInstanceCount(): number;
  }

  export const loadYoga: () => Promise<Yoga>;
}

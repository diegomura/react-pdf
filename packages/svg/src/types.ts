export type Viewbox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export interface SvgNode {
  type: string;
  props: Record<string, unknown>;
  children?: SvgNode[];
}

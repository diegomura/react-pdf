export interface SvgNode {
  type: string;
  props: Record<string, unknown>;
  children?: SvgNode[];
}

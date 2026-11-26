export type LinebreakOptions = {
  tolerance?: number;
};

export type PenaltyNode = {
  type: 'penalty';
  width: number;
  penalty: number;
  flagged?: number;
};

export type BoxNode = {
  type: 'box';
  width: number;
  start: number;
  end: number;
  hyphenated?: boolean;
};

export type GlueNode = {
  type: 'glue';
  width: number;
  start: number;
  end: number;
  stretch: number;
  shrink: number;
};

export type Node = PenaltyNode | BoxNode | GlueNode;

import * as P from '@react-pdf/primitives';

interface StopProps {
  offset: string | number;
  stopColor: string;
  stopOpacity?: string | number;
}

export type StopNode = {
  type: typeof P.Stop;
  props: StopProps;
  style?: never;
  box?: never;
  origin?: never;
  yogaNode?: never;
  children?: never[];
};

export type SafeStopNode = StopNode;

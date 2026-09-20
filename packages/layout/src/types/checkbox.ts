import * as P from '@react-pdf/primitives';
import { SafeStyle, StyleProp } from '@react-pdf/stylesheet';

import { Box, FormCommonProps, Origin } from './base';

interface CheckboxProps extends FormCommonProps {
  backgroundColor?: string;
  borderColor?: string;
  checked?: boolean;
  onState?: string;
  offState?: string;
  xMark?: boolean;
}

export type CheckboxNode = {
  type: typeof P.Checkbox;
  props: CheckboxProps;
  style?: StyleProp;
  box?: Box;
  origin?: Origin;
  taffyNode?: bigint;
  children?: never[];
};

export type SafeCheckboxNode = Omit<CheckboxNode, 'style'> & {
  style: SafeStyle;
  wasSplit: boolean;
};

import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';
import { YogaNode } from 'yoga-layout/load';

import { Box, FormCommonProps, Origin } from './base';

interface SelectAndListPropsBase extends FormCommonProps {
  sort?: boolean;
  edit?: boolean;
  multiSelect?: boolean;
  noSpell?: boolean;
  select?: string[];
}

type SelectAndListPropsWithEdit = SelectAndListPropsBase & {
  edit: true | false;
  noSpell: boolean;
};

type SelectAndListPropsWithNoSpell = SelectAndListPropsBase & {
  edit: boolean;
  noSpell: true | false;
};

type SelectAndListProps =
  | SelectAndListPropsWithEdit
  | SelectAndListPropsWithNoSpell;

export type SelectNode = {
  type: typeof P.Select;
  props: SelectAndListProps;
  style?: Style | Style[];
  box?: Box;
  origin?: Origin;
  yogaNode?: never;
  children?: never[];
};

export type SafeSelectNode = Omit<SelectNode, 'style'> & {
  style: SafeStyle;
};

export type ListNode = {
  type: typeof P.List;
  props: SelectAndListProps;
  style?: Style | Style[];
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  children?: never[];
};

export type SafeListNode = Omit<ListNode, 'style'> & {
  style: SafeStyle;
};

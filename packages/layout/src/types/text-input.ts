import * as P from '@react-pdf/primitives';
import { SafeStyle, Style } from '@react-pdf/stylesheet';
import { YogaNode } from 'yoga-layout/load';

import { Box, FormCommonProps, Origin } from './base';

// see http://pdfkit.org/docs/forms.html#text_field_formatting
interface TextInputFormatting {
  type:
    | 'date'
    | 'time'
    | 'percent'
    | 'number'
    | 'zip'
    | 'zipPlus4'
    | 'phone'
    | 'ssn';
  param?: string;
  nDec?: number;
  sepComma?: boolean;
  negStyle?: 'MinusBlack' | 'Red' | 'ParensBlack' | 'ParensRed';
  currency?: string;
  currencyPrepend?: boolean;
}

// see http://pdfkit.org/docs/forms.html#text_field_formatting
interface TextInputProps extends FormCommonProps {
  align?: 'left' | 'center' | 'right';
  multiline?: boolean;
  /**
   * The text will be masked (e.g. with asterisks).
   */
  password?: boolean;
  /**
   * If set, text entered in the field is not spell-checked
   */
  noSpell?: boolean;
  format?: TextInputFormatting;
  /**
   * Sets the fontSize (default or 0 means auto sizing)
   */
  fontSize?: number;
  /**
   * Sets the maximum length (characters) of the text in the field
   */
  maxLength?: number;
}

export type TextInputNode = {
  type: typeof P.TextInput;
  props: TextInputProps;
  style?: Style | Style[];
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  children?: never[];
};

export type SafeTextInputNode = Omit<TextInputNode, 'style'> & {
  style: SafeStyle;
};

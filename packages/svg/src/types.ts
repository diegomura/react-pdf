export interface SvgNode {
  type: string;
  props: Record<string, unknown>;
  children?: SvgNode[];
}

type OpenToken = {
  type: 'open';
  tagName: string;
  attributes: Record<string, string>;
};

type SelfCloseToken = {
  type: 'self-close';
  tagName: string;
  attributes: Record<string, string>;
};

type CloseToken = { type: 'close'; tagName: string };

type TextToken = { type: 'text'; text: string };

export type Token = OpenToken | SelfCloseToken | CloseToken | TextToken;

export interface SvgNode {
  type: string;
  props: Record<string, unknown>;
  children?: SvgNode[];
}

export interface XmlElement {
  tagName: string;
  attributes: Record<string, string>;
  children: (XmlElement | XmlText)[];
}

export interface XmlText {
  text: string;
}

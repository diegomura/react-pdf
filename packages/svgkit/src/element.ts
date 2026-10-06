export type SVGElementNode = {
  name: string;
  attributes: Record<string, string | number>;
  children: (SVGElementNode | string)[];
};

export const createElement = (name: string): SVGElementNode => ({
  name,
  attributes: {},
  children: [],
});

export const setAttribute = (
  element: SVGElementNode,
  name: string,
  value: string | number,
) => {
  element.attributes[name] = value;
};

export const appendChild = (
  parent: SVGElementNode,
  child: SVGElementNode | string,
) => {
  parent.children.push(child);
};

export const fmt = (value: number) => {
  const rounded = Math.round(value * 1e4) / 1e4;
  return Object.is(rounded, -0) ? 0 : rounded;
};

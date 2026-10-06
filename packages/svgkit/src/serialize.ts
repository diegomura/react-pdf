import { SVGElementNode } from './element';

const escapeAttribute = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const escapeText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const serialize = (element: SVGElementNode): string => {
  const attributes = Object.entries(element.attributes)
    .map(([name, value]) => ` ${name}="${escapeAttribute(String(value))}"`)
    .join('');

  if (element.children.length === 0) return `<${element.name}${attributes}/>`;

  const children = element.children
    .map((child) =>
      typeof child === 'string' ? escapeText(child) : serialize(child),
    )
    .join('');

  return `<${element.name}${attributes}>${children}</${element.name}>`;
};

export default serialize;

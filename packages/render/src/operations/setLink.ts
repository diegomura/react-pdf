import { SafeNode } from '@react-pdf/layout';
import { Context } from '../types';

const isString = (value: any): value is string => typeof value === 'string';

const isSrcId = (value: string) => /^#.+/.test(value);

const renderLink = (ctx: Context, node: SafeNode, src: string) => {
  if (!src || !node.box) return;

  const isId = isSrcId(src);
  const method = isId ? 'goTo' : 'link';
  const value = isId ? src.slice(1) : src;
  const { top, left, width, height } = node.box;

  ctx[method](left, top, width, height, value);
};

const setLink = (ctx: Context, node: SafeNode) => {
  const props = node.props || {};

  if ('src' in props && isString(props.src))
    return renderLink(ctx, node, props.src);

  if ('href' in props && isString(props.href))
    return renderLink(ctx, node, props.href);
};

export default setLink;

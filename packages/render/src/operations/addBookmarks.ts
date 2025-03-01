import { SafeDocumentNode, SafeNode } from '@react-pdf/layout';

import { Context } from '../types';

type Registry = Record<number, any>;

const addNodeBookmark = (
  ctx: Context,
  node: SafeNode,
  pageNumber: number,
  registry: Registry,
) => {
  if (!node.box) return;
  if (!node.props) return;

  if ('bookmark' in node.props && node.props.bookmark) {
    const bookmark = node.props.bookmark;
    const { title, parent, expanded, zoom, fit } = bookmark;
    const outline = registry[parent!] || ctx.outline;
    const top = bookmark.top || node.box.top;
    const left = bookmark.left || node.box.left;
    const instance = outline.addItem(title, {
      pageNumber,
      expanded,
      top,
      left,
      zoom,
      fit,
    });

    registry[bookmark.ref!] = instance;
  }

  if (!node.children) return;

  node.children.forEach((child) =>
    addNodeBookmark(ctx, child, pageNumber, registry),
  );
};

const addBookmarks = (ctx: Context, root: SafeDocumentNode) => {
  const registry = {};

  const pages = root.children || [];

  pages.forEach((page, i) => {
    addNodeBookmark(ctx, page, i, registry);
  });
};

export default addBookmarks;

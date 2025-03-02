import type { SafeDocumentNode } from '@react-pdf/layout';

import renderNode from './primitives/renderNode';
import addBookmarks from './operations/addBookmarks';
import { Context } from './types';

const render = (ctx: Context, doc: SafeDocumentNode) => {
  const pages = doc.children || [];
  const options = { imageCache: new Map(), fieldSets: [] };

  pages.forEach((page) => renderNode(ctx, page, options));

  addBookmarks(ctx, doc);

  ctx.end();

  return ctx;
};

export default render;

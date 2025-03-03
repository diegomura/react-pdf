import renderNode from './primitives/renderNode';
import addNodeBookmark from './operations/addNodeBookmark';

const render = (ctx, doc) => {
  const pages = doc.children || [];
  const options = { imageCache: new Map() };

  const registry = {};

  pages.forEach((page, i) => {
    renderNode(ctx, page, options);
    addNodeBookmark(ctx, page, i, registry);
  });

  ctx.end();

  return ctx;
};

export default render;

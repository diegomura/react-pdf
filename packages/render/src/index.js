import renderNode from './primitives/renderNode';
import addMetadata from './operations/addMetadata';
import addBookmarks from './operations/addBookmarks';

const render = (ctx, doc) => {
  const pages = doc.children || [];

  addMetadata(ctx, doc);

  pages.forEach(page => renderNode(ctx, page));

  addBookmarks(ctx, doc);

  ctx.end();

  return ctx;
};

export default render;

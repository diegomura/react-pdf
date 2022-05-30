import renderNode from './primitives/renderNode';
import addMetadata from './operations/addMetadata';

const render = (ctx, doc) => {
  const pages = doc.children || [];

  addMetadata(ctx, doc);

  pages.forEach(page => renderNode(ctx, page));

  ctx.end();

  return ctx;
};

export default render;

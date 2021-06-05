import renderNode from './primitives/renderNode';
import addMetadata from './operations/addMetadata';

const renderDocument = ctx => doc => {
  const pages = doc.children || [];
  pages.forEach(renderNode(ctx));
};

const render = (ctx, doc) => {
  addMetadata(ctx)(doc);
  renderDocument(ctx)(doc);

  ctx.end();

  return ctx;
};

export default render;

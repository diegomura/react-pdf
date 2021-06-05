import * as R from 'ramda';

import renderNode from './primitives/renderNode';
import addMetadata from './operations/addMetadata';

const renderDocument = ctx =>
  R.compose(R.forEach(renderNode(ctx)), R.pathOr([], ['children']));

const render = (ctx, doc) => {
  addMetadata(ctx)(doc);
  renderDocument(ctx)(doc);
  // ctx.addPage()
  // ctx.fontSize(60).text('demo', 0, 0)

  ctx.end();

  return ctx;
};

export default render;

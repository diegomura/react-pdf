import * as R from 'ramda';

import PDFPage from './page';
import { createObject } from './objects';
import { applyTransformations } from './operations';
import primitives from './primitives';

const renderNode = (ctx, node) => {
  if (node) {
    ctx.save();

    applyTransformations(ctx, node);
    primitives.render(ctx, node);

    const overflow = node.style?.overflow;

    if (overflow === 'hidden') {
      const { left, top, width, height } = node.box;
      ctx.rect(left, top, width, height).clip();
    }

    for (let i = 0; i < node.children?.length; i += 1) {
      renderNode(ctx, node.children[i]);
    }

    ctx.restore();
  }
};

const render = (ctx, doc) => {
  const pages = R.pathOr([], ['children'], doc);

  ctx.addPage = (page) => new PDFPage(ctx, page);

  for (let i = 0; i < pages.length; i += 1) {
    renderNode(ctx.addPage(pages[i].props), pages[i]);
  }

  const catalog = ctx.page.dictionary;
  catalog.data.Pages = ctx.page.root.getReference();

  const pagesDictionary = createObject('Pages');
  pagesDictionary.data.Kids = ctx.pages.map((page) => page.getReference());
  pagesDictionary.data.Count = ctx.pages.length;

  catalog.data.Pages = pagesDictionary.toReference();
};

export default render;

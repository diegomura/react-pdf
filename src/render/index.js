import * as R from 'ramda';

import Font from '../font';
import save from './save';
import setLink from './setLink';
import restore from './restore';
import isSvg from '../node/isSvg';
import isText from '../node/isText';
import isPage from '../node/isPage';
import isLink from '../node/isLink';
import isNote from '../node/isNote';
import isImage from '../node/isImage';
import isCanvas from '../node/isCanvas';
import renderSvg from './renderSvg';
import renderText from './renderText';
import renderPage from './renderPage';
import renderNote from './renderNote';
import renderImage from './renderImage';
import renderCanvas from './renderCanvas';
import renderRulers from './renderRulers';
import addMetadata from './addMetadata';
import renderDebug from './renderDebug';
import renderBorders from './renderBorders';
import setDestination from './setDestination';
import renderBackground from './renderBackground';
import applyTransformations from './applyTransformations';

const shouldRenderChildren = v => !isText(v) && !isSvg(v);

const renderChildren = ctx => node => {
  save(ctx, node);

  ctx.translate(node.box.left, node.box.top);

  R.compose(
    R.forEach(renderNode(ctx)),
    R.pathOr([], ['children']),
  )(node);

  restore(ctx, node);

  return node;
};

const renderNode = ctx => node =>
  R.compose(
    restore(ctx),
    renderDebug(ctx),
    setDestination(ctx),
    R.when(shouldRenderChildren, renderChildren(ctx)),
    R.when(R.either(isText, isLink), setLink(ctx)),
    R.cond([
      [isText, renderText(ctx)],
      [isNote, renderNote(ctx)],
      [isImage, renderImage(ctx)],
      [isCanvas, renderCanvas(ctx)],
      [isSvg, renderSvg(ctx)],
      [R.T, R.identity],
    ]),
    renderBorders(ctx),
    renderBackground(ctx),
    applyTransformations(ctx),
    save(ctx),
    R.when(isPage, renderPage(ctx)),
  )(node);

const renderDocument = ctx =>
  R.compose(
    R.forEach(
      R.compose(
        renderRulers(ctx),
        renderNode(ctx),
      ),
    ),
    R.pathOr([], ['children']),
  );

const render = (ctx, doc) => {
  addMetadata(ctx)(doc);
  renderDocument(ctx)(doc);

  ctx.end();
  Font.reset(); // TODO: move outside

  return ctx;
};

export default render;

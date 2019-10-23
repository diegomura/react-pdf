import * as R from 'ramda';

import Font from '../font';
import save from './save';
import restore from './restore';
import isSvg from '../node/isSvg';
import isText from '../node/isText';
import isPage from '../node/isPage';
import isImage from '../node/isImage';
import isNote from '../node/isNote';
import isLink from '../node/isLink';
import isCanvas from '../node/isCanvas';
import renderSvg from './renderSvg';
import renderText from './renderText';
import renderPage from './renderPage';
import renderLink from './renderLink';
import renderNote from './renderNote';
import renderImage from './renderImage';
import renderCanvas from './renderCanvas';
import renderRulers from './renderRulers';
import addMetadata from './addMetadata';
import renderDebug from './renderDebug';
import renderBorders from './renderBorders';
import renderBackground from './renderBackground';
import applyTransformations from './applyTransformations';

const isNotText = R.complement(isText);

const renderNode = ctx => node => {
  const renderChildren = R.tap(
    R.compose(
      R.forEach(renderNode(ctx)),
      R.pathOr([], ['children']),
    ),
  );

  return R.compose(
    restore(ctx),
    renderDebug(ctx),
    R.when(isNotText, renderChildren),
    R.cond([
      [isText, renderText(ctx)],
      [isLink, renderLink(ctx)],
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
};

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

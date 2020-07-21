import * as R from 'ramda';

import renderSvg from './renderSvg';
import renderText from './renderText';
import renderPage from './renderPage';
import renderNote from './renderNote';
import renderImage from './renderImage';
import renderDebug from './renderDebug';
import renderCanvas from './renderCanvas';
import renderBorders from './renderBorders';
import renderBackground from './renderBackground';
import isSvg from '../utils/isSvg';
import isLink from '../utils/isLink';
import isPage from '../utils/isPage';
import isNote from '../utils/isNote';
import isText from '../utils/isText';
import isImage from '../utils/isImage';
import isCanvas from '../utils/isCanvas';
import save from '../operations/save';
import setLink from '../operations/setLink';
import restore from '../operations/restore';
import clipNode from '../operations/clipNode';
import transform from '../operations/transform';
import setDestination from '../operations/setDestination';

const shouldRenderChildren = v => !isText(v) && !isSvg(v);

const isOverflowHidden = R.pathEq(['style', 'overflow'], 'hidden');

const renderChildren = ctx => node => {
  save(ctx, node);

  if (node.box) {
    ctx.translate(node.box.left, node.box.top);
  }

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
    transform(ctx),
    R.when(isOverflowHidden, clipNode(ctx)),
    save(ctx),
    R.when(isPage, renderPage(ctx)),
  )(node);

export default renderNode;

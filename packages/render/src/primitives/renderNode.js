import * as P from '@nutshelllabs/primitives';
import renderSvg from './renderSvg';
import renderText from './renderText';
import renderPage from './renderPage';
import renderNote from './renderNote';
import renderImage from './renderImage';
import renderDebug from './renderDebug';
import renderCanvas from './renderCanvas';
import renderBorders from './renderBorders';
import renderBackground from './renderBackground';
import setLink from '../operations/setLink';
import clipNode from '../operations/clipNode';
import transform from '../operations/transform';
import setDestination from '../operations/setDestination';

const isRecursiveNode = node => node.type !== P.Text && node.type !== P.Svg;

const renderChildren = (ctx, node, options) => {
  ctx.save();

  if (node.box) {
    ctx.translate(node.box.left, node.box.top);
  }

  const children = node.children || [];
  const renderChild = child => renderNode(ctx, child, options);

  children.forEach(renderChild);

  ctx.restore();
};

const renderFns = {
  [P.Text]: renderText,
  [P.Note]: renderNote,
  [P.Image]: renderImage,
  [P.Canvas]: renderCanvas,
  [P.Svg]: renderSvg,
  [P.Link]: setLink,
};

const renderNode = (ctx, node, options) => {
  const overflowHidden = node.style?.overflow === 'hidden';
  const shouldRenderChildren = isRecursiveNode(node);

  if (node.type === P.Page) renderPage(ctx, node);

  ctx.save();

  if (overflowHidden) clipNode(ctx, node);

  transform(ctx, node);
  renderBackground(ctx, node);
  renderBorders(ctx, node);

  const renderFn = renderFns[node.type];

  if (renderFn) renderFn(ctx, node, options);

  if (shouldRenderChildren) renderChildren(ctx, node, options);

  setDestination(ctx, node);
  renderDebug(ctx, node);

  ctx.restore();
};

export default renderNode;

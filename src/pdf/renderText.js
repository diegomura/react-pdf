import * as R from 'ramda';
import PDFRenderer from '@react-pdf/textkit/renderers/pdf';

const renderText = (ctx, node) => {
  console.log(node);

  const { top, left } = node.box;
  const paddingTop = R.pathOr(0, ['box', 'paddingTop'], node);
  const paddingLeft = R.pathOr(0, ['box', 'paddingLeft'], node);
  const initialY = node.lines[0] ? node.lines[0].box.y : 0;

  ctx.save();
  ctx.translate(left + paddingLeft, top + paddingTop - initialY);
  PDFRenderer.render(ctx, [node.lines]);
  ctx.restore();

  return node;
};

export default R.curryN(2, renderText);

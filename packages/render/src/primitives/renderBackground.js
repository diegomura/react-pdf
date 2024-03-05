import { isNil } from '@react-pdf/fns';

import clipNode from '../operations/clipNode';
import parseColor from '../utils/parseColor';

const drawBackground = (ctx, node) => {
  const { top, left, width, height } = node.box;
  const color = parseColor(node.style.backgroundColor);
  const nodeOpacity = isNil(node.style?.opacity) ? 1 : node.style.opacity;
  const opacity = Math.min(color.opacity, nodeOpacity);

  ctx
    .fillOpacity(opacity)
    .fillColor(color.value)
    .rect(left, top, width, height)
    .fill();
};

const drawBackgroundImage = (ctx, node) => {
  const { top, left, width, height } = node.box;
  const opacity = isNil(node.style?.opacity) ? 1 : node.style.opacity;
  const image = node?.backgroundImage;
  ctx
    .fillOpacity(opacity)
    .image(image, left, top , {
      fit: [width, height],
      align: 'center',
      valign: 'center',
    });
};

const renderBackground = (ctx, node) => {
  const hasBackground = !!node.box && !!node.style?.backgroundColor;

  if (hasBackground) {
    ctx.save();
    clipNode(ctx, node);
    drawBackground(ctx, node);
    ctx.restore();
  }

  const hasBackgroundImage = !!node.box && !!node.style?.backgroundImage;

  if (hasBackgroundImage) {

//     const color ={ value: [205, 211, 215], opacity: 1 };
//     const red ={ value:[205, 211, 215], opacity: 0.125 };
//     const green ={ value: [205, 211, 215], opacity: 0.6 };
//     const blue ={ value: [205, 211, 215], opacity: 0.1 };
    const whiteColor ={ value: [255, 255, 255], opacity: 1 };
//     const xoffset = 2;
//     const yoffset = 2;
//     const expand = 2;
    const {left, top, height, width} = node.box;
    const {
      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomLeftRadius = 0,
    } = node.style;
//     // drawBackgroundTemp(ctx, node, color);

//     // clipNodeTest(ctx, node, 1, 1, 2, 1);
//     // ctx.strokeOpacity(0.7);
//     // ctx.stroke('#CDD3D7');
//     // clipNodeTest(ctx, node, 1, 1, 1, 2);
//     // ctx.strokeOpacity(0.7);
//     // ctx.stroke('#CDD3D7');


//     // clipNodeTest(ctx, node, 1, 2, 2, 2);
//     // ctx.strokeOpacity(0.4);
//     // ctx.stroke('#CDD3D7');
//     // clipNodeTest(ctx, node, 2, 1, 2, 2);
//     // ctx.strokeOpacity(0.4);
//     // ctx.stroke('#CDD3D7');
//     ctx.save();
//     // ctx.strokeOpacity(0.2);
//     // ctx.scale(1);
//     // clipNodeTestFill(ctx, node, -1, -1, 0, 0, red);

//     ctx.save();
//     ctx.translate(2,2);
//     ctx.scale(0.5, {origin: [left,top]});
//     ctx.moveTo(left,top);
//     ctx.roundedRect(left, top, (width * 2 ), (height * 2 ), borderTopLeftRadius * 2);
//     ctx.fillColor(red.value);
//     ctx.fillOpacity(red.opacity);
//     ctx.fill();
//     ctx.restore();

//     ctx.translate(1,1);
//     ctx.scale(0.5, {origin: [left,top]});
//     ctx.moveTo(left,top);
//     ctx.roundedRect(left, top, (width * 2.0), (height * 2 ), borderTopLeftRadius * 2);
//     ctx.fillColor(red.value);
//     ctx.fillOpacity(red.opacity * 4);
//     ctx.fill();
//     ctx.restore();

//     ctx.save();
//     ctx.translate(0,1);
//     ctx.scale(0.5, {origin: [left,top]});
//     ctx.moveTo(left,top);
//     ctx.roundedRect(left, top, (width * 2 ), (height * 2 ), borderTopLeftRadius * 2);
//     ctx.fillColor(red.value);
//     ctx.fillOpacity(red.opacity);
//     ctx.fill();
// ctx.restore();

// ctx.save();
//     ctx.translate(1,0);
//     ctx.scale(0.5, {origin: [left,top]});
//     ctx.moveTo(left,top);
//     ctx.roundedRect(left, top, (width * 2 ), (height * 2 ), borderTopLeftRadius * 2);
//     ctx.fillColor(red.value);
//     ctx.fillOpacity(red.opacity);
//     ctx.fill();
//     ctx.restore();

//     ctx.save();
//     ctx.translate(1,1);
//     ctx.scale(0.5, {origin: [left,top]});
//     ctx.moveTo(left,top);
//     ctx.roundedRect(left, top, (width * 2 ), (height * 2 ), borderTopLeftRadius * 2);
//     ctx.fillColor(red.value);
//     ctx.fillOpacity(red.opacity);
//     ctx.fill();
//     ctx.restore();

    

//     // clipNodeTestFill(ctx, node, 0, 0, 0, 0, red);
//     // clipNodeTestFill(ctx, node, 0, 0, 0, 0, red);
//     // clipNodeTestFill(ctx, node, 0, 0, 0, 0, red);
//     // clipNodeTestFill(ctx, node, 0, 0, 0, 0, red);
//     // clipNodeTestFill(ctx, node, 0, 0, 0, 0, red);
//     // clipNodeTestFill(ctx, node, 0, 0, 0, 0, red);
//     // clipNodeTestFill(ctx, node, 0, 0, 1, 0, red);
//     // clipNodeTestFill(ctx, node, 0, 0, 0, 1, red);
//     // clipNodeTestFill(ctx, node, -2, -2, 2, 2, red);




//     // clipNodeTestFill(ctx, node, -1, -1, 1, 1, red);
//     // clipNodeTestFill(ctx, node, -1, -1, 2, 2, red);
//     // clipNodeTestFill(ctx, node, 0, 1, 0, 0, red);
//     // clipNodeTestFill(ctx, node, -1, -1, 2, 2, red);
//     // clipNodeTest(ctx, node,  -2, -2, 2, 2, red);
//     // clipNodeTestFill(ctx, node, -2, -2, 2, 2, red);
//     // clipNodeTestFill(ctx, node, -2, -2, 4, 4, red);
//     ctx.restore();

//     // ctx.save();
//     // // ctx.strokeOpacity(0.7);
//     // ctx.translate(2,2);

//     // clipNodeTestFill(ctx, node, 0, 0, 0, 0, green);
//     // ctx.restore();

//     // ctx.save();
//     // // ctx.strokeOpacity(1);
//     // ctx.translate(1,1);
//     // clipNodeTestFill(ctx, node, 0, 0, 0, 0, blue);
//     // ctx.restore();

    ctx.save();
    // clipNode(ctx, node);
    drawBackgroundImage(ctx, node);
    ctx.restore();

    ctx.save();
    ctx.roundedRect(left+3, top+3, width-6, height-6, borderTopLeftRadius);
    ctx.fillColor(whiteColor.value);
    ctx.fillOpacity(whiteColor.opacity);
    ctx.fill();
    ctx.restore();

    // ctx.strokeOpacity(0.2);
    // ctx.stroke('#CDD3D7');
    // clipNodeTest(ctx, node, 1, 1, 1, 1);
    // ctx.strokeOpacity(0.7);
    // ctx.stroke('#CDD3D7');

  }
};

const drawBackgroundTemp = (ctx, node, color) => {
  const xoffset = 0;
  const yoffset = 0;

  const { top, left, width, height } = node.box;
  const nodeOpacity = isNil(node.style?.opacity) ? 1 : node.style.opacity;
  const opacity = Math.min(color.opacity, nodeOpacity);

  ctx
    .fillOpacity(opacity)
    .fillColor(color.value)
    .rect(
      left + xoffset,
      top + yoffset,
      width,
      height
    )
    .fill();
};

const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const clipNodeTest = (ctx, node, xoffset, yoffset, heightDiff, widthDiff, color) => {
  if (!node.style) return;

  const { top: topMain, left: leftMain, width: widthMain, height: heightMain } = node.box;

  const top = topMain + yoffset;
  const left = leftMain + xoffset;
  const width = widthMain + widthDiff;
  const height = heightMain + heightDiff;

  const {
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomRightRadius = 0,
    borderBottomLeftRadius = 0,
  } = node.style;

  // Border top
  const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  const ctr = rtr * (1.0 - KAPPA);

  ctx.moveTo(left + rtr, top);
  ctx.lineTo(left + width - rtr, top);
  ctx.strokeOpacity(color.opacity);
  ctx.stroke(color.value);

  // Top Right Corner
  ctx.moveTo(left + width - rtr, top);
  ctx.bezierCurveTo(
    left + width - ctr,
    top,
    left + width,
    top + ctr,
    left + width,
    top + rtr,
  );
  ctx.strokeOpacity(color.opacity);
  ctx.stroke(color.value);

  // Border right
  const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  const cbr = rbr * (1.0 - KAPPA);
  ctx.moveTo(left + width, top + rtr);
  ctx.lineTo(left + width, top + height - rbr);
  ctx.strokeOpacity(color.opacity);
  ctx.stroke(color.value);

  // Right bottom corner
  ctx.moveTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(
    left + width,
    top + height - cbr,
    left + width - cbr,
    top + height,
    left + width - rbr,
    top + height,
  );
  ctx.strokeOpacity(color.opacity);
  ctx.stroke(color.value);

  // Border bottom
  const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
  const cbl = rbl * (1.0 - KAPPA);
  ctx.moveTo(left + width - rbr, top + height);
  ctx.lineTo(left + rbl, top + height);
  ctx.strokeOpacity(color.opacity);
  ctx.stroke(color.value);

  // bottom left Conner
  ctx.moveTo(left + rbl, top + height);
  ctx.bezierCurveTo(
    left + cbl,
    top + height,
    left,
    top + height - cbl,
    left,
    top + height - rbl,
  );
  ctx.strokeOpacity(color.opacity);
  ctx.stroke(color.value);

  // Border left
  const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  const ctl = rtl * (1.0 - KAPPA);
  ctx.moveTo(left, top + height - rbl);
  ctx.lineTo(left, top + rtl);
  ctx.strokeOpacity(color.opacity);
  ctx.stroke(color.value);

  // Left top corner
  // ctx.moveTo(left, top + rtl);
  // ctx.bezierCurveTo(left, top + ctl, left + ctl, top, left + rtl, top);
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);
  // ctx.fill();
};



const clipNodeTestFill = (ctx, node, xoffset, yoffset, heightDiff, widthDiff, color) => {
  if (!node.style) return;

  const { top: topMain, left: leftMain, width: widthMain, height: heightMain } = node.box;

  const top = topMain + yoffset;
  const left = leftMain + xoffset;
  const width = widthMain + widthDiff;
  const height = heightMain + heightDiff;

  const {
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomRightRadius = 0,
    borderBottomLeftRadius = 0,
  } = node.style;

  // Border top
  const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  const ctr = rtr * (1.0 - KAPPA);

  ctx.moveTo(left + rtr, top);
  ctx.lineTo(left + width - rtr, top);
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);

  // Top Right Corner
  // ctx.moveTo(left + width - rtr, top);
  ctx.bezierCurveTo(
    left + width - ctr,
    top,
    left + width,
    top + ctr,
    left + width,
    top + rtr,
  );
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);

  // Border right
  const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  const cbr = rbr * (1.0 - KAPPA);
  // ctx.moveTo(left + width, top + rtr);
  ctx.lineTo(left + width, top + height - rbr);
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);

  // Right bottom corner
  // ctx.moveTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(
    left + width,
    top + height - cbr,
    left + width - cbr,
    top + height,
    left + width - rbr,
    top + height,
  );
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);

  // Border bottom
  const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
  const cbl = rbl * (1.0 - KAPPA);
  // ctx.moveTo(left + width - rbr, top + height);
  ctx.lineTo(left + rbl, top + height);
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);

  // bottom left Conner
  // ctx.moveTo(left + rbl, top + height);
  ctx.bezierCurveTo(
    left + cbl,
    top + height,
    left,
    top + height - cbl,
    left,
    top + height - rbl,
  );
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);

  // Border left
  const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  const ctl = rtl * (1.0 - KAPPA);
  // ctx.moveTo(left, top + height - rbl);
  ctx.lineTo(left, top + rtl);
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);

  // Left top corner
  // ctx.moveTo(left, top + rtl);
  ctx.bezierCurveTo(left, top + ctl, left + ctl, top, left + rtl, top);
  // ctx.strokeOpacity(color.opacity);
  // ctx.stroke(color.value);
  ctx.fillOpacity(color.opacity);
  ctx.fillColor(color.value);
  ctx.fill();
};

export default renderBackground;

const isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const applyContainObjectFit = (cw, ch, iw, ih, px, py) => {
  const cr = cw / ch;
  const ir = iw / ih;

  if (cr > ir) {
    const height = ch;
    const width = height * ir;
    const xOffset = isNumeric(px) ? px : (cw - width) * 0.5;
    return { width, height, xOffset, yOffset: py || 0 };
  } else {
    const width = cw;
    const height = width / ir;
    const yOffset = isNumeric(py) ? py : (ch - height) * 0.5;
    return { width, height, yOffset, xOffset: px || 0 };
  }
};

const applyNoneObjectFit = (cw, ch, iw, ih, px, py) => {
  const width = iw;
  const height = ih;

  const xOffset = isNumeric(px) ? px : (cw - width) * 0.5;
  const yOffset = isNumeric(py) ? py : (ch - height) * 0.5;

  return { width, height, xOffset, yOffset };
};

const applyCoverObjectFit = (cw, ch, iw, ih, px, py) => {
  const ir = iw / ih;
  const cr = cw / ch;

  if (cr > ir) {
    const width = cw;
    const height = width / ir;
    const xOffset = isNumeric(px) ? px : 0;
    const yOffset = isNumeric(py) ? px : (ch - height) * 0.5;
    return { width, height, yOffset, xOffset };
  } else {
    const height = ch;
    const width = height * ir;
    const xOffset = isNumeric(px) ? px : (cw - width) * 0.5;
    const yOffset = isNumeric(py) ? py : 0;
    return { width, height, xOffset, yOffset };
  }
};

const applyScaleDownObjectFit = (cw, ch, iw, ih, px, py) => {
  const containDimension = applyContainObjectFit(cw, ch, iw, ih, px, py);
  const noneDimension = applyNoneObjectFit(cw, ch, iw, ih, px, py);

  return containDimension.width < noneDimension.width
    ? containDimension
    : noneDimension;
};

export const resolveObjectFit = (type = 'fill', cw, ch, iw, ih, px, py) => {
  switch (type) {
    case 'contain':
      return applyContainObjectFit(cw, ch, iw, ih, px, py);
    case 'cover':
      return applyCoverObjectFit(cw, ch, iw, ih, px, py);
    case 'none':
      return applyNoneObjectFit(cw, ch, iw, ih, px, py);
    case 'scale-down':
      return applyScaleDownObjectFit(cw, ch, iw, ih, px, py);
    default:
      return {
        width: cw,
        height: ch,
        xOffset: px || 0,
        yOffset: py || 0,
      };
  }
};

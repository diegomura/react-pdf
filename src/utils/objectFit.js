const applyContainObjectFit = (cw, ch, iw, ih, px, py) => {
  const cr = cw / ch;
  const ir = iw / ih;

  if (cr > ir) {
    const height = ch;
    const width = height * ir;
    const xOffset = (cw - width) * 0.5;
    return { width, height, xOffset, yOffset: 0 };
  } else {
    const width = cw;
    const height = width / ir;
    const yOffset = (ch - height) * 0.5;
    return { width, height, yOffset, xOffset: 0 };
  }
};

const applyNoneObjectFit = (cw, ch, iw, ih) => {
  const width = iw;
  const height = ih;
  const xOffset = (cw - width) * 0.5;
  const yOffset = (ch - height) * 0.5;

  return { width, height, xOffset, yOffset };
};

export const resolveObjectFit = (
  type = 'fill',
  cw,
  ch,
  iw,
  ih,
  px = '50%',
  py = '50%',
) => {
  const ir = iw / ih;
  const cr = cw / ch;

  switch (type) {
    case 'contain':
      return applyContainObjectFit(cw, ch, iw, ih);
    case 'cover':
      if (cr > ir) {
        const width = cw;
        const height = width / ir;
        const yOffset = (ch - height) * 0.5;
        return { width, height, yOffset, xOffset: 0 };
      } else {
        const height = ch;
        const width = height * ir;
        const xOffset = (cw - width) * 0.5;
        return { width, height, xOffset, yOffset: 0 };
      }
    case 'none':
      return applyNoneObjectFit(cw, ch, iw, ih);
    case 'scale-down':
      const containDimension = applyContainObjectFit(cw, ch, iw, ih);
      const noneDimension = applyNoneObjectFit(cw, ch, iw, ih);

      return containDimension.width < noneDimension.width
        ? containDimension
        : noneDimension;
    default:
      return {
        width: cw,
        height: ch,
        xOffset: 0,
        yOffset: 0,
      };
  }
};

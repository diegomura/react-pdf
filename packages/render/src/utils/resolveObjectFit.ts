import { matchPercent } from '@react-pdf/fns';

const isNumeric = (n: any): n is number => {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
};

const applyContainObjectFit = (
  cw: number,
  ch: number,
  iw: number,
  ih: number,
  px?: number | string,
  py?: number | string,
) => {
  const cr = cw / ch;
  const ir = iw / ih;

  const pxp = matchPercent(px ?? null);
  const pyp = matchPercent(py ?? null);
  const pxv = pxp ? pxp.percent : 0.5;
  const pyv = pyp ? pyp.percent : 0.5;

  if (cr > ir) {
    const height = ch;
    const width = height * ir;
    const yOffset = isNumeric(py) ? py : 0;
    const xOffset = isNumeric(px) ? px : (cw - width) * pxv;

    return { width, height, xOffset, yOffset };
  }

  const width = cw;
  const height = width / ir;
  const xOffset = isNumeric(px) ? px : 0;
  const yOffset = isNumeric(py) ? py : (ch - height) * pyv;

  return { width, height, yOffset, xOffset };
};

const applyNoneObjectFit = (
  cw: number,
  ch: number,
  iw: number,
  ih: number,
  px?: number | string,
  py?: number | string,
) => {
  const width = iw;
  const height = ih;
  const pxp = matchPercent(px ?? null);
  const pyp = matchPercent(py ?? null);
  const pxv = pxp ? pxp.percent : 0.5;
  const pyv = pyp ? pyp.percent : 0.5;
  const xOffset = isNumeric(px) ? px : (cw - width) * pxv;
  const yOffset = isNumeric(py) ? py : (ch - height) * pyv;

  return { width, height, xOffset, yOffset };
};

const applyCoverObjectFit = (
  cw: number,
  ch: number,
  iw: number,
  ih: number,
  px?: number | string,
  py?: number | string,
) => {
  const ir = iw / ih;
  const cr = cw / ch;

  const pxp = matchPercent(px ?? null);
  const pyp = matchPercent(py ?? null);
  const pxv = pxp ? pxp.percent : 0.5;
  const pyv = pyp ? pyp.percent : 0.5;

  if (cr > ir) {
    const width = cw;
    const height = width / ir;
    const xOffset = isNumeric(px) ? px : 0;
    const yOffset = isNumeric(py) ? py : (ch - height) * pyv;
    return { width, height, yOffset, xOffset };
  }

  const height = ch;
  const width = height * ir;
  const xOffset = isNumeric(px) ? px : (cw - width) * pxv;
  const yOffset = isNumeric(py) ? py : 0;
  return { width, height, xOffset, yOffset };
};

const applyScaleDownObjectFit = (
  cw: number,
  ch: number,
  iw: number,
  ih: number,
  px?: number | string,
  py?: number | string,
) => {
  const containDimension = applyContainObjectFit(cw, ch, iw, ih, px, py);
  const noneDimension = applyNoneObjectFit(cw, ch, iw, ih, px, py);

  return containDimension.width < noneDimension.width
    ? containDimension
    : noneDimension;
};

const applyFillObjectFit = (
  cw: number,
  ch: number,
  px?: number | string,
  py?: number | string,
) => {
  return {
    width: cw,
    height: ch,
    xOffset: matchPercent(px ?? null) ? 0 : (px as number) || 0,
    yOffset: matchPercent(py ?? null) ? 0 : (py as number) || 0,
  };
};

const resolveObjectFit = (
  type = 'fill',
  cw: number,
  ch: number,
  iw: number,
  ih: number,
  px?: number | string,
  py?: number | string,
) => {
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
      return applyFillObjectFit(cw, ch, px, py);
  }
};

export default resolveObjectFit;

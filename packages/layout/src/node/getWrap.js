import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isType = R.propEq('type');

const isSvg = isType(P.Svg);

const isNote = isType(P.Note);

const isImage = isType(P.Image);

const isCanvas = isType(P.Canvas);

const getWrap = R.ifElse(
  R.anyPass([isSvg, isNote, isImage, isCanvas]),
  R.always(false),
  R.pathOr(true, ['props', 'wrap']),
);

export default getWrap;

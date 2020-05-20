import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isCanvas = R.propEq('type', P.CANVAS);

export default isCanvas;

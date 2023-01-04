import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isCanvas = R.propEq('type', P.Canvas);

export default isCanvas;

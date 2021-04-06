import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isPolyline = R.propEq('type', P.Polyline);

export default isPolyline;

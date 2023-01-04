import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isPolyline = R.propEq('type', P.Polyline);

export default isPolyline;

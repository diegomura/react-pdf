import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isPolygon = R.propEq('type', P.POLYGON);

export default isPolygon;

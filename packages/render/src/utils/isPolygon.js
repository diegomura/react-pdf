import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isPolygon = R.propEq('type', P.Polygon);

export default isPolygon;

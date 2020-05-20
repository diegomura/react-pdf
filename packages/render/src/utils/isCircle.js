import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isCircle = R.propEq('type', P.CIRCLE);

export default isCircle;

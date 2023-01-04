import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isCircle = R.propEq('type', P.Circle);

export default isCircle;

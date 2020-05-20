import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isTspan = R.propEq('type', P.TSPAN);

export default isTspan;

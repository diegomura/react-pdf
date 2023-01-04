import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isRadialGradient = R.propEq('type', P.RadialGradient);

export default isRadialGradient;

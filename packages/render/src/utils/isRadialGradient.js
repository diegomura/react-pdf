import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isRadialGradient = R.propEq('type', P.RADIAL_GRADIENT);

export default isRadialGradient;

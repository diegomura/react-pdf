import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isSvg = R.propEq('type', P.Svg);

export default isSvg;

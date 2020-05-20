import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isRect = R.propEq('type', P.RECT);

export default isRect;

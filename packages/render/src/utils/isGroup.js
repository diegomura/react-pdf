import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isGroup = R.propEq('type', P.Group);

export default isGroup;

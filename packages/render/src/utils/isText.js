import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isText = R.propEq('type', P.TEXT);

export default isText;

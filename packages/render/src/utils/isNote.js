import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isNote = R.propEq('type', P.NOTE);

export default isNote;

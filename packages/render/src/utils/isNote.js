import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isNote = R.propEq('type', P.Note);

export default isNote;

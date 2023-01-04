import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isPath = R.propEq('type', P.Path);

export default isPath;

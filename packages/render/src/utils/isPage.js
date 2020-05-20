import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isPage = R.propEq('type', P.PAGE);

export default isPage;

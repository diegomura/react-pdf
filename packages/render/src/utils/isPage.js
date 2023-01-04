import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isPage = R.propEq('type', P.Page);

export default isPage;

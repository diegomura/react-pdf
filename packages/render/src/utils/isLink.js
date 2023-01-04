import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isLink = R.propEq('type', P.Link);

export default isLink;

import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isLink = R.propEq('type', P.LINK);

export default isLink;

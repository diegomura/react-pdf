import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isLink = R.propEq('type', P.Link);

export default isLink;

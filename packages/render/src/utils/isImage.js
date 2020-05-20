import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isImage = R.propEq('type', P.IMAGE);

export default isImage;

import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isImage = R.propEq('type', P.Image);

export default isImage;

import * as R from 'ramda';
import * as P from '@govind-react-pdf/primitives';

const isEllipse = R.propEq('type', P.Ellipse);

export default isEllipse;

import getOrientation from './getOrientation';

import { LANDSCAPE } from '../constants';

const isLandscape = page => getOrientation(page) === LANDSCAPE;

export default isLandscape;

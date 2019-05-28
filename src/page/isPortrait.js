import getOrientation from './getOrientation';

import { PORTRAIT } from '../constants';

const isPortrait = page => getOrientation(page) === PORTRAIT;

export default isPortrait;

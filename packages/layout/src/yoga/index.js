/* eslint-disable no-param-reassign */

import Yoga from '@react-pdf/yoga';

import Node from './node';
import * as CONSTANTS from './constants';

const YOGA_CONFIG = Yoga.Config.create();

YOGA_CONFIG.setPointScaleFactor(0);

const createNode = () => new Node(YOGA_CONFIG);

export default { ...Yoga, ...CONSTANTS, createNode };

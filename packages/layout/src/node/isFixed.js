import * as R from 'ramda';

const isFixed = R.pathEq(['props', 'fixed'], true);

export default isFixed;

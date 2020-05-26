import * as R from 'ramda';

import isDefs from '../node/isDefs';

const getChildren = R.propOr([], 'children');

const getId = R.path(['props', 'id']);

const getDefs = R.compose(
  R.map(R.prop(0)),
  R.groupBy(getId),
  getChildren,
  R.defaultTo({}),
  R.find(isDefs),
  getChildren,
);

export default getDefs;

import * as R from 'ramda';
import * as P from '@react-pdf/primitives';

const isDefs = R.propEq('type', P.Defs);

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

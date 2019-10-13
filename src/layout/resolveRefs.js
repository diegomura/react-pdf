import * as R from 'ramda';

let UUID = 0;

const assignId = node =>
  R.compose(
    R.evolve({ children: R.map(assignId) }),
    R.assoc('ref', ++UUID),
  )(node);

export default assignId;

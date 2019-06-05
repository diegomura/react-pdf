import * as R from 'ramda';

const restore = ctx => R.tap(() => ctx.restore());

export default restore;

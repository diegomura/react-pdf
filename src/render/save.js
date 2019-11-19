import * as R from 'ramda';

const save = ctx => R.tap(() => ctx.save());

export default save;

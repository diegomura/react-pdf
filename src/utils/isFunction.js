import { compose, equals, type } from 'ramda';

const isFunction = compose(
  equals('Function'),
  type,
);

export default isFunction;

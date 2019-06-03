import * as R from 'ramda';

const getDocumentProp = target => (or, prop) =>
  R.pathOr(or, ['children', 0, 'props', prop], target);

const setPDFMetadata = target => (key, value) => {
  if (value) target.info[key] = value;
};

/**
 * Set document instance metadata
 *
 * @param {Object} ctx document instance
 * @param {Object} root document root
 */
const addMetadata = (ctx, root) => {
  const getProp = getDocumentProp(root);
  const setProp = setPDFMetadata(ctx);

  const title = getProp(null, 'title');
  const author = getProp(null, 'author');
  const subject = getProp(null, 'subject');
  const keywords = getProp(null, 'keywords');
  const creator = getProp('react-pdf', 'creator');
  const producer = getProp('react-pdf', 'producer');

  setProp('Title', title);
  setProp('Author', author);
  setProp('Subject', subject);
  setProp('Keywords', keywords);
  setProp('Creator', creator);
  setProp('Producer', producer);

  return root;
};

export default R.curryN(2, addMetadata);

/* eslint-disable no-param-reassign */

const setPDFMetadata = (target) => (key, value) => {
  if (value) target.info[key] = value;
};

/**
 * Set document instance metadata
 *
 * @param {Object} ctx document instance
 * @param {Object} doc document root
 */
const addMetadata = (ctx, doc) => {
  const setProp = setPDFMetadata(ctx);

  const props = doc.props || {};
  const title = props.title || null;
  const author = props.author || null;
  const subject = props.subject || null;
  const keywords = props.keywords || null;
  const creator = props.creator ?? 'react-pdf';
  const producer = props.producer ?? 'react-pdf';
  const creationDate = props.creationDate || new Date();
  const modificationDate = props.modificationDate || null;

  setProp('Title', title);
  setProp('Author', author);
  setProp('Subject', subject);
  setProp('Keywords', keywords);
  setProp('Creator', creator);
  setProp('Producer', producer);
  setProp('CreationDate', creationDate);
  setProp('ModificationDate', modificationDate);
};

export default addMetadata;

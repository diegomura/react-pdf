import * as R from 'ramda';

const ATTACHMENT_CODE = 0xfffc; // 65532

const mapIndexed = R.addIndex(R.map);
const getGlyphs = R.propOr([], 'glyphs');
const getAttachment = R.pathOr({}, ['attributes', 'attachment']);
const isReplaceGlyph = R.o(
  R.includes(ATTACHMENT_CODE),
  R.propOr([], 'codePoints'),
);

/**
 * Resolve attachments of run
 *
 * @param  {Object}  run
 * @return {Object} run
 */
const resolveRunAttachments = run => {
  const glyphs = getGlyphs(run);
  const attachment = getAttachment(run);
  const attachmentWidth = R.always(attachment.width);

  return R.evolve({
    positions: mapIndexed((position, i) => {
      const glyph = glyphs[i];

      if (attachment && attachment.width && isReplaceGlyph(glyph)) {
        return R.evolve({ xAdvance: attachmentWidth }, position);
      }

      return R.clone(position);
    }),
  })(run);
};

/**
 * Resolve attachments for multiple paragraphs
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings (paragraphs)
 * @return {Array} attributed strings (paragraphs)
 */
const resolveAttachments = () =>
  R.evolve({
    runs: R.map(resolveRunAttachments),
  });

export default resolveAttachments;

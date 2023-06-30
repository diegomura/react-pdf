const ATTACHMENT_CODE = 0xfffc; // 65532

const isReplaceGlyph = glyph => glyph.codePoints.includes(ATTACHMENT_CODE);

/**
 * Resolve attachments of run
 *
 * @param  {Object}  run
 * @return {Object} run
 */
const resolveRunAttachments = run => {
  if (!run.positions || !run.glyphs || !run.attributes?.attachment) return;

  const glyphs = run.glyphs;
  const attachment = run.attributes?.attachment;

  run.positions.forEach((position, i) => {
    const glyph = glyphs[i];

    if (attachment.width && isReplaceGlyph(glyph)) {
      position.xAdvance = attachment.width;
    }
  });
};

/**
 * Resolve attachments for multiple paragraphs
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Array}  attributed strings (paragraphs)
 * @return {Array} attributed strings (paragraphs)
 */
const resolveAttachments = () => attributedString => {
  attributedString.runs.forEach(resolveRunAttachments);
  return attributedString;
};

export default resolveAttachments;

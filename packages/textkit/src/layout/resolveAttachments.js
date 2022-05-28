const ATTACHMENT_CODE = 0xfffc; // 65532

const isReplaceGlyph = glyph => glyph.codePoints.includes(ATTACHMENT_CODE);

/**
 * Resolve attachments of run
 *
 * @param  {Object}  run
 * @return {Object} run
 */
const resolveRunAttachments = run => {
  if (!run.positions) return run;

  const glyphs = run.glyphs || [];
  const attachment = run.attributes?.attachment || {};

  const positions = run.positions.map((position, i) => {
    const glyph = glyphs[i];

    if (attachment && attachment.width && isReplaceGlyph(glyph)) {
      return Object.assign({}, position, { xAdvance: attachment.width });
    }

    return Object.assign({}, position);
  });

  return Object.assign({}, run, { positions });
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
  const runs = attributedString.runs.map(resolveRunAttachments);
  return Object.assign({}, attributedString, { runs });
};

export default resolveAttachments;

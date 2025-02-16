import { AttributedString, Run } from '../types';

const ATTACHMENT_CODE = 0xfffc; // 65532

const isReplaceGlyph = (glyph) => glyph.codePoints.includes(ATTACHMENT_CODE);

/**
 * Resolve attachments of run
 *
 * @param run
 * @returns Run
 */
const resolveRunAttachments = (run: Run) => {
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
 */
const resolveAttachments = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Attributed string
   */
  return (attributedString: AttributedString) => {
    const runs = attributedString.runs.map(resolveRunAttachments);
    const res: AttributedString = Object.assign({}, attributedString, { runs });
    return res;
  };
};

export default resolveAttachments;

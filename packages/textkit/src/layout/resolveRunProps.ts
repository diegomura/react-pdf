import { AttributedString, Run } from '../types';

const ATTACHMENT_CODE = 0xfffc; // 65532

const isReplaceGlyph = (glyph) => glyph.codePoints.includes(ATTACHMENT_CODE);

/**
 * Resolve verticalAlign, attachments and yOffset for a single run in one pass.
 * Combines the logic of verticalAlignment, resolveAttachments and resolveYOffset.
 */
const resolveRun = (run: Run) => {
  let { attributes } = run;

  // verticalAlignment: derive yOffset for sub/super
  if (attributes.verticalAlign === 'sub') {
    attributes = { ...attributes, yOffset: -0.2 };
  } else if (attributes.verticalAlign === 'super') {
    attributes = { ...attributes, yOffset: 0.4 };
  }

  if (!run.positions)
    return attributes === run.attributes ? run : { ...run, attributes };

  const attachment = attributes.attachment;
  const unitsPerEm = attributes.font?.[0]?.unitsPerEm || 0;
  const yOffset = (attributes.yOffset || 0) * unitsPerEm;
  const hasAttachment = attachment && attachment.width;

  // Skip position mapping if nothing to change
  if (!hasAttachment && yOffset === 0) return run;

  const glyphs = run.glyphs || [];

  const positions = run.positions.map((position, i) => {
    const xAdvance =
      hasAttachment && isReplaceGlyph(glyphs[i])
        ? attachment.width
        : position.xAdvance;

    return {
      xAdvance,
      yAdvance: position.yAdvance,
      xOffset: position.xOffset,
      yOffset,
    };
  });

  return { ...run, attributes, positions };
};

/**
 * Resolve verticalAlign, attachments and yOffset for all runs in one pass.
 */
const resolveRunProps = () => {
  return (attributedString: AttributedString) => {
    const runs = attributedString.runs.map(resolveRun);
    return { ...attributedString, runs };
  };
};

export default resolveRunProps;

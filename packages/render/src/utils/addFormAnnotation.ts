import { Context } from '../types';

type Box = { top: number; left: number; width: number; height: number };

/**
 * Same as pdfkit's formAnnotation, but merges keys pdfkit has no mapping for
 * (appearance streams, MaxLen) into the field dictionary. Its own _fieldDict
 * builds from a whitelist and drops everything else, and annotate() ends the
 * reference, so the dictionary can't be amended after the fact either.
 */
const addFormAnnotation = (
  ctx: Context,
  name: string,
  type: string,
  box: Box,
  options: Record<string, any>,
  extra: Record<string, any>,
) => {
  const dict = ctx._fieldDict(name, type, options);

  Object.assign(dict, { Subtype: 'Widget', F: 4 });

  Object.entries(extra).forEach(([key, value]) => {
    if (value !== undefined) dict[key] = value;
  });

  ctx.annotate(box.left, box.top, box.width, box.height, dict);
  ctx._addToParent(ctx.page.annotations.at(-1));
};

export default addFormAnnotation;

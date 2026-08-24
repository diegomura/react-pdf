import { isNil } from '@react-pdf/fns';

import flatten from '../run/flatten';
import empty from '../attributedString/empty';
import { AttributedString } from '../types';
import type { Engines } from '../engines';

type ProcessRunsEngines = Pick<
  Engines,
  'bidi' | 'scriptItemizer' | 'fontSubstitution'
>;

/**
 * Performs font substitution and script itemization on attributed string
 *
 * @param engines - engines
 */
const preprocessRuns = (engines: ProcessRunsEngines) => {
  /**
   * @param attributedString - Attributed string
   * @returns Processed attributed string
   */
  return (attributedString: AttributedString | null) => {
    if (isNil(attributedString)) return empty();

    const { string } = attributedString;
    const { fontSubstitution, scriptItemizer, bidi } = engines;

    const { runs: itemizationRuns } = scriptItemizer()(attributedString);
    const { runs: substitutedRuns } = fontSubstitution()(attributedString);
    const { runs: bidiRuns } = bidi()(attributedString);

    // In flatten, later runs win the attribute merge. Substituted runs go
    // last so their resolved font (and scale) override the base runs' font
    // descriptors, which lets us keep the base runs as-is instead of
    // stripping `font` from every one of them.
    const runs = attributedString.runs
      .concat(bidiRuns)
      .concat(itemizationRuns)
      .concat(substitutedRuns);

    return { string, runs: flatten(runs) } as AttributedString;
  };
};

export default preprocessRuns;

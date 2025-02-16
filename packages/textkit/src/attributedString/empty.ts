import { AttributedString } from '../types';

/**
 * Returns empty attributed string
 *
 * @returns Empty attributed string
 */
const empty = (): AttributedString => ({ string: '', runs: [] });

export default empty;

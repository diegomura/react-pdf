const SOFT_HYPHEN = '­';

const MIN_WORD_LENGTH = 5;

// Same split the pattern sets assume: whitespace and ASCII punctuation end a
// word, everything else (accents included) is a letter.
const NON_LETTER = /\s|[!-@[-`{-~–-‼]/;

export type Patterns = {
  patterns: string[];
  exceptions: string[];
};

export type Hyphenator = {
  /**
   * Insert soft hyphens at every legal break.
   */
  hyphenate: (word: string) => string;
  /**
   * Split a word into the syllables it may break into.
   */
  syllables: (word: string) => string[];
};

type HyphenationPattern = {
  levels: number[];
  anchorStart: boolean;
  anchorEnd: boolean;
  length: number;
};

type TrieNode = {
  // Keyed by char code. A null prototype object with integer keys is backed by
  // elements storage, which is markedly faster to walk than a Map.
  children: Record<number, TrieNode>;
  plain: HyphenationPattern[] | null;
  anchored: HyphenationPattern[] | null;
};

const createNode = (): TrieNode => ({
  children: Object.create(null),
  plain: null,
  anchored: null,
});

/**
 * Parse a Liang pattern ('.ach4', 'a1bl') into the letters it matches and the
 * break levels between them, then index it by those letters.
 *
 * @param root - Trie root
 * @param source - Raw pattern
 */
const addPattern = (root: TrieNode, source: string) => {
  const levels: number[] = [];

  let text = '';
  let anchorStart = false;
  let anchorEnd = false;
  let afterLevel = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];

    if (char === '.') {
      if (i === 0) anchorStart = true;
      else anchorEnd = true;
      afterLevel = false;
    } else if (char >= '0' && char <= '9') {
      levels.push(Number(char));
      afterLevel = true;
    } else {
      if (!afterLevel) levels.push(0);
      text += char;
      afterLevel = false;
    }
  }

  // Some pattern sets carry letterless entries that match nothing.
  if (!text) return;

  let node = root;

  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);

    let child = node.children[code];

    if (!child) {
      child = createNode();
      node.children[code] = child;
    }

    node = child;
  }

  const entry = { levels, anchorStart, anchorEnd, length: text.length };

  // Patterns tied to a word edge need checking against the offset they matched
  // at; the rest never do, so keeping them apart drops two branches per hit.
  if (anchorStart || anchorEnd) {
    if (node.anchored) node.anchored.push(entry);
    else node.anchored = [entry];
  } else if (node.plain) {
    node.plain.push(entry);
  } else {
    node.plain = [entry];
  }
};

const SCRATCH_LIMIT = 128;

const scratch = new Uint8Array(SCRATCH_LIMIT + 1);

/**
 * Break levels for a word, reusing one buffer so the common case does not
 * allocate. Levels only ever run 0-9, and words past the buffer are rare
 * enough to just allocate for.
 *
 * @param length - Word length
 * @returns Zeroed levels
 */
const takeLevels = (length: number) => {
  if (length > SCRATCH_LIMIT) return new Uint8Array(length + 1);

  scratch.fill(0, 0, length + 1);

  return scratch;
};

/**
 * Build a hyphenator for a language's pattern set.
 *
 * @param source - Language patterns, as shipped by `hyphen/patterns/*`
 * @returns Hyphenator
 */
const createHyphenator = (source: Patterns): Hyphenator => {
  const root = createNode();

  for (let i = 0; i < source.patterns.length; i += 1) {
    addPattern(root, source.patterns[i]);
  }

  const cache: Map<string, string[]> = new Map();

  /**
   * Walk the trie from every offset so each pattern contributes its levels
   * wherever it occurs. Odd levels mark a legal break.
   */
  const splitWord = (word: string): string[] => {
    const length = word.length;

    if (length < MIN_WORD_LENGTH) return [word];

    const lowered = word.toLocaleLowerCase();
    const levels = takeLevels(length);

    for (let start = 0; start < length; start += 1) {
      let node = root;

      for (let end = start; end < length; end += 1) {
        const child = node.children[lowered.charCodeAt(end)];

        if (!child) break;

        node = child;

        const plain = node.plain;

        if (plain) {
          for (let p = 0; p < plain.length; p += 1) {
            const entryLevels = plain[p].levels;

            for (let l = 0; l < entryLevels.length; l += 1) {
              const level = entryLevels[l];

              if (level > levels[start + l]) levels[start + l] = level;
            }
          }
        }

        const anchored = node.anchored;

        if (anchored) {
          for (let p = 0; p < anchored.length; p += 1) {
            const entry = anchored[p];

            if (entry.anchorStart && start !== 0) continue;
            if (entry.anchorEnd && start + entry.length !== length) continue;

            for (let l = 0; l < entry.levels.length; l += 1) {
              const level = entry.levels[l];

              if (level > levels[start + l]) levels[start + l] = level;
            }
          }
        }
      }
    }

    // A break may never leave fewer than two characters on either side.
    levels[0] = 0;
    levels[1] = 0;
    levels[length] = 0;
    levels[length - 1] = 0;

    const parts: string[] = [];

    let from = 0;

    for (let i = 1; i <= length; i += 1) {
      if (levels[i] % 2 === 0) continue;

      parts.push(word.slice(from, i));
      from = i;
    }

    parts.push(word.slice(from));

    return parts;
  };

  /**
   * Words arrive with punctuation attached, which never hyphenates and does
   * not count towards the minimum length.
   */
  const splitToken = (token: string): string[] => {
    if (!NON_LETTER.test(token)) return splitWord(token);

    const parts: string[] = [''];

    let index = 0;

    while (index < token.length) {
      const isLetter = !NON_LETTER.test(token[index]);

      let end = index + 1;

      while (end < token.length && !NON_LETTER.test(token[end]) === isLetter) {
        end += 1;
      }

      const chunk = token.slice(index, end);

      if (isLetter) {
        const chunkParts = splitWord(chunk);

        parts[parts.length - 1] += chunkParts[0];

        for (let i = 1; i < chunkParts.length; i += 1) {
          parts.push(chunkParts[i]);
        }
      } else {
        parts[parts.length - 1] += chunk;
      }

      index = end;
    }

    return parts;
  };

  const syllables = (word: string): string[] => {
    const cached = cache.get(word);

    if (cached) return cached;

    const parts = splitToken(word);

    cache.set(word, parts);

    return parts;
  };

  const hyphenate = (word: string): string => syllables(word).join(SOFT_HYPHEN);

  return { hyphenate, syllables };
};

export default createHyphenator;

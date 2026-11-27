import { createRequire } from 'module';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const hyphenRoot = dirname(require.resolve('hyphen/package.json'));

/**
 * Each of hyphen's language folders either wraps a pattern file or points at
 * another language ('de' is 'de-1996'). Follow it to the pattern file so we
 * import the data alone, never their matcher.
 */
const resolvePatterns = (language) => {
  const entry = join(hyphenRoot, language, 'index.js');
  const source = readFileSync(entry, 'utf8');

  const patterns = source.match(/patterns\/(.+?)\.js/);
  if (patterns) return patterns[1];

  const alias = source.match(/\.\.\/(.+?)\/index\.js/);
  return alias ? resolvePatterns(alias[1]) : null;
};

const isLanguage = (entry) => {
  if (entry === 'patterns' || entry.startsWith('.')) return false;
  if (!statSync(join(hyphenRoot, entry)).isDirectory()) return false;

  try {
    statSync(join(hyphenRoot, entry, 'index.js'));
    return true;
  } catch {
    return false;
  }
};

const languages = readdirSync(hyphenRoot).filter(isLanguage);

let count = 0;

for (const language of languages) {
  const patterns = resolvePatterns(language);

  if (!patterns) continue;

  writeFileSync(
    join('lib', `${language}.js`),
    `import patterns from 'hyphen/patterns/${patterns}.js';\n` +
      `import createHyphenator from './index.js';\n\n` +
      `const { hyphenate, syllables } = createHyphenator(patterns);\n\n` +
      `export { hyphenate, syllables, patterns };\n`,
  );

  writeFileSync(
    join('lib', `${language}.d.ts`),
    `import type { Hyphenator, Patterns } from './index.js';\n\n` +
      `export declare const hyphenate: Hyphenator['hyphenate'];\n` +
      `export declare const syllables: Hyphenator['syllables'];\n` +
      `export declare const patterns: Patterns;\n`,
  );

  count += 1;
}

console.log(`Generated ${count} language entries`);

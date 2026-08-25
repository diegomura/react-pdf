import fs from 'node:fs';
import path from 'node:path';

// The legacy REPL injected @react-pdf/math's `Math` as a global, which shadowed
// the built-in. The new engine doesn't, so the example gets a real import and
// the worker lazy-loads the package.
const PATCHES = {
  math: (raw) => `import { Math } from '@react-pdf/math';\n\n${raw}`,

  // Font `src` was relative (`fonts/...`), which the worker resolves against
  // the worker chunk's own URL instead of the site origin. Make it absolute
  // so it resolves against `/public/fonts`.
  'font-register': (raw) => raw.replaceAll('`fonts/', '`/fonts/'),
  'font-feature-settings': (raw) => raw.replaceAll('`fonts/', '`/fonts/'),

  // `Lato` was used with no Font.register call (hard error, empty preview),
  // and the profile photo pointed at a remote host with no CORS headers,
  // which the worker's fetch can't read. Register Lato from Google's font
  // repo (CORS-enabled) and swap the photo for the one the legacy site
  // shipped under public/images.
  resume: (raw) =>
    `Font.register({ family: 'Lato', src: 'https://raw.githubusercontent.com/google/fonts/main/ofl/lato/Lato-Regular.ttf' });\n\n${raw.replace(
      'https://images.gr-assets.com/characters/1264613782p8/1783.jpg',
      '/images/luke.jpg',
    )}`,

  // FormField/Picker/FormList are the pre-v4 names for these form
  // components; the renderer now exports FieldSet/Select/List (see
  // content/docs/v4/form.mdx). Without the rename these throw
  // "X is not defined" inside the tree, which React surfaces as
  // "Cannot read properties of null (reading 'props')" at the render root.
  checkbox: (raw) => raw.replaceAll('FormField', 'FieldSet'),
  formfield: (raw) => raw.replaceAll('FormField', 'FieldSet'),
  'picker-formlist': (raw) =>
    raw.replaceAll('Picker', 'Select').replaceAll('FormList', 'List'),
};

const [srcDir, destDir] = process.argv.slice(2);
fs.mkdirSync(destDir, { recursive: true });

const identifier = (name) => name.replace(/-/g, '_');

const names = [];
for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith('.txt'))) {
  const name = path.basename(file, '.txt');
  const patch = PATCHES[name] ?? ((raw) => raw);
  const raw = patch(fs.readFileSync(path.join(srcDir, file), 'utf8'));
  const escaped = raw
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  const ident = identifier(name);

  fs.writeFileSync(
    path.join(destDir, `${name}.ts`),
    `const ${ident} = \`${escaped}\`;\n\nexport default ${ident};\n`,
  );
  names.push(name);
}

const index = [
  ...names.map((n) => `import ${identifier(n)} from './${n}';`),
  '',
  'export const examples: Record<string, string> = {',
  ...names.map((n) =>
    n === identifier(n) ? `  ${n}: ${n},` : `  '${n}': ${identifier(n)},`,
  ),
  '};',
  '',
].join('\n');

fs.writeFileSync(path.join(destDir, 'index.ts'), index);
console.log(`${names.length} examples`);

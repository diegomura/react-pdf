import fs from 'node:fs';
import path from 'node:path';

// The legacy REPL injected @react-pdf/math's `Math` as a global, which shadowed
// the built-in. The new engine doesn't, so the example gets a real import and
// the worker lazy-loads the package.
const PATCHES = {
  math: (raw) => `import { Math } from '@react-pdf/math';\n\n${raw}`,
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

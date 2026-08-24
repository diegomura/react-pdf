import fs from 'node:fs';
import path from 'node:path';

const [srcDir, destDir] = process.argv.slice(2);
if (!srcDir || !destDir) {
  console.error('usage: node migrate-docs.mjs <legacy-docs-dir> <content-dest-dir>');
  process.exit(1);
}

const RENAME = { 'quick-start.md': 'index.mdx' };

// Legacy pages have no H1; the page title is the first H2 (fragments have none).
const TITLE_FALLBACK = { 'quick-start.md': 'Quick start guide', 'compatibility.md': 'Compatibility' };

const eachLine = (text, fn) => {
  let fence = null;
  return text
    .split('\n')
    .map((line) => {
      const marker = line.match(/^\s*(```+|~~~+)/);
      if (marker) {
        if (!fence) fence = marker[1][0];
        else if (marker[1][0] === fence) fence = null;
        return line;
      }
      return fence ? line : fn(line);
    })
    .join('\n');
};

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.md'));
const fragmentsOf = new Map();
const migrated = new Map();

for (const file of files) {
  let text = fs.readFileSync(path.join(srcDir, file), 'utf8');

  // legacy MDX-v1 imports of site components — never inside a fence, they are
  // always at the top of the file, so anchor on the `src/` path
  text = text.replace(/^import .*['"](?:\.\.\/)+src\/.*['"];?[ \t]*$/gm, '');

  // sibling-doc imports: record the component -> file mapping, then drop them
  const fragments = new Map();
  text = text.replace(
    /^import (\w+) from ['"]\.\/(.*\.md)['"];?[ \t]*$/gm,
    (_, name, target) => {
      fragments.set(name, target);
      return '';
    },
  );
  fragmentsOf.set(file, fragments);

  // components Fumadocs replaces with built-ins
  text = text.replace(/<NavigationButtons[\s\S]*?\/>/g, '');
  text = text.replace(/<EditButton[\s\S]*?\/>/g, '');

  let title = TITLE_FALLBACK[file] ?? path.basename(file, '.md');
  let found = false;
  text = eachLine(text, (line) => {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2 && !found) {
      found = true;
      title = h2[1];
      return '';
    }
    return line;
  });

  // the page title moved to frontmatter, so section headings shift up a level
  text = eachLine(text, (line) =>
    /^#{3,6}\s/.test(line) ? line.slice(1) : line,
  );

  migrated.set(file, { title, body: text.trim() });
}

const inline = (file, seen = new Set()) => {
  if (seen.has(file)) throw new Error(`circular fragment import: ${file}`);
  seen.add(file);
  const { body } = migrated.get(file);
  const fragments = fragmentsOf.get(file);
  if (!fragments.size) return body;
  return body.replace(
    /^<(\w+)\s*(?:components=\{components\}\s*)?\/>[ \t]*$/gm,
    (match, name) =>
      fragments.has(name) ? inline(fragments.get(name), new Set(seen)) : match,
  );
};

const inlined = new Set(
  [...fragmentsOf.values()].flatMap((m) => [...m.values()]),
);

fs.mkdirSync(destDir, { recursive: true });

for (const file of files) {
  if (inlined.has(file)) {
    console.log(`${file} -> (inlined)`);
    continue;
  }
  const { title } = migrated.get(file);
  const out = `---\ntitle: ${JSON.stringify(title)}\n---\n\n${inline(file)}\n`;
  const name = RENAME[file] ?? file.replace(/\.md$/, '.mdx');
  fs.writeFileSync(path.join(destDir, name), out);
  console.log(`${file} -> ${name}`);
}

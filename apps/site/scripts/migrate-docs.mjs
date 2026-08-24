import fs from 'node:fs';
import path from 'node:path';

const [srcDir, destDir, version] = process.argv.slice(2);
if (!srcDir || !destDir || !version) {
  console.error(
    'usage: node migrate-docs.mjs <legacy-docs-dir> <content-dest-dir> <version>',
  );
  process.exit(1);
}

const RENAME = { 'quick-start.md': 'index.mdx' };

// Legacy pages have no H1; the page title is the first H2. These two have no
// H2 either, so fall back to the label the legacy sidebar used.
const TITLE_FALLBACK = {
  'quick-start.md': 'Quick start guide',
  'compatibility.md': 'Compatibility',
};

/** Applies `fn` to each region of `text` that sits outside a fenced code block. */
const outsideFences = (text, fn) => {
  const out = [];
  let buf = [];
  let fence = null;
  const flush = () => {
    if (buf.length) out.push(fn(buf.join('\n')));
    buf = [];
  };
  for (const line of text.split('\n')) {
    const marker = line.match(/^\s*(```+|~~~+)/);
    if (marker && (!fence || marker[1][0] === fence)) {
      if (!fence) flush();
      fence = fence ? null : marker[1][0];
      out.push(line);
    } else if (fence) {
      out.push(line);
    } else {
      buf.push(line);
    }
  }
  flush();
  return out.join('\n');
};

const eachLine = (text, fn) =>
  outsideFences(text, (chunk) => chunk.split('\n').map(fn).join('\n'));

/** Approximates github-slugger, which is what Fumadocs uses for heading ids. */
const slugify = (heading) =>
  heading
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N} \-_]/gu, '')
    .replace(/ /g, '-');

const headingSlugs = (body) => {
  const seen = new Map();
  const slugs = new Set();
  eachLine(body, (line) => {
    const m = line.match(/^#+\s+(.+?)\s*$/);
    if (m) {
      const base = slugify(m[1]);
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      slugs.add(n ? `${base}-${n}` : base);
    }
    return line;
  });
  return slugs;
};

/**
 * Legacy fences are mostly untagged; tag them so Shiki highlights them. Only
 * the info string changes, the block contents are untouched.
 */
const tagFences = (text) => {
  const lines = text.split('\n');
  let open = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*```/.test(lines[i])) continue;
    if (open < 0) {
      open = i;
    } else {
      if (lines[open].trim() === '```') {
        const block = lines.slice(open + 1, i);
        const shell = /^\s*(npm|yarn|pnpm|bun|npx)\s/.test(block[0] ?? '');
        const code = block.some((l) => /[{}<>=()]/.test(l));
        lines[open] += shell ? 'bash' : code ? 'jsx' : 'text';
      }
      open = -1;
    }
  }
  return lines.join('\n');
};

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.md'));
const fragmentsOf = new Map();
const migrated = new Map();

for (const file of files) {
  let text = fs.readFileSync(path.join(srcDir, file), 'utf8');

  text = outsideFences(text, (chunk) =>
    chunk
      // legacy MDX-v1 imports of site components — anchored on the `src/` path
      .replace(/^import .*['"](?:\.\.\/)+src\/.*['"];?[ \t]*$/gm, '')
      // components Fumadocs replaces with built-ins
      .replace(/<(NavigationButtons|EditButton)[\s\S]*?\/>/g, ''),
  );

  // sibling-doc imports: record the component -> file mapping, then drop them
  const fragments = new Map();
  text = outsideFences(text, (chunk) =>
    chunk.replace(
      /^import (\w+) from ['"]\.\/(.*\.md)['"];?[ \t]*$/gm,
      (_, name, target) => {
        if (!files.includes(target)) {
          throw new Error(`unknown fragment ./${target} imported by ${file}`);
        }
        fragments.set(name, target);
        return '';
      },
    ),
  );
  fragmentsOf.set(file, fragments);

  let title = TITLE_FALLBACK[file];
  text = eachLine(text, (line) => {
    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2 && title === undefined) {
      title = h2[1];
      return '';
    }
    return line;
  });
  // the page title moved to frontmatter, so section headings shift up a level
  text = eachLine(text, (line) =>
    /^#{3,6}\s/.test(line) ? line.slice(1) : line,
  );

  migrated.set(file, { title, body: tagFences(text).trim() });
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

const pages = files
  .filter((file) => !inlined.has(file))
  .map((file) => {
    const name = RENAME[file] ?? file.replace(/\.md$/, '.mdx');
    const slug = name.replace(/\.mdx$/, '').replace(/^index$/, '');
    let title = migrated.get(file).title;
    if (title === undefined) {
      title = path.basename(file, '.md');
      console.warn(
        `warn: no H2 in ${file}, using file name as title: ${title}`,
      );
    }
    return {
      file,
      name,
      title,
      body: inline(file),
      legacyPath: `/${path.basename(file, '.md')}`,
      newPath: `/docs/${version}/${slug}`.replace(/\/$/, ''),
    };
  });

const byLegacyPath = new Map(pages.map((p) => [p.legacyPath, p]));
const slugsOf = new Map(pages.map((p) => [p.newPath, headingSlugs(p.body)]));

/** Legacy anchors predate heading suffixes like `` `v2.0.0` `` — re-resolve. */
const resolveAnchor = (page, anchor) => {
  const slugs = slugsOf.get(page.newPath);
  if (slugs.has(anchor)) return anchor;
  const cased = slugify(anchor);
  if (slugs.has(cased)) return cased;
  const near = [...slugs].filter((s) => s.startsWith(`${cased}-`));
  if (near.length === 1) return near[0];
  console.warn(`warn: unresolved anchor #${anchor} on ${page.newPath}`);
  return anchor;
};

for (const page of pages) {
  page.body = outsideFences(page.body, (chunk) =>
    chunk.replace(/\]\((\/[\w-]*)(#[\w.-]+)?\)/g, (match, target, anchor) => {
      const dest = byLegacyPath.get(target);
      if (!dest) return match;
      const hash = anchor ? `#${resolveAnchor(dest, anchor.slice(1))}` : '';
      return `](${dest.newPath}${hash})`;
    }),
  );
}

fs.mkdirSync(destDir, { recursive: true });

for (const file of inlined) console.log(`${file} -> (inlined)`);
for (const page of pages) {
  const out = `---\ntitle: ${JSON.stringify(page.title)}\n---\n\n${page.body}\n`;
  fs.writeFileSync(path.join(destDir, page.name), out);
  console.log(`${page.file} -> ${page.name}`);
}

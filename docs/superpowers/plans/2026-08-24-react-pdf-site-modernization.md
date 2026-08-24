# react-pdf.org Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the new react-pdf.org in `apps/site` — Fumadocs docs with per-major versions, a rebuilt REPL, a hero with an editable mini-REPL, search, llms.txt, and an MCP server — per the approved spec at `docs/superpowers/specs/2026-08-24-react-pdf-site-modernization-design.md`.

**Architecture:** A self-contained Next.js App Router app at `apps/site` (NOT a yarn workspace — it has its own lockfile so `@react-pdf/renderer` resolves to the pinned npm release, never the workspace link). Fumadocs (`fumadocs-ui`/`fumadocs-core`/`fumadocs-mdx`) renders versioned MDX content from `content/docs/v{1..4}`. The REPL transpiles with sucrase in a web worker and renders with `@react-pdf/renderer`; the hero embeds the same pipeline.

**Tech Stack:** Next.js 15 (App Router), React 19, Fumadocs v15 / fumadocs-mdx v11, Tailwind CSS v4, CodeMirror 6, sucrase, lz-string, react-pdf (pdf.js viewer), mcp-handler + zod, vitest.

**Version caveat:** dependency majors below are correct as of writing. If an installed version's API differs from a code block, consult that library's docs for the installed major and adapt the call sites — do not downgrade to match the plan.

**Source material:** the legacy site is `github.com/diegomura/react-pdf-site` (branches `master` = v4, `v3`, `v2`, `v1`). Several tasks clone it read-only:

```bash
git clone --no-single-branch https://github.com/diegomura/react-pdf-site /tmp/react-pdf-site
```

---

## File structure

```
apps/site/
├── package.json                  # private, own lockfile, not a workspace
├── next.config.mjs               # fumadocs-mdx plugin + legacy redirects + .mdx rewrite
├── source.config.ts              # fumadocs-mdx collections (docs + blog)
├── tsconfig.json
├── postcss.config.mjs
├── vercel.json                   # ignoreCommand scoped to apps/site
├── app/
│   ├── global.css                # brand palette, light + dark
│   ├── layout.tsx                # RootProvider, dark default, Inter/JetBrains Mono
│   ├── (home)/layout.tsx         # top nav for landing
│   ├── (home)/page.tsx           # hero
│   ├── docs/layout.tsx           # DocsLayout with version tabs
│   ├── docs/[[...slug]]/page.tsx # docs renderer + old-version banner
│   ├── blog/page.tsx             # post list
│   ├── blog/[slug]/page.tsx      # post renderer
│   ├── repl/page.tsx             # full REPL
│   ├── api/search/route.ts       # Orama search
│   ├── api/raw/[[...slug]]/route.ts  # raw markdown per page
│   ├── api/mcp/[transport]/route.ts  # MCP server
│   ├── llms.txt/route.ts
│   └── llms-full.txt/route.ts
├── components/
│   ├── go-to-example.tsx         # "See it in action →" (ported)
│   ├── debug-sample.tsx          # box-model diagram (ported)
│   ├── overview-timeline.tsx     # rendering-process diagram (ported)
│   ├── copy-markdown.tsx         # "Copy page as Markdown" button
│   └── hero-repl.tsx             # editable mini-REPL for the hero
├── lib/
│   ├── source.ts                 # fumadocs loader
│   └── llm-text.ts               # page → markdown text
├── src/repl/
│   ├── compress.ts               # lz-string↔hex, ported verbatim
│   ├── transpile.ts              # sucrase wrapper (pure, testable)
│   ├── evaluate.ts               # module sandbox (pure, testable)
│   ├── worker.ts                 # transpile+evaluate+pdf blob
│   ├── use-repl.ts               # debounce, worker lifecycle, errors
│   ├── editor.tsx                # CodeMirror 6
│   ├── completions.ts            # react-pdf autocomplete source
│   ├── viewer.tsx                # pdf.js preview
│   └── examples/                 # 41 generated .ts modules + index.ts
├── content/docs/v4/…             # migrated master docs (+ v3, v2, v1)
├── content/blog/announcing-react-pdf-v2.mdx
├── scripts/
│   ├── migrate-docs.mjs          # md → mdx transform
│   └── generate-examples.mjs     # .txt → .ts modules
└── tests/                        # vitest: compress, transpile/evaluate, redirects, mcp
```

---

### Task 1: Scaffold `apps/site`

**Files:**
- Create: `apps/site/package.json`, `apps/site/next.config.mjs`, `apps/site/source.config.ts`, `apps/site/tsconfig.json`, `apps/site/postcss.config.mjs`, `apps/site/app/layout.tsx`, `apps/site/app/global.css`, `apps/site/app/(home)/layout.tsx`, `apps/site/app/(home)/page.tsx`, `apps/site/content/docs/v4/index.mdx`, `apps/site/lib/source.ts`, `apps/site/app/docs/layout.tsx`, `apps/site/app/docs/[[...slug]]/page.tsx`, `apps/site/vercel.json`, `apps/site/.gitignore`

- [ ] **Step 1: Create the package**

`apps/site/package.json`:

```json
{
  "name": "@react-pdf/site",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "postinstall": "fumadocs-mdx"
  },
  "dependencies": {
    "@react-pdf/renderer": "^4.8.0",
    "fumadocs-core": "^15.0.0",
    "fumadocs-mdx": "^11.0.0",
    "fumadocs-ui": "^15.0.0",
    "lz-string": "^1.5.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "vitest": "^3.0.0"
  }
}
```

REPL-specific deps (codemirror, sucrase, react-pdf viewer, mcp-handler) are added in their own tasks.

`apps/site/.gitignore`:

```
.next/
.source/
out/
```

- [ ] **Step 2: Confirm apps/ is not a workspace**

Check root `package.json` — `workspaces` must only match `packages/*`. Do NOT add `apps/*`. This is what keeps `@react-pdf/renderer` resolving from npm instead of the workspace. Also confirm root `.gitignore` ignores `node_modules` globally (it does).

- [ ] **Step 3: Config files**

`apps/site/next.config.mjs`:

```js
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    const docs = [
      'advanced',
      'compatibility',
      'components',
      'fonts',
      'form',
      'hooks',
      'node',
      'rendering-process',
      'styling',
      'svg',
    ];
    return [
      ...docs.map((slug) => ({
        source: `/${slug}`,
        destination: `/docs/v4/${slug}`,
        permanent: true,
      })),
      { source: '/docs', destination: '/docs/v4', permanent: false },
      { source: '/docs/v4/index', destination: '/docs/v4', permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: '/docs/:path*.mdx', destination: '/api/raw/:path*' }];
  },
};

export default withMDX(config);
```

Note: the legacy site served quick-start at `/`; the new `/` is the hero, and quick-start lives at `/docs/v4` (the index page). No redirect for `/`.

`apps/site/source.config.ts`:

```ts
import { defineConfig, defineDocs, defineCollections, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({ dir: 'content/docs' });

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({ date: z.string() }),
});

export default defineConfig();
```

`apps/site/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext", "webworker"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "noEmit": true,
    "paths": { "@/*": ["./*"] },
    "plugins": [{ "name": "next" }]
  },
  "include": ["**/*.ts", "**/*.tsx", ".source/**/*.ts", "next-env.d.ts"],
  "exclude": ["node_modules"]
}
```

`apps/site/postcss.config.mjs`:

```js
export default { plugins: { '@tailwindcss/postcss': {} } };
```

- [ ] **Step 4: Root layout and placeholder styles**

`apps/site/app/global.css` (brand palette lands in Task 6; start minimal):

```css
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';
```

`apps/site/app/layout.tsx`:

```tsx
import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: { template: '%s | react-pdf', default: 'react-pdf — PDFs, made with React' },
  description: 'React renderer for creating PDF files on the browser and server.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider theme={{ defaultTheme: 'dark' }}>{children}</RootProvider>
      </body>
    </html>
  );
}
```

`apps/site/app/(home)/layout.tsx`:

```tsx
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

export const homeNav = {
  nav: { title: <>react-pdf</> },
  links: [
    { text: 'Docs', url: '/docs/v4' },
    { text: 'REPL', url: '/repl' },
    { text: 'Blog', url: '/blog' },
    { text: 'GitHub', url: 'https://github.com/diegomura/react-pdf', external: true },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...homeNav}>{children}</HomeLayout>;
}
```

`apps/site/app/(home)/page.tsx` (placeholder until Task 8):

```tsx
export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-4xl font-bold">react-pdf</h1>
    </main>
  );
}
```

- [ ] **Step 5: Content source + docs shell**

`apps/site/lib/source.ts`:

```ts
import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
```

`apps/site/content/docs/v4/index.mdx` (replaced by real quick-start in Task 2):

```mdx
---
title: Quick start
---

Placeholder — replaced by migrated content.
```

`apps/site/content/docs/v4/meta.json`:

```json
{ "title": "v4", "root": true, "pages": ["index"] }
```

`apps/site/app/docs/layout.tsx`:

```tsx
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { homeNav } from '@/app/(home)/layout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...homeNav}>
      {children}
    </DocsLayout>
  );
}
```

`apps/site/app/docs/[[...slug]]/page.tsx`:

```tsx
import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import Link from 'next/link';

const LATEST = 'v4';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const version = params.slug?.[0];
  const isOld = version !== undefined && version !== LATEST && /^v\d+$/.test(version);
  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {isOld && (
        <div className="rounded-lg border border-fd-primary/50 bg-fd-primary/10 p-3 text-sm">
          You are viewing docs for {version}, which is no longer maintained.{' '}
          <Link className="font-medium underline" href={`/docs/${LATEST}`}>
            See the latest docs
          </Link>
          .
        </div>
      )}
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
```

`apps/site/vercel.json`:

```json
{
  "ignoreCommand": "git diff --quiet HEAD^ HEAD -- ."
}
```

(With the Vercel project's root directory set to `apps/site`, `-- .` scopes the diff to the site.)

- [ ] **Step 6: Install and verify build**

```bash
cd apps/site && yarn install && yarn build
```

Expected: build succeeds; `/`, `/docs/v4` render. Also `yarn dev` serves both.

- [ ] **Step 7: Commit**

```bash
git add apps/site
git commit -m "feat(site): scaffold Fumadocs app in apps/site"
```

---

### Task 2: Migrate v4 docs content

**Files:**
- Create: `apps/site/scripts/migrate-docs.mjs`, `apps/site/content/docs/v4/*.mdx`, `apps/site/components/go-to-example.tsx`, `apps/site/components/debug-sample.tsx`, `apps/site/components/overview-timeline.tsx`
- Modify: `apps/site/content/docs/v4/meta.json`, `apps/site/app/docs/[[...slug]]/page.tsx`

- [ ] **Step 1: Write the migration script**

The legacy docs are markdown with MDX-v1 imports (`import GoToExample from ...`) and component usages. `apps/site/scripts/migrate-docs.mjs`:

```js
import fs from 'node:fs';
import path from 'node:path';

const [srcDir, destDir] = process.argv.slice(2);
if (!srcDir || !destDir) {
  console.error('usage: node migrate-docs.mjs <legacy-docs-dir> <content-dest-dir>');
  process.exit(1);
}

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.md'));
fs.mkdirSync(destDir, { recursive: true });

for (const file of files) {
  let text = fs.readFileSync(path.join(srcDir, file), 'utf8');

  // strip only legacy MDX-v1 imports of site components — NOT import lines
  // inside fenced code examples (those are docs content)
  text = text.replace(/^import .*['"](?:\.\.\/)+src\/.*['"];?\s*$/gm, '');

  // drop components Fumadocs replaces with built-ins
  text = text.replace(/<NavigationButtons[\s\S]*?\/>/g, '');
  text = text.replace(/<EditButton[\s\S]*?\/>/g, '');

  // derive title from the first H1, remove it (DocsTitle renders it)
  const h1 = text.match(/^#\s+(.+)$/m);
  const title = h1 ? h1[1].trim() : path.basename(file, '.md');
  if (h1) text = text.replace(h1[0], '');

  const out = `---\ntitle: ${JSON.stringify(title)}\n---\n${text.trimStart()}`;
  const name = file === 'quick-start.md' ? 'index.mdx' : file.replace(/\.md$/, '.mdx');
  fs.writeFileSync(path.join(destDir, name), out);
  console.log(`${file} -> ${name}`);
}
```

- [ ] **Step 2: Run it against the legacy master docs**

```bash
git clone --no-single-branch https://github.com/diegomura/react-pdf-site /tmp/react-pdf-site
node apps/site/scripts/migrate-docs.mjs /tmp/react-pdf-site/docs apps/site/content/docs/v4
```

Expected: 22 `.mdx` files written, `quick-start.md` becoming `index.mdx`.

- [ ] **Step 3: Assemble the composite pages**

The legacy `advanced.md` (and possibly others) imported sibling md files. Open `/tmp/react-pdf-site/docs/advanced.md` and check which files it composed (`page-wrapping.md`, `on-the-fly.md`, `document-navigation.md`, `dynamic-content.md`, `debugging.md`, `hyphenation.md`, `orphan-widow-protection.md`, `floats.md`, `express.md`, `web-workers.md`, `math.md`). Inline each imported file's migrated content into `content/docs/v4/advanced.mdx` **in the order the legacy file imported them**, then delete the standalone `.mdx` fragments that were only ever inlined (they had no standalone route on the legacy site). Verify no content is lost: every heading in the legacy rendered page (`react-pdf.org/advanced`) exists in the new file.

- [ ] **Step 4: Sidebar order**

`apps/site/content/docs/v4/meta.json` — mirrors the legacy menu exactly (from legacy `src/components/Layout/Menu.js`):

```json
{
  "title": "v4",
  "root": true,
  "pages": [
    "index",
    "compatibility",
    "rendering-process",
    "components",
    "svg",
    "form",
    "hooks",
    "styling",
    "fonts",
    "node",
    "advanced"
  ]
}
```

- [ ] **Step 5: Port the MDX helper components**

`apps/site/components/go-to-example.tsx` (legacy `src/components/Docs/GoToExample`):

```tsx
import Link from 'next/link';

export function GoToExample({ name }: { name: string }) {
  return (
    <div className="my-8 flex justify-end">
      <Link
        href={`/repl?example=${name}`}
        className="rounded-md bg-fd-primary px-4 py-2 text-sm font-semibold text-fd-primary-foreground no-underline"
      >
        See it in action →
      </Link>
    </div>
  );
}
```

`apps/site/components/debug-sample.tsx` — port the legacy box-model diagram (`src/components/Docs/DebugSample/DebugSample.js`; fetch with `gh api repos/diegomura/react-pdf-site/contents/src/components/Docs/DebugSample/DebugSample.js --jq .content | base64 -d`). Convert each Emotion styled block to a `<div>` with the identical CSS as inline `style` props; keep the exact colors (`#d1e3f3` content, `#e2efdd` padding, `#fce6d0` margin) and the glossary labels.

`apps/site/components/overview-timeline.tsx` — same porting rule for `src/components/Docs/OverviewTimeline`.

Register all three in the docs page (`app/docs/[[...slug]]/page.tsx`):

```tsx
import { GoToExample } from '@/components/go-to-example';
import { DebugSample } from '@/components/debug-sample';
import { OverviewTimeline } from '@/components/overview-timeline';
// in <MDX components={...}>:
<MDX components={{ ...defaultMdxComponents, GoToExample, DebugSample, OverviewTimeline }} />
```

- [ ] **Step 6: Build and walk every page**

```bash
cd apps/site && yarn build
```

Fumadocs fails the build on broken internal links — fix any it reports (legacy absolute paths like `/components` inside docs prose should become `/docs/v4/components`; a plain `sed`-style pass is fine: `grep -rn "](/" content/docs/v4`). Then `yarn dev` and open each of the 11 sidebar pages; compare against react-pdf.org for missing content.

- [ ] **Step 7: Commit**

```bash
git add apps/site
git commit -m "feat(site): migrate v4 docs content"
```

---

### Task 3: Versioned docs (v1–v3)

**Files:**
- Create: `apps/site/content/docs/v3/**`, `apps/site/content/docs/v2/**`, `apps/site/content/docs/v1/**` (each with `meta.json`)

- [ ] **Step 1: Flatten each branch**

```bash
cd /tmp/react-pdf-site
for v in v1 v2 v3; do
  git checkout $v
  node /path/to/repo/apps/site/scripts/migrate-docs.mjs docs /path/to/repo/apps/site/content/docs/$v
done
```

(Use the absolute path of this monorepo checkout.) If a branch's docs live elsewhere than `docs/` (check with `ls`), point the script at the right directory.

- [ ] **Step 2: Per-version meta.json**

For each of `v3`, `v2`, `v1`: create `content/docs/<v>/meta.json` with `"root": true`, `"title": "<v>"`, and a `pages` array listing that version's files in the same order as that branch's `src/components/Layout/Menu.js` (check out the branch and read it). Composite pages (advanced) get the same inline treatment as Task 2 Step 3 if the branch used imports.

- [ ] **Step 3: Verify the version dropdown**

`yarn dev` — the docs sidebar shows a version switcher (Fumadocs renders root folders as tabs). Confirm: v4 is default, v1–v3 selectable, every old-version page shows the "no longer maintained" banner from Task 1, and search/nav don't mix versions.

- [ ] **Step 4: Commit**

```bash
git add apps/site/content/docs
git commit -m "feat(site): add frozen v1-v3 docs from legacy branches"
```

---

### Task 4: Legacy redirect tests

**Files:**
- Create: `apps/site/tests/redirects.test.ts`, `apps/site/vitest.config.ts`

- [ ] **Step 1: Write the failing test**

`apps/site/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: { alias: { '@': path.resolve(__dirname) } },
  test: { include: ['tests/**/*.test.ts'] },
});
```

`apps/site/tests/redirects.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import config from '../next.config.mjs';

const LEGACY = [
  'advanced',
  'compatibility',
  'components',
  'fonts',
  'form',
  'hooks',
  'node',
  'rendering-process',
  'styling',
  'svg',
];

describe('legacy redirects', () => {
  it('maps every legacy top-level docs URL to /docs/v4', async () => {
    const redirects = await config.redirects();
    for (const slug of LEGACY) {
      const r = redirects.find((x) => x.source === `/${slug}`);
      expect(r, `missing redirect for /${slug}`).toBeDefined();
      expect(r.destination).toBe(`/docs/v4/${slug}`);
      expect(r.permanent).toBe(true);
    }
  });

  it('leaves /repl untouched', async () => {
    const redirects = await config.redirects();
    expect(redirects.find((x) => x.source === '/repl')).toBeUndefined();
  });

  it('every redirect destination is a real content page', async () => {
    const fs = await import('node:fs');
    const redirects = await config.redirects();
    for (const r of redirects) {
      if (!r.destination.startsWith('/docs/v4/')) continue;
      const slug = r.destination.replace('/docs/v4/', '');
      expect(
        fs.existsSync(`content/docs/v4/${slug}.mdx`),
        `${r.destination} has no content file`,
      ).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run — confirm it passes against the config from Task 1**

```bash
cd apps/site && yarn vitest run tests/redirects.test.ts
```

Expected: PASS (the redirects were written in Task 1; this locks them). If a destination check fails, fix the config or the content, not the test.

- [ ] **Step 3: Commit**

```bash
git add apps/site/tests apps/site/vitest.config.ts
git commit -m "test(site): lock legacy URL redirect map"
```

---

### Task 5: Blog migration

**Files:**
- Create: `apps/site/content/blog/announcing-react-pdf-v2.mdx`, `apps/site/lib/blog-source.ts`, `apps/site/app/blog/page.tsx`, `apps/site/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Migrate the post**

```bash
cp /tmp/react-pdf-site/blog/announcing-react-pdf-v2.md apps/site/content/blog/announcing-react-pdf-v2.mdx
```

Open it; ensure frontmatter has `title` and `date` (add `date: "2019-05-14"` — take the real date from the legacy post's frontmatter or `git log -1 --format=%as -- blog/announcing-react-pdf-v2.md` in the legacy clone). Keep the same slug.

- [ ] **Step 2: Blog source + pages**

`apps/site/lib/blog-source.ts`:

```ts
import { blog } from '@/.source';
import { loader } from 'fumadocs-core/source';

export const blogSource = loader({
  baseUrl: '/blog',
  source: { files: blog.map((p) => ({ type: 'page', path: p._file.path, data: p })) },
});
```

(If the installed fumadocs-mdx exposes `toFumadocsSource()` on collections, use that instead — check `.source/index.ts` after `yarn postinstall`.)

`apps/site/app/blog/page.tsx`:

```tsx
import Link from 'next/link';
import { blogSource } from '@/lib/blog-source';

export const metadata = { title: 'Blog' };

export default function BlogIndex() {
  const posts = blogSource
    .getPages()
    .sort((a, b) => String(b.data.date).localeCompare(String(a.data.date)));

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>
      {posts.map((post) => (
        <Link key={post.url} href={post.url} className="block rounded-lg p-4 hover:bg-fd-accent">
          <div className="font-semibold">{post.data.title}</div>
          <div className="text-sm text-fd-muted-foreground">{String(post.data.date)}</div>
        </Link>
      ))}
    </main>
  );
}
```

`apps/site/app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blogSource } from '@/lib/blog-source';

export default async function BlogPost(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);
  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <main className="prose mx-auto w-full max-w-2xl flex-1 px-4 py-16 dark:prose-invert">
      <h1>{page.data.title}</h1>
      <MDX components={{ ...defaultMdxComponents }} />
    </main>
  );
}

export function generateStaticParams() {
  return blogSource.getPages().map((p) => ({ slug: p.slugs[0] }));
}
```

Both blog routes live inside the `(home)` layout group or import `HomeLayout` — simplest: move `app/blog` to `app/(home)/blog` so the nav shows. Do that.

- [ ] **Step 3: Verify + commit**

`yarn build`, open `/blog` and the post.

```bash
git add apps/site
git commit -m "feat(site): migrate blog"
```

---

### Task 6: Theme — brand palette, dark default

**Files:**
- Modify: `apps/site/app/global.css`

- [ ] **Step 1: Apply the palette**

Light mode = today's exact colors, dark mode = adapted (per spec). Fumadocs themes via `--color-fd-*` variables. Replace `global.css` with:

```css
@import 'tailwindcss';
@import 'fumadocs-ui/css/neutral.css';
@import 'fumadocs-ui/css/preset.css';

:root {
  /* legacy palette: red #F22300, black #3E3E3E, grays #A6A6A6/#F1F1F1/#F8F8F8 */
  --color-fd-primary: hsl(8 100% 47%); /* #F22300 */
  --color-fd-primary-foreground: hsl(0 0% 100%);
  --color-fd-background: hsl(0 0% 100%);
  --color-fd-foreground: hsl(0 0% 24%); /* #3E3E3E */
  --color-fd-muted: hsl(0 0% 97%); /* #F8F8F8 */
  --color-fd-muted-foreground: hsl(0 0% 45%);
  --color-fd-border: hsl(0 0% 91%);
  --color-fd-accent: hsl(0 0% 95%); /* #F1F1F1 */
  --color-fd-accent-foreground: hsl(0 0% 24%);
}

.dark {
  /* same brand, tuned for near-black surfaces */
  --color-fd-primary: hsl(8 80% 55%); /* ~#E8442E */
  --color-fd-primary-foreground: hsl(0 0% 100%);
  --color-fd-background: hsl(220 14% 5%); /* #0b0d10 */
  --color-fd-foreground: hsl(216 12% 92%);
  --color-fd-muted: hsl(219 14% 10%);
  --color-fd-muted-foreground: hsl(215 8% 58%);
  --color-fd-border: hsl(217 12% 14%);
  --color-fd-accent: hsl(218 13% 12%);
  --color-fd-accent-foreground: hsl(216 12% 92%);
}

:root {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}
```

If the installed fumadocs-ui major themes through a different variable prefix, map the same values onto its variables (check `node_modules/fumadocs-ui/css/neutral.css` for the canonical names).

- [ ] **Step 2: Visual check both modes**

`yarn dev` — verify dark is the default on first load (clear localStorage), toggle to light and compare against react-pdf.org: red accents, near-white gray sidebar, `#3E3E3E` body text.

- [ ] **Step 3: Commit**

```bash
git add apps/site/app/global.css
git commit -m "feat(site): brand palette, dark default"
```

---

### Task 7: REPL engine (compress, transpile, evaluate, worker)

**Files:**
- Create: `apps/site/src/repl/compress.ts`, `apps/site/src/repl/transpile.ts`, `apps/site/src/repl/evaluate.ts`, `apps/site/src/repl/worker.ts`, `apps/site/src/repl/use-repl.ts`
- Test: `apps/site/tests/compress.test.ts`, `apps/site/tests/engine.test.ts`

- [ ] **Step 1: Add deps**

```bash
cd apps/site && yarn add sucrase
```

- [ ] **Step 2: Port compress verbatim (URL compatibility!)**

`apps/site/src/repl/compress.ts` — byte-for-byte behavior of legacy `src/lib/compress.js`; old shared links must decode:

```ts
import LZString from 'lz-string';

const decimalToHex = (d: number) => d.toString(16).padStart(2, '0');
const hexToDecimal = (h: string) => parseInt(h, 16);

export const compress = (str: string): string =>
  LZString.compressToUint8Array(str).reduce((acc, value) => `${acc}${decimalToHex(value)}`, '');

export const decompress = (str: string): string => {
  const compressed = str.match(/.{2}/g)!.map(hexToDecimal);
  return LZString.decompressFromUint8Array(Uint8Array.from(compressed)) ?? '';
};
```

- [ ] **Step 3: Failing tests for the engine**

`apps/site/tests/compress.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { compress, decompress } from '../src/repl/compress';

describe('compress', () => {
  it('round-trips', () => {
    const code = 'const Doc = () => <Document />;';
    expect(decompress(compress(code))).toBe(code);
  });

  it('decodes a legacy-format payload', () => {
    // "hello" encoded with the legacy algorithm (lz-string Uint8Array -> hex)
    const legacy = compress('hello');
    expect(legacy).toMatch(/^[0-9a-f]+$/);
    expect(decompress(legacy)).toBe('hello');
  });
});
```

`apps/site/tests/engine.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { transpile } from '../src/repl/transpile';
import { evaluateDocument } from '../src/repl/evaluate';

const SAMPLE = `
import React from 'react';
import ReactPDF, { Document, Page, Text } from '@react-pdf/renderer';

const Doc = () => (
  <Document>
    <Page>
      <Text>Hello</Text>
    </Page>
  </Document>
);

ReactPDF.render(<Doc />);
`;

describe('transpile', () => {
  it('compiles JSX to CJS', () => {
    const js = transpile(SAMPLE);
    expect(js).toContain('require(');
    expect(js).not.toContain('<Document>');
  });

  it('throws a positioned error on bad syntax', () => {
    expect(() => transpile('const x = <Document>')).toThrow();
  });
});

describe('evaluateDocument', () => {
  it('captures the element passed to ReactPDF.render', () => {
    const element = evaluateDocument(transpile(SAMPLE));
    expect(element).toBeTruthy();
    expect(typeof element.type).toBe('function');
  });

  it('rejects unknown imports', () => {
    const code = transpile(`import fs from 'fs'; ReactPDF.render(null);`);
    expect(() => evaluateDocument(code)).toThrow(/Cannot import 'fs'/);
  });

  it('throws when no document is rendered', () => {
    expect(() => evaluateDocument(transpile('const x = 1;'))).toThrow(/ReactPDF\.render/);
  });
});
```

Run: `yarn vitest run tests/engine.test.ts` — expected: FAIL (modules don't exist).

- [ ] **Step 4: Implement transpile + evaluate**

`apps/site/src/repl/transpile.ts`:

```ts
import { transform } from 'sucrase';

export const transpile = (source: string): string =>
  transform(source, { transforms: ['jsx', 'imports'], production: true }).code;
```

`apps/site/src/repl/evaluate.ts`:

```ts
import React from 'react';
import * as renderer from '@react-pdf/renderer';

export const evaluateDocument = (compiledCode: string): React.ReactElement => {
  let captured: React.ReactElement | null = null;

  const sandboxedPDF = {
    ...renderer,
    default: undefined as unknown,
    render: (element: React.ReactElement) => {
      captured = element;
    },
  };
  sandboxedPDF.default = sandboxedPDF;

  const require = (name: string) => {
    if (name === 'react') return React;
    if (name === '@react-pdf/renderer' || name.startsWith('@react-pdf/renderer/'))
      return sandboxedPDF;
    throw new Error(`Cannot import '${name}' in the REPL`);
  };

  const module = { exports: {} };
  new Function('module', 'exports', 'require', compiledCode)(module, module.exports, require);

  if (!captured) throw new Error('Call ReactPDF.render(<YourDocument />) to preview a document');
  return captured;
};
```

Run tests again — expected: PASS.

- [ ] **Step 5: Worker + hook**

`apps/site/src/repl/worker.ts`:

```ts
import { pdf } from '@react-pdf/renderer';
import { transpile } from './transpile';
import { evaluateDocument } from './evaluate';

export type ReplRequest = { id: number; code: string };
export type ReplResponse =
  | { id: number; url: string }
  | { id: number; error: string; line?: number };

self.onmessage = async (event: MessageEvent<ReplRequest>) => {
  const { id, code } = event.data;
  try {
    const element = evaluateDocument(transpile(code));
    const blob = await pdf(element).toBlob();
    const url = URL.createObjectURL(blob);
    postMessage({ id, url } satisfies ReplResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const line = (error as { loc?: { line?: number } })?.loc?.line;
    postMessage({ id, error: message, line } satisfies ReplResponse);
  }
};
```

`apps/site/src/repl/use-repl.ts`:

```ts
'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReplResponse } from './worker';

const DEBOUNCE_MS = 500;

export function useRepl(code: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<{ message: string; line?: number } | null>(null);
  const [rendering, setRendering] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url));
    workerRef.current = worker;
    return () => worker.terminate();
  }, []);

  useEffect(() => {
    if (!code) return;
    const id = ++requestId.current;
    setRendering(true);

    const timeout = setTimeout(() => {
      const worker = workerRef.current;
      if (!worker) return;

      worker.onmessage = (event: MessageEvent<ReplResponse>) => {
        if (event.data.id !== requestId.current) return;
        setRendering(false);
        if ('url' in event.data) {
          setUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return event.data.url as string;
          });
          setError(null);
        } else {
          // keep last good render; surface the error alongside it
          setError({ message: event.data.error, line: event.data.line });
        }
      };

      worker.onerror = () => {
        // worker crashed: restart it
        worker.terminate();
        workerRef.current = new Worker(new URL('./worker.ts', import.meta.url));
        setRendering(false);
        setError({ message: 'Renderer crashed — retrying on next edit' });
      };

      worker.postMessage({ id, code });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [code]);

  return { url, error, rendering };
}
```

- [ ] **Step 6: Run all tests + commit**

```bash
yarn test
git add apps/site/src/repl apps/site/tests
git commit -m "feat(site): REPL engine - compress, sucrase transpile, sandboxed eval, worker"
```

---

### Task 8: REPL examples

**Files:**
- Create: `apps/site/scripts/generate-examples.mjs`, `apps/site/src/repl/examples/*.ts`, `apps/site/src/repl/examples/index.ts`

- [ ] **Step 1: Generator script**

Import raw `.txt` needs bundler config; generating `.ts` modules avoids it. `apps/site/scripts/generate-examples.mjs`:

```js
import fs from 'node:fs';
import path from 'node:path';

const [srcDir, destDir] = process.argv.slice(2);
fs.mkdirSync(destDir, { recursive: true });

const names = [];
for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith('.txt'))) {
  const name = path.basename(file, '.txt');
  const raw = fs.readFileSync(path.join(srcDir, file), 'utf8');
  const escaped = raw.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  const ident = name.replace(/-/g, '_');
  fs.writeFileSync(path.join(destDir, `${name}.ts`), `const ${ident} = \`${escaped}\`;\nexport default ${ident};\n`);
  names.push(name);
}

const index = [
  ...names.map((n) => `import ${n.replace(/-/g, '_')} from './${n}';`),
  '',
  'export const examples: Record<string, string> = {',
  ...names.map((n) => `  '${n}': ${n.replace(/-/g, '_')},`),
  '};',
  '',
].join('\n');
fs.writeFileSync(path.join(destDir, 'index.ts'), index);
console.log(`${names.length} examples`);
```

- [ ] **Step 2: Run it**

```bash
node apps/site/scripts/generate-examples.mjs /tmp/react-pdf-site/examples apps/site/src/repl/examples
```

Expected: `41 examples`.

- [ ] **Step 3: Spot-check + commit**

Open `src/repl/examples/quick-start.ts` — content matches the legacy `.txt`. `yarn tsc --noEmit` inside `apps/site` compiles.

```bash
git add apps/site/scripts/generate-examples.mjs apps/site/src/repl/examples
git commit -m "feat(site): port 41 REPL examples"
```

---

### Task 9: REPL UI (editor, completions, viewer, page)

**Files:**
- Create: `apps/site/src/repl/completions.ts`, `apps/site/src/repl/editor.tsx`, `apps/site/src/repl/viewer.tsx`, `apps/site/src/repl/repl.tsx`, `apps/site/app/repl/page.tsx`

- [ ] **Step 1: Add deps**

```bash
cd apps/site && yarn add codemirror @codemirror/lang-javascript @codemirror/autocomplete @codemirror/lint @uiw/react-codemirror react-pdf react-resizable-panels
```

(`react-pdf` here is the pdf.js viewer package, as on the legacy site.)

- [ ] **Step 2: Autocomplete source**

`apps/site/src/repl/completions.ts` — curated from `@react-pdf/renderer`'s public API and `@react-pdf/types` Style keys:

```ts
import type { CompletionContext, CompletionResult } from '@codemirror/autocomplete';

const COMPONENTS = [
  'Document', 'Page', 'View', 'Text', 'Link', 'Image', 'Note', 'Canvas',
  'Svg', 'Line', 'Polyline', 'Polygon', 'Path', 'Rect', 'Circle', 'Ellipse',
  'Tspan', 'G', 'Stop', 'Defs', 'ClipPath', 'LinearGradient', 'RadialGradient',
  'TextInput', 'Checkbox', 'Select', 'FieldSet',
  'PDFViewer', 'PDFDownloadLink', 'BlobProvider', 'StyleSheet', 'Font', 'pdf',
];

const PROPS = [
  'style', 'fixed', 'break', 'wrap', 'debug', 'render', 'src', 'source',
  'size', 'orientation', 'dpi', 'bookmark', 'cache', 'minPresenceAhead',
  'hyphenationCallback', 'orphans', 'widows',
];

// ponytail: curated list; regenerate from @react-pdf/types if the Style type grows
const STYLE_KEYS = [
  'alignContent', 'alignItems', 'alignSelf', 'aspectRatio', 'backgroundColor',
  'border', 'borderBottom', 'borderBottomColor', 'borderBottomLeftRadius',
  'borderBottomRightRadius', 'borderBottomStyle', 'borderBottomWidth',
  'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle',
  'borderLeftWidth', 'borderRadius', 'borderRight', 'borderRightColor',
  'borderRightStyle', 'borderRightWidth', 'borderStyle', 'borderTop',
  'borderTopColor', 'borderTopLeftRadius', 'borderTopRightRadius',
  'borderTopStyle', 'borderTopWidth', 'borderWidth', 'bottom', 'color',
  'display', 'flex', 'flexBasis', 'flexDirection', 'flexGrow', 'flexShrink',
  'flexWrap', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'gap',
  'height', 'justifyContent', 'left', 'letterSpacing', 'lineHeight', 'margin',
  'marginBottom', 'marginHorizontal', 'marginLeft', 'marginRight', 'marginTop',
  'marginVertical', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth',
  'objectFit', 'opacity', 'overflow', 'padding', 'paddingBottom',
  'paddingHorizontal', 'paddingLeft', 'paddingRight', 'paddingTop',
  'paddingVertical', 'position', 'right', 'textAlign', 'textDecoration',
  'textDecorationColor', 'textDecorationStyle', 'textIndent', 'textOverflow',
  'textTransform', 'top', 'transform', 'transformOrigin', 'width', 'zIndex',
];

const toOptions = (words: string[], type: string) =>
  words.map((label) => ({ label, type }));

export function reactPdfCompletions(context: CompletionContext): CompletionResult | null {
  const word = context.matchBefore(/[\w-]*/);
  if (!word || (word.from === word.to && !context.explicit)) return null;

  const before = context.state.sliceDoc(Math.max(0, word.from - 30), word.from);
  const inJsxTag = /<\/?\s*$/.test(before);
  const inStyleObject = /[{,]\s*$/.test(before) && /style|Style/.test(
    context.state.sliceDoc(Math.max(0, word.from - 200), word.from),
  );

  const options = inJsxTag
    ? toOptions(COMPONENTS, 'class')
    : inStyleObject
      ? toOptions(STYLE_KEYS, 'property')
      : [...toOptions(COMPONENTS, 'class'), ...toOptions(PROPS, 'property')];

  return { from: word.from, options, validFor: /^[\w-]*$/ };
}
```

- [ ] **Step 3: Editor**

`apps/site/src/repl/editor.tsx`:

```tsx
'use client';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion } from '@codemirror/autocomplete';
import { linter, type Diagnostic } from '@codemirror/lint';
import { reactPdfCompletions } from './completions';
import { transpile } from './transpile';

const syntaxLinter = linter((view): Diagnostic[] => {
  try {
    transpile(view.state.doc.toString());
    return [];
  } catch (error) {
    const loc = (error as { loc?: { line: number; column: number } }).loc;
    const message = error instanceof Error ? error.message : String(error);
    if (!loc) return [{ from: 0, to: 0, severity: 'error', message }];
    const line = view.state.doc.line(Math.min(loc.line, view.state.doc.lines));
    return [{ from: line.from, to: line.to, severity: 'error', message }];
  }
});

export function Editor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      height="100%"
      theme="dark"
      style={{ height: '100%', fontSize: 13 }}
      extensions={[
        javascript({ jsx: true }),
        autocompletion({ override: [reactPdfCompletions] }),
        syntaxLinter,
      ]}
    />
  );
}
```

(Match the CodeMirror theme to the site theme later if trivial; dark-only editor chrome is acceptable for v1 — the legacy editor was light-only.)

- [ ] **Step 4: Viewer**

`apps/site/src/repl/viewer.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export function Viewer({ url, rendering }: { url: string | null; rendering: boolean }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  if (!url) return <div className="flex h-full items-center justify-center text-fd-muted-foreground">Rendering…</div>;

  return (
    <div className="flex h-full flex-col items-center overflow-auto bg-fd-muted p-4">
      <div className={rendering ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
        <Document
          file={url}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setPageNumber((p) => Math.min(p, n));
          }}
          loading={null}
        >
          <Page pageNumber={pageNumber} className="shadow-2xl" />
        </Document>
      </div>
      {numPages > 1 && (
        <div className="mt-3 flex items-center gap-3 text-sm">
          <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))} disabled={pageNumber <= 1}>←</button>
          <span>{pageNumber} / {numPages}</span>
          <button onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))} disabled={pageNumber >= numPages}>→</button>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: The REPL assembly**

`apps/site/src/repl/repl.tsx`:

```tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Editor } from './editor';
import { Viewer } from './viewer';
import { useRepl } from './use-repl';
import { compress, decompress } from './compress';
import { examples } from './examples';

const DEFAULT_EXAMPLE = 'page-wrap';

function initialCode(params: URLSearchParams): string {
  const encoded = params.get('code');
  if (encoded) {
    try {
      return decompress(encoded);
    } catch {
      /* fall through to example */
    }
  }
  const example = params.get('example');
  return examples[example ?? DEFAULT_EXAMPLE] ?? examples[DEFAULT_EXAMPLE];
}

export function Repl() {
  const params = useSearchParams();
  const [code, setCode] = useState(() => initialCode(params));
  const { url, error, rendering } = useRepl(code);
  const [tab, setTab] = useState<'code' | 'pdf'>('code');

  const shareUrl = useMemo(
    () => `${typeof window === 'undefined' ? '' : window.location.origin}/repl?code=${compress(code)}`,
    [code],
  );

  useEffect(() => {
    const example = params.get('example');
    if (example && examples[example]) setCode(examples[example]);
  }, [params]);

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-3 border-b border-fd-border px-4 py-2">
        <a href="/" className="font-bold text-fd-primary">react-pdf</a>
        <span className="text-sm text-fd-muted-foreground">REPL</span>
        <select
          className="ml-4 rounded border border-fd-border bg-fd-background px-2 py-1 text-sm"
          defaultValue=""
          onChange={(e) => e.target.value && setCode(examples[e.target.value])}
        >
          <option value="" disabled>Examples…</option>
          {Object.keys(examples).sort().map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <div className="flex-1" />
        <div className="flex gap-1 md:hidden">
          <button onClick={() => setTab('code')} className={tab === 'code' ? 'font-bold' : ''}>Code</button>
          <button onClick={() => setTab('pdf')} className={tab === 'pdf' ? 'font-bold' : ''}>PDF</button>
        </div>
        <button
          className="rounded border border-fd-border px-3 py-1 text-sm"
          onClick={() => navigator.clipboard.writeText(shareUrl)}
        >
          Copy link
        </button>
        {url && (
          <a className="rounded bg-fd-primary px-3 py-1 text-sm text-fd-primary-foreground" href={url} download="document.pdf">
            Download PDF
          </a>
        )}
      </header>

      <PanelGroup direction="horizontal" className="hidden flex-1 md:flex">
        <Panel defaultSize={50} minSize={25}><Editor value={code} onChange={setCode} /></Panel>
        <PanelResizeHandle className="w-1 bg-fd-border hover:bg-fd-primary" />
        <Panel minSize={25} className="relative">
          <Viewer url={url} rendering={rendering} />
          {error && (
            <div className="absolute inset-x-4 bottom-4 rounded-lg border border-fd-primary bg-fd-background/95 p-3 font-mono text-xs text-fd-primary shadow-lg">
              {error.line ? `Line ${error.line}: ` : ''}{error.message}
            </div>
          )}
        </Panel>
      </PanelGroup>

      <div className="flex-1 md:hidden">
        {tab === 'code' ? <Editor value={code} onChange={setCode} /> : <Viewer url={url} rendering={rendering} />}
      </div>
    </div>
  );
}
```

`apps/site/app/repl/page.tsx`:

```tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Repl = dynamic(() => import('@/src/repl/repl').then((m) => m.Repl), { ssr: false });

export const metadata = { title: 'REPL' };

export default function ReplPage() {
  return (
    <Suspense>
      <Repl />
    </Suspense>
  );
}
```

(If the installed Next major forbids `ssr: false` in server components, make a small `'use client'` wrapper component that does the dynamic import and render it from the page.)

- [ ] **Step 6: Manual verification matrix**

`yarn dev`, then verify each:
- `/repl` → page-wrap example renders a PDF
- `/repl?example=resume` → resume renders
- `/repl?code=<x>` where `<x>` is taken from an existing shared link in a react-pdf GitHub issue (e.g. search issues for `react-pdf.org/repl?code=`) → decodes and renders
- Type a syntax error → inline diagnostic + banner, previous PDF still visible
- Fix the error → PDF updates
- Copy link → paste in new tab → same code loads
- Download PDF works; multi-page example (`page-wrap`) paginates; narrow window → tabs

- [ ] **Step 7: Commit**

```bash
git add apps/site
git commit -m "feat(site): rebuild REPL - CodeMirror 6, autocomplete, error overlay, share/download"
```

---

### Task 10: Docs → REPL integration

**Files:**
- Modify: `apps/site/content/docs/v4/*.mdx` (spot fixes only), `apps/site/components/go-to-example.tsx` (already routes to `/repl?example=`)

- [ ] **Step 1: Verify every GoToExample target exists**

```bash
grep -rho 'GoToExample name="[^"]*"' apps/site/content/docs | sort -u
```

Every referenced name must exist in `src/repl/examples/index.ts`. Expected: all 41 examples cover them (the legacy site used the same names). Fix any typo by matching against the legacy docs.

- [ ] **Step 2: Click-through test**

From `/docs/v4/components`, click a "See it in action →" button — REPL opens with the right example.

- [ ] **Step 3: Commit (if fixes were needed)**

```bash
git add apps/site/content
git commit -m "fix(site): align GoToExample names with examples"
```

---

### Task 11: Hero with editable mini-REPL

**Files:**
- Create: `apps/site/components/hero-repl.tsx`
- Modify: `apps/site/app/(home)/page.tsx`

- [ ] **Step 1: Mini-REPL component**

`apps/site/components/hero-repl.tsx` — reuses the engine; falls back to a static snippet if the worker fails:

```tsx
'use client';

import { useState } from 'react';
import { Editor } from '@/src/repl/editor';
import { Viewer } from '@/src/repl/viewer';
import { useRepl } from '@/src/repl/use-repl';

const SNIPPET = `import React from 'react';
import ReactPDF, { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 60 },
  title: { fontSize: 24, marginBottom: 10 },
});

const MyDoc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Hello react-pdf</Text>
      <Text>Edit me — the PDF updates live.</Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDoc />);
`;

export function HeroRepl() {
  const [code, setCode] = useState(SNIPPET);
  const { url, error, rendering } = useRepl(code);

  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-xl border border-fd-border shadow-2xl shadow-fd-primary/10 md:grid-cols-[1.2fr_1fr]">
      <div className="border-b border-fd-border text-left md:border-b-0 md:border-r">
        <div className="px-4 pt-3 text-[10px] font-semibold tracking-wider text-fd-muted-foreground">
          EDITABLE — TRY IT
        </div>
        <div className="max-h-[380px] overflow-auto">
          <Editor value={code} onChange={setCode} />
        </div>
      </div>
      <div className="relative min-h-[300px]">
        <Viewer url={url} rendering={rendering} />
        {error && (
          <div className="absolute inset-x-3 bottom-3 rounded border border-fd-primary bg-fd-background/95 p-2 font-mono text-xs text-fd-primary">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: The hero page**

Replace `apps/site/app/(home)/page.tsx`:

```tsx
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { CopyInstall } from '@/components/copy-install';

const HeroRepl = dynamic(() => import('@/components/hero-repl').then((m) => m.HeroRepl), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-[380px] w-full max-w-4xl animate-pulse rounded-xl border border-fd-border bg-fd-muted" />
  ),
});

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-16 text-center [background-image:radial-gradient(var(--color-fd-border)_1px,transparent_1px)] [background-size:16px_16px]">
      <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight md:text-6xl">
        PDFs, made with <span className="text-fd-primary">React</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-fd-muted-foreground">
        The renderer for creating PDF files on the browser and server.
      </p>
      <CopyInstall />
      <div className="mt-6 flex gap-3">
        <Link href="/docs/v4" className="rounded-md bg-fd-primary px-5 py-2.5 font-semibold text-fd-primary-foreground">
          Get started
        </Link>
        <Link href="/repl" className="rounded-md border border-fd-border px-5 py-2.5 font-semibold">
          Open full REPL
        </Link>
      </div>
      <div className="mt-12 w-full">
        <HeroRepl />
      </div>
    </main>
  );
}
```

(Same `ssr: false` caveat as Task 9 Step 5 — wrap in a client component if required. The `dynamic` + `loading` skeleton is what keeps headline paint instant per spec.)

`apps/site/components/copy-install.tsx`:

```tsx
'use client';

import { useState } from 'react';

const CMD = 'npm install @react-pdf/renderer';

export function CopyInstall() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="mt-6 rounded-lg border border-fd-border bg-fd-muted px-4 py-2 font-mono text-sm"
      onClick={() => {
        navigator.clipboard.writeText(CMD);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      $ {CMD} {copied ? '✓' : '⧉'}
    </button>
  );
}
```

Add `components/copy-install.tsx` to this task's file list.

- [ ] **Step 3: Verify**

`yarn dev` → `/`: headline paints immediately with skeleton, then the mini-REPL renders "Hello react-pdf" as a PDF; editing the text updates the preview; breaking the code shows the inline error and keeps the last render. Check light mode too.

- [ ] **Step 4: Commit**

```bash
git add apps/site
git commit -m "feat(site): hero with editable mini-REPL"
```

---

### Task 12: Search

**Files:**
- Create: `apps/site/app/api/search/route.ts`
- Modify: `apps/site/app/layout.tsx`

- [ ] **Step 1: Search route with version tags**

`apps/site/app/api/search/route.ts`:

```ts
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, (page) => ({
  title: page.data.title,
  description: page.data.description,
  url: page.url,
  id: page.url,
  structuredData: page.data.structuredData,
  tag: page.slugs[0], // v1..v4
}));
```

- [ ] **Step 2: Scope the dialog to the current version**

In `apps/site/app/layout.tsx`, configure the provider's search dialog to default to the `v4` tag (Fumadocs' default dialog accepts `defaultTag`/`tags` options):

```tsx
<RootProvider
  theme={{ defaultTheme: 'dark' }}
  search={{
    options: {
      defaultTag: 'v4',
      tags: [
        { name: 'v4', value: 'v4' },
        { name: 'v3', value: 'v3' },
        { name: 'v2', value: 'v2' },
        { name: 'v1', value: 'v1' },
      ],
    },
  }}
>
```

- [ ] **Step 3: Verify + commit**

`yarn dev` → ⌘K → search "font" → v4 results only; switch tag to v3 → v3 results.

```bash
git add apps/site
git commit -m "feat(site): version-scoped search"
```

---

### Task 13: llms.txt, raw markdown, copy button

**Files:**
- Create: `apps/site/lib/llm-text.ts`, `apps/site/app/llms.txt/route.ts`, `apps/site/app/llms-full.txt/route.ts`, `apps/site/app/api/raw/[[...slug]]/route.ts`, `apps/site/components/copy-markdown.tsx`
- Modify: `apps/site/app/docs/[[...slug]]/page.tsx`

- [ ] **Step 1: Shared page→markdown helper**

`apps/site/lib/llm-text.ts`:

```ts
import fs from 'node:fs/promises';
import { source } from '@/lib/source';

type Page = NonNullable<ReturnType<typeof source.getPage>>;

export async function getLLMText(page: Page): Promise<string> {
  const raw = await fs.readFile(page.data._file.absolutePath, 'utf8');
  const body = raw.replace(/^---[\s\S]*?---\n/, '');
  return `# ${page.data.title}\nURL: ${page.url}\n\n${body}`;
}

export const latestPages = () => source.getPages().filter((p) => p.slugs[0] === 'v4');
```

(If the installed fumadocs-mdx exposes page content differently — e.g. `page.data.content` — use that instead of re-reading the file; check the generated `.source` types.)

- [ ] **Step 2: Routes**

`apps/site/app/llms.txt/route.ts`:

```ts
import { latestPages } from '@/lib/llm-text';

export const revalidate = false;

export function GET() {
  const lines = [
    '# react-pdf',
    '',
    '> React renderer for creating PDF files on the browser and server.',
    '',
    '## Docs',
    ...latestPages().map((p) => `- [${p.data.title}](https://react-pdf.org${p.url}.mdx)`),
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain' } });
}
```

`apps/site/app/llms-full.txt/route.ts`:

```ts
import { getLLMText, latestPages } from '@/lib/llm-text';

export const revalidate = false;

export async function GET() {
  const texts = await Promise.all(latestPages().map(getLLMText));
  return new Response(texts.join('\n\n---\n\n'), { headers: { 'Content-Type': 'text/plain' } });
}
```

`apps/site/app/api/raw/[[...slug]]/route.ts` (serves `/docs/<path>.mdx` via the Task 1 rewrite):

```ts
import { notFound } from 'next/navigation';
import { source } from '@/lib/source';
import { getLLMText } from '@/lib/llm-text';

export async function GET(_req: Request, ctx: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await ctx.params;
  const page = source.getPage(slug);
  if (!page) notFound();
  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
```

- [ ] **Step 3: Copy button**

`apps/site/components/copy-markdown.tsx`:

```tsx
'use client';

import { useState } from 'react';

export function CopyMarkdown({ markdownUrl }: { markdownUrl: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="w-fit rounded-md border border-fd-border px-2.5 py-1 text-xs text-fd-muted-foreground hover:text-fd-foreground"
      onClick={async () => {
        const text = await fetch(markdownUrl).then((r) => r.text());
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? 'Copied ✓' : 'Copy page as Markdown'}
    </button>
  );
}
```

Render it in `app/docs/[[...slug]]/page.tsx` under the title:

```tsx
<CopyMarkdown markdownUrl={`${page.url}.mdx`} />
```

- [ ] **Step 4: Verify + commit**

`curl localhost:3000/llms.txt`, `curl localhost:3000/llms-full.txt | head`, `curl localhost:3000/docs/v4/components.mdx | head` — all return markdown; the copy button works in the browser.

```bash
git add apps/site
git commit -m "feat(site): llms.txt, raw markdown routes, copy-as-markdown"
```

---

### Task 14: MCP server

**Files:**
- Create: `apps/site/app/api/mcp/[transport]/route.ts`, `apps/site/lib/docs-search.ts`, `apps/site/content/docs/v4/mcp.mdx`
- Modify: `apps/site/content/docs/v4/meta.json`
- Test: `apps/site/tests/docs-search.test.ts`

- [ ] **Step 1: Add dep**

```bash
cd apps/site && yarn add mcp-handler
```

- [ ] **Step 2: Failing test for the search core**

`apps/site/lib/docs-search.ts` is a pure function so it's testable without HTTP. `apps/site/tests/docs-search.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { searchDocs } from '../lib/docs-search';

describe('searchDocs', () => {
  it('finds the fonts page for "register font"', async () => {
    const results = await searchDocs('register font');
    expect(results.length).toBeGreaterThan(0);
    expect(results.map((r) => r.url)).toContain('/docs/v4/fonts');
  });

  it('returns empty for gibberish', async () => {
    expect(await searchDocs('xyzzyqwerty')).toEqual([]);
  });
});
```

Run: `yarn vitest run tests/docs-search.test.ts` — expected: FAIL.

- [ ] **Step 3: Implement search core**

`apps/site/lib/docs-search.ts`:

```ts
import { getLLMText, latestPages } from '@/lib/llm-text';

// ponytail: naive term-frequency scoring over v4 pages (~11 docs); swap in the
// Orama index if result quality ever matters here
export async function searchDocs(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored = await Promise.all(
    latestPages().map(async (page) => {
      const text = (await getLLMText(page)).toLowerCase();
      const score = terms.reduce((acc, term) => {
        const matches = text.split(term).length - 1;
        const inTitle = page.data.title.toLowerCase().includes(term) ? 5 : 0;
        return acc + matches + inTitle;
      }, 0);
      return { url: page.url, title: page.data.title, score };
    }),
  );

  return scored
    .filter((r) => r.score > 0 && r.score >= terms.length)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ url, title }) => ({ url, title }));
}
```

Run tests — expected: PASS.

- [ ] **Step 4: MCP route**

`apps/site/app/api/mcp/[transport]/route.ts`:

```ts
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { source } from '@/lib/source';
import { getLLMText } from '@/lib/llm-text';
import { searchDocs } from '@/lib/docs-search';

const handler = createMcpHandler((server) => {
  server.tool(
    'search_docs',
    'Search the react-pdf documentation (latest version). Returns matching page titles and slugs.',
    { query: z.string().describe('Search query, e.g. "register font"') },
    async ({ query }) => {
      const results = await searchDocs(query);
      return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
    },
  );

  server.tool(
    'read_doc',
    'Read a react-pdf documentation page as markdown. Use the url returned by search_docs, e.g. "/docs/v4/fonts".',
    { url: z.string().describe('Docs page url path') },
    async ({ url }) => {
      const slug = url.replace(/^\/docs\//, '').split('/').filter(Boolean);
      const page = source.getPage(slug);
      if (!page) return { content: [{ type: 'text', text: `No page at ${url}` }], isError: true };
      return { content: [{ type: 'text', text: await getLLMText(page) }] };
    },
  );
});

export { handler as GET, handler as POST, handler as DELETE };
```

- [ ] **Step 5: Docs page for MCP setup**

`apps/site/content/docs/v4/mcp.mdx`:

```mdx
---
title: MCP server
---

The react-pdf docs are available to AI agents over the [Model Context Protocol](https://modelcontextprotocol.io).
The server exposes `search_docs` and `read_doc` tools over streamable HTTP at
`https://react-pdf.org/api/mcp/mcp`.

## Claude Code

```bash
claude mcp add --transport http react-pdf https://react-pdf.org/api/mcp/mcp
```

## Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "react-pdf": { "url": "https://react-pdf.org/api/mcp/mcp" }
  }
}
```

Prefer plain markdown? Every docs page is available with an `.mdx` suffix
(e.g. `/docs/v4/components.mdx`), and the full docs as [/llms-full.txt](/llms-full.txt).
```

Add `"mcp"` to the end of the `pages` array in `content/docs/v4/meta.json`.

- [ ] **Step 6: Verify + commit**

```bash
yarn dev &
npx @modelcontextprotocol/inspector --cli http://localhost:3000/api/mcp/mcp --method tools/list
```

Expected: both tools listed; `tools/call search_docs {"query":"fonts"}` returns the fonts page.

```bash
git add apps/site
git commit -m "feat(site): MCP server with search_docs and read_doc tools"
```

---

### Task 15: CI + deploy readiness

**Files:**
- Create: `.github/workflows/site.yml`

- [ ] **Step 1: CI workflow (site-scoped)**

`.github/workflows/site.yml`:

```yaml
name: site

on:
  push:
    branches: [master]
    paths: ['apps/site/**']
  pull_request:
    paths: ['apps/site/**']

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/site
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: yarn install --frozen-lockfile
      - run: yarn test
      - run: yarn build
```

- [ ] **Step 2: Full local check**

```bash
cd apps/site && yarn test && yarn build
```

Expected: all tests pass, production build succeeds.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/site.yml
git commit -m "ci: build and test apps/site on site changes"
```

- [ ] **Step 4: Launch checklist (manual, post-merge — record as a PR comment or issue, not code)**

1. Create the Vercel project: root directory `apps/site`, framework Next.js. The `vercel.json` ignoreCommand keeps unrelated monorepo pushes from triggering builds.
2. On the preview URL run through: all Task 9 Step 6 REPL checks, three legacy URLs (`/components`, `/styling`, `/fonts`), a legacy `?code=` link from a GitHub issue, `/llms.txt`, MCP inspector against the preview.
3. Point the react-pdf.org domain at the new project.
4. Archive `diegomura/react-pdf-site` with a README pointer to the monorepo.

---

## Spec coverage map

| Spec section | Tasks |
|---|---|
| Architecture / `apps/site` / Vercel | 1, 15 |
| Content migration + sidebar | 2 |
| Versioning v1–v4 + banner | 1, 3 |
| URL compatibility (docs + REPL) | 1, 4, 7, 9 |
| Blog | 5 |
| Theming (light = legacy palette, dark default) | 1, 6 |
| REPL (editor, autocomplete, worker, errors, share, download, examples) | 7, 8, 9, 10 |
| Hero + editable mini-REPL | 11 |
| Search | 12 |
| llms.txt / raw markdown / copy button | 13 |
| MCP server + setup docs | 14 |
| Testing / CI | 4, 7, 14, 15 |

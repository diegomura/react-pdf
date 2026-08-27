import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { painterMethodsMarkdown } from '@/components/painter-methods';
import { sectionIndexMarkdown } from '@/components/section-index';
import type { SplitGroup } from '@/components/section-index/v4-splits';
import { examples } from '@/lib/examples';
import { source } from '@/lib/source';
import { styleGroupsMarkdown } from '@/lib/style-props';

type Page = ReturnType<typeof source.getPages>[number];

export const LATEST = 'v4';

export const latestPages = () =>
  source.getPages().filter((page) => page.slugs[0] === LATEST);

const fence = (code: string) => `\`\`\`jsx\n${code.trim()}\n\`\`\``;

/**
 * The snippet lives beside the page as `.usage.jsx` and is the whole runnable
 * program; the page shows everything up to its trailing `ReactPDF.render(...)`.
 * Mirrors `components/usage/usage.tsx` — keep the two in step.
 */
const usageMarkdown = (pagePath: string) => {
  const file = join(
    process.cwd(),
    'content/docs',
    pagePath.replace(/\.mdx$/, '.usage.jsx'),
  );

  let source_: string;
  try {
    source_ = readFileSync(file, 'utf8').trimEnd();
  } catch {
    return '';
  }

  const mount = source_.lastIndexOf('ReactPDF.render(');
  return fence(mount === -1 ? source_ : source_.slice(0, mount));
};

const exampleMarkdown = (attrs: string) => {
  const name = /name="([^"]+)"/.exec(attrs)?.[1];
  const code = name ? examples[name] : undefined;

  // Nameless `<Example />` renders only a playground link, so it has no code.
  if (!code) return '';

  return `${fence(code)}\n\n[Open in Playground](/playground?example=${name})`;
};

/**
 * Docs pages are MDX, so components carry content the plain source does not.
 * Expand each one to its markdown equivalent, or `/llms.txt`, the `.mdx`
 * routes, "Copy Markdown" and the MCP server all serve pages with no code.
 */
const expand = (body: string, page: Page) =>
  body
    .replace(/<StyleProps\s*\/>/g, () => styleGroupsMarkdown())
    .replace(/<PainterMethods\s*\/>/g, () => painterMethodsMarkdown())
    .replace(/<SectionIndex\s+group="([^"]+)"\s*\/>/g, (_, group) =>
      sectionIndexMarkdown(group as SplitGroup),
    )
    .replace(/<Usage\s*[^>]*\/>/g, () => usageMarkdown(page.path))
    .replace(/<Example([^>]*)\/>/g, (_, attrs: string) =>
      exampleMarkdown(attrs),
    );

export async function getLLMText(page: Page) {
  const raw = await page.data.getText('raw');
  const body = expand(
    raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, ''),
    page,
  ).trim();

  return `# ${page.data.title}\nURL: ${page.url}\n\n${body}\n`;
}

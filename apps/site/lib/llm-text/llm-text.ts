import { source } from '@/lib/source';
import { styleGroupsMarkdown } from '@/lib/style-props';

type Page = ReturnType<typeof source.getPages>[number];

export const LATEST = 'v4';

export const latestPages = () =>
  source.getPages().filter((page) => page.slugs[0] === LATEST);

export async function getLLMText(page: Page) {
  const raw = await page.data.getText('raw');
  const body = raw
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .replace('<StyleProps />', () => styleGroupsMarkdown())
    .trim();

  return `# ${page.data.title}\nURL: ${page.url}\n\n${body}\n`;
}

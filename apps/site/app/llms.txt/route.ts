import { latestPages } from '@/lib/llm-text';

export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  const links = latestPages().map((page) => {
    const description = page.data.description
      ? `: ${page.data.description}`
      : '';
    return `- [${page.data.title}](${page.url}.mdx)${description}`;
  });

  const body = [
    '# react-pdf',
    '',
    '> React renderer for creating PDF files on the browser and server.',
    '',
    'Append `.mdx` to any docs URL to get its markdown source.',
    'The full documentation as a single file lives at /llms-full.txt.',
    '',
    '## Docs',
    '',
    ...links,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

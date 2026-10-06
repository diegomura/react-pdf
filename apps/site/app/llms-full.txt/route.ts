import { getLLMText, latestPages } from '@/lib/llm-text';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const pages = await Promise.all(latestPages().map(getLLMText));

  return new Response(pages.join('\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

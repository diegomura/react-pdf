import { latestPages } from '@/lib/llm-text';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(
    latestPages().map((page) => ({
      url: page.url,
      title: page.data.title,
      body: page.data.structuredData.contents
        .map((entry) => entry.content)
        .join(' '),
    })),
  );
}

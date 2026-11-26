import { notFound } from 'next/navigation';
import { getLLMText } from '@/lib/llm-text';
import { source } from '@/lib/source';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const page = source.getPage((await params).slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

import { notFound } from 'next/navigation';
import { getLLMText } from '@/lib/llm-text';
import { source } from '@/lib/source';

// Emitted as out/mdx-raw/**/*.mdx; the build script moves them under out/docs.
export const dynamicParams = false;

export function generateStaticParams() {
  return source
    .getPages()
    .filter((page) => page.slugs.length > 0)
    .map((page) => ({
      slug: [...page.slugs.slice(0, -1), `${page.slugs.at(-1)}.mdx`],
    }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const slug = (await params).slug;
  const page = source.getPage([
    ...slug.slice(0, -1),
    slug.at(-1)!.replace(/\.mdx$/, ''),
  ]);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

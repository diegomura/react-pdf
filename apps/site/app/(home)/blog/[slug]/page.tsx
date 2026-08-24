import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blogSource } from '@/lib/blog-source';

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);
  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <main className="prose mx-auto w-full max-w-2xl flex-1 px-4 py-16">
      <h1>{page.data.title}</h1>
      <MDX components={{ ...defaultMdxComponents }} />
    </main>
  );
}

export function generateStaticParams() {
  return blogSource.getPages().map((p) => ({ slug: p.slugs[0] }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);
  if (!page) notFound();
  return { title: page.data.title };
}

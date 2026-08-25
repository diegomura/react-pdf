import Link from 'next/link';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { OverviewTimeline } from '@/components/overview-timeline';
import { blogSource } from '@/lib/blog-source';

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blogSource.getPage([params.slug]);
  if (!page) notFound();
  const MDX = page.data.body;
  const date = String(page.data.date);

  // ponytail: reuses the docs page typography, which global.css scopes to #nd-page
  return (
    <main
      id="nd-page"
      className="mx-auto w-full max-w-[46rem] flex-1 px-4 py-16"
    >
      <header className="mb-8">
        <Link
          href="/blog"
          className="text-fd-muted-foreground hover:text-fd-foreground text-[0.8125rem] transition-colors"
        >
          ← Blog
        </Link>
        <h1 className="mt-6 mb-3 font-semibold tracking-[-0.02em]">
          {page.data.title}
        </h1>
        <time
          dateTime={date}
          className="text-fd-muted-foreground text-[0.8125rem] tracking-wide uppercase"
        >
          {formatDate(date)}
        </time>
      </header>

      <article className="prose">
        <MDX components={{ ...defaultMdxComponents, OverviewTimeline }} />
      </article>
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
  return { title: page.data.title, description: page.data.description };
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/mdx';
import { OverviewTimeline } from '@/components/overview-timeline';
import { PostCover } from '@/components/post-cover';
import {
  GlyphLab,
  LineBoxLab,
  LineBreakLab,
  RunsStrip,
} from '@/components/text-lab';
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

  const date = String(page.data.date);

  return (
    <main className="mx-auto w-full max-w-[46rem] flex-1 px-4 py-16">
      <header className="mb-9">
        <Link
          href="/blog"
          className="text-fd-muted-foreground hover:text-fd-foreground text-[0.8125rem] transition-colors"
        >
          ← Blog
        </Link>
        <h1 className="mt-6 mb-3 text-[1.75rem] font-semibold tracking-[-0.02em] text-balance">
          {page.data.title}
        </h1>
        <time
          dateTime={date}
          className="text-fd-muted-foreground text-[0.8125rem] tracking-wide uppercase"
        >
          {formatDate(date)}
        </time>
        <div className="border-fd-border bg-fd-muted mt-8 aspect-[2.4/1] overflow-hidden rounded-xl border">
          <PostCover seed={page.url} className="h-full w-full" />
        </div>
      </header>

      <article className="prose">
        <Mdx
          body={page.data.body}
          components={{
            OverviewTimeline,
            RunsStrip,
            GlyphLab,
            LineBreakLab,
            LineBoxLab,
          }}
        />
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

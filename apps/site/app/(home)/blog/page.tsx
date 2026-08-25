import Link from 'next/link';
import { blogSource } from '@/lib/blog-source';

export const metadata = {
  title: 'Blog',
  description: 'Notes and announcements from the react-pdf project.',
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

export default function BlogIndex() {
  const posts = blogSource
    .getPages()
    .sort((a, b) => String(b.data.date).localeCompare(String(a.data.date)));

  return (
    <main className="mx-auto w-full max-w-[46rem] flex-1 px-4 py-16">
      <header className="mb-12">
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.02em]">
          Blog
        </h1>
        <p className="text-fd-muted-foreground mt-2 text-[0.9375rem]">
          Releases, design notes and announcements from the react-pdf project.
        </p>
      </header>

      <div className="divide-fd-border border-fd-border divide-y border-y">
        {posts.map((post) => (
          <article key={post.url}>
            <Link href={post.url} className="group block py-8">
              <time
                dateTime={String(post.data.date)}
                className="text-fd-muted-foreground text-[0.75rem] tracking-wide uppercase"
              >
                {formatDate(String(post.data.date))}
              </time>
              <h2 className="group-hover:text-fd-primary mt-2 text-[1.1875rem] font-semibold tracking-[-0.01em] transition-colors">
                {post.data.title}
              </h2>
              {post.data.description && (
                <p className="text-fd-muted-foreground mt-2 text-[0.9375rem] leading-relaxed">
                  {post.data.description}
                </p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

import Link from 'next/link';
import { blogSource } from '@/lib/blog-source';

export const metadata = { title: 'Blog' };

export default function BlogIndex() {
  const posts = blogSource
    .getPages()
    .sort((a, b) => String(b.data.date).localeCompare(String(a.data.date)));

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
      <h1 className="mb-6 text-[1.75rem] font-semibold tracking-tight">Blog</h1>
      <div className="divide-fd-border divide-y border-y">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="hover:bg-fd-accent/50 group flex items-baseline justify-between gap-4 px-2 py-3 transition-colors"
          >
            <span className="text-[0.9375rem] font-medium">
              {post.data.title}
            </span>
            <span className="text-fd-muted-foreground shrink-0 text-[0.8125rem] tabular-nums">
              {String(post.data.date)}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

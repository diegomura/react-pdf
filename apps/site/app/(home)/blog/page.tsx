import Link from 'next/link';
import { blogSource } from '@/lib/blog-source';

export const metadata = { title: 'Blog' };

export default function BlogIndex() {
  const posts = blogSource
    .getPages()
    .sort((a, b) => String(b.data.date).localeCompare(String(a.data.date)));

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>
      {posts.map((post) => (
        <Link
          key={post.url}
          href={post.url}
          className="block rounded-lg p-4 hover:bg-fd-accent"
        >
          <div className="font-semibold">{post.data.title}</div>
          <div className="text-sm text-fd-muted-foreground">
            {String(post.data.date)}
          </div>
        </Link>
      ))}
    </main>
  );
}

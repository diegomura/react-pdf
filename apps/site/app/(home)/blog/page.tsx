import Link from 'next/link';
import { PostCover } from '@/components/post-cover';
import { blogSource } from '@/lib/blog-source';

export const metadata = {
  title: 'Blog',
  description: 'Notes and announcements from the react-pdf project.',
};

type Post = {
  href: string;
  title: string;
  date: string;
  description?: string;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

function Meta({ post }: { post: Post }) {
  return (
    <div className="text-fd-muted-foreground flex items-center gap-2 text-[0.75rem] tracking-wide uppercase">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
    </div>
  );
}

function Cover({ post }: { post: Post }) {
  return (
    <div className="border-fd-border bg-fd-muted aspect-[16/10] overflow-hidden rounded-xl border">
      <PostCover
        seed={post.href}
        className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}

function Featured({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link
        href={post.href}
        className="grid items-center gap-6 md:grid-cols-[1.15fr_1fr] md:gap-10"
      >
        <Cover post={post} />
        <div>
          <Meta post={post} />
          <h2 className="group-hover:text-fd-primary mt-2.5 text-[1.375rem] leading-snug font-semibold tracking-[-0.02em] text-balance transition-colors">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-fd-muted-foreground mt-2.5 text-[0.9375rem] leading-relaxed">
              {post.description}
            </p>
          )}
          <span className="text-fd-primary mt-4 inline-block text-[0.8125rem] font-medium">
            Read post{' '}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

function Card({ post }: { post: Post }) {
  return (
    <article className="group">
      <Link href={post.href} className="block">
        <Cover post={post} />
        <div className="mt-4">
          <Meta post={post} />
          <h2 className="group-hover:text-fd-primary mt-2 text-[0.9375rem] leading-snug font-semibold tracking-[-0.01em] transition-colors">
            {post.title}
          </h2>
          {post.description && (
            <p className="text-fd-muted-foreground mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed">
              {post.description}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

export default function BlogIndex() {
  const posts: Post[] = blogSource
    .getPages()
    .map((page) => ({
      href: page.url,
      title: String(page.data.title),
      date: String(page.data.date),
      description: page.data.description,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const [featured, ...rest] = posts;

  return (
    <main className="mx-auto w-full max-w-[68rem] flex-1 px-5 py-14 sm:px-6 sm:py-16">
      <header className="mb-10 sm:mb-12">
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.02em]">
          Blog
        </h1>
        <p className="text-fd-muted-foreground mt-2 max-w-[34rem] text-[0.9375rem]">
          Releases, design notes and announcements from the react-pdf project.
        </p>
      </header>

      {featured && <Featured post={featured} />}

      {rest.length > 0 && (
        <div className="border-fd-border mt-14 grid gap-x-7 gap-y-11 border-t pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Card key={post.href} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}

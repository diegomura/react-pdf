import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { homeNav } from '@/lib/nav';

export const metadata = {
  title: 'Page not found',
  description: 'That page does not exist.',
};

const buttonBase =
  'inline-flex h-9 items-center justify-center rounded-md px-4 text-[0.8125rem] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background';

export default function NotFound() {
  return (
    <HomeLayout {...homeNav}>
      <main className="flex flex-1 items-center justify-center px-5 py-24 sm:px-6">
        <div className="max-w-[30rem] text-center">
          <span className="text-fd-muted-foreground/70 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
            Error 404
          </span>
          <h1 className="mt-4 text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance sm:text-[2.5rem]">
            This page didn&apos;t render
          </h1>
          <p className="text-fd-muted-foreground mt-4 text-[0.9375rem] leading-relaxed text-balance">
            The link may be outdated, or the page moved when the docs were
            versioned.
          </p>
          <div className="mt-7 flex items-center justify-center gap-2.5">
            <Link
              href="/"
              className={`${buttonBase} bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90`}
            >
              Back home
            </Link>
            <Link
              href="/docs/v4"
              className={`${buttonBase} border-fd-border hover:bg-fd-accent border`}
            >
              Browse docs
            </Link>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}

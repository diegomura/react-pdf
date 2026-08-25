import Link from 'next/link';
import { CopyCommand, HeroRepl } from './hero-client';

const FEATURES = [
  {
    title: 'Browser and server',
    body: 'The same document renders to a file, a stream or a blob — in Node or straight in the client.',
  },
  {
    title: 'Layout you already know',
    body: 'Yoga brings flexbox to the page: rows, columns, wrapping and absolute positioning.',
  },
  {
    title: 'Beyond text',
    body: 'Custom fonts, images, SVG, form fields, hyphenation and page-break control.',
  },
];

const buttonBase =
  'inline-flex h-9 items-center justify-center rounded-md px-4 text-[0.8125rem] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background';

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[56rem] px-5 pt-10 pb-14 sm:px-6 sm:pt-16 md:pb-20">
        <div className="mx-auto max-w-[36rem] text-center">
          <h1 className="text-[2.125rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[2.625rem] lg:text-[2.875rem]">
            PDFs, made with <span className="text-fd-primary">React</span>
          </h1>

          <p className="text-fd-muted-foreground mx-auto mt-4 max-w-[32rem] text-[0.9375rem] leading-relaxed text-balance sm:text-base">
            The renderer for creating PDF files on the browser and server.
          </p>

          <div className="mt-7 flex justify-center">
            <CopyCommand />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2.5">
            <Link
              href="/docs/v4"
              className={`${buttonBase} bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90`}
            >
              Get started
            </Link>
            <Link
              href="/repl"
              className={`${buttonBase} border-fd-border hover:bg-fd-accent border`}
            >
              Open full REPL
            </Link>
          </div>
        </div>

        <div className="border-fd-border bg-fd-background relative mt-8 h-[34rem] overflow-hidden rounded-xl border shadow-[0_1px_2px_rgba(0,0,0,0.03),0_16px_40px_-24px_rgba(0,0,0,0.18)] sm:mt-14 md:h-[29rem] dark:shadow-none">
          <HeroRepl />
        </div>
      </section>

      <section className="border-fd-border border-t">
        <div className="mx-auto grid w-full max-w-[56rem] gap-8 px-5 py-12 sm:grid-cols-3 sm:gap-10 sm:px-6">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <h2 className="text-[0.875rem] font-medium tracking-[-0.01em]">
                {feature.title}
              </h2>
              <p className="text-fd-muted-foreground mt-1.5 text-[0.8125rem] leading-relaxed">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

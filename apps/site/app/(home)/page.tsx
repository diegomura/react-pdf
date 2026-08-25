import Link from 'next/link';
import { CopyCommand, HeroRepl } from './hero-client';
import './hero.css';

const FEATURES = [
  {
    title: 'Web',
    body: 'Render in the DOM with PDFViewer, or hand the browser a blob it can download.',
  },
  {
    title: 'Node',
    body: 'One call to ReactPDF.render writes the very same document straight to a file.',
  },
  {
    title: 'Beyond text',
    body: 'Custom fonts, images, SVG, form fields, hyphenation and page-break control.',
  },
];

const buttonBase =
  'inline-flex h-9 items-center justify-center rounded-md px-4 text-[0.8125rem] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2 focus-visible:ring-offset-fd-background';

/** Sheets peeking out behind the panel — a document sitting on a small stack. */
function PaperStack() {
  return (
    <div aria-hidden className="pointer-events-none max-md:hidden">
      <div className="border-fd-border/60 bg-fd-card absolute inset-x-14 -top-[13px] h-12 rounded-t-[10px] border border-b-0" />
      <div className="border-fd-border bg-fd-card absolute inset-x-7 -top-[6px] h-12 rounded-t-[10px] border border-b-0" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="hero-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem]"
        />
        <div
          aria-hidden
          className="hero-wash pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem]"
        />

        <div className="mx-auto w-full max-w-[68rem] px-5 pt-12 pb-16 sm:px-6 sm:pt-20 md:pb-24">
          <div className="mx-auto max-w-[38rem] text-center">
            <h1 className="hero-rise text-[2.375rem] leading-[1.06] tracking-[-0.035em] text-balance sm:text-[3rem] lg:text-[3.25rem]">
              <span className="font-semibold">PDFs,</span>{' '}
              <span className="text-fd-muted-foreground font-normal">
                made with
              </span>{' '}
              <span className="text-fd-primary font-semibold">React</span>
            </h1>

            <p
              className="hero-rise text-fd-muted-foreground mx-auto mt-5 max-w-[30rem] text-[0.9375rem] leading-relaxed text-balance sm:text-base"
              style={{ animationDelay: '60ms' }}
            >
              React renderer for creating PDF files on the browser and server.
            </p>

            <div
              className="hero-rise mt-7 flex justify-center"
              style={{ animationDelay: '120ms' }}
            >
              <CopyCommand />
            </div>

            <div
              className="hero-rise mt-4 flex items-center justify-center gap-2.5"
              style={{ animationDelay: '160ms' }}
            >
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
                Open the REPL
              </Link>
            </div>

            {/* the README's "Lost?" note — the disambiguation people arrive needing */}
            <p
              className="hero-rise text-fd-muted-foreground/80 mx-auto mt-6 max-w-[26rem] text-[0.75rem] leading-relaxed text-balance"
              style={{ animationDelay: '200ms' }}
            >
              This package is used to <em>create</em> PDFs using React. To{' '}
              <em>display</em> existing ones, you may be looking for{' '}
              <a
                href="https://github.com/wojtekmaj/react-pdf"
                target="_blank"
                rel="noreferrer"
                className="hover:text-fd-foreground underline decoration-dotted underline-offset-2 transition-colors"
              >
                react-pdf by wojtekmaj
              </a>
              .
            </p>
          </div>

          <div
            className="hero-rise mt-12 flex items-center gap-3.5 sm:mt-14"
            style={{ animationDelay: '240ms' }}
          >
            <span className="text-fd-muted-foreground/70 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
              How it works
            </span>
            <span className="bg-fd-border h-px flex-1" />
          </div>

          <div
            className="hero-rise relative mt-6"
            style={{ animationDelay: '280ms' }}
          >
            <PaperStack />
            <div className="border-fd-border bg-fd-background relative h-[41rem] overflow-hidden rounded-xl border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_56px_-32px_rgba(0,0,0,0.28)] md:h-[32rem] dark:shadow-none">
              <HeroRepl />
            </div>
          </div>
        </div>
      </section>

      <section className="border-fd-border bg-fd-muted/40 border-t">
        <div className="divide-fd-border sm:divide-fd-border mx-auto grid w-full max-w-[68rem] divide-y px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="py-8 sm:px-7 sm:first:ps-0 sm:last:pe-0"
            >
              <h2 className="text-[0.9375rem] font-medium tracking-[-0.01em]">
                {feature.title}
                <span className="text-fd-primary">.</span>
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

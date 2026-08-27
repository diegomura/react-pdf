import Link from 'next/link';
import { CopyCommand, HeroPlayground } from '@/components/hero';
import './hero.css';

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

/**
 * The legacy react-pdf.org corner decoration — angular shards radiating from
 * the top corners — redrawn as vectors. The original ran full-strength red in
 * a narrow column; this covers the whole hero, so the reds are pulled back and
 * the whole thing fades out before it reaches the panel.
 */
function Shards() {
  return (
    <svg
      aria-hidden
      className="hero-shards pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] w-full mask-b-from-26% mask-b-to-82%"
      viewBox="0 0 1440 544"
      preserveAspectRatio="xMidYMin slice"
    >
      {/* thin overlapping slivers, alternating red / deep / pale — the pale
          gaps between the reds are what make it read as folded paper */}
      <g>
        <polygon points="1440,0 1198,0 1440,330" fill="var(--shard-red)" />
        <polygon points="1440,0 1310,0 1440,120" fill="var(--shard-deep)" />
        <polygon
          points="1268,0 1198,0 1440,330 1440,392"
          fill="var(--shard-deep)"
        />
        <polygon
          points="1198,0 1156,0 1416,412 1440,392"
          fill="var(--shard-pale)"
        />
        <polygon
          points="1156,0 1120,0 1392,470 1416,412"
          fill="var(--shard-warm)"
        />
        <polygon
          points="1120,0 1094,0 1370,544 1392,470"
          fill="var(--shard-pale)"
        />
      </g>
      {/* the left cluster is a quieter echo, so the corners don't read as a
          matched pair */}
      <g className="opacity-50">
        <polygon points="0,0 214,0 0,262" fill="var(--shard-red)" />
        <polygon points="0,0 112,0 0,118" fill="var(--shard-deep)" />
        <polygon points="214,0 252,0 0,318 0,262" fill="var(--shard-pale)" />
        <polygon points="252,0 286,0 0,362 0,318" fill="var(--shard-warm)" />
      </g>
    </svg>
  );
}

function Backdrop() {
  return <Shards />;
}

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="relative isolate overflow-hidden">
        <Backdrop />

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
                href="/playground"
                className={`${buttonBase} border-fd-border hover:bg-fd-accent border`}
              >
                Open the playground
              </Link>
            </div>
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
            <div className="border-fd-border bg-fd-background relative h-[41rem] overflow-hidden rounded-xl border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_56px_-32px_rgba(0,0,0,0.28)] md:h-[32rem] dark:shadow-none">
              <HeroPlayground />
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

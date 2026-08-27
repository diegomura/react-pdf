import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Mdx } from '@/components/mdx';
import { Example } from '@/components/example';
import { OverviewTimeline } from '@/components/overview-timeline';
import { SectionIndex } from '@/components/section-index';
import { PainterMethods } from '@/components/painter-methods';
import { StyleProps } from '@/components/style-props';
import { DocsFooter, DocsHeader } from '@/components/docs-pager';
import { Usage } from '@/components/usage';

const LATEST = 'v4';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const version = params.slug?.[0];
  const isOld = version !== LATEST && /^v\d+$/.test(version ?? '');

  return (
    <DocsPage
      toc={page.data.toc.filter((item) => item.depth <= 2)}
      full={page.data.full}
      slots={{ breadcrumb: DocsHeader, footer: DocsFooter }}
    >
      <DocsTitle className="text-[1.75rem] tracking-[-0.02em]">
        {page.data.title}
      </DocsTitle>

      <DocsDescription className="mb-6 text-[0.9375rem]">
        {page.data.description}
      </DocsDescription>

      {isOld && (
        <div className="rounded-lg border border-fd-primary/50 bg-fd-primary/10 p-3 text-sm">
          You are viewing docs for {version}, which is no longer maintained.{' '}
          <Link className="font-medium underline" href={`/docs/${LATEST}`}>
            See the latest docs
          </Link>
          .
        </div>
      )}

      <DocsBody>
        <Mdx
          body={page.data.body}
          components={{
            Example,
            OverviewTimeline,
            SectionIndex,
            PainterMethods,
            StyleProps,
            Usage: (props: { lang?: string }) => (
              <Usage page={page.path} {...props} />
            ),
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}

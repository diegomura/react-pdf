import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import Link from 'next/link';

const LATEST = 'v4';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const version = params.slug?.[0];
  const isOld =
    version !== undefined && version !== LATEST && /^v\d+$/.test(version);
  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
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
        <MDX components={{ ...defaultMdxComponents }} />
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

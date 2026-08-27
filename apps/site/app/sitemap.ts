import type { MetadataRoute } from 'next';
import { blogSource } from '@/lib/blog-source';
import { latestPages } from '@/lib/llm-text';

const SITE = 'https://react-pdf.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/playground',
    '/blog',
    '/changelog',
    // only the latest docs: v1–v3 are still served, but listing them puts four
    // pages in the index competing for every query
    ...latestPages().map((page) => page.url),
    ...blogSource.getPages().map((page) => page.url),
  ];

  return routes.map((route) => ({ url: new URL(route, SITE).href }));
}

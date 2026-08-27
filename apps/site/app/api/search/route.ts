import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

export const { GET } = createFromSource(source, {
  buildIndex: (page) => ({
    id: page.url,
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    structuredData: page.data.structuredData,
    tag: page.slugs[0],
  }),
});

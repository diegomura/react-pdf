import { blog } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const blogSource = loader({
  baseUrl: '/blog',
  source: toFumadocsSource(blog, []),
});

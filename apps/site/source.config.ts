import {
  defineConfig,
  defineDocs,
  defineCollections,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';
import { codeThemeDark, codeThemeLight } from './lib/code-theme';

export const docs = defineDocs({ dir: 'content/docs' });

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: frontmatterSchema.extend({ date: z.string() }),
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: { light: codeThemeLight, dark: codeThemeDark },
    },
  },
});

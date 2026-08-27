import { McpServer, createMcpHandler } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { getLLMText, latestPages } from '@/lib/llm-text';
import { source } from '@/lib/source';

const occurrences = (haystack: string, term: string) =>
  haystack.split(term).length - 1;

function searchDocs(query: string, limit = 5) {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter(Boolean);
  if (terms.length === 0) return [];

  return latestPages()
    .map((page) => {
      const title = page.data.title.toLowerCase();
      const body = page.data.structuredData.contents
        .map((entry) => entry.content)
        .join(' ')
        .toLowerCase();

      const score = terms.reduce(
        (total, term) =>
          total + occurrences(body, term) + 10 * occurrences(title, term),
        0,
      );

      return { url: page.url, title: page.data.title, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ url, title }) => ({ url, title }));
}

const handler = createMcpHandler(() => {
  const server = new McpServer({ name: 'react-pdf', version: '1.0.0' });

  server.registerTool(
    'search_docs',
    {
      title: 'Search react-pdf docs',
      description:
        'Search the react-pdf (@react-pdf/renderer) documentation. Returns the ' +
        'best matching pages as [{ url, title }]. Pass the url to read_doc to ' +
        'get the full page. Use this before answering anything about react-pdf ' +
        'components, styling, fonts, SVG, forms or pagination.',
      inputSchema: {
        query: z
          .string()
          .describe('Keywords to look for, e.g. "register custom font"'),
      },
    },
    ({ query }) => ({
      content: [{ type: 'text', text: JSON.stringify(searchDocs(query)) }],
    }),
  );

  server.registerTool(
    'read_doc',
    {
      title: 'Read a react-pdf docs page',
      description:
        'Return one react-pdf documentation page as Markdown. Takes a url from ' +
        'search_docs, e.g. "/docs/v4/components/text".',
      inputSchema: {
        url: z
          .string()
          .describe('Docs page path, e.g. "/docs/v4/components/text"'),
      },
    },
    async ({ url }) => {
      const slug = url.replace(/^\/?(docs\/)?/, '').replace(/\.mdx$/, '');
      const page = source.getPage(slug.split('/').filter(Boolean));

      if (!page) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: `No such page: ${url}` }],
        };
      }

      return {
        content: [{ type: 'text' as const, text: await getLLMText(page) }],
      };
    },
  );

  return server;
});

const serve = (request: Request) => handler.fetch(request);

export { serve as GET, serve as POST, serve as DELETE };

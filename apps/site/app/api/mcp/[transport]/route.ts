import { McpServer, createMcpHandler } from '@modelcontextprotocol/server';
import { z } from 'zod';
import { searchDocs } from '@/lib/docs-search';
import { getLLMText } from '@/lib/llm-text';
import { source } from '@/lib/source';

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

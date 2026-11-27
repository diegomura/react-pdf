import { McpServer, createMcpHandler } from '@modelcontextprotocol/server';
import { z } from 'zod';

type Env = { ASSETS: { fetch: (input: Request | URL) => Promise<Response> } };
type IndexedPage = { url: string; title: string; body: string };

const occurrences = (haystack: string, term: string) =>
  haystack.split(term).length - 1;

function searchDocs(pages: IndexedPage[], query: string, limit = 5) {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter(Boolean);
  if (terms.length === 0) return [];

  return pages
    .map((page) => {
      const title = page.title.toLowerCase();
      const body = page.body.toLowerCase();

      const score = terms.reduce(
        (total, term) =>
          total + occurrences(body, term) + 10 * occurrences(title, term),
        0,
      );

      return { url: page.url, title: page.title, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ url, title }) => ({ url, title }));
}

const createServer = (env: Env, origin: string) => {
  const asset = (path: string) => env.ASSETS.fetch(new URL(path, origin));

  const server = new McpServer(
    { name: 'react-pdf', version: '1.0.0' },
    { capabilities: { tools: { listChanged: false } } },
  );

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
    async ({ query }) => {
      const pages: IndexedPage[] = await (
        await asset('/mcp-index.json')
      ).json();
      return {
        content: [
          { type: 'text', text: JSON.stringify(searchDocs(pages, query)) },
        ],
      };
    },
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
      const res = await asset(`/docs/${slug}.mdx`);

      if (!slug || !res.ok) {
        return {
          isError: true,
          content: [{ type: 'text' as const, text: `No such page: ${url}` }],
        };
      }

      return { content: [{ type: 'text' as const, text: await res.text() }] };
    },
  );

  return server;
};

export default {
  fetch(request: Request, env: Env) {
    const origin = new URL(request.url).origin;
    // Static docs never emit updates; subscription streams would only idle.
    const handler = createMcpHandler(() => createServer(env, origin), {
      maxSubscriptions: 0,
    });
    return handler.fetch(request);
  },
};

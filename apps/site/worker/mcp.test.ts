import { describe, expect, it } from 'vitest';
import worker from './mcp';

const assets: Record<string, string> = {
  '/mcp-index.json': JSON.stringify([
    { url: '/docs/v4/fonts', title: 'Fonts', body: 'Register a font' },
  ]),
  '/docs/v4/fonts.mdx': '# Fonts',
};

const env = {
  ASSETS: {
    fetch: async (input: Request | URL) => {
      const body =
        assets[new URL(input instanceof URL ? input : input.url).pathname];
      return body === undefined
        ? new Response('Not found', { status: 404 })
        : new Response(body);
    },
  },
};

const POST = (request: Request) => worker.fetch(request, env);
const GET = POST;

const request = (method: string, params: object = {}, modern = false) =>
  new Request('https://react-pdf.org/mcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      ...(modern && {
        'MCP-Protocol-Version': '2026-07-28',
        'MCP-Method': method,
      }),
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method,
      params: {
        ...params,
        ...(modern && {
          _meta: {
            'io.modelcontextprotocol/protocolVersion': '2026-07-28',
            'io.modelcontextprotocol/clientCapabilities': {},
            'io.modelcontextprotocol/clientInfo': {
              name: 'regression-test',
              version: '1.0.0',
            },
          },
        }),
      },
    }),
  });

describe('MCP worker', () => {
  it('does not advertise tool-change subscriptions', async () => {
    const response = await POST(request('server/discover', {}, true));
    const body = await response.json();
    expect(body.result.capabilities.tools.listChanged).toBe(false);
  });

  it('rejects subscriptions without opening a persistent stream', async () => {
    const response = await POST(
      request(
        'subscriptions/listen',
        { notifications: { toolsListChanged: true } },
        true,
      ),
    );
    try {
      expect(response.headers.get('content-type')).toContain(
        'application/json',
      );
      expect((await response.json()).error).toBeDefined();
    } finally {
      if (!response.bodyUsed) await response.body?.cancel();
    }
  });

  it('still lists tools for legacy clients and finishes the response', async () => {
    const response = await POST(request('tools/list'));
    const text = await response.text();
    expect(text).toContain('search_docs');
    expect(text).toContain('read_doc');
  });

  it('searches the static index', async () => {
    const response = await POST(
      request('tools/call', {
        name: 'search_docs',
        arguments: { query: 'register font' },
      }),
    );
    expect(await response.text()).toContain('/docs/v4/fonts');
  });

  it('reads a page from its static markdown file', async () => {
    const response = await POST(
      request('tools/call', {
        name: 'read_doc',
        arguments: { url: '/docs/v4/fonts' },
      }),
    );
    expect(await response.text()).toContain('# Fonts');
  });

  it('reports unknown pages as errors', async () => {
    const response = await POST(
      request('tools/call', {
        name: 'read_doc',
        arguments: { url: '/docs/v4/nope' },
      }),
    );
    expect(await response.text()).toContain('"isError":true');
  });

  it('does not open legacy GET streams', async () => {
    const response = await GET(new Request('https://react-pdf.org/mcp'));
    expect(response.status).toBe(405);
  });
});

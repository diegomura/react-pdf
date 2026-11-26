import { describe, expect, it, vi } from 'vitest';
import { GET, POST } from './route';

vi.mock('@/lib/llm-text', () => ({
  latestPages: () => [],
  getLLMText: async () => '# Documentation',
}));

vi.mock('@/lib/source', () => ({
  source: { getPage: () => undefined },
}));

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

describe('MCP serverless lifecycle', () => {
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

  it('still runs documentation searches', async () => {
    const response = await POST(
      request('tools/call', {
        name: 'search_docs',
        arguments: { query: 'text' },
      }),
    );
    expect(await response.text()).toContain('"text":"[]"');
  });

  it('does not open legacy GET streams', async () => {
    const response = await GET(new Request('https://react-pdf.org/mcp'));
    expect(response.status).toBe(405);
  });
});

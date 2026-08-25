import { expect, test } from 'vitest';
import { POST } from '@/app/api/mcp/[transport]/route';
import { searchDocs } from '@/lib/docs-search';

test('searchDocs finds the fonts page for "register font"', () => {
  const results = searchDocs('register font');

  expect(results[0]).toEqual({ url: '/docs/v4/fonts', title: 'Fonts' });
  expect(results.length).toBeLessThanOrEqual(5);
});

test('searchDocs returns nothing for gibberish', () => {
  expect(searchDocs('qwzzxpfl')).toEqual([]);
  expect(searchDocs('   ')).toEqual([]);
});

const rpc = async (method: string, params: unknown, sessionHeaders = {}) => {
  const response = await POST(
    new Request('http://localhost/api/mcp/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
        ...sessionHeaders,
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    }),
  );

  const text = await response.text();
  const data = text.startsWith('event:')
    ? text
        .split('\n')
        .find((line) => line.startsWith('data:'))!
        .slice(5)
    : text;

  return { response, body: JSON.parse(data) };
};

const INITIALIZE = {
  protocolVersion: '2026-07-28',
  capabilities: {},
  clientInfo: { name: 'test', version: '1' },
};

test('the MCP endpoint initializes and advertises both tools', async () => {
  const init = await rpc('initialize', INITIALIZE);
  expect(init.body.result.serverInfo.name).toBe('react-pdf');

  const list = await rpc('tools/list', {});
  const names = list.body.result.tools.map(
    (tool: { name: string }) => tool.name,
  );
  expect(names.sort()).toEqual(['read_doc', 'search_docs']);
});

test('search_docs and read_doc answer over the MCP endpoint', async () => {
  await rpc('initialize', INITIALIZE);

  const search = await rpc('tools/call', {
    name: 'search_docs',
    arguments: { query: 'register font' },
  });
  expect(JSON.parse(search.body.result.content[0].text)[0].url).toBe(
    '/docs/v4/fonts',
  );

  const read = await rpc('tools/call', {
    name: 'read_doc',
    arguments: { url: '/docs/v4/components/text' },
  });
  expect(read.body.result.content[0].text).toContain(
    'URL: /docs/v4/components/text',
  );

  const missing = await rpc('tools/call', {
    name: 'read_doc',
    arguments: { url: '/docs/v4/nope' },
  });
  expect(missing.body.result.isError).toBe(true);
});

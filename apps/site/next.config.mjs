import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// The @react-pdf packages are linked from the monorepo, so the bundler and
// the output tracing have to reach beyond apps/site
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: { root },
  outputFileTracingRoot: root,
  async redirects() {
    const docs = [
      'advanced',
      'compatibility',
      'components',
      'fonts',
      'form',
      'hooks',
      'node',
      'styling',
      'svg',
    ];
    return [
      // thousands of shared links are /repl?code=… — Next forwards the query
      { source: '/repl', destination: '/playground', permanent: true },
      ...docs.map((slug) => ({
        source: `/${slug}`,
        destination: `/docs/v4/${slug}`,
        permanent: true,
      })),
      { source: '/docs', destination: '/docs/v4', permanent: false },
      { source: '/docs/v4/index', destination: '/docs/v4', permanent: true },
      {
        source: '/rendering-process',
        destination: '/blog/rendering-process',
        permanent: true,
      },
      {
        source: '/docs/v4/rendering-process',
        destination: '/blog/rendering-process',
        permanent: true,
      },
      {
        source: '/docs/v4/advanced/large-documents',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/docs/:path*.mdx', destination: '/api/raw/:path*' },
      // The handler's own route is /api/mcp/<transport>; this is the address
      // people paste into a client.
      { source: '/mcp', destination: '/api/mcp/mcp' },
    ];
  },
};

export default withMDX(config);

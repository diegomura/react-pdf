import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    const docs = [
      'advanced',
      'compatibility',
      'components',
      'fonts',
      'form',
      'hooks',
      'node',
      'rendering-process',
      'styling',
      'svg',
    ];
    return [
      ...docs.map((slug) => ({
        source: `/${slug}`,
        destination: `/docs/v4/${slug}`,
        permanent: true,
      })),
      { source: '/docs', destination: '/docs/v4', permanent: false },
      { source: '/docs/v4/index', destination: '/docs/v4', permanent: true },
    ];
  },
  async rewrites() {
    return [{ source: '/docs/:path*.mdx', destination: '/api/raw/:path*' }];
  },
};

export default withMDX(config);

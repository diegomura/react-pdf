import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Redirects live in public/_redirects; Cloudflare serves them for the export.
  output: 'export',
  images: { unoptimized: true },
};

export default withMDX(config);

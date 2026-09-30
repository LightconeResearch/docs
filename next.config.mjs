import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  // A static export has no server to optimise images, so they are served as-is.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default withMDX(config);

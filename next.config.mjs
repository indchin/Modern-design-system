/**
 * Static export for GitHub Pages.
 * In production the site lives under /Modern-design-system, so the base path is
 * applied — and exposed to the sample content so image URLs get the prefix too
 * (next/image does not prefix unoptimised static sources).
 */
const base = process.env.NODE_ENV === "production" ? "/Modern-design-system" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: base,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: base }
};

export default nextConfig;

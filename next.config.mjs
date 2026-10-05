/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;

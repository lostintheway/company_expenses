/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: { allowedOrigins: ["http://localhost:3000"] },
  },
};

export default nextConfig;

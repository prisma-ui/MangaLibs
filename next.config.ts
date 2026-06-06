/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // 'domains' is deprecated - using remotePatterns only
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'meo.comick.pictures',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;

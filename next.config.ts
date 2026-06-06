/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // FIX: `domains` sudah deprecated di Next.js 13+ dan akan dihapus di versi mendatang.
    // Gunakan `remotePatterns` saja (sudah ada di bawah). Menghapus `domains` mencegah
    // deprecation warning yang bisa menjadi error di Vercel pada update Next.js berikutnya.
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

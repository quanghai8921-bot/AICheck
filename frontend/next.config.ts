/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pages/home',
        permanent: true, // Chuyển hướng vĩnh viễn (308 redirect)
      },
    ];
  },
};

module.exports = nextConfig;
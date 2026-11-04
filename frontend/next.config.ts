/** @type {import('next').NextConfig} */
const nextConfig = {
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
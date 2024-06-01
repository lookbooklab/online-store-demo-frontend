/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'localhost',
      },
      {
        hostname: 'online-store-demo-frontend.vercel.app',
      },
      {
        hostname: 'inspired-attraction-05c9fb2bba.media.strapiapp.com',
      },
    ],
  },
};

module.exports = nextConfig;

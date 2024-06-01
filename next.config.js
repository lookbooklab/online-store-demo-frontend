/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "localhost", "online-store-demo-frontend.vercel.app"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'online-store-demo-frontend.vercel.app',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;

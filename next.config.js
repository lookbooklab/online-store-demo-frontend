/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "localhost", "https://online-store-demo-frontend.vercel.app"],
  },
};

module.exports = nextConfig;

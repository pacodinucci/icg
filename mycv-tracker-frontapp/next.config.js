/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mycvtracker.com",
        pathname: "/assets/img/**",
      },
    ],
  },
  basePath : "/new-app"
};

module.exports = nextConfig;

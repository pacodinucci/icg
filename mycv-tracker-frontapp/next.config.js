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
        port: "",
        pathname: "/assets/img/**",
      },
    ],
  },
};

module.exports = nextConfig;

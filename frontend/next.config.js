/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    baseURL:
      "https://ec2-54-206-21-106.ap-southeast-2.compute.amazonaws.com:443",
  },
};

module.exports = nextConfig;

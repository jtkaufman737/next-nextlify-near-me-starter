/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    API_TARGET: process.env.NEXT_PUBLIC_API_TARGET
  }
}

module.exports = nextConfig

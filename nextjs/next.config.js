/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  exportPathMap: function() {
    return {
      '/': {page: '/work'}
    }
  }
}

module.exports = nextConfig

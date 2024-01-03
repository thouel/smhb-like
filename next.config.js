const { withLogtail } = require('@logtail/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rp0iqdxcvowxeg4o.public.blob.vercel-storage.com',
        pathname: '/smhb/actualites/*',
        port: '',
      },
    ],
  },
  compiler: {
    removeConsole: false,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    typedRoutes: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
}

module.exports = withLogtail(nextConfig)

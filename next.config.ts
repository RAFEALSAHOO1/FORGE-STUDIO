import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      ],
    }]
  },
  async redirects() {
    return [
      { source: '/home',      destination: '/',        permanent: true },
      { source: '/shop',      destination: '/browse',  permanent: true },
      { source: '/products',  destination: '/browse',  permanent: true },
      { source: '/customize', destination: '/forge',   permanent: true },
    ]
  },
}
export default nextConfig

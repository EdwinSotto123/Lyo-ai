import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const BACKEND_URL = process.env.BACKEND_URL || 'https://9bmv4bvg-5000.brs.devtunnels.ms';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'localhost:5000',
        '127.0.0.1:3000',
        '127.0.0.1:5000',
        '9bmv4bvg-5000.brs.devtunnels.ms',
        'j82v8gh3-3001.brs.devtunnels.ms',
        '*.brs.devtunnels.ms'
      ]
    }
  },
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: `${BACKEND_URL}/auth/:path*`,
      },
      {
        source: '/oauth2callback',
        destination: `${BACKEND_URL}/oauth2callback`,
      },
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: '/unipile/:path*',
        destination: `${BACKEND_URL}/unipile/:path*`,
      },
      // Handle localized API requests
      {
        source: '/:locale/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: '/:locale/auth/:path*',
        destination: `${BACKEND_URL}/auth/:path*`,
      },
      {
        source: '/:locale/unipile/:path*',
        destination: `${BACKEND_URL}/unipile/:path*`,
      },
    ]
  },
}

export default withNextIntl(nextConfig);
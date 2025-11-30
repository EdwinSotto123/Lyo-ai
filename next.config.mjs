import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://127.0.0.1:5000/auth/:path*',
      },
      {
        source: '/oauth2callback',
        destination: 'http://127.0.0.1:5000/oauth2callback',
      },
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*',
      },
      {
        source: '/unipile/:path*',
        destination: 'http://127.0.0.1:5000/unipile/:path*',
      },
      // Handle localized API requests
      {
        source: '/:locale/api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*',
      },
      {
        source: '/:locale/auth/:path*',
        destination: 'http://127.0.0.1:5000/auth/:path*',
      },
      {
        source: '/:locale/unipile/:path*',
        destination: 'http://127.0.0.1:5000/unipile/:path*',
      },
    ]
  },
}

export default withNextIntl(nextConfig);
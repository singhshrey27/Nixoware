/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Hostinger serves the static assets directly; its CDN does not proxy
    // Next's /_next/image optimizer reliably.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*.(png|jpg|jpeg|webp|avif|svg|ico|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;

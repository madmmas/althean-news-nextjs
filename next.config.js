/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Vercel: Comment out 'output: export' to use Vercel's Next.js features
  // For static hosting (S3): Uncomment the line below
  output: 'export',
  images: {
    // For static export, MUST set unoptimized: true
    // For Vercel, you can use optimized images (set unoptimized: false)
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'brilliant-dream-c3f2fe8788.strapiapp.com',
      },
      {
        protocol: 'https',
        hostname: '**.strapiapp.com',
      },
    ],
  },
  trailingSlash: true, // Better for S3 hosting
};

module.exports = nextConfig;

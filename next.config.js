/** @type {import('next').NextConfig} */
const nextConfig = {
  // For Vercel: Remove 'output: export' to use Vercel's Next.js features
  // For static hosting (S3): Uncomment the line below
  // output: 'export',
  images: {
    // For Vercel: optimized images work (unoptimized: false)
    // For static export: MUST set unoptimized: true
    unoptimized: false, // Vercel can optimize images
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
  trailingSlash: true,
};

module.exports = nextConfig;

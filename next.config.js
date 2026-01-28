/** @type {import('next').NextConfig} */
const nextConfig = {
  // ============================================
  // DEPLOYMENT CONFIGURATION
  // ============================================
  // For Vercel: Keep 'output: export' commented out (default)
  // For AWS S3 static hosting: Uncomment 'output: export' below
  // output: 'export',
  
  images: {
    // For Vercel: optimized images work (unoptimized: false)
    // For static export (S3): MUST set unoptimized: true
    // When using 'output: export', change this to: unoptimized: true
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

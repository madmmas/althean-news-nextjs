# Deployment Guide: Vercel vs AWS S3

This project now supports both **Vercel** (dynamic rendering) and **AWS S3** (static export) deployments.

## Key Changes for S3 Compatibility

### 1. Client-Side Data Fetching
- **FeaturePosts**: Converted to client component that fetches on mount
- **Blog Listing Page**: Uses client component (`BlogPageContent`) that fetches on client side
- **Blog Detail Pages**: Use `generateStaticParams` to pre-generate pages at build time

### 2. Removed `force-dynamic`
- Removed `export const dynamic = 'force-dynamic'` from pages
- Pages now work with both static export and dynamic rendering

### 3. Fetch Configuration
- Changed from `cache: 'no-store'` to `next: { revalidate: 60 }` for better caching
- This allows Next.js to cache responses while still supporting dynamic rendering

## Deployment Instructions

### For Vercel (Dynamic Rendering)

**Current Configuration (Default):**
```javascript
// next.config.js
// output: 'export',  // Keep commented out
unoptimized: false,   // Vercel can optimize images
```

**Build & Deploy:**
```bash
npm run build
# Deploy to Vercel (automatic via Vercel CLI or Git integration)
```

**Features:**
- ✅ Server-side rendering
- ✅ Dynamic routes with ISR
- ✅ Optimized images
- ✅ Real-time data fetching

### For AWS S3 (Static Export)

**1. Update `next.config.js`:**
```javascript
const nextConfig = {
  output: 'export',        // Uncomment this line
  images: {
    unoptimized: true,     // REQUIRED for static export
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
```

**2. Build for Static Export:**
```bash
npm run build
```

This will create an `out/` directory with all static files.

**3. Upload to S3:**
```bash
aws s3 sync out/ s3://your-bucket-name/ --delete
```

**4. Configure CloudFront (if using):**
- Set error pages: 404 → `/404.html` (HTTP 200)
- Set error pages: 403 → `/404.html` (HTTP 200)

**Features:**
- ✅ Fully static HTML files
- ✅ Client-side data fetching (Strapi articles load on page load)
- ✅ Works with S3 static website hosting
- ✅ Compatible with CloudFront CDN

## How It Works

### Home Page (`/`)
- **FeaturePosts** component fetches articles client-side using `getArticles()` hook
- Works for both static export and dynamic rendering
- No server-side dependencies

### Blog Listing (`/blog`)
- **BlogPageContent** client component reads URL search params
- Fetches articles client-side and filters by search query
- Pagination handled client-side
- Works for both static export and dynamic rendering

### Blog Detail Pages (`/blog/[slug]`)
- Uses `generateStaticParams()` to pre-generate pages at build time
- For static export: All blog posts are pre-generated as static HTML
- For dynamic rendering: Pages are generated on-demand with ISR
- Falls back to dynamic rendering if slug not found in static params

## Important Notes

1. **Strapi API Access**: Ensure `NEXT_PUBLIC_STRAPI_API_URL` is set in your environment
2. **Image Optimization**: For S3, images are unoptimized (required for static export)
3. **Client-Side Fetching**: Articles load after page load (small delay on first visit)
4. **Caching**: Client-side caching via `getArticles()` uses localStorage (5-minute cache)

## Switching Between Deployments

To switch from Vercel to S3:
1. Uncomment `output: 'export'` in `next.config.js`
2. Change `unoptimized: false` to `unoptimized: true`
3. Run `npm run build`
4. Upload `out/` directory to S3

To switch from S3 to Vercel:
1. Comment out `output: 'export'` in `next.config.js`
2. Change `unoptimized: true` to `unoptimized: false`
3. Deploy to Vercel

## Troubleshooting

### S3: Articles Not Loading
- Check browser console for CORS errors
- Verify `NEXT_PUBLIC_STRAPI_API_URL` is accessible
- Ensure Strapi API allows public access

### Vercel: Build Errors
- Ensure `force-dynamic` is not used on pages that need static export compatibility
- Check that all server components are properly marked

### Static Export: Missing Pages
- Run `generateStaticParams` during build to pre-generate all blog post pages
- Check `out/` directory for generated HTML files

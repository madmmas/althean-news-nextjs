# Deployment Guide: Vercel vs AWS S3

This project now supports both **Vercel** (dynamic rendering) and **AWS S3** (static export) deployments.

## Key Changes for S3 Compatibility

### 1. Fully Client-Side Data Fetching (Dynamic Content)
- **FeaturePosts**: Client component that fetches articles on mount
- **Blog Listing Page**: Client component (`BlogPageContent`) that fetches and filters articles client-side
- **Blog Detail Pages**: Client components that fetch articles by slug on mount
- **All Content**: Fully dynamic - updates from Strapi without rebuilding

### 2. Client-Side Caching
- All data fetching uses `getArticles()` and `getArticleBySlug()` with localStorage caching
- 5-minute cache duration for optimal performance
- Automatic cache invalidation and stale cache fallback

### 3. Static Export Compatibility
- `generateStaticParams` pre-generates HTML structure for known blog posts (for S3 compatibility)
- Content inside is fully client-side rendered and updates dynamically
- New articles appear immediately without rebuilding (client-side fetch)

### 4. Removed `force-dynamic`
- Removed `export const dynamic = 'force-dynamic'` from pages
- Pages now work with both static export and dynamic rendering

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
- ✅ Fully static HTML files (structure pre-generated)
- ✅ **Fully dynamic content** - all data fetched client-side from Strapi
- ✅ **No rebuild needed** - new articles appear immediately
- ✅ Client-side caching (5-minute cache, localStorage)
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
- **Fully client-side rendered** - fetches article by slug on mount
- Uses `generateStaticParams()` to pre-generate HTML structure (for S3 compatibility)
- Content is fetched client-side using `getArticleBySlug()` with caching
- **New articles appear immediately** without rebuilding (fully dynamic)
- Related posts are also fetched client-side

## Important Notes

1. **Strapi API Access**: 
   - Ensure `NEXT_PUBLIC_STRAPI_API_URL` is set in your environment
   - API must be publicly accessible (CORS enabled for client-side fetching)
   - Works with both public and authenticated Strapi instances

2. **Image Optimization**: 
   - For S3, images are unoptimized (required for static export)
   - Images are served directly from Strapi or your CDN

3. **Client-Side Fetching**: 
   - All content is fetched client-side after page load
   - First visit: Small delay while fetching from Strapi
   - Subsequent visits: Instant load from localStorage cache (5-minute cache)

4. **Dynamic Content**: 
   - **No rebuild needed** - new articles appear immediately
   - Content updates automatically from Strapi
   - Cache refreshes every 5 minutes or on page refresh

5. **Static Export**: 
   - `generateStaticParams` pre-generates HTML structure for known articles
   - This ensures S3 can serve the pages (required for static hosting)
   - Content inside is still fully dynamic and client-side rendered

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

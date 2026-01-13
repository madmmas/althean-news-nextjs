# AWS S3 + CloudFront Deployment Guide

## Build for Static Export

1. **Ensure static export is enabled** in `next.config.js`:
   ```javascript
   output: 'export',
   images: {
     unoptimized: true, // REQUIRED for static export
   }
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Verify the `out` directory contains**:
   - `index.html` (main page)
   - `404.html` (error page)
   - `[slug]/index.html` (dynamic article pages)
   - `_next/` (static assets: JS, CSS, images)
   - `img/` (public images)
   - `js/` (public JavaScript files)
   - `favicon.ico`

## Upload to S3

### What to Upload

**Upload the ENTIRE contents of the `out` directory** to your S3 bucket root.

```bash
# Upload all files from out/ directory to S3 bucket
aws s3 sync out/ s3://your-bucket-name/ --delete
```

### File Structure in S3

```
your-bucket-name/
├── index.html          ← Main entry point (S3 will serve this for root URL)
├── 404.html            ← Error page
├── 404/
│   └── index.html
├── [slug]/
│   └── index.html      ← Dynamic article pages
├── _next/              ← Next.js static assets
│   ├── static/
│   │   ├── chunks/     ← JavaScript bundles
│   │   └── css/        ← CSS files
│   └── ...
├── img/                ← Public images
│   └── logo.svg
├── js/                 ← Public JavaScript
└── favicon.ico
```

## S3 Configuration

### 1. Enable Static Website Hosting

1. Go to S3 bucket → **Properties** → **Static website hosting**
2. Enable static website hosting
3. Set **Index document**: `index.html`
4. Set **Error document**: `404.html`
5. Note the **Bucket website endpoint** URL

### 2. Bucket Policy (Public Read Access)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 3. Block Public Access Settings

- Uncheck "Block all public access" (or configure specific permissions)
- This is required for static website hosting

## CloudFront Configuration

### 1. Create CloudFront Distribution

1. Go to CloudFront → **Create Distribution**
2. **Origin Domain**: Select your S3 bucket (or use the website endpoint)
3. **Viewer Protocol Policy**: Redirect HTTP to HTTPS
4. **Default Root Object**: `index.html`
5. **Error Pages**: 
   - 404 → `/404.html` (HTTP 200)
   - 403 → `/404.html` (HTTP 200)

### 2. Custom Error Responses

Configure CloudFront to handle SPA routing:
- **HTTP Error Code**: 403
- **Response Page Path**: `/404.html`
- **HTTP Response Code**: 200

- **HTTP Error Code**: 404
- **Response Page Path**: `/404.html`
- **HTTP Response Code**: 200

## Important Notes

### Entry Point

- **Root URL** (`/`) → S3 serves `index.html`
- **Article URLs** (`/article-slug/`) → S3 serves `[slug]/index.html` or `article-slug/index.html`
- **404 Errors** → S3 serves `404.html`

### Trailing Slash

The project uses `trailingSlash: true` in `next.config.js`, which means:
- URLs end with `/` (e.g., `/article-slug/`)
- S3 will look for `article-slug/index.html`

### Client-Side Routing

Since the app uses client-side rendering:
- All routes are handled by `index.html`
- JavaScript handles routing on the client
- CloudFront error pages ensure 404s are handled correctly

## Deployment Commands

```bash
# 1. Build the project
npm run build

# 2. Upload to S3
aws s3 sync out/ s3://your-bucket-name/ --delete

# 3. Invalidate CloudFront cache (if using CloudFront)
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Troubleshooting

### No index.html in out/

- Ensure `output: 'export'` is set in `next.config.js`
- Ensure `unoptimized: true` for images
- Run `npm run build` again
- Check for build errors

### 404 Errors on Article Pages

- Verify CloudFront error page configuration
- Check that `trailingSlash: true` is set
- Ensure all files in `out/` are uploaded to S3

### Images Not Loading

- Verify `unoptimized: true` in `next.config.js`
- Check that `img/` directory is uploaded
- Verify CORS settings if loading from external sources

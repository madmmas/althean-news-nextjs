# Fix for Vercel Contentful Error

## Problem
Vercel build error: `TypeError: Expected parameter accessToken at createClient`

This happens because Vercel might be building from old code or cached dependencies.

## Solution

1. **Remove `output: 'export'` from next.config.js** (Already done)
   - Vercel works better without static export
   - Static export is only needed for S3 deployment

2. **Clear Vercel Build Cache**:
   - Go to Vercel Dashboard → Your Project → Settings → General
   - Click "Clear Build Cache"
   - Redeploy

3. **Ensure no Contentful dependencies**:
   ```bash
   npm uninstall contentful @contentful/rich-text-react-renderer @contentful/rich-text-types
   ```

4. **Verify package.json**:
   - Make sure `contentful` is NOT in dependencies or devDependencies
   - Remove `package-lock.json` and reinstall if needed:
   ```bash
   rm package-lock.json
   npm install
   ```

5. **Push clean code to Git**:
   ```bash
   git add .
   git commit -m "Remove Contentful, configure for Vercel"
   git push origin main
   ```

6. **Redeploy on Vercel**:
   - Vercel will automatically redeploy on push
   - Or manually trigger a new deployment

## Current Configuration

- ✅ `output: 'export'` removed (for Vercel)
- ✅ `unoptimized: false` (Vercel can optimize images)
- ✅ All code uses Strapi, not Contentful
- ✅ Client-side rendering only

## If Error Persists

1. Check Vercel build logs for exact file causing error
2. Verify all files are committed and pushed to Git
3. Clear Vercel build cache and redeploy
4. Check if there are any old branches being deployed

# Deployment Guide - Vercel

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in (you can use GitHub account)

3. **Import Project**
   - Click "Add New Project"
   - Select your repository
   - Vercel will auto-detect Next.js

4. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add: `NEXT_PUBLIC_STRAPI_API_URL`
   - Value: `https://brilliant-dream-c3f2fe8788.strapiapp.com/api`
   - Apply to: Production, Preview, and Development

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_STRAPI_API_URL
   # Enter: https://brilliant-dream-c3f2fe8788.strapiapp.com/api
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Environment Variables

Make sure to set these in Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_STRAPI_API_URL` = `https://brilliant-dream-c3f2fe8788.strapiapp.com/api`

## Vercel Free Tier Limits

- ✅ Unlimited deployments
- ✅ 100GB bandwidth per month
- ✅ Automatic HTTPS
- ✅ Custom domains (free)
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+ (Vercel auto-detects)

### Images Not Loading
- Check that `NEXT_PUBLIC_STRAPI_API_URL` is set correctly
- Verify Strapi API is accessible publicly

### 404 Errors
- Check that `trailingSlash: true` is set in `next.config.js`
- Verify all routes are properly configured

## Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

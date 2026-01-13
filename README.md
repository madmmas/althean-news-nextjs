# Althean News - বাংলা নিউজ

A modern Bangla news blog site built with Next.js, Tailwind CSS, Shadcn UI, and Strapi CMS.

## Features

- 🚀 **Next.js 14** ready for Vercel deployment
- 🎨 **Tailwind CSS** for styling
- 🧩 **Shadcn UI** components
- 📱 **Client-side rendering** for dynamic content
- 🌐 **Bangla language support** with Noto Sans Bengali font
- 📰 **Strapi CMS** integration
- ☁️ **Vercel** ready for deployment (also supports AWS S3 + CloudFront)

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **CMS**: Strapi
- **Deployment**: Vercel (recommended) or AWS S3 + CloudFront

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd althean-news-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_STRAPI_API_URL=https://brilliant-dream-c3f2fe8788.strapiapp.com/api
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications. Follow these steps:

1. **Install Vercel CLI** (optional, you can also use the web interface):
```bash
npm i -g vercel
```

2. **Deploy using Vercel CLI**:
```bash
vercel
```

Or deploy using the **Vercel Dashboard**:
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Vercel will auto-detect Next.js
5. Add environment variable: `NEXT_PUBLIC_STRAPI_API_URL` = `https://brilliant-dream-c3f2fe8788.strapiapp.com/api`
6. Click "Deploy"

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_STRAPI_API_URL` = `https://brilliant-dream-c3f2fe8788.strapiapp.com/api`

### Static Export (for AWS S3 + CloudFront)

If you need static export for S3, uncomment `output: 'export'` in `next.config.js`:

```bash
npm run build
```

This will create an `out` directory with all static files ready for deployment to S3.

### Deploy to AWS S3 + CloudFront

1. Build the project:
```bash
npm run build
```

2. Upload the `out` directory contents to your S3 bucket:
```bash
aws s3 sync out/ s3://your-bucket-name/ --delete
```

3. Configure CloudFront to serve from your S3 bucket.

## Project Structure

```
althean-news-nextjs/
├── components/          # React components
│   ├── BlogCard.js     # Blog card component
│   ├── Footer.js       # Footer component
│   ├── Layout.js       # Layout wrapper
│   ├── Navbar.js       # Navigation bar
│   └── Skeleton.js     # Loading skeleton
├── lib/                # Utility functions
│   ├── strapi.js      # Strapi API client
│   └── utils.js        # Utility functions
├── pages/              # Next.js pages
│   ├── _app.js        # App wrapper
│   ├── index.js       # Home page
│   ├── [slug].js      # Dynamic article page
│   └── 404.js         # 404 error page
├── public/             # Static assets
├── styles/             # CSS files
│   ├── globals.css    # Tailwind CSS
│   └── style.css      # Custom styles
└── next.config.js      # Next.js configuration
```

## Strapi CMS Setup

The project is configured to work with Strapi CMS. Make sure your Strapi instance has:

- An `articles` content type with the following fields:
  - `title` (Text)
  - `slug` (UID)
  - `description` (Text)
  - `content` (Rich text or Text)
  - `thumbnail` (Media)
  - `publishedAt` (DateTime)

- API permissions set to allow public access to articles

## Environment Variables

- `NEXT_PUBLIC_STRAPI_API_URL`: Your Strapi API URL (default: https://brilliant-dream-c3f2fe8788.strapiapp.com/api)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email info@altheannews.com or open an issue in the repository.

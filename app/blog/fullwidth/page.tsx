import Breadcrumbs from '../../components/Breadcrumbs';
import BlogPageContentFullwidth from '../components/BlogPageContentFullwidth';

// Note: BlogPageContentFullwidth is a client component that fetches on the client side
// This works for both static export (S3) and dynamic rendering (Vercel)
export default function BlogFullwidthPage() {
  return (
    <>
      <Breadcrumbs title="Blog Fullwidth" />
      <BlogPageContentFullwidth />
    </>
  );
}

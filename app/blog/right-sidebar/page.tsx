import Breadcrumbs from '../../components/Breadcrumbs';
import BlogPageContentRight from '../components/BlogPageContentRight';

// Note: BlogPageContentRight is a client component that fetches on the client side
// This works for both static export (S3) and dynamic rendering (Vercel)
export default function BlogRightSidebarPage() {
  return (
    <>
      <Breadcrumbs title="Blog Right Sidebar" />
      <BlogPageContentRight />
    </>
  );
}

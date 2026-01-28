import Breadcrumbs from '../../components/Breadcrumbs';
import BlogPageContentLeft from '../components/BlogPageContentLeft';

// Note: BlogPageContentLeft is a client component that fetches on the client side
// This works for both static export (S3) and dynamic rendering (Vercel)
export default function BlogLeftSidebarPage() {
  return (
    <>
      <Breadcrumbs title="Blog Left Sidebar" />
      <BlogPageContentLeft />
    </>
  );
}

import Breadcrumbs from "../components/Breadcrumbs";
import BlogPageContent from "./components/BlogPageContent";

// Note: BlogPageContent is a client component that fetches on the client side
// This works for both static export (S3) and dynamic rendering (Vercel)
export default function BlogPage() {
  return (
    <>
      <Breadcrumbs title="Blog" />
      <BlogPageContent />
    </>
  );
}

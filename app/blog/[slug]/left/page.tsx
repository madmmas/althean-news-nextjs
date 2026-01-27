import Breadcrumbs from '../../../components/Breadcrumbs';
import BlogDetailContent from '../../components/BlogDetailContent';
import BlogSidebar from '../../components/BlogSidebar';

export default function BlogDetailLeftPage() {
  return (
    <>
      <Breadcrumbs title="Blog Single Left Sidebar" />
      <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 order-2">
              <BlogDetailContent />
            </div>
            <div className="col-lg-4 order-1">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


import Breadcrumbs from '../../../components/Breadcrumbs';
import BlogDetailContent from '../../components/BlogDetailContent';

export default function BlogDetailFullPage() {
  return (
    <>
      <Breadcrumbs title="Blog Single Fullwidth" />
      <div className="back__blog__area back-blog-page back-blog-page-single pt-70 pb-60">
        <div className="container back-max1100">
          <div className="row">
            <div className="col-lg-12">
              <BlogDetailContent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


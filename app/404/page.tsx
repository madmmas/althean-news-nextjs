import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

export default function NotFound() {
  return (
    <div className="back-404-page pt-70 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="back-404-content">
              <div className="back-404-image">
                <Image src={withBasePath("/assets/images/404.jpg")} 
                  alt="404"
                  width={800}
                  height={600}
                />
              </div>
              <h2 className="back-404-title">Oops! Page Not Found</h2>
              <p className="back-404-text">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
              <div className="back-404-btn">
                <Link href="/" className="back-btn">Go to Homepage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


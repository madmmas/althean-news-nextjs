import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

export default function Footer() {
  return (
    <footer id="back-footer" className="back-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 md-mb-30">
              <div className="footer-widget footer-widget-1">
                <div className="footer-logo white">
                  <Link href="/" className="logo-text">
                    <Image 
                      src={withBasePath("/assets/images/light-logo.png")} 
                      alt="logo"
                      width={150}
                      height={50}
                      className="logo-image-auto"
                    />
                  </Link>
                </div>
                <h5 className="footer-subtitle">
                  We have lots of courses and programs from the main market experts.
                </h5>
                <h6 className="back-follow-us">Follow us</h6>
                <ul className="social-links">
                  <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                  <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                  <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 md-mb-30">
              <div className="footer-widget footer-widget-2">
                <h3 className="footer-title">Category</h3>
                <div className="footer-menu">
                  <ul>
                    <li><Link href="/categories/technology">Technology</Link></li>
                    <li><Link href="/categories/fashion">Fashion</Link></li>
                    <li><Link href="/categories/lifestyle">Life Style</Link></li>
                    <li><Link href="/categories/travel">Travel</Link></li>
                    <li><Link href="/categories/design">Design</Link></li>
                    <li><Link href="/categories/politics">Politics</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 md-mb-30">
              <div className="footer-widget footer-widget-2">
                <h3 className="footer-title">Quick links</h3>
                <div className="footer-menu">
                  <ul>
                    <li><Link href="/library">Browse Library</Link></li>
                    <li><Link href="/tv-news">TV News</Link></li>
                    <li><Link href="/music-news">Music News</Link></li>
                    <li><Link href="/blog">News & Blog</Link></li>
                    <li><Link href="/video">Video</Link></li>
                    <li><Link href="/advertise">Advertise</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget footer-widget-3">
                <h3 className="footer-title">Newsletter</h3>
                <h5 className="footer-subtitle">
                  Subscribe to our mailing list to <br />get the new updates!
                </h5>
                <form className="back-newsletter">
                  <input type="email" placeholder="Enter Your Email" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div className="container">
          <div className="back-copy-left">
            @ 2025 All Copyright Reserved. Developed by <a href="#">BackTheme</a>
          </div>
          <div className="back-copy-right">
            <ul>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}


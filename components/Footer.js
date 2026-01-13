import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mar-top-lg">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-3 col-sm-12">
            <Link href="/" className="logo-link">
              <img
                src="/img/logo.svg"
                alt="Althean News Logo"
                className="logo-image footer-logo"
              />
            </Link>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="footer-contacts">
              <div className="wrap">
                <div className="address">
                  <p className="bangla">
                    ঢাকা
                    <br />
                    বাংলাদেশ
                  </p>
                </div>
                <a className="email" href="mailto:info@altheannews.com">
                  info@altheannews.com
                </a>
                <br />
                <a className="phone" href="tel:+8801234567890">
                  +880 1234-567890
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="social-links">
              <ul>
                <li>
                  <a target="_blank" rel="noreferrer" href="#">
                    ফেসবুক
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="#">
                    টুইটার
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="#">
                    ইউটিউব
                  </a>
                </li>
                <li>
                  <a target="_blank" rel="noreferrer" href="#">
                    ইনস্টাগ্রাম
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

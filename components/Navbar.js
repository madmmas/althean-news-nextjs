import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link href="/" className="logo-link">
              <img
                src="/img/logo.svg"
                alt="Althean News Logo"
                className="logo-image"
              />
            </Link>
            <nav>
              <ul>
                <li>
                  <Link href="/">হোম</Link>
                </li>
                <li>
                  <Link href="/">রাজনীতি</Link>
                </li>
                <li>
                  <Link href="/">খেলাধুলা</Link>
                </li>
                <li>
                  <Link href="/">বিনোদন</Link>
                </li>
                <li>
                  <Link href="/">বিজ্ঞান</Link>
                </li>
                <li>
                  <Link href="/">যোগাযোগ</Link>
                </li>
              </ul>
            </nav>
            <span className="nav-toggle">মেনু</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

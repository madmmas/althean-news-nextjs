import Head from "next/head";
import Script from "next/script";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        {/* Scripts moved to Script component below */}
      </Head>

      <Script src="/js/plugins.min.js" strategy="lazyOnload" />
      <Script src="/js/functions.js" strategy="lazyOnload" />

      <div className="wrap">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;

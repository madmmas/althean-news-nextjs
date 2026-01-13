import Layout from "../components/Layout";
import "../styles/bootstrap-grid.min.css";
import "../styles/prism.css";
import "../styles/style.css";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Althean News | বাংলা নিউজ</title>
        <meta
          content="আলথিয়ান নিউজ - আপনার বিশ্বস্ত বাংলা নিউজ সোর্স"
          property="og:description"
        ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import Scripts from "./components/Scripts";
import Providers from "./providers";
import { getBasePath } from "@/lib/basePath";

const basePath = getBasePath();

export const metadata: Metadata = {
  title: "Althean - Blog News & Magazine",
  description: "Althean - Modern Blog News & Magazine HTML Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href={`${basePath}/assets/images/fav.png`} />
        <link rel="shortcut icon" type="image/x-icon" href={`${basePath}/assets/images/fav.png`} />
        {/* Google Fonts - Noto Sans Bengali for all content */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Template CSS Files */}
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/style.css`} />
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/all.min.css`} />
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/animate.css`} />
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/owl.carousel.css`} />
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/magnific-popup.css`} />
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/rounded.css`} />
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/back-menus.css`} />
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/back-spacing.css`} />
        <link rel="stylesheet" type="text/css" href={`${basePath}/assets/css/responsive.css`} />
      </head>
      <body>
        <Providers>
          <Preloader />
          <Header />
          <main className="back-wrapper">
          {children}
          </main>
          <Footer />
          <ScrollToTop />
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}

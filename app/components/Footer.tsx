'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';
import { useLocale } from '@/lib/contexts/LocaleContext';

export default function Footer() {
  const { t } = useLocale();
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
                  {t.footer.description}
                </h5>
                <h6 className="back-follow-us">{t.footer.followUs}</h6>
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
                <h3 className="footer-title">{t.footer.category}</h3>
                <div className="footer-menu">
                  <ul>
                    <li><Link href="/categories/technology">{t.menu.technology}</Link></li>
                    <li><Link href="/categories/fashion">{t.footer.fashion}</Link></li>
                    <li><Link href="/categories/lifestyle">{t.footer.lifeStyle}</Link></li>
                    <li><Link href="/categories/travel">{t.menu.travel}</Link></li>
                    <li><Link href="/categories/design">{t.footer.design}</Link></li>
                    <li><Link href="/categories/politics">{t.menu.politics}</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 md-mb-30">
              <div className="footer-widget footer-widget-2">
                <h3 className="footer-title">{t.footer.quickLinks}</h3>
                <div className="footer-menu">
                  <ul>
                    <li><Link href="/library">{t.footer.browseLibrary}</Link></li>
                    <li><Link href="/tv-news">{t.footer.tvNews}</Link></li>
                    <li><Link href="/music-news">{t.footer.musicNews}</Link></li>
                    <li><Link href="/blog">{t.footer.newsBlog}</Link></li>
                    <li><Link href="/video">{t.footer.video}</Link></li>
                    <li><Link href="/advertise">{t.footer.advertise}</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget footer-widget-3">
                <h3 className="footer-title">{t.footer.newsletter}</h3>
                <h5 className="footer-subtitle" dangerouslySetInnerHTML={{
                  __html: t.footer.newsletterDescription
                }} />
                <form className="back-newsletter">
                  <input type="email" placeholder={t.footer.emailPlaceholder} />
                  <button type="submit">{t.footer.subscribe}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div className="container">
          <div className="back-copy-left">
            {t.footer.copyright}
          </div>
          <div className="back-copy-right">
            <ul>
              <li><Link href="/privacy-policy">{t.footer.privacyPolicy}</Link></li>
              <li><Link href="/terms-conditions">{t.footer.termsConditions}</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}


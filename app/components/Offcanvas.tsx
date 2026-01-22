'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { withBasePath } from '@/lib/basePath';

interface OffcanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Offcanvas({ isOpen, onClose }: OffcanvasProps) {
  const [activeMenus, setActiveMenus] = useState<string[]>([]);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    // Toggle nav-expanded class on body for CSS animation
    if (isOpen) {
      document.body.classList.add('nav-expanded');
    } else {
      document.body.classList.remove('nav-expanded');
      // Reset menu state when closing
      setActiveMenus([]);
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('nav-expanded');
    };
  }, [isOpen]);

  const toggleMenu = (menuId: string) => {
    setActiveMenus(prev => {
      if (prev.includes(menuId)) {
        // Close this menu and all its children
        return prev.filter(id => !id.startsWith(menuId));
      } else {
        // Open this menu
        return [...prev, menuId];
      }
    });
  };

  const isMenuActive = (menuId: string) => activeMenus.includes(menuId);

  const handleLinkClick = () => {
    // Close the menu when any link is clicked
    onClose();
  };

  return (
    <>
      <div className="back-offcanvas" onClick={(e) => { e.preventDefault(); onClose(); }}></div>
      <div className="back-canvas">
        <div className="close-btn">
          <a id="nav-close" className="nav-close" onClick={(e) => { e.preventDefault(); onClose(); }}>
            <div className="back-close">
              <span className="line1"></span>
              <span className="line2"></span>
            </div>
          </a>
        </div>
        <div className="offback-logo">
          <Link href="/" className="logo-text" onClick={handleLinkClick}>
            <Image 
              src={withBasePath("/assets/images/logo.png")} 
              alt="logo"
              width={150}
              height={50}
              className="offcanvas-logo-img"
            />
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className="offcanvas-menu">
          <ul className="back-menus mobile-menu">
            {/* Home Menu */}
            <li className={isMenuActive('home') ? 'has-sub menu-active' : 'has-sub'}>
              <span className="arrow" onClick={() => toggleMenu('home')}></span>
              <a href="#" onClick={(e) => e.preventDefault()}>Home</a>
              <ul className={`sub-menu ${isMenuActive('home') ? 'slide' : ''}`} style={{ display: isMenuActive('home') ? 'block' : 'none' }}>
                <li><Link href={withBasePath("/")} onClick={handleLinkClick}>Home One</Link></li>
                <li><Link href={withBasePath("/index-two")} onClick={handleLinkClick}>Home Two</Link></li>
                <li><Link href={withBasePath("/index-three")} onClick={handleLinkClick}>Home Three</Link></li>
                <li><Link href={withBasePath("/index-four")} onClick={handleLinkClick}>Home Four</Link></li>
              </ul>
            </li>

            {/* Pages Menu */}
            <li className={isMenuActive('pages') ? 'has-sub menu-active' : 'has-sub'}>
              <span className="arrow" onClick={() => toggleMenu('pages')}></span>
              <a href="#" onClick={(e) => e.preventDefault()}>Pages</a>
              <ul className={`sub-menu ${isMenuActive('pages') ? 'slide' : ''}`} style={{ display: isMenuActive('pages') ? 'block' : 'none' }}>
                <li><Link href={withBasePath("/about")} onClick={handleLinkClick}>About</Link></li>
                <li><Link href={withBasePath("/team")} onClick={handleLinkClick}>Team</Link></li>
                <li><Link href={withBasePath("/contact")} onClick={handleLinkClick}>Contact</Link></li>
                <li><Link href={withBasePath("/author")} onClick={handleLinkClick}>Author</Link></li>
                <li><Link href={withBasePath("/login")} onClick={handleLinkClick}>Login</Link></li>
                <li><Link href={withBasePath("/registration")} onClick={handleLinkClick}>Registration</Link></li>
                <li><Link href={withBasePath("/404")} onClick={handleLinkClick}>Error 404</Link></li>
              </ul>
            </li>

            {/* Categories Menu */}
            <li className={isMenuActive('categories') ? 'has-sub menu-active' : 'has-sub'}>
              <span className="arrow" onClick={() => toggleMenu('categories')}></span>
              <a href="#" onClick={(e) => e.preventDefault()}>Categories</a>
              <ul className={`sub-menu ${isMenuActive('categories') ? 'slide' : ''}`} style={{ display: isMenuActive('categories') ? 'block' : 'none' }}>
                <li><Link href={withBasePath("/categories/politics")} onClick={handleLinkClick}>Politics</Link></li>
                <li><Link href={withBasePath("/categories/technology")} onClick={handleLinkClick}>Technology</Link></li>
                <li><Link href={withBasePath("/categories/health")} onClick={handleLinkClick}>Health</Link></li>
                <li><Link href={withBasePath("/categories/travel")} onClick={handleLinkClick}>Travel</Link></li>
                <li><Link href={withBasePath("/categories/lifestyle")} onClick={handleLinkClick}>Lifestyle</Link></li>
                <li><Link href={withBasePath("/categories/sports")} onClick={handleLinkClick}>Sports</Link></li>
              </ul>
            </li>

            {/* Blog Menu */}
            <li className={isMenuActive('blog') ? 'has-sub menu-active' : 'has-sub'}>
              <span className="arrow" onClick={() => toggleMenu('blog')}></span>
              <a href="#" onClick={(e) => e.preventDefault()}>Blog</a>
              <ul className={`sub-menu ${isMenuActive('blog') ? 'slide' : ''}`} style={{ display: isMenuActive('blog') ? 'block' : 'none' }}>
                <li className={isMenuActive('blog-listing') ? 'has-sub menu-active' : 'has-sub'}>
                  <span className="arrow" onClick={() => toggleMenu('blog-listing')}></span>
                  <a href="#" onClick={(e) => e.preventDefault()}>Blog</a>
                  <ul className={`sub-menu ${isMenuActive('blog-listing') ? 'slide' : ''}`} style={{ display: isMenuActive('blog-listing') ? 'block' : 'none' }}>
                    <li><Link href={withBasePath("/blog")} onClick={handleLinkClick}>Classic</Link></li>
                    <li><Link href={withBasePath("/blog-left-sidebar")} onClick={handleLinkClick}>Left Sidebar</Link></li>
                    <li><Link href={withBasePath("/blog-right-sidebar")} onClick={handleLinkClick}>Right Sidebar</Link></li>
                    <li><Link href={withBasePath("/blog-fullwidth")} onClick={handleLinkClick}>Full Width</Link></li>
                  </ul>
                </li>
                <li className={isMenuActive('blog-single') ? 'has-sub menu-active' : 'has-sub'}>
                  <span className="arrow" onClick={() => toggleMenu('blog-single')}></span>
                  <a href="#" onClick={(e) => e.preventDefault()}>Blog Single</a>
                  <ul className={`sub-menu ${isMenuActive('blog-single') ? 'slide' : ''}`} style={{ display: isMenuActive('blog-single') ? 'block' : 'none' }}>
                    <li><Link href={withBasePath("/blog/those-other-collage-expenses")} onClick={handleLinkClick}>Classic</Link></li>
                    <li><Link href={withBasePath("/blog-details-left")} onClick={handleLinkClick}>Left Sidebar</Link></li>
                    <li><Link href={withBasePath("/blog-details-right")} onClick={handleLinkClick}>Right Sidebar</Link></li>
                    <li><Link href={withBasePath("/blog-details-full")} onClick={handleLinkClick}>Full Width</Link></li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* Posts Menu */}
            <li className={isMenuActive('posts') ? 'has-sub menu-active' : 'has-sub'}>
              <span className="arrow" onClick={() => toggleMenu('posts')}></span>
              <a href="#" onClick={(e) => e.preventDefault()}>Posts</a>
              <ul className={`sub-menu ${isMenuActive('posts') ? 'slide' : ''}`} style={{ display: isMenuActive('posts') ? 'block' : 'none' }}>
                <li><Link href={withBasePath("/posts/standard")} onClick={handleLinkClick}>Standard Post</Link></li>
                <li><Link href={withBasePath("/posts/gallery")} onClick={handleLinkClick}>Gallery Post</Link></li>
                <li><Link href={withBasePath("/posts/video")} onClick={handleLinkClick}>Video Post</Link></li>
                <li><Link href={withBasePath("/posts/audio")} onClick={handleLinkClick}>Audio Post</Link></li>
                <li><Link href={withBasePath("/posts/quote")} onClick={handleLinkClick}>Quote Post</Link></li>
                <li><Link href={withBasePath("/posts/aside")} onClick={handleLinkClick}>Aside Post</Link></li>
                <li><Link href={withBasePath("/posts/link")} onClick={handleLinkClick}>Link Post</Link></li>
                <li className={isMenuActive('posts-sidebar') ? 'has-sub menu-active' : 'has-sub'}>
                  <span className="arrow" onClick={() => toggleMenu('posts-sidebar')}></span>
                  <a href="#" onClick={(e) => e.preventDefault()}>Post Sidebar</a>
                  <ul className={`sub-menu ${isMenuActive('posts-sidebar') ? 'slide' : ''}`} style={{ display: isMenuActive('posts-sidebar') ? 'block' : 'none' }}>
                    <li><Link href={withBasePath("/blog-details-left")} onClick={handleLinkClick}>Left Sidebar</Link></li>
                    <li><Link href={withBasePath("/blog-details-right")} onClick={handleLinkClick}>Right Sidebar</Link></li>
                    <li><Link href={withBasePath("/blog-details-full")} onClick={handleLinkClick}>No Sidebar</Link></li>
                  </ul>
                </li>
                <li><Link href={withBasePath("/multiple-authors")} onClick={handleLinkClick}>Multiple Authors</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="offcanvas-text">
          <p>
            Education every new parents knows the feeling nothing more than for everyone to get at some sleep.
            But at least you've got Google. start building your first prototype today!
          </p>
        </div>

        <div className="back-title back-small-title">
          <h2>Get in Touch</h2>
        </div>
        <div className="canvas-contact">
          <div className="address-area">
            <div className="address-list">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="info-content">
                <h4 className="title">Address</h4>
                <em>06 Mymen KR. New York City</em>
              </div>
            </div>
            <div className="address-list">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="info-content">
                <h4 className="title">Email</h4>
                <em><a href="mailto:backtheme@gmail.com">backtheme@gmail.com</a></em>
              </div>
            </div>
            <div className="address-list">
              <div className="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone-call">
                  <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="info-content">
                <h4 className="title">Phone</h4>
                <em>+02596 5874 59857</em>
              </div>
            </div>
          </div>
          <ul className="social-links">
            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-twitter"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
            <li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
          </ul>
        </div>
      </div>
    </>
  );
}

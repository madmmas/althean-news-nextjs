'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Offcanvas from './Offcanvas';
import { getBasePath, withBasePath } from '@/lib/basePath';
import { useStickyHeader } from '@/lib/hooks/useStickyHeader';
import { useResponsiveMenu } from '@/lib/hooks/useResponsiveMenu';
import { useLocale } from '@/lib/contexts/LocaleContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For main menu toggle (#menu-btn)
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); // For side drawer (nav-expander)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: session, status } = { data: null, status: 'unauthenticated' };
  const menuRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();

  const pathname = usePathname();
  const basePath = getBasePath();
  const isAltHeader = pathname === '/index-two' || pathname === '/index-three' || pathname === '/index-four';
  const isSticky = useStickyHeader();
  
  // Use responsive menu hook for dropdown functionality
  const {
    isMenuOpen: isResponsiveMenuOpen,
    isMobile: isResponsiveMobile,
    toggleMenu: toggleResponsiveMenu,
    toggleSubmenu,
    handleMouseEnter,
    handleMouseLeave,
  } = useResponsiveMenu(menuRef);
  
  const isLoggedIn = status === 'authenticated' && session?.user;

  // Helper function to check if a path is active
  const isActivePath = (href: string): boolean => {
    if (!href || href === '#') return false;
    // Remove basePath from pathname for comparison
    const cleanPathname = basePath ? pathname.replace(basePath, '') : pathname;
    const cleanHref = basePath ? href.replace(basePath, '') : href;
    
    // Normalize paths (remove trailing slashes except for root)
    const normalizedPathname = cleanPathname === '/' ? '/' : cleanPathname.replace(/\/$/, '');
    const normalizedHref = cleanHref === '/' ? '/' : cleanHref.replace(/\/$/, '');
    
    // Exact match
    if (normalizedPathname === normalizedHref) return true;
    
    // Check if pathname starts with href (for nested routes)
    if (normalizedHref !== '/' && normalizedPathname.startsWith(normalizedHref + '/')) return true;
    
    return false;
  };

  // Helper function to check if any child link is active
  const hasActiveChild = (links: string[]): boolean => {
    return links.some(link => {
      // Also check for paths that start with the link (for dynamic routes)
      if (isActivePath(link)) return true;
      const cleanPathname = basePath ? pathname.replace(basePath, '') : pathname;
      const cleanLink = basePath ? link.replace(basePath, '') : link;
      return cleanLink !== '/' && cleanPathname.startsWith(cleanLink);
    });
  };

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('back-dark');
    }

    // Check if mobile view
    const checkMobile = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      // On mobile, menu should be hidden by default
      if (mobile) {
        setIsMenuOpen(false);
      } else {
        setIsMenuOpen(true); // Always visible on desktop
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Update active menu states when pathname changes
  useEffect(() => {
    if (!menuRef.current) return;

    const cleanupFunctions: (() => void)[] = [];

    // Use setTimeout to ensure this runs after the menu is rendered
    const timeoutId = setTimeout(() => {
      const menu = menuRef.current;
      if (!menu) return;

      const allMenuItems = menu.querySelectorAll('li');
      const allLinks = menu.querySelectorAll('a');

      // Remove only active classes, preserve has-sub and arrow elements
      allMenuItems.forEach(item => {
        // Only remove menu-active class, keep has-sub class
        item.classList.remove('menu-active');
        
        // Ensure has-sub class is always present for items with submenus
        const hasSubMenu = item.querySelector('ul.sub-menu');
        if (hasSubMenu) {
          item.classList.add('has-sub');
        }
      });
      allLinks.forEach(link => {
        link.classList.remove('back-current-page');
      });

      // Add active classes based on current pathname
      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && isActivePath(href)) {
          // Add active class to the link
          link.classList.add('back-current-page');
          
          // Add menu-active to parent li (but don't remove has-sub)
          let parentLi = link.closest('li');
          while (parentLi) {
            // Add menu-active but preserve has-sub class
            parentLi.classList.add('menu-active');
            
            // Ensure has-sub class is preserved for items with submenus
            const hasSubMenu = parentLi.querySelector('ul.sub-menu');
            if (hasSubMenu && !parentLi.classList.contains('has-sub')) {
              parentLi.classList.add('has-sub');
            }
            
            // If this is a submenu item, also activate parent menu item
            const parentMenu = parentLi.closest('ul.sub-menu');
            if (parentMenu) {
              const parentMenuItem = parentMenu.closest('li');
              if (parentMenuItem) {
                parentMenuItem.classList.add('menu-active');
                // Preserve has-sub on parent too
                const parentHasSubMenu = parentMenuItem.querySelector('ul.sub-menu');
                if (parentHasSubMenu && !parentMenuItem.classList.contains('has-sub')) {
                  parentMenuItem.classList.add('has-sub');
                }
              }
            }
            
            // Move up to next parent li if exists
            const parentUl = parentLi.parentElement?.closest('ul');
            if (parentUl) {
              parentLi = parentUl.closest('li');
            } else {
              break;
            }
          }
        }
      });

      // Ensure all dropdowns are hidden on page load (CSS already handles this)
      // Dropdowns will open on hover (desktop) or click (mobile)
      // Just remove slide class so CSS can control visibility without interference
      // Don't set any inline styles - let CSS handle display
      if (!isMobile) {
        const allSubMenus = menu.querySelectorAll('ul.sub-menu');
        allSubMenus.forEach(subMenu => {
          const subMenuElement = subMenu as HTMLElement;
          // Remove slide class - let CSS handle display
          subMenuElement.classList.remove('slide');
        });
      }

      // Ensure arrow elements are preserved for items with submenus
      const hasSubItems = menu.querySelectorAll('li.has-sub');
      hasSubItems.forEach(item => {
        // Check if arrow element exists, if not, it will be added by menu initialization
        const arrow = item.querySelector('.arrow');
        if (!arrow && item.querySelector('ul.sub-menu')) {
          // Arrow will be added by back-menus.js script
          // We just ensure has-sub class is present
        }
      });
    }, 150); // Slightly longer delay to ensure menu is fully initialized

    return () => {
      clearTimeout(timeoutId);
      // Cleanup all event listeners
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [pathname, basePath, isMobile]);

  useEffect(() => {
    // Close user menu when clicking outside (handled by overlay div)
    // This effect is kept for any additional cleanup if needed
  }, [isUserMenuOpen]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('back-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('back-dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = locale === 'en' ? 'bn' : 'en';
    setLocale(newLanguage);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    if (!query) {
      return;
    }

    // Navigate to blog page with search query
    const searchUrl = withBasePath(`/blog?q=${encodeURIComponent(query)}&page=1`);
    router.push(searchUrl);
    
    // Close search form after submission
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <header id="back-header" className={`back-header ${isSticky ? 'back-sticky' : ''}`}>
        {/* Topbar Section */}

        {/* Menu Section */}
        <div className={`menu-part${isAltHeader ? ' header-style2' : ''}`}>
          <div className="container">
            <div className="back-main-menu">
              <nav>
                <div className="menu-toggle">
                  <div className="logo">
                    <Link href="/" className="logo-text">
                      <Image 
                        className="back-logo-dark logo-image-auto" 
                        src={withBasePath("/assets/images/logo.png")} 
                        alt="logo"
                        width={150}
                        height={50}
                      />
                      <Image 
                        className="back-logo-light logo-image-auto" 
                        src={withBasePath("/assets/images/light-logo.png")} 
                        alt="logo"
                        width={150}
                        height={50}
                      />
                    </Link>
                  </div>

                  {/* Mobile Search - Always rendered, visibility controlled by CSS */}
                  {
                    isMobile && ( <div className="searchbar-part back-search-mobile">
                      <ul>
  
                        <li className="back-language-toggle" onClick={toggleLanguage} title={`Switch to ${locale === 'en' ? 'Bengali' : 'English'}`}>
                          <div style={{width: '24px', height: '24px', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '600', cursor: 'pointer', userSelect: 'none' }}>
                            {locale === 'en' ? 'বাং' : 'En'}
                          </div>
                        </li>

                        <li className="back-dark-light" onClick={toggleDarkMode}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun back-go-light1">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                          </svg>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon back-go-dark1">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                          </svg>
                        </li>
                        <li className="back_search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </li>
                        <li className="back-sign">
                          {isLoggedIn ? (
                            <div className="user-menu-wrapper">
                              <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="user-avatar-button"
                              >
                                {session?.user?.image ? (
                                  <Image src={session.user.image}
                                    alt={session.user.name || 'User'}
                                    className="user-avatar-image"
                  width={800}
                  height={600}
                                  />
                                ) : (
                                  <div className="user-avatar-placeholder">
                                    {(session?.user?.name || session?.user?.email || 'U').charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </button>
                              {isUserMenuOpen && (
                                <>
                                  <div
                                    className="user-menu-overlay"
                                    onClick={() => setIsUserMenuOpen(false)}
                                  />
                                  <div className="user-menu-popup">
                                    <div className="user-menu-header">
                                      {session?.user?.image && (
                                        <div className="user-menu-avatar-container">
                                          <Image src={session.user.image}
                                            alt={session.user.name || 'User'}
                                            className="user-menu-avatar-large"
                  width={800}
                  height={600}
                                          />
                                        </div>
                                      )}
                                      <div className="user-menu-info">
                                        <div className="user-menu-name">
                                          {session?.user?.name || 'User'}
                                        </div>
                                        <div className="user-menu-email">
                                          {session?.user?.email}
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      //onClick={() => signOut({ callbackUrl: withBasePath('/') })}
                                      onClick={() => {}}
                                      className="user-menu-signout"
                                    >
                                      {t.header.signOut}
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          ) : (
                            <Link href="/login">{t.header.signIn}</Link>
                          )}
                        </li>
                        <li id="nav-expanders" className="nav-expander bar" onClick={(e) => { e.preventDefault(); setIsOffcanvasOpen(true); }}>
                          <span className="back-hum1"></span>
                          <span className="back-hum2"></span>
                          <span className="back-hum3"></span>
                        </li>
                      </ul>
                      <form 
                        className={`search-form ${isSearchOpen ? 'active search-form-visible' : 'search-form-hidden'}`}
                        onSubmit={handleSearchSubmit}
                      >
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder={t.header.searchPlaceholder}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="form-button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </button>
                      </form>
                    </div>)
                  }
                 

                  <button type="button" id="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                {/* Menu Structure */}
                <div className="back-inner-menus">
                  <ul 
                    id="backmenu" 
                    ref={menuRef}
                    className={`back-menus back-sub-shadow ${isMenuOpen ? '' : 'hide-menu'}`}
                  >
                    <li 
                      className={`has-sub ${hasActiveChild(['/', '/index-two', '/index-three', '/index-four']) ? 'menu-active' : ''}`}
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      <a href="#" className="hash" onClick={(e) => {
                        if (isResponsiveMobile) {
                          e.preventDefault();
                          toggleSubmenu(e.currentTarget.closest('li') as HTMLLIElement);
                        }
                      }}>{t.menu.home}</a>
                      <ul className="sub-menu">
                        <li><Link href="/" className={isActivePath('/') ? 'back-current-page' : ''}>{t.menu.homeOne}</Link></li>
                        <li><Link href="/index-two" className={isActivePath('/index-two') ? 'back-current-page' : ''}>{t.menu.homeTwo}</Link></li>
                        <li><Link href="/index-three" className={isActivePath('/index-three') ? 'back-current-page' : ''}>{t.menu.homeThree}</Link></li>
                        <li><Link href="/index-four" className={isActivePath('/index-four') ? 'back-current-page' : ''}>{t.menu.homeFour}</Link></li>
                      </ul>
                    </li>
                    <li 
                      className={`has-sub ${hasActiveChild(['/about', '/team', '/contact', '/author', '/login', '/registration', '/404']) ? 'menu-active' : ''}`}
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      <a href="#" className="hash" onClick={(e) => {
                        if (isResponsiveMobile) {
                          e.preventDefault();
                          toggleSubmenu(e.currentTarget.closest('li') as HTMLLIElement);
                        }
                      }}>{t.menu.pages}</a>
                      <ul className="sub-menu">
                        <li><Link href="/about" className={isActivePath('/about') ? 'back-current-page' : ''}>{t.menu.about}</Link></li>
                        <li><Link href="/team" className={isActivePath('/team') ? 'back-current-page' : ''}>{t.menu.team}</Link></li>
                        <li><Link href="/contact" className={isActivePath('/contact') ? 'back-current-page' : ''}>{t.menu.contact}</Link></li>
                        <li><Link href="/author" className={isActivePath('/author') ? 'back-current-page' : ''}>{t.menu.author}</Link></li>
                        <li><Link href="/login" className={isActivePath('/login') ? 'back-current-page' : ''}>{t.menu.login}</Link></li>
                        <li><Link href="/registration" className={isActivePath('/registration') ? 'back-current-page' : ''}>{t.menu.registration}</Link></li>
                        <li><Link href="/404" className={isActivePath('/404') ? 'back-current-page' : ''}>{t.menu.error404}</Link></li>
                      </ul>
                    </li>
                    <li 
                      className={`has-sub ${hasActiveChild(['/categories/politics', '/categories/technology', '/categories/health', '/categories/travel', '/categories/lifestyle', '/categories/sports']) ? 'menu-active' : ''}`}
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      <a href="#" className="hash" onClick={(e) => {
                        if (isResponsiveMobile) {
                          e.preventDefault();
                          toggleSubmenu(e.currentTarget.closest('li') as HTMLLIElement);
                        }
                      }}>{t.menu.categories}</a>
                      <ul className="sub-menu">
                        <li><Link href="/categories/politics" className={isActivePath('/categories/politics') ? 'back-current-page' : ''}>{t.menu.politics}</Link></li>
                        <li><Link href="/categories/technology" className={isActivePath('/categories/technology') ? 'back-current-page' : ''}>{t.menu.technology}</Link></li>
                        <li><Link href="/categories/health" className={isActivePath('/categories/health') ? 'back-current-page' : ''}>{t.menu.health}</Link></li>
                        <li><Link href="/categories/travel" className={isActivePath('/categories/travel') ? 'back-current-page' : ''}>{t.menu.travel}</Link></li>
                        <li><Link href="/categories/lifestyle" className={isActivePath('/categories/lifestyle') ? 'back-current-page' : ''}>{t.menu.lifestyle}</Link></li>
                        <li><Link href="/categories/sports" className={isActivePath('/categories/sports') ? 'back-current-page' : ''}>{t.menu.sports}</Link></li>
                      </ul>
                    </li>
                    <li 
                      className={`has-sub ${isActivePath('/blog') || pathname.startsWith('/blog/') ? 'menu-active' : ''}`}
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      <Link href="/blog" onClick={(e) => {
                        if (isResponsiveMobile) {
                          e.preventDefault();
                          toggleSubmenu(e.currentTarget.closest('li') as HTMLLIElement);
                        }
                      }}>{t.menu.blog}</Link>
                      <ul className="sub-menu">
                        <li 
                          className="has-sub"
                          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                        >
                          <a href="/blog" className="hash" onClick={(e) => {
                            if (isResponsiveMobile) {
                              e.preventDefault();
                              toggleSubmenu(e.currentTarget.closest('li') as HTMLLIElement);
                            }
                          }}>{t.menu.blog}</a>
                          <ul className="sub-menu">
                            <li><Link href="/blog" className={isActivePath('/blog') && !pathname.includes('/left-sidebar') && !pathname.includes('/right-sidebar') && !pathname.includes('/fullwidth') ? 'back-current-page' : ''}>{t.menu.blogClassic}</Link></li>
                            <li><Link href="/blog/left-sidebar" className={isActivePath('/blog/left-sidebar') ? 'back-current-page' : ''}>{t.menu.blogLeftSidebar}</Link></li>
                            <li><Link href="/blog/right-sidebar" className={isActivePath('/blog/right-sidebar') ? 'back-current-page' : ''}>{t.menu.blogRightSidebar}</Link></li>
                            <li><Link href="/blog/fullwidth" className={isActivePath('/blog/fullwidth') ? 'back-current-page' : ''}>{t.menu.blogFullWidth}</Link></li>
                          </ul>
                        </li>
                        <li 
                          className="has-sub"
                          onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                          onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                        >
                          <a href="#" className="hash" onClick={(e) => {
                            if (isResponsiveMobile) {
                              e.preventDefault();
                              toggleSubmenu(e.currentTarget.closest('li') as HTMLLIElement);
                            }
                          }}>{t.menu.blogSingle}</a>
                          <ul className="sub-menu">
                            <li><Link href="/blog/post-slug" className={pathname.match(/^\/blog\/[^/]+$/) ? 'back-current-page' : ''}>{t.menu.blogClassic}</Link></li>
                            <li><Link href="/blog/post-slug/left" className={pathname.match(/^\/blog\/[^/]+\/left$/) ? 'back-current-page' : ''}>{t.menu.blogLeftSidebar}</Link></li>
                            <li><Link href="/blog/post-slug/right" className={pathname.match(/^\/blog\/[^/]+\/right$/) ? 'back-current-page' : ''}>{t.menu.blogRightSidebar}</Link></li>
                            <li><Link href="/blog/post-slug/full" className={pathname.match(/^\/blog\/[^/]+\/full$/) ? 'back-current-page' : ''}>{t.menu.blogFullWidth}</Link></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li 
                      className={`has-sub ${hasActiveChild(['/posts/standard', '/posts/gallery', '/posts/video', '/posts/audio', '/posts/quote', '/posts/aside', '/posts/link']) ? 'menu-active' : ''}`}
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      <a href="#" className="hash" onClick={(e) => {
                        if (isResponsiveMobile) {
                          e.preventDefault();
                          toggleSubmenu(e.currentTarget.closest('li') as HTMLLIElement);
                        }
                      }}>{t.menu.posts}</a>
                      <ul className="sub-menu">
                        <li><Link href="/posts/standard" className={isActivePath('/posts/standard') ? 'back-current-page' : ''}>{t.menu.standardPost}</Link></li>
                        <li><Link href="/posts/gallery" className={isActivePath('/posts/gallery') ? 'back-current-page' : ''}>{t.menu.galleryPost}</Link></li>
                        <li><Link href="/posts/video" className={isActivePath('/posts/video') ? 'back-current-page' : ''}>{t.menu.videoPost}</Link></li>
                        <li><Link href="/posts/audio" className={isActivePath('/posts/audio') ? 'back-current-page' : ''}>{t.menu.audioPost}</Link></li>
                        <li><Link href="/posts/quote" className={isActivePath('/posts/quote') ? 'back-current-page' : ''}>{t.menu.quotePost}</Link></li>
                        <li><Link href="/posts/aside" className={isActivePath('/posts/aside') ? 'back-current-page' : ''}>{t.menu.asidePost}</Link></li>
                        <li><Link href="/posts/link" className={isActivePath('/posts/link') ? 'back-current-page' : ''}>{t.menu.linkPost}</Link></li>
                      </ul>
                    </li>
                  </ul>

                  {/* Desktop Search */}
                  {!isMobile && (<div className="searchbar-part back-search-desktop">
                    <ul>

                    <li className="back-language-toggle" onClick={toggleLanguage} title={`Switch to ${locale === 'en' ? 'Bengali' : 'English'}`}>
                        <div style={{ width: '24px', height: '24px', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '600', cursor: 'pointer', userSelect: 'none' }}>
                          {locale === 'en' ? 'বাং' : 'En'}
                        </div>
                      </li>

                      <li className="back-dark-light" onClick={toggleDarkMode}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun back-go-light">
                          <circle cx="12" cy="12" r="5"></circle>
                          <line x1="12" y1="1" x2="12" y2="3"></line>
                          <line x1="12" y1="21" x2="12" y2="23"></line>
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                          <line x1="1" y1="12" x2="3" y2="12"></line>
                          <line x1="21" y1="12" x2="23" y2="12"></line>
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon back-go-dark">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                      </li>
                      <li className="back_search" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </li>
                      <li className="back-sign">
                        {isLoggedIn ? (
                          <div className="user-menu-wrapper">
                            <button
                              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                              className="user-avatar-button"
                            >
                              {session?.user?.image ? (
                                <Image src={session.user.image}
                                  alt={session.user.name || 'User'}
                                  className="user-avatar-image"
                  width={800}
                  height={600}
                                />
                              ) : (
                                <div className="user-avatar-placeholder">
                                  {(session?.user?.name || session?.user?.email || 'U').charAt(0).toUpperCase()}
                                </div>
                              )}
                            </button>
                            {isUserMenuOpen && (
                              <>
                                <div
                                  className="user-menu-overlay"
                                  onClick={() => setIsUserMenuOpen(false)}
                                />
                                <div className="user-menu-popup">
                                  <div className="user-menu-header">
                                    {session?.user?.image && (
                                      <div className="user-menu-avatar-container">
                                        <Image src={session.user.image}
                                          alt={session.user.name || 'User'}
                                          className="user-menu-avatar-large"
                  width={800}
                  height={600}
                                        />
                                      </div>
                                    )}
                                    <div className="user-menu-info">
                                      <div className="user-menu-name">
                                        {session?.user?.name || 'User'}
                                      </div>
                                      <div className="user-menu-email">
                                        {session?.user?.email}
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    // onClick={() => signOut({ callbackUrl: withBasePath('/') })}
                                    onClick={() => {}}
                                    className="user-menu-signout"
                                  >
                                    {t.header.signOut}
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <Link href="/login">{t.header.signIn}</Link>
                        )}
                      </li>
                      <li id="nav-expander" className="nav-expander bar" onClick={(e) => { e.preventDefault(); setIsOffcanvasOpen(true); }}>
                        <span className="back-hum1"></span>
                        <span className="back-hum2"></span>
                        <span className="back-hum3"></span>
                      </li>
                    </ul>
                    <form 
                      className={`search-form ${isSearchOpen ? 'search-form-visible' : 'search-form-hidden'}`}
                      onSubmit={handleSearchSubmit}
                    >
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder={t.header.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button type="submit" className="form-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </form>
                  </div>)}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Offcanvas isOpen={isOffcanvasOpen} onClose={() => setIsOffcanvasOpen(false)} />
    </>
  );
}

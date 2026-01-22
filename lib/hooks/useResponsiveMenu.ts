'use client';

import { useEffect, useRef, useState } from 'react';

interface UseResponsiveMenuOptions {
  resizeWidth?: number;
  animationSpeed?: 'slow' | 'medium' | 'fast';
  accordionExpAll?: boolean;
}

/**
 * Hook to handle responsive menu functionality
 * Replaces jQuery backResponsiveMenu plugin
 */
export function useResponsiveMenu(
  menuRef: React.RefObject<HTMLElement | null>,
  options: UseResponsiveMenuOptions = {}
) {
  const {
    resizeWidth = 991,
    animationSpeed = 'medium',
    accordionExpAll = false,
  } = options;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeSubmenuRef = useRef<HTMLElement | null>(null);

  // Initialize menu structure
  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;

    // Add sub-menu class to all ul elements
    const allUls = menu.querySelectorAll('ul');
    allUls.forEach((ul) => {
      ul.classList.add('sub-menu');
    });

    // Add has-sub class to li elements with submenus
    const allLis = menu.querySelectorAll('li');
    allLis.forEach((li) => {
      const hasSubMenu = li.querySelector('ul.sub-menu');
      if (hasSubMenu) {
        li.classList.add('has-sub');
        // Add arrow if not exists
        if (!li.querySelector('.arrow')) {
          const arrow = document.createElement('span');
          arrow.className = 'arrow';
          li.insertBefore(arrow, li.firstChild);
        }
      }
    });

    // Add hash class to links with href="#"
    const allLinks = menu.querySelectorAll('a');
    allLinks.forEach((link) => {
      if (link.getAttribute('href') === '#') {
        link.classList.add('hash');
      }
    });
  }, []);

  // Handle window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= resizeWidth;
      setIsMobile(mobile);

      if (!menuRef.current) return;

      if (mobile) {
        menuRef.current.classList.add('collapse', 'hide-menu');
        setIsMenuOpen(false);
      } else {
        menuRef.current.classList.remove('collapse', 'hide-menu');
        setIsMenuOpen(true);
        // Close all submenus on desktop
        const activeItems = menuRef.current.querySelectorAll('li.menu-active');
        activeItems.forEach((item) => {
          item.classList.remove('menu-active');
          const subMenu = item.querySelector('ul.sub-menu');
          if (subMenu) {
            subMenu.classList.remove('slide');
            (subMenu as HTMLElement).style.display = '';
          }
        });
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [resizeWidth]);

  // Toggle main menu
  const toggleMenu = () => {
    if (!menuRef.current) return;

    setIsMenuOpen(!isMenuOpen);
    menuRef.current.classList.toggle('hide-menu');

    // Animate menu toggle
    const menu = menuRef.current;
    if (isMenuOpen) {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  };

  // Toggle submenu
  const toggleSubmenu = (liElement: HTMLLIElement) => {
    if (!menuRef.current) return;

    const subMenu = liElement.querySelector('ul.sub-menu') as HTMLElement;
    if (!subMenu) return;

    const isActive = liElement.classList.contains('menu-active');

    if (isActive) {
      // Close submenu
      liElement.classList.remove('menu-active');
      subMenu.classList.remove('slide');
      subMenu.style.display = 'none';
    } else {
      // Close other submenus if not expand all
      if (!accordionExpAll) {
        const siblings = Array.from(liElement.parentElement?.children || []);
        siblings.forEach((sibling) => {
          if (sibling !== liElement && sibling instanceof HTMLElement) {
            sibling.classList.remove('menu-active');
            const siblingSubMenu = sibling.querySelector('ul.sub-menu') as HTMLElement;
            if (siblingSubMenu) {
              siblingSubMenu.classList.remove('slide');
              siblingSubMenu.style.display = 'none';
            }
          }
        });
      }

      // Open submenu
      liElement.classList.add('menu-active');
      subMenu.classList.add('slide');
      subMenu.style.display = 'block';
    }
  };

  // Handle desktop hover
  const handleMouseEnter = (liElement: HTMLLIElement) => {
    if (!isMobile && menuRef.current && !menuRef.current.classList.contains('collapse')) {
      const subMenu = liElement.querySelector('ul.sub-menu') as HTMLElement;
      if (subMenu) {
        // Close siblings
        const siblings = Array.from(liElement.parentElement?.children || []);
        siblings.forEach((sibling) => {
          if (sibling !== liElement && sibling instanceof HTMLElement) {
            const siblingSubMenu = sibling.querySelector('ul.sub-menu') as HTMLElement;
            if (siblingSubMenu) {
              siblingSubMenu.style.display = 'none';
            }
            sibling.classList.remove('menu-active');
          }
        });

        // Open current
        liElement.classList.add('menu-active');
        subMenu.style.display = 'block';

        // Check if submenu goes off screen
        const rect = subMenu.getBoundingClientRect();
        const docWidth = document.body.clientWidth;
        if (rect.right > docWidth) {
          liElement.classList.add('edge');
        } else {
          liElement.classList.remove('edge');
        }
      }
    }
  };

  const handleMouseLeave = (liElement: HTMLLIElement) => {
    if (!isMobile && menuRef.current && !menuRef.current.classList.contains('collapse')) {
      const subMenu = liElement.querySelector('ul.sub-menu') as HTMLElement;
      if (subMenu) {
        liElement.classList.remove('menu-active');
        subMenu.style.display = 'none';
      }
    }
  };

  return {
    isMenuOpen,
    isMobile,
    toggleMenu,
    toggleSubmenu,
    handleMouseEnter,
    handleMouseLeave,
  };
}


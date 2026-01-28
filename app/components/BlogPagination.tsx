'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Suspense } from 'react';
// import { PaginationInfo } from '@/lib/blogPosts';

interface BlogPaginationProps {
  pagination: any;
}

function BlogPaginationInner({
  pagination,
}: BlogPaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('q') || '';
  const { totalPages, hasNext, hasPrev } = pagination;
  
  // Use currentPage from URL for active state
  const activePage = currentPage;
  
  // Get the base path for pagination links (works with /blog, /blog/fullwidth, /blog/right-sidebar, /blog/left-sidebar)
  const basePath = pathname || '/blog';
  
  // Build query string with search query if present
  const buildQueryString = (page: number) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    return params.toString();
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  // Generate page numbers to show (max 5 pages)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPages = 5;
    
    if (totalPages <= maxPages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page area, and last page
      if (activePage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (activePage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push('...');
        for (let i = activePage - 1; i <= activePage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <ul className="back-pagination mt-30">
      {hasPrev && (
        <li className="back-next">
          <Link href={`${basePath}?${buildQueryString(activePage - 1)}`}>
            Prev<i className="arrow_carrot-left"></i>
          </Link>
        </li>
      )}
      
      {pageNumbers.map((pageNum, index) => {
        if (pageNum === '...') {
          return (
            <li key={`ellipsis-${index}`} className="disabled">
              <span>...</span>
            </li>
          );
        }
        
        const pageNumber = pageNum as number;
        const isActive = pageNumber === activePage;
        
        return (
          <li key={pageNumber} className={isActive ? 'active' : ''}>
            {isActive ? (
              <span>{pageNumber}</span>
            ) : (
              <Link href={`${basePath}?${buildQueryString(pageNumber)}`}>
                {pageNumber}
              </Link>
            )}
          </li>
        );
      })}
      
      {hasNext && (
        <li className="back-next">
          <Link href={`${basePath}?${buildQueryString(activePage + 1)}`}>
            Next<i className="arrow_carrot-right"></i>
          </Link>
        </li>
      )}
    </ul>
  );
}

export default function BlogPagination(props: BlogPaginationProps) {
  return (
    <Suspense fallback={<div className="back-pagination mt-30"></div>}>
      <BlogPaginationInner {...props} />
    </Suspense>
  );
}


'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FormEvent, useState, useEffect, Suspense } from 'react';

function BlogSearchFormInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(currentQuery);

  // Update search query when URL params change
  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    
    // Build query string
    const params = new URLSearchParams();
    if (query) {
      params.set('q', query);
    }
    params.set('page', '1');
    
    // Use router.push for client-side navigation (no page reload)
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="mb-44" onSubmit={handleSubmit}>
      <input
        type="text"
        name="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-search"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}

export default function BlogSearchForm() {
  return (
    <Suspense fallback={
      <form className="mb-44">
        <input
          type="text"
          name="input"
          placeholder="Search..."
          disabled
        />
        <button type="submit" disabled>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    }>
      <BlogSearchFormInner />
    </Suspense>
  );
}

